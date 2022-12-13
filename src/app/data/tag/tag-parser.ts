import { iterateFirstKey, iterateSize } from '../../lib/util/array'
import { AdaptiveColor, resolveAdaptiveColor, resolveColor } from '../../lib/util/color'
import { createIssue, expectToken, Issue } from '../code/issue/issue'
import { tokenize } from '../code/parser/tokenizer'
import { TagItem, TagValue, Tags } from './tag'

export interface TagParseResult {
	result: Tags
	issues: Issue[]
}

/**
 * 解析定义标签的代码
 * 
 * Schema:
 * 
 * ```plain
 * tag|multitag|category <name> [<label:stringLiteral>] (
 *     [color <color>]
 *     [delimiter <delimiter:stringLiteral>]
 *     [void]
 *     [default]
 *     value <name> [<label: stringLabel>]
 *     externValue <name> [<label: stringLabel>]
 *     initValue <name> [<label: stringLabel>]
 * )
 * ```
 */
export function parseTags(code: string): TagParseResult {
	let tokenizeOption = {
		symbolChars: '`' + `~!@#%^&*()=+[{]}\|;:'",.<>/?`,
		symbolLigatures: [],
		stringQuote: '"' + "'",
		commentStart: ['#'],
		commentQuote: [['/*', '*/'] as [string, string]],
	}
	let { result: tokens, issues } = tokenize(code, tokenizeOption)

	tokens = tokens.filter((value) => {
		return ['eol', 'comment'].indexOf(value.type) == -1
	})

	let currentStart = 0 // 当前标签开头词的位置
	let currentLpr = 0   // 当前左括号的位置
	let nameChecks: {[_: string]: boolean} = {}
	let tags: {[_: string]: TagItem} = {}

	function checkName(name: string, pos: number): boolean {
		if(nameChecks[name]) {
			issues.push(createIssue(pos, 'error', 'tag.dupe_tag', name))
			return false
		}
		nameChecks[name] = true
		return true
	}

	while(true) {
		let success = true
		let baseToken = tokens[currentStart]
		if(currentStart >= tokens.length || baseToken.type == 'eof') {
			break
		}
		currentStart += 1
		success &&= expectToken(
			issues, ['word'], ['tag', 'multitag', 'category'],
			'error', '"tag" | "multitag" | "category" at line start',
			baseToken,
			baseToken.lineHead
		)
		if(!success) {
			continue
		}
		
		let nameToken = tokens[currentStart]
		currentStart += 1
		success &&= expectToken(
			issues, ['word'], null,
			'error', 'word as name',
			nameToken
		)
		if(!success) {
			continue
		}

		let labelOrLprToken = tokens[currentStart]
		let label: string | null = null
		currentStart += 1
		if(labelOrLprToken.type == 'symbol') {
			success &&= expectToken(
				issues, ['symbol'], ['('],
				'error', 'stringLiteral as label or "("',
				labelOrLprToken
			)
		} else {
			success &&= expectToken(
				issues, ['stringLiteral'], null,
				'error', 'stringLiteral as label or "("',
				labelOrLprToken
			)
			if(!success) {
				continue
			}
			label = labelOrLprToken.content
			let lprToken = tokens[currentStart]
			currentStart += 1
			success &&= expectToken(
				issues, ['symbol'], ['('],
				'error', '"("',
				lprToken
			)
		}
		if(!success) {
			continue
		}

		currentLpr = currentStart - 1
		while(true) {
			let rprToken = tokens[currentStart]
			currentStart += 1
			if(rprToken.type == 'symbol' && rprToken.content == ')') {
				break
			}
			if(rprToken.type == 'eof') {
				success = false
				break
			}
		}

		let currentRpr = currentStart - 1

		let resultTag: TagItem = {
			type: baseToken.content as any,
			...(baseToken.content == 'multitag' ? {
				defaultValues: []
			} : {
				defaultValue: ''
			}),
			name: nameToken.content,
			label: label,
			color: null,
			delimiter: ': ',
			externValue: null,
			values: {}
		}

		interface ValuesParseResult {
			values: {[index: string]: TagValue}
			inits: string[]
			externs: string[]
			color: AdaptiveColor | null
			delimiter: string | null
		}

		let tagName = nameToken.content
		let isMulti = baseToken.content == 'multitag'

		let parseValues = function(issues: Issue[], start: number, end: number, isMulti: boolean): ValuesParseResult {
			let externs: string[] = []
			let inits: string[] = []
			let color: AdaptiveColor | null = null
			let delimiter: string | null = null
			let values: {[_:string]: TagValue} = {}
			let nameChecks: {[_: string]: boolean} = {}
			let hasVoid = false
			let hasDefault = false

			let ptr = start

			function checkName(name: string, pos: number): boolean {
				if(nameChecks[name]) {
					issues.push(createIssue(pos, 'error', 'tag.dupe_value', name))
					return false
				}
				nameChecks[name] = true
				return true
			}

			while(true) {
				let success = true
				
				if(ptr >= end) {
					break
				}
				let baseToken = tokens[ptr++]
				success &&= expectToken(issues,
					['word'], ['void', 'default', 'value', 'initValue', 'externValue', 'color', 'delimiter'],
					'error', '"void" | "default" | "value" | "initValue" | "externValue"at line start',
					baseToken, baseToken.lineHead
				)
				if(!success) {
					continue
				}

				if(baseToken.content == 'color' || baseToken.content == 'delimiter') {
					// 标签属性
					let valToken = tokens[ptr++]
					success &&= expectToken(issues,
						['stringLiteral'], null,
						'error', 'stringLiteral',
						valToken
					)
					if(baseToken.content == 'color') {
						let resolvedColor = resolveAdaptiveColor(valToken.content)
						if(resolvedColor == null) {
							issues.push(createIssue(
								valToken.range[0], 'error', 'tag.invalid_color', valToken.content
							))
						}
						color = resolvedColor
					} else {
						delimiter = valToken.content
					}
				} else if(baseToken.content == 'void' || baseToken.content == 'default') {
					// void 与 default 值
					if(!isMulti) {
						if(checkName(baseToken.content, baseToken.range[0])) {
							values[baseToken.content] = {
								type: baseToken.content as any,
								name: baseToken.content,
								label: null,
								extern: false,
								init: false
							}
						}
						if(baseToken.content == 'void') {
							hasVoid = true
						} else if(baseToken.content == 'default') {
							hasDefault = true
						}
					} else {
						issues.push(createIssue(
							baseToken.range[0], 'error', 'tag.void_multitag'
						))
					}
				} else {
					// 非空值
					let isInit = baseToken.content == 'initValue'
					let isExtern = baseToken.content == 'externValue'

					let nameToken = tokens[ptr++]
					success &&= expectToken(issues,
						['word'], null,
						'error', 'word',
						nameToken
					)
					if(!success) {
						continue
					}

					let labelToken = tokens[ptr++]
					let labelText: string | null = null
					if(labelToken.type == 'stringLiteral') {
						labelText = labelToken.content
					} else {
						ptr -= 1
					}

					if(checkName(nameToken.content, baseToken.range[0])) {
						values[nameToken.content] = {
							type: 'value',
							name: nameToken.content,
							label: labelText,
							extern: isExtern,
							init: isInit
						}
						if(isInit) {
							inits.push(nameToken.content)
						}
						if(isExtern) {
							externs.push(nameToken.content)
						}
					}
				}
			}

			if(!isMulti && inits.length == 0) {
				if(hasVoid) {
					inits.push('void')
				} else if(hasDefault) {
					inits.push('default')
				} else if(iterateSize(values) != 0) {
					inits.push(iterateFirstKey(values))
				} else {
					issues.push(createIssue(
						tokens[start].range[0], 'error',
						'tag.no_values', tagName
					))
				}
			}

			return {
				values: values,
				inits: inits,
				externs: externs,
				color: color,
				delimiter: delimiter
			}
		}

		let valuesResult = parseValues(issues, currentLpr + 1, currentRpr, isMulti)

		if(!isMulti && valuesResult.inits.length == 0) {
			continue
		}

		if(checkName(nameToken.content, baseToken.range[0])) {
			if(isMulti) {
				tags[nameToken.content] = ({
					type: 'multitag',
					defaultValues: valuesResult.inits,
					name: nameToken.content,
					label: label,
					color: valuesResult.color,
					delimiter: valuesResult.delimiter ?? ': ',
					externValue: valuesResult.externs[0] ?? null,
					values: valuesResult.values
				})
			} else {
				tags[nameToken.content] = ({
					type: baseToken.content as 'tag' | 'category',
					defaultValue: valuesResult.inits[0] ?? null,
					name: nameToken.content,
					label: label,
					color: valuesResult.color,
					delimiter: valuesResult.delimiter ?? ': ',
					externValue: valuesResult.externs[0] ?? null,
					values: valuesResult.values
				})
			}
		}
	}

	return {
		result: tags,
		issues: issues
	}
}

import { randomToken } from "./random"

function replacePlaceholder() {
	return '{' + randomToken(32) + '}'
}

/**
 * 替换字符串中所有模式串，且保证不重复操作
 * @param haystack 待查找字符串
 * @param needle 模式串
 * @param replace 替换串
 */
export function replaceAll(haystack: string, needle: string, replace: string) {
	return haystack.split(needle).join(replace)
}

/**
 * 替换字符串中多个模式串为对应的替换串，且保证不重复操作 ~~(真的吗？)~~
 * @param haystack 待查找字符串
 * @param pairs 模式串-替换串对
 */
export function multiReplace(haystack: string, pairs: [string, string][]) {
	type Parts = (string | number)[]
	let parts: Parts = [haystack]

	// 模式串替换为数值
	function replaceWithNumber(haystack: string, needle: string, num: number): Parts {
		let split = haystack.split(needle)
		let ret: Parts = []
		
		for(let i = 0; i < split.length; i++) {
			if(i > 0) {
				ret.push(num)
			}
			if(split[i].length > 0) {
				ret.push(split[i])
			}
		}
		return ret
	}

	// 将模式串逐个替换为数值
	for(let idx = 0; idx < pairs.length; idx++) {
		let needle = pairs[idx][0]
		let newParts: Parts = []

		for(let i = 0; i < parts.length; i++) {
			let part = parts[i]
			if(typeof(part) == 'string') {
				newParts = newParts.concat(replaceWithNumber(part, needle, idx))
			} else {
				newParts.push(part)
			}
		}
		
		parts = newParts
	}

	// 将数值全部替换为替换串
	let ret = parts.map((val) => {
		if(typeof(val) == 'string') {
			return val
		}
		return pairs[val][1]
	}).join('')

	return ret
}

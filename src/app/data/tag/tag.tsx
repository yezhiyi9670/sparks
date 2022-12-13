import React from 'react'
import { AdaptiveColor, resolveAdaptiveColor } from "../../lib/util/color"
import { findWithKey } from "../../lib/util/array"
import { Chip, useTheme } from "@mui/material"
import { SxProps, Theme } from '@mui/system'
import { useDarkMode } from '../../lib/darkmode/darkmode'

/**
 * 选项式标签的选项
 */
export interface TagValue {
	type: 'void' | 'default' | 'value'
	name: string
	label: string | null
	extern: boolean
	init: boolean
}

interface MultiTagItemBase {
	type: 'multitag'
	defaultValues: string[]              // 指定索引
}
interface SingleTagItemBase {
	type: 'tag' | 'category'
	defaultValue: string                 // 指定索引
}
interface TagItemBase {
	name: string
	label: string | null
	color: AdaptiveColor | null          // 颜色代码相关在 lib/util/color.ts 中
	delimiter: string
	externValue: string | null           // 包含 extern 修饰符的项
	values: {[index: string]: TagValue}  // index 的格式为 'void' 'default' 或 'value-xxx'
}
export type MultiTagItem = MultiTagItemBase & TagItemBase
export type SingleTagItem = SingleTagItemBase & TagItemBase
/**
 * 选项式标签的定义
 */
export type TagItem = SingleTagItem | MultiTagItem

/**
 * 选项式标签定义数据
 */
export type Tags = {[_: string]: TagItem}

/**
 * 渲染标签时使用的文本
 */
export function tagRenderText(tags: Tags, tagName: string, values: string[] | null): string[] {
	function delimiterText(label1: string | null, delimiter: string, label2: string | null) {
		if(label1 !== null && label2 !== null) {
			return [label1 + delimiter + label2]
		} else if(label1 !== null) {
			return [label1]
		} else if(label2 !== null) {
			return [label2]
		}
		return []
	}
	
	let tagDef = tags[tagName]

	if(tagDef === undefined) {
		return []
	}

	if(tagDef.type == 'multitag') {
		if(values === null) {
			values = tagDef.defaultValues
		}
		return values.map((valueName) => {
			if(tagDef.values[valueName] === undefined) {
				return []
			}
			return delimiterText(tagDef.label, tagDef.delimiter, tagDef.values[valueName].label)
		}).reduce((a, b) => a.concat(b))
		
	} else {
		let value = tagDef.defaultValue
		if(values && values.length >= 1) {
			value = values[0]
		}
		let valueDef = tagDef.values[value]
		if(valueDef === undefined) {
			return []
		}
		if(valueDef.type == 'void') {
			return []
		} else if(valueDef.type == 'default') {
			if(tagDef.label === null) {
				return []
			} else {
				return [tagDef.label]
			}
		} else {
			let label1 = tagDef.label
			let delimiter = tagDef.delimiter
			let label2 = valueDef.label
			return delimiterText(label1, delimiter, label2)
		}
	}
}

/**
 * 标签渲染器
 */
export function TagRenderer({ tags, tagName, values, sx, ...other }: {
	tags: Tags,
	tagName: string,
	values: string[] | null,
	sx?: SxProps<Theme>
}) {
	const renderTexts = tagRenderText(tags, tagName, values)
	const theme = useTheme()

	const color = tags[tagName]?.color ?? resolveAdaptiveColor('Grey-T200')!

	return <>
		{renderTexts.map((text, index) => {
			return <TagChip key={index} text={text} sx={sx} color={color} {...other} />
		})}
	</>
}

/**
 * 单标签渲染
 */
export function TagChip({ text, sx, color, ...other }: {
	text: string,
	sx?: SxProps<Theme>,
	color: AdaptiveColor
}) {
	const isDarkMode = useDarkMode()

	return <Chip label={text} size='small' sx={Object.assign({}, {
		backgroundColor: isDarkMode ? color.dark : color.light
	}, sx)} {...other} />
}

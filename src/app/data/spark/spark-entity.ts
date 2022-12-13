import { LanguageFunction } from "../../lib/i18n/i18n"
import { AdaptiveColor, resolveAdaptiveColor } from "../../lib/util/color"
import { randomToken } from "../../lib/util/random"
import { TagItem } from "../tag/tag"
import { Spark } from "./spark"

export const SparkEntityFactory = {
	randomAlias: () => {
		return randomToken(8)
	},
	createNew: (alias: string): SparkEntity => {
		return new SparkEntity({
			alias: alias,
			prev: null,
			title: '',
			origin: [],
			type: 'markdown',
			content: '',
			desc: '',
			tags: {},
			meta: {},
			ctime: +new Date(),
			mtime: +new Date(),
			color: resolveAdaptiveColor('Grey-T100')!
		})
	}
}

/*
关于标签：
- 如果标签包含无效的值，不要理它
- 如果某标签值缺失，那么给它整上默认值（对不存在的卡片，稍后覆盖这一行为）
*/

export class SparkEntity {
	/**
	 * 字符串别名
	 */
	alias: string
	/**
	 * 上一个版本的别名
	 * 必须存在，否则无效。系统不应当允许成环
	 */
	prev: string | null
	/**
	 * 标题
	 */
	title: string
	/**
	 * 来源的别名
	 * 可以是不存在的东西，这样这个东西会默认具有所有 extern 标签（若无 extern，则用默认值）
	 */
	origin: string[]
	/**
	 * 类型
	 */
	type: 'markdown'
	/**
	 * 内容
	 */
	content: string
	/**
	 * 简短描述
	 */
	desc: string
	/**
	 * 选项式标签的内容
	 */
	tags: {[tagName: string]: string[]}
	/**
	 * 自定义元数据的内容
	 */
	meta: {[metaName: string]: string}
	/**
	 * 创建时间（用户可修改）
	 */
	ctime: number
	/**
	 * 更新时间（用户不可修改，用于数据同步）
	 */
	mtime: number
	/**
	 * 颜色
	 */
	color: AdaptiveColor

	constructor(data: Spark) {
		Object.assign(this, data)
	}

	/**
	 * 转化为存储数据
	 */
	toData(): Spark {
		return {
			alias: this.alias,
			prev: this.prev,
			origin: this.origin,
			type: this.type,
			content: this.content,
			desc: this.desc,
			tags: this.tags,
			meta: this.meta,
			ctime: this.ctime,
			mtime: this.mtime,
			color: this.color,
			title: this.title
		}
	}

	/**
	 * 获取标签值
	 * @return 若为多选标签，返回选中的所有值；否则返回包含一个字符串的列表，为当前值。
	 */
	getTagValue(tag: TagItem): string[] {
		const tagName = tag.name
		let values = this.tags[tagName]
		if(!values) {
			if(tag.type == 'multitag') {
				return tag.defaultValues
			} else {
				return [tag.defaultValue]
			}
		}
		// 如果存在，那还要 fliter 一下（bushi
		values = values.filter((key) => {
			const valueDef = tag.values[key]
			if(!valueDef) {
				return false
			}
			return true
		})
		// 多选标签，直接给出所有选中值
		if(tag.type == 'multitag') {
			return values
		}
		// 否则... 如果一个都不剩了
		if(values.length == 0) {
			return [tag.defaultValue]
		}
		return [values[0]]
	}

	/**
	 * 获取标题
	 */
	getDisplayTitle(LNG: LanguageFunction) {
		return this.title != '' ? this.title : LNG('spark.untitled')
	}

	/**
	 * 获取描述
	 */
	getDisplayDesc(LNG: LanguageFunction) {
		return this.desc != '' ? this.desc : LNG('spark.nodesc')
	}

}

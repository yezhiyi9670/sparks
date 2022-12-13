import { AdaptiveColor } from "../../lib/util/color"

export interface Spark {
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
}

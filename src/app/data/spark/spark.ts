import { AdaptiveColor } from "app/lib/util/color"

export interface Spark {
	/**
	 * 系统分配 ID
	 */
	gid: number
	/**
	 * 字符串别名
	 */
	alias: string
	/**
	 * 上一个版本的 gid
	 * 系统不应当允许成环
	 */
	prev: number
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
	tags: {[tagName: string]: string}
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

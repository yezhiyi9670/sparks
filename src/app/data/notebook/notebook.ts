import { Tags } from "../tag/tag"

export interface NotebookConfig {

}
export const notebookConfigDefaults: NotebookConfig = {}
export interface TagsManifest {
	code: string
	tags: Tags
}
export interface SparksManifest {
	entries: number[]
}
export interface MediaManifest {
	entries: number[]
}
export interface Notebook {
	/**
	 * 系统分配的 ID
	 */
	gid: number
	/**
	 * 名称
	 */
	name: string
	/**
	 * 别名
	 */
	alias: string
	/**
	 * 标签
	 */
	tags: TagsManifest
	/**
	 * 卡片
	 */
	sparks: SparksManifest
	/**
	 * 媒体
	 */
	media: MediaManifest
}

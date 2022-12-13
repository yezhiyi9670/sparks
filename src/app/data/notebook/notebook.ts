import { Spark } from "../spark/spark"
import { Tags } from "../tag/tag"
import { Media } from '../media/media'

export interface NotebookConfig {
	/**
	 * 移动端输入时使用上下文快捷符号
	 */
	useContextualSymbolsMobile: boolean
	/**
	 * 桌面端输入时使用上下文快捷符号（平板电脑可能需要）
	 */
	useContextualSymbolsDesktop: boolean
}
export const notebookConfigDefaults: NotebookConfig = {
	useContextualSymbolsMobile: true,
	useContextualSymbolsDesktop: false,
}
export interface TagsManifest {
	code: string
	tags: Tags
}
export interface SparksManifest {
	entries: Spark[]
}
export interface MediaManifest {
	entries: Media[]
}
export interface SyncSource {
	username: string
	alias: string
	secret: string
}
export interface Notebook {
	/**
	 * 名称
	 */
	name: string
	/**
	 * 图标
	 */
	icon: string
	/**
	 * 配置
	 */
	config: NotebookConfig
	/**
	 * 同步源
	 */
	sync: SyncSource | null
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

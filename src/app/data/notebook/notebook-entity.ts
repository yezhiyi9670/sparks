import { randomToken } from "../../lib/util/random"
import { getDefaultTagsManifest } from "./const/default-tags"
import { MediaManifest, Notebook, NotebookConfig, notebookConfigDefaults, SparksManifest, SyncSource, TagsManifest } from "./notebook"
import localforage from "localforage"
import { LocalWriteError } from "../store/store"
import { CallbackRegistry } from "../../lib/util/event"
import { TagItem } from "../tag/tag"
import { release, synchronize } from "../../lib/util/synchronize"
import { useWideEditor } from "../../lib/util/responsive"
import { findIndexWithKey, findWithKey, sortCompare } from "../../lib/util/array"
import { LanguageFunction } from "../../lib/i18n/i18n"
import { SparkEntity, SparkEntityFactory } from "../spark/spark-entity"

export type NotebooksData = {[alias: string]: Notebook}
export const NotebookStorage = {
	callbacks: new CallbackRegistry(),
	__setStoreSync: async function(data: NotebooksData) {
		try {
			await localforage.setItem('notebooks', data)
			this.callbacks.call()
		} catch(e: unknown) {
			throw new LocalWriteError('Failed to write')
		}
	},
	__getStoreSync: async function(): Promise<NotebooksData | null> {
		let data = await localforage.getItem('notebooks')
		if(undefined === data) {
			return null
		}
		return data as NotebooksData
	},
	getStore: async function() {
		await synchronize(this)
			const result = await this.__getStoreSync()
		await release(this)
		return result
	},
	initialize: async function() {
		await synchronize(this)
			if(await this.__getStoreSync() === null) {
				await this.__setStoreSync({})
			}
		await release(this)
	},
	/**
	 * 项目是否存在
	 * @return 是否存在
	 */
	exists: async function(alias: string) {
		await synchronize(this)
			let data = await this.__getStoreSync()
			const result = !!data && !!data[alias]
		await release(this)
		return result
	},
	__readSync: async function(alias: string) {
		let data = await this.__getStoreSync()
		if(data == null) {
			return null
		}
		if(!data[alias]) {
			return null
		}
		return data[alias]
	},
	/**
	 * 读取项目
	 * @return 项目或 null
	 */
	read: async function(alias: string) {
		await synchronize(this)
			const result = await this.__readSync(alias)
		await release(this)
		return result
	},
	/**
	 * 写入项目
	 * @throw LocalWriteError
	 */
	write: async function(alias: string, val: Notebook) {
		await synchronize(this)
			let data = await (this.__getStoreSync())!
			data[alias] = val
			await this.__setStoreSync(data)
		await release(this)
	},
	/**
	 * 移动
	 * @throw LocalWriteError
	 */
	move: async function(oldAlias: string, alias: string) {
		synchronize(this)
			let data = await (this.__getStoreSync())!
			data[alias] = data[oldAlias]
			delete data[oldAlias]
			await this.__setStoreSync(data)
		release(this)
	},
	/**
	 * 删除
	 * @throw LocalWriteError
	 * @return 是否成功
	 */
	delete: async function(alias: string) {
		synchronize(this)
			let data = await (this.__getStoreSync())!
			delete data[alias]
			await this.__setStoreSync(data)
		release(this)
	}
}
NotebookStorage.initialize()

export const NotebookEntityFactory = {
	randomAlias: () => {
		return randomToken(8)
	},
	createNew: (alias: string, LNG: LanguageFunction): NotebookEntity => {
		return new NotebookEntity({
			alias: alias,
			name: 'Untitled',
			icon: 'Book',
			sync: null,
			tags: getDefaultTagsManifest(LNG),
			sparks: {entries: []},
			media: {entries: []},
			config: notebookConfigDefaults
		})
	}
}

export class NotebookEntity implements Notebook {
	/**
	 * 名称
	 */
	name: string = ''
	/**
	 * 图标
	 */
	icon: string = ''
	/**
	 * 配置
	 */
	config: NotebookConfig = notebookConfigDefaults
	/**
	 * 同步源
	 */
	sync: SyncSource | null = null
	/**
	 * 别名
	 */
	alias: string = ''
	/**
	 * 标签
	 */
	tags: TagsManifest = {code: '', tags:{}}
	/**
	 * 卡片
	 */
	sparks: SparksManifest = {entries: []}
	/**
	 * 媒体
	 */
	media: MediaManifest = {entries: []}

	constructor(data: Notebook) {
		Object.assign(this, data)
		this.sortSparks()
	}

	/**
	 * 转化为存储数据
	 */
	toData(): Notebook {
		return {
			name: this.name,
			icon: this.icon,
			config: this.config,
			sync: this.sync,
			alias: this.alias,
			tags: this.tags,
			sparks: this.sparks,
			media: this.media
		}
	}

	/**
	 * 写入存储器
	 */
	async writeData() {
		await NotebookStorage.write(this.alias, this.toData())
	}

	/**
	 * 获取分类目录标签
	 */
	getCategoryTag(): TagItem | null {
		const tags = this.tags.tags
		for(let tagName in tags) {
			const tagItem = tags[tagName]
			if(tagItem.type == 'category') {
				return tagItem
			}
		}
		return null
	}
	
	/**
	 * 获取配置选项
	 */
	getConfigOption<T>(key: string, defaultValue: T): T {
		return this.config[key] ?? defaultValue
	}

	/**
	 * 是否应当使用上下文符号
	 */
	useContextualSymbols() {
		const wideEditor = useWideEditor()
		return wideEditor ? this.config.useContextualSymbolsDesktop : this.config.useContextualSymbolsMobile
	}

	/**
	 * 按创建时间降序排列卡片
	 */
	sortSparks() {
		this.sparks.entries.sort((x, y) => y.ctime - x.ctime || sortCompare(x.alias, y.alias))
	}
	/**
	 * 寻找卡片
	 */
	findSpark(alias: string) {
		return findWithKey(this.sparks.entries, 'alias', alias)
	}
	/**
	 * 卡片是否存在
	 */
	existSpark(alias: string) {
		return !!this.findSpark(alias)
	}
	/**
	 * 创建新卡片
	 */
	createSpark(alias: string, ctime: Date) {
		const newSpark = SparkEntityFactory.createNew(alias)
		newSpark.ctime = +ctime
		this.sparks.entries.push(newSpark)
		this.sortSparks()
	}
	/**
	 * 移除卡片
	 */
	deleteSpark(alias: string) {
		const index = findIndexWithKey(this.sparks.entries, 'alias', alias)
		if(index == -1) {
			return false
		}
		this.sparks.entries.splice(index, 1)
	}
	/**
	 * 写入卡片
	 */
	writeSpark(alias: string, entity: SparkEntity) {
		const index = findIndexWithKey(this.sparks.entries, 'alias', alias)
		if(index == -1) {
			this.sparks.entries.push(entity.toData())
		} else {
			this.sparks.entries[index] = entity.toData()
		}
		this.sortSparks()
	}
	/**
	 * 获取卡片实体
	 */
	getSparkEntity(alias: string) {
		const spark = this.findSpark(alias)
		if(spark === null) {
			return spark
		}
		return new SparkEntity(spark)
	}
	/**
	 * 接受不存在的卡片
	 */
	acceptNonexistentSpark() {
		const categoryTag = this.getCategoryTag()
		if(!categoryTag) {
			return false
		}
		return categoryTag.externValue !== null
	}

}

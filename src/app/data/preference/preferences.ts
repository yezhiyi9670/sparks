import localforage from "localforage"
import { synchronize, release } from '../../lib/util/synchronize'

interface PreferencesData {
	[_: string]: unknown
}

export const PreferencesStorage = {
	__setStoreSync: async function(data: PreferencesData) {
		try {
			await localforage.setItem('preferences', data)
		} catch(e: unknown) {
			// 偏好设置不重要，因此忽略掉写入错误
			console.warn('Write PreferencesStorage failure. Is storage space used up?')
		}
	},
	__getStoreSync: async function(): Promise<PreferencesData | null> {
		let data = await localforage.getItem('preferences')
		if(undefined === data) {
			return null
		}
		return data as PreferencesData
	},
	initialize: async function() {
		await synchronize(this)
			if(await this.__getStoreSync() === null) {
				this.__setStoreSync({})
			}
		await release(this)
	},
	__getItemSync: async function<T>(key: string, defaultValue: T): Promise<T> {
		let data = (await this.__getStoreSync())!
		if(data[key] === undefined) {
			return defaultValue
		}
		return data[key] as T
	},
	getItem: async function<T>(key: string, defaultValue: T): Promise<T> {
		await synchronize(this)
			const result = await this.__getItemSync(key, defaultValue)
		await release(this)
		return result
	},
	setItem: async function<T>(key: string, value: T) {
		await synchronize(this)
			let data = (await this.__getStoreSync())!
			data[key] = value
			await this.__setStoreSync(data)
		await release(this)
	},
	removeItem: async function(key: string) {
		await synchronize(this)
			let data = (await this.__getStoreSync())!
			if(data[key] !== undefined) {
				delete data[key]
			}
			await this.__setStoreSync(data)
		await release(this)
	}
}
PreferencesStorage.initialize()

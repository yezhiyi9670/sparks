/*
这是一个简单的同步锁模块，主要用于异步的数据存储，保证基本存取的原子性。
*/
import { randomToken } from "./random"

const delay = 10
let registry = {}

function findHandle(handle: object) {
	let token: string | null = null
	for(let index in registry) {
		if(registry[index] === handle) {
			token = index
			break
		}
	}
	return token
}

/**
 * 对象是否已标记为同步锁定
 */
export function isSynchronized(handle: object) {
	return !!findHandle(handle)
}

/**
 * 等待并锁定对象
 */
export async function synchronize(handle: object) {
	while(isSynchronized(handle)) {
		await new Promise((resolve) => {
			setTimeout(() => resolve(null), delay)
		})
	}
	registry[randomToken(32)] = handle
}

/**
 * 解锁对象
 */
export async function release(handle: object) {
	const token = findHandle(handle)
	if(token) {
		delete registry[token]
	}
}

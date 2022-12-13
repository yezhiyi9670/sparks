import { randomToken } from "../lib/util/random"
import { release, synchronize } from "../lib/util/synchronize"

async function access1() {
	const token = randomToken(12)
	
	await synchronize(access1)
	console.log('access', token)
	await new Promise((resolve) => {
		setTimeout(() => resolve(null), 1000)
	})
	console.log('finish', token)
	await release(access1)
}

export function testAtomity() {
	console.log('testAtomity')
	access1()
	setTimeout(() => access1(), 500)
}

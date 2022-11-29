export function findWithKey<T>(arr: T[], key: string, value: any): T | null {
	for(let item of arr) {
		if((item as any)[key] == value) {
			return item
		}
	}
	return null
}

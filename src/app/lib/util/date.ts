export function dateDisplayString(date: Date) {
	if(isNaN(date.getDate())) {
		return 'undefined'
	}
	return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}

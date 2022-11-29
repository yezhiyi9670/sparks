import mimeTable from './const/mimeTable'

export function getMime(ext: string) {
	let mime = mimeTable[ext]
	if(mime === undefined) {
		return 'application/x-octet-stream'
	}
	return mime
}

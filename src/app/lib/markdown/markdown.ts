import createDOMPurify from 'dompurify'
import { marked } from 'marked'
const DOMPurify = createDOMPurify(window)

export function parseMarkdownSafe(content: string) {
	return DOMPurify.sanitize(marked.parse(content))
}

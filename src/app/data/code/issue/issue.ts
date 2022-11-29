/***
 * Issue 指的是代码式内容解析时出现的问题，一般需要反馈给用户。
 * 在 tag-parser (选项式标签) 和 spark-nmn (简谱速记符) 中会出现。
 ***/

import { CodeToken, TokenType } from "../parser/tokenizer"

export type Severity = "notice" | "unstd" | "warning" | "error" | "fatal"

export interface Issue {
	index: number
	severity: Severity
	key: string
	args?: string[]
}

export function createIssue(index: number, severity: Severity, key: string, ...args: string[]): Issue {
	return { index, severity, key, args }
}

export function expectToken(
	issues: Issue[],
	expectedTypes: TokenType[],
	expectedContent: string[] | null,
	severity: Severity,
	description: string,
	token: CodeToken,
	assertation: boolean = true
): boolean {
	let matchSuccess = true

	if(expectedTypes.indexOf(token.type) == -1) {
		matchSuccess = false
	}
	if(expectedContent !== null && expectedContent.indexOf(token.content) == -1) {
		matchSuccess = false
	}
	matchSuccess &&= assertation

	if(!matchSuccess) {
		issues.push(createIssue(token.range[0], severity, 'general.unexpected_token', token.type, token.content, description))
	}

	return matchSuccess
}

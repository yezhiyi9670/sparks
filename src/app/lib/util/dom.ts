function setTitle(title: string) {
	document.title = title
}

/**
 * 获取设置窗口标题的函数
 */
export function useTitleSetter() {
	return setTitle
}

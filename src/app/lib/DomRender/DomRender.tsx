import React, { useEffect } from 'react'

interface DomRenderProps {
	renderer?: (ele: HTMLDivElement) => void
	onUnmount?: () => void
}
/**
 * DOM 渲染器
 * 传入函数用于对 DOM 元素内部进行渲染
 */
export function DomRender({ renderer, onUnmount }: DomRenderProps) {
	const ref = React.createRef<HTMLDivElement>()

	useEffect(() => {
		if(ref.current) {
			renderer && renderer(ref.current)
		} else {
			onUnmount && onUnmount()
		}
	})

	return (
		<div ref={ref}></div>
	)
}

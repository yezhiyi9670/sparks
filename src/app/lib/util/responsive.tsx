import React from 'react'

/**
 * 使用实时更新的窗口尺寸
 */
export function useWindowSize() {
	type WindowSize = [number, number]
	const [ size, setSize ] = React.useState<WindowSize>([window.innerWidth, window.innerHeight])
	React.useEffect(() => {
		function handleResize() {
			setSize([window.innerWidth, window.innerHeight])
		}
		addEventListener('resize', handleResize)
		return () => {
			removeEventListener('resize', handleResize)
		}
	})
	return size
}

const InitialWindowSizeContext = React.createContext<[number, number]>([0, 0])

/**
 * 获取初始窗口尺寸
 */
export function useInitialWindowSize() {
	return React.useContext(InitialWindowSizeContext)
}

/**
 * 是否使用宽屏编辑器界面
 */
export function useWideEditor() {
	return useInitialWindowSize()[0] >= 1000
}

/**
 * 提供初始窗口尺寸
 */
export function InitialWindowSizeProvider(props: {value: [number, number], children: React.ReactNode}) {
	return (
		<InitialWindowSizeContext.Provider value={props.value}>
			{props.children}
		</InitialWindowSizeContext.Provider>
	)
}

const HorizontalCutContext = React.createContext(0)

/**
 * 获取当前水平切入
 */
export function useHorizontalCut() {
	return React.useContext(HorizontalCutContext)
}

interface HorizontalCutProps {
	value: number
	reset?: boolean
	children: React.ReactNode
}
/**
 * 设置水平切入
 */
export function HorizontalCut({ value, reset, children }: HorizontalCutProps) {
	const cut = reset ? 0 : useHorizontalCut()
	
	return <HorizontalCutContext.Provider value={cut + value}>
		{children}
	</HorizontalCutContext.Provider>
}

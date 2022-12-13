import React from 'react'

export type BreakpointType = 'small' | 'medium' | 'large'

const MobileContext = React.createContext<BreakpointType>('large')

/**
 * 获取当前环境是否为移动端
 */
export function useMobile() {
	return React.useContext(MobileContext) == 'small'
}

/**
 * 获取是否为超宽屏幕
 */
export function useExtrawide() {
	return React.useContext(MobileContext) == 'large'
}

interface MobileProviderProps {
	children: React.ReactNode
	value: BreakpointType
}

/**
 * 当前环境是否移动端的 ContextProvider
 * @prop value 是否为移动端
 */
export function MobileProvider({ value, children, ...other }: MobileProviderProps) {
	return (
		<MobileContext.Provider value={value}>
			{children}
		</MobileContext.Provider>
	)
}

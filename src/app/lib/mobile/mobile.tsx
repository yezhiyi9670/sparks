import React from 'react'

const MobileContext = React.createContext(false)

/**
 * 获取当前环境是否为移动端
 */
export function useMobile() {
	return React.useContext(MobileContext)
}

interface MobileProviderProps {
	children: React.ReactNode
	value: boolean
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

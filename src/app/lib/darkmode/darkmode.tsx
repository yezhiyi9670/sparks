import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

interface DarkModeProviderProps {
	defaultValue: boolean
	children: React.ReactNode
}

const DarkModeContext = React.createContext<[boolean, (_: boolean) => void]>([false, (val: boolean) => {}])

/**
 * 获取是否为黑夜模式
 */
export function useDarkMode() {
	return React.useContext(DarkModeContext)[0]
}

/**
 * 获取设置黑夜模式的函数
 */
export function useDarkModeSetter() {
	return React.useContext(DarkModeContext)[1]
}

/**
 * 黑夜模式的 ContextProvider
 * @prop defaultValue 默认状态
 */
export function DarkModeProvider({ defaultValue, children, ...other }: DarkModeProviderProps) {
	const [ darkMode, setDarkMode ] = React.useState(defaultValue)

	return (
		<DarkModeContext.Provider value={[darkMode, setDarkMode]}>
			<ThemeProvider theme={createTheme({
				palette: {
					mode: darkMode ? 'dark' : 'light'
				}
			})}>
				{children}
			</ThemeProvider>
		</DarkModeContext.Provider>
	)
}

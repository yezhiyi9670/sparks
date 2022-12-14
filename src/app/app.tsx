import React from 'react'
import { createRoot } from 'react-dom/client'
import Button from '@mui/material/Button'
import { CssBaseline } from '@mui/material'
import { AppMobile } from './app-mobile'
import { AppDesktop } from './app-desktop'
import { I18nProvider } from './lib/i18n/i18n'
import { DarkModeProvider } from './lib/darkmode/darkmode'
import { rgb2hex, resolveColor, resolveAdaptiveColor } from './lib/util/color'
import { parseTags } from './data/tag/tag-parser'
import localforage from 'localforage'
import { globalConfig } from '../config/config'
import { PreferencesStorage } from './data/preference/preferences'
import { BreakpointType, MobileProvider } from './lib/mobile/mobile'
import { InitialWindowSizeProvider, useWindowSize } from './lib/util/responsive'
import { SnackbarProvider } from './lib/snackbar/snackbar'
import { SwitchableLanguageProvider } from './lib/i18n/SwitchableLanguage'

localforage.config({
	name: globalConfig.appPrefix
})

const root = createRoot(document.getElementById('root')!)

function determineBreakpoint(width: number) {
	let breakpointType: BreakpointType = 'large'
	if(width < 1200) {
		breakpointType = 'medium'
		if(width < 600) {
			breakpointType = 'small'
		}
	}
	return breakpointType
}

function AppRoot({
	defaultDarkMode,
	defaultLanguage
}: {
	defaultDarkMode: boolean,
	defaultLanguage: string
}) {
	// 这里界面布局的选择不采用响应式设计，因为很难避免窗口大小改变时丢失状态。
	const width = window.innerWidth
	const height = window.innerHeight
	const breakpointType = determineBreakpoint(width)
	
	return (
		<SwitchableLanguageProvider defaultValue={defaultLanguage}>
			<DarkModeProvider defaultValue={defaultDarkMode}>
				<CssBaseline />
				<SnackbarProvider>
					<InitialWindowSizeProvider value={[width, height]}>
						<MobileProvider value={breakpointType}>
							{ breakpointType == 'small' ?
							<AppMobile /> :
							<AppDesktop /> }
						</MobileProvider>
					</InitialWindowSizeProvider>
				</SnackbarProvider>
			</DarkModeProvider>
		</SwitchableLanguageProvider>
	)
}

function getDefaultLanguage() {
	switch(navigator.language) {
		case 'zh-CN':
			return 'zh_cn'
		case 'en-US':
			return 'en_us'
		default:
			return 'en_us'
	}
}

PreferencesStorage.initialize().then(() => {
	PreferencesStorage.getItem('darkmode', false).then((darkModeValue) => {
		PreferencesStorage.getItem('language', '').then((languageValue) => {
			if(languageValue == '') {
				languageValue = getDefaultLanguage()
			}
			root.render(
				<AppRoot defaultDarkMode={darkModeValue} defaultLanguage={languageValue} />
			)
		})
	})
})

// 有的用户大概需要 debug 一下本地数据存储，所以暴露 API（不过，后果自负）
Object.assign(window, { localforage })

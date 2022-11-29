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

const root = createRoot(document.getElementById('root')!)

const isMobileMode = window.innerWidth < 600;

// 这里界面布局的选择不采用响应式设计，因为很难避免窗口大小改变时丢失状态。
root.render(
	<I18nProvider languageKey='zh_cn'>
		<DarkModeProvider defaultValue={false}>
			<CssBaseline />
			{ isMobileMode ?
			<AppMobile /> :
			<AppDesktop /> }
		</DarkModeProvider>
	</I18nProvider>
)

// Object.assign(window, {
// 	rgb2hex, resolveColor, resolveAdaptiveColor, parseTags
// })

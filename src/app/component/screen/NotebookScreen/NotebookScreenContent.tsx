import { ConstructingPage } from '../../VoidPage/VoidPage'
import React from 'react'
import { NotebookConfigScreen } from './NotebookConfigScreen/NotebookConfigScreen'
import { Typography } from '@mui/material'
import { useI18n } from '../../../lib/i18n/i18n'
import { TypoBox } from '../../TypoBox/TypeBox'
import { SparksListScreen } from './SparksListScreen/SparksListScreen'

interface NotebookScreenContentProps {
	page: string
	categoryFilter: string | null
}
export function NotebookScreenContent({ page, categoryFilter, ...other }: NotebookScreenContentProps) {
	const LNG = useI18n()

	// 注：categoryFilter 仅用于 sparks 界面

	let configResetter = () => void(0) as void
	React.useEffect(() => {
		// 打开配置屏幕界面时重置输入状态
		configResetter()
	})
	
	if(page == 'config') {
		return <NotebookConfigScreen getResetter={(val) => configResetter = val} />
	}
	if(page == 'sparks') {
		return <SparksListScreen categoryFilter={categoryFilter} />
	}
	
	return <ConstructingPage desc={page} />
}

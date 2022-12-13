import { useNotebook } from '../../NavDrawer/NotebookContext'
import { TypoBox } from '../../TypoBox/TypeBox'
import { ConstructingPage, VoidPage } from '../../VoidPage/VoidPage'
import { useI18n } from '../../../lib/i18n/i18n'
import { useExtrawide, useMobile } from '../../../lib/mobile/mobile'
import React from 'react'
import * as Icons from 'react-icons/md'
import { BottomNavigation, BottomNavigationAction, Drawer, Toolbar, useTheme } from '@mui/material'
import subpages from './const/subpages'
import { useTitleSetter } from '../../../lib/util/dom'
import { NotebookScreenNormal } from './NotebookScreenNormal'
import { NotebookScreenExtrawide } from './NotebookScreenExtrawide'
import { NotebookScreenContent } from './NotebookScreenContent'

interface NotebookNavbarProps {
	value: string
	onChange?: (val: string) => void
	showLabels?: boolean
}
export function NotebookNavbar({ value, showLabels, onChange, ...other }: NotebookNavbarProps) {
	const LNG = useI18n()
	
	return <>
		<BottomNavigation showLabels={showLabels} sx={{width: '100%', flexShrink: 0}} value={value} onChange={(_, newValue) => onChange && onChange(newValue)}>
			{subpages.items.map((item) => {
				let label = LNG(subpages.i18nPrefix + item.key)
				return <BottomNavigationAction sx={{
					'>svg': {
						fontSize: '1.5rem'
					},
					minWidth: '0'
				}} key={item.key} label={label} icon={item.icon} value={item.key} />
			})}
		</BottomNavigation>
	</>
}

export function NotebookScreen(props: {desktopDrawerOpen: boolean}) {
	const notebook = useNotebook()
	const LNG = useI18n()
	const isExtrawide = useExtrawide()
	const setTitle = useTitleSetter()
	const isMobile = useMobile()

	const [ categoryFilter, setCategoryFilter ] = React.useState<string | null>(null)
	if(notebook) {
		const categoryTag = notebook.getCategoryTag()
		if(categoryFilter !== null && (!categoryTag || !categoryTag.values[categoryFilter])) {
			setCategoryFilter(null)
		}
	}

	function handleFilterChange(filter: string | null) {
		setCategoryFilter(filter)
	}

	if(notebook === null) {
		setTitle(LNG('title.idle', LNG('sparks')))
		return <VoidPage
			icon={<Icons.MdImportContacts />}
			title={LNG('notebook.void.title')}
			tips={isMobile ? LNG('notebook.void.tips.mobile') : LNG('notebook.void.tips.desktop')} />
	}

	setTitle(LNG('title.notebook', LNG('sparks'), notebook.name))
	const contentChildren = ((page: string, categoryFilter: string | null) => {
		return <NotebookScreenContent page={page} categoryFilter={categoryFilter} />
	})
	return isExtrawide ?
		<NotebookScreenExtrawide children={contentChildren} categoryFilter={categoryFilter} onFilterChange={handleFilterChange} /> :
		<NotebookScreenNormal desktopDrawerOpen={props.desktopDrawerOpen} categoryFilter={categoryFilter} onFilterChange={handleFilterChange} children={contentChildren} />
}

import { Drawer, Toolbar, Divider, Paper, useThemeProps, useTheme, Box, Tabs, Tab } from '@mui/material'
import React from 'react'
import * as Icons from 'react-icons/md'
import { TagItem } from '../../../data/tag/tag'
import { useI18n } from '../../../lib/i18n/i18n'
import { useMobile } from '../../../lib/mobile/mobile'
import { iterateMap } from '../../../lib/util/array'
import { TestSpaceFill } from '../../../test/SpaceFill'
import { useAppbarBackground } from '../../alert/PopupScreen'
import { useNotebook } from '../../NavDrawer/NotebookContext'
import { NotebookNavbar } from './NotebookScreen'
import { NotebookScreenContent } from './NotebookScreenContent'

interface SparkCategoryTabsProps {
	categoryTag: TagItem
	value: string | null
	onChange: (_: string | null) => void
	appbarLike?: boolean
}
/**
 * 卡片内容筛选标签
 */
export function SparkCategoryTabs({ categoryTag, value, onChange, appbarLike }: SparkCategoryTabsProps) {
	const LNG = useI18n()
	const appbarColor = useAppbarBackground()

	return <>
		<Tabs value={value ?? ''} onChange={(_, value) => onChange(value == '' ? null : value)} variant='scrollable'
			{...appbarLike && {
				sx: {
					backgroundColor: appbarColor
				}
			}}
		>
			<Tab value='' label={LNG('notebook.category.all')} />
			{iterateMap(categoryTag.values, (value) => {
				const isSpecial = value.type != 'value'
				let label = value.label ?? value.name
				if(isSpecial) {
					if(value.type == 'void') {
						label = LNG('notebook.category.void')
					} else {
						label = LNG('notebook.category.default')
					}
				}
				return <Tab key={value.name} value={value.name} label={label} />
			})}
		</Tabs>
		<Divider />
	</>
}

export function NotebookScreenNormal({ children, desktopDrawerOpen, categoryFilter, onFilterChange, ...other }: {
	children: (page: string, category: string | null) => React.ReactNode,
	categoryFilter: string | null,
	onFilterChange: (_: string | null) => void,
	desktopDrawerOpen: boolean
}) {
	const drawerWidth = 250
	const isMobile = useMobile()
	const [ subpage, setSubpage ] = React.useState('sparks')
	const theme = useTheme()
	const notebook = useNotebook()!
	const LNG = useI18n()

	const categoryTag = notebook.getCategoryTag()

	return <>
		<Paper sx={{
			bottom: 0, left: desktopDrawerOpen ? 280 : 0, right: 0, position: 'fixed',
			transition: theme.transitions.create('left', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			...(desktopDrawerOpen && {
				transition: theme.transitions.create('left', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen
				}),
			}),
			zIndex: 1
		}} elevation={6}>
			<NotebookNavbar value={subpage} onChange={setSubpage} showLabels />
		</Paper>
		<Box sx={{
			overflowX: 'hidden',
			overflowY: 'hidden',
			width: '100%',
			height: 'calc(100% - 56px)'
		}}>
			{subpage == 'sparks' ? <>
				<Box sx={{height: '100%', overflowY: 'hidden', display: 'flex', flexDirection: 'column'}}>
					{categoryTag && <>
						<SparkCategoryTabs categoryTag={categoryTag} value={categoryFilter} onChange={(val) => onFilterChange(val)} />
					</>}
					<Box sx={{overflowY: 'hidden', overflowX: 'hidden', flex: 'auto'}}>
						{children(subpage, categoryFilter)}
					</Box>
				</Box>
			</> : <>
				{children(subpage, categoryFilter)}
			</>}
		</Box>
	</>
}

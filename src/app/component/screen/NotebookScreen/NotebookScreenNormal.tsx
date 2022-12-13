import { Drawer, Toolbar, Divider, Paper, useThemeProps, useTheme, Box, Tabs, Tab } from '@mui/material'
import React from 'react'
import * as Icons from 'react-icons/md'
import { useI18n } from '../../../lib/i18n/i18n'
import { useMobile } from '../../../lib/mobile/mobile'
import { iterateMap } from '../../../lib/util/array'
import { TestSpaceFill } from '../../../test/SpaceFill'
import { useNotebook } from '../../NavDrawer/NotebookContext'
import { NotebookNavbar } from './NotebookScreen'
import { NotebookScreenContent } from './NotebookScreenContent'

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
			})
		}} elevation={3}>
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
						<Tabs value={categoryFilter ?? ''} onChange={(_, value) => onFilterChange(value == '' ? null : value)} variant='scrollable'>
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

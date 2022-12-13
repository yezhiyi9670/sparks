import { Drawer, Toolbar, Divider, Grid, Box, Typography, Menu, List } from '@mui/material'
import { ConstructingPage, ConstructingPageSecret, VoidPage } from '../../VoidPage/VoidPage'
import React from 'react'
import * as Icons from 'react-icons/md'
import { createUseStyles } from 'react-jss'
import { NotebookNavbar } from './NotebookScreen'
import { NotebookScreenContent } from './NotebookScreenContent'
import { TestSpaceFill, TestSpaceFillTwo } from '../../../test/SpaceFill'
import { TagsPreview } from './NotebookConfigScreen/TagsPreview'
import { useNotebook } from '../../NavDrawer/NotebookContext'
import { useI18n } from '../../../lib/i18n/i18n'
import { NavItem } from '../../NavDrawer/NavDrawer'
import { iterateMap } from '../../../lib/util/array'
import { HorizontalCut } from '../../../lib/util/responsive'

const useStyles = createUseStyles({
	ScreenContainer: {
		height: '100%'
	},
	ScreenContent: {
		height: '100%',
		paddingRight: '250px'
	}
})

export function NotebookScreenExtrawide({ children, categoryFilter, onFilterChange }: {
	categoryFilter: string | null
	onFilterChange: (_: string | null) => void,
	children: (page: string, categoryFilter: string | null) => React.ReactNode
}) {
	const drawerWidth = 250
	const [ subpage, setSubpage ] = React.useState('sparks')
	const classes = useStyles()
	const notebook = useNotebook()
	const LNG = useI18n()

	const categoryTag = notebook!.getCategoryTag()

	return <>
		<div className={classes.ScreenContent}>
			<HorizontalCut value={drawerWidth}>
				{children(subpage, categoryFilter)}
			</HorizontalCut>
		</div>
		<Drawer
			variant='permanent'
			anchor='right'
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				display: 'flex',
				flexDirection: 'column',
				overflowY: 'hidden'
			}}
		>
			<Toolbar />
			<NotebookNavbar value={subpage} onChange={setSubpage} showLabels />
			<Divider />
			<Box sx={{flex: 'auto', overflowY: 'hidden', overflowX: 'hidden'}}>
				{subpage == 'config' && <Box sx={{height: '100%', overflowY: 'auto', padding: '16px'}}>
					<Typography variant='body2' gutterBottom>{LNG('notebook.overview.name', notebook!.name)}</Typography>
					<Typography variant='body2' gutterBottom>{LNG('notebook.overview.alias', notebook!.alias)}</Typography>
					<TagsPreview tags={notebook!.tags.tags} noneText={LNG('notebook.overview.tag.none')} />
				</Box>}
				{subpage == 'media' && <>
					<ConstructingPageSecret desc='' />
				</>}
				{subpage == 'tree' && <>
					<ConstructingPage desc='' />
				</>}
				{/* 卡片界面右侧放置分类目录筛选器 */}
				{subpage == 'sparks' && <>
					{categoryTag ? <Box sx={{height: '100%', overflowY: 'auto'}}>
						<List>
							<NavItem text={LNG('notebook.category.all')} icon={<Icons.MdFolderSpecial />} selected={categoryFilter === null} onClick={() => onFilterChange(null)} />
							<>
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
									const icon = isSpecial ? <Icons.MdFolderOpen /> : <Icons.MdFolder />
									return <NavItem key={value.name} text={label} icon={icon} selected={categoryFilter == value.name} onClick={() => onFilterChange(value.name)} />
								})}
							</>
						</List>
					</Box> : <>
						<VoidPage icon={<Icons.MdFolder />} title={LNG('notebook.nocate.title')} tips={LNG('notebook.nocate.tips')} />
					</>}
				</>}
			</Box>
		</Drawer>
	</>
}

import { Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useI18n } from '../../../../lib/i18n/i18n'
import { useWideEditor } from '../../../../lib/util/responsive'
import { useAppbarBackground } from '../../../alert/PopupScreen'
import { FlowGridCard, FlowGridEnd, FlowGridGrid, FlowGridItem, FlowGridLeft, FlowGridScrollRoot, FlowGridSide } from '../../../FlowGrid/FlowGrid'
import { TitleToolbar } from '../../../Toolbar/Toolbar'
import { TypoBox } from '../../../TypoBox/TypeBox'

interface SparkEditGridProps {
	titleInput: React.ReactNode
	desktopEditor: React.ReactNode
	mobileEditor: [React.ReactNode, React.ReactNode]
	alias: React.ReactNode
	desc: React.ReactNode
	meta: React.ReactNode
	basicInfo: React.ReactNode
	tagging: React.ReactNode
	origin: React.ReactNode
	onCtrlS?: () => void
}
export function SparkEditGrid(props: SparkEditGridProps) {
	const wideEditor = useWideEditor()

	if(wideEditor) {
		return <SparkEditGridDesktop {...props} />
	} else {
		return <SparkEditGridMobile {...props} />
	}
}

export function SparkEditGridMobile(frags: SparkEditGridProps) {
	const [ page, setPage ] = React.useState('view')
	const LNG = useI18n()
	const tabsBackground = useAppbarBackground()

	return <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
		<Box>
			<Tabs
				sx={{backgroundColor: tabsBackground}}
				variant='fullWidth'
				value={page}
				onChange={(_, val: string) => setPage(val)}
			>
				{['view', 'edit', 'props'].map((key) => (
					<Tab key={key} value={key}
						label={LNG('spark.tab.' + key)} />
				))}
			</Tabs>
		</Box>
		<Box sx={{flex: 'auto', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
			{page == 'view' && frags.mobileEditor[1]}
			{page == 'edit' && frags.mobileEditor[0]}
			{page == 'props' && <TypoBox>
				{frags.titleInput}
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.alias')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.alias}
				</Typography>
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.desc')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.desc}
				</Typography>
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.info')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.basicInfo}
				</Typography>
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.tagging')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.tagging}
				</Typography>
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.origin')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.origin}
				</Typography>
				<Typography variant='h6' gutterBottom mt={2}>
					{LNG('spark.section.meta')}
				</Typography>
				<Typography variant='body1' gutterBottom component='div'>
					{frags.meta}
				</Typography>
			</TypoBox>}
		</Box>
	</Box>
}

function GridItem(props: {
	height?: string,
	title?: string,
	padding?: string | number,
	children: React.ReactNode,
	allowOverflow?: boolean,
	noShadow?: boolean
}) {
	return <FlowGridItem height={props.height ?? 'unset'} gutterBottom>
		<FlowGridCard allowOverflow={props.allowOverflow} noShadow={props.noShadow}>
			{props.title && <TitleToolbar>
				{props.title}
			</TitleToolbar>}
			<Box sx={{height: '100%', padding: props.padding}}>
				{props.children}
			</Box>
		</FlowGridCard>
	</FlowGridItem>
}

export function SparkEditGridDesktop(frags: SparkEditGridProps) {
	const LNG = useI18n()

	function handleKeyDown(evt: React.KeyboardEvent) {
		if(evt.ctrlKey && evt.key == 's') {
			if(frags.onCtrlS) {
				evt.preventDefault()
				frags.onCtrlS()
			}
		}
	}

	return (
		<FlowGridScrollRoot scrollable>
			<div style={{height: '100%'}} onKeyDown={handleKeyDown}>
				<FlowGridGrid>
					<FlowGridLeft>
						<GridItem allowOverflow noShadow>
							{frags.titleInput}
						</GridItem>
						<GridItem height='calc(100% - 106px)'>
							{frags.desktopEditor}
						</GridItem>
						<GridItem title={LNG('spark.section.alias')} padding='12px'>
							{frags.alias}
						</GridItem>
						<GridItem title={LNG('spark.section.desc')} padding='12px'>
							{frags.desc}
						</GridItem>
						<GridItem title={LNG('spark.section.meta')} padding='12px'>
							{frags.meta}
						</GridItem>
						<FlowGridEnd />
					</FlowGridLeft>
					<FlowGridSide>
						<GridItem title={LNG('spark.section.info')} padding='12px'>
							{frags.basicInfo}
						</GridItem>
						<GridItem title={LNG('spark.section.tagging')} padding='12px'>
							{frags.tagging}
						</GridItem>
						<GridItem title={LNG('spark.section.origin')} padding='12px'>
							{frags.origin}
						</GridItem>
						<FlowGridEnd />
					</FlowGridSide>
				</FlowGridGrid>
			</div>
		</FlowGridScrollRoot>
	)
}

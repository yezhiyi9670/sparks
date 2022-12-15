import React from 'react'
import { useInitialWindowSize, useWideEditor, useWindowSize } from '../../../../lib/util/responsive'
import { createUseStyles } from 'react-jss'
import { Box, Grid, Tabs, Tab, Divider, Paper } from '@mui/material'
import { TestSpaceFill } from '../../../../test/SpaceFill'
import { useI18n } from '../../../../lib/i18n/i18n'
import { useAppbarBackground } from '../../../alert/PopupScreen'

interface NotebookTagEditGridProps {
	editor: React.ReactNode
	previewer: React.ReactNode
}
export function NotebookTagEditGrid(props: NotebookTagEditGridProps) {
	const wideEditor = useWideEditor()

	if(wideEditor) {
		return <NotebookTagEditGridDesktop {...props} />
	} else {
		return <NotebookTagEditGridMobile {...props} />
	}
}

function GridCard({ children, notFull }: {children: React.ReactNode, notFull?: boolean}) {
	return <Paper elevation={3} sx={{
		display: 'flex',
		flexDirection: 'column',
		[notFull ? 'maxHeight' : 'height']: '100%',
		borderRadius: '6px',
		overflow: 'hidden'
	}}>{children}</Paper>
}

export function NotebookTagEditGridMobile({ editor, previewer }: NotebookTagEditGridProps) {
	const [ page, setPage ] = React.useState('editor')
	const LNG = useI18n()
	const tabsBackground = useAppbarBackground()

	return <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
		<Box>
			<Tabs sx={{backgroundColor: tabsBackground}} variant='fullWidth' value={page} onChange={(_, val: string) => setPage(val)}>
				<Tab value='editor' label={LNG('notebook.tag.tab.editor')} />
				<Tab value='preview' label={LNG('notebook.tag.tab.preview')} />
			</Tabs>
		</Box>
		<Box sx={{flex: 'auto', display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
			{page == 'editor' && editor}
			{page == 'preview' && previewer}
		</Box>
	</Box>
}

export function NotebookTagEditGridDesktop({ editor, previewer }: NotebookTagEditGridProps) {
	return (
		<Grid sx={{height: '100%', maxWidth: '1550px', margin: '0 auto'}} container>
			<Box sx={{height: '100%', flexGrow: 1, padding: '20px', paddingRight: '12px'}}>
				<GridCard>
					{editor}
				</GridCard>
			</Box>
			<Box sx={{height: '100%', width: '304px', padding: '20px', paddingLeft: '12px'}}>
				<GridCard notFull>
					{previewer}
				</GridCard>
			</Box>
		</Grid>
	)
}

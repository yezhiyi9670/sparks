import React from 'react'
import { ConstructingPage, NothingPage } from '../../../VoidPage/VoidPage'
import * as Icons from 'react-icons/md'
import { Box, Fab, Grid, Paper } from '@mui/material'
import { ConfirmDialog, FormDialog } from '../../../FormDialog/FormDialog'
import { useI18n } from '../../../../lib/i18n/i18n'
import { isValidAlias } from '../../../../lib/util/string'
import { SparkEntity, SparkEntityFactory } from '../../../../data/spark/spark-entity'
import { dateDisplayString } from '../../../../lib/util/date'
import { TestSpaceFillTwo } from '../../../../test/SpaceFill'
import { useNotebook, useNotebookUpdater } from '../../../NavDrawer/NotebookContext'
import { useHorizontalCut, useWindowSize } from '../../../../lib/util/responsive'
import { useExtrawide, useMobile } from '../../../../lib/mobile/mobile'
import { SparksGrid } from './SparksGrid'
import { useOnceEffect } from '../../../../lib/util/event'
import { SparkProvider } from './SparkContext'
import { SparkEditor } from './SparkEditor'
import { randomToken } from '../../../../lib/util/random'

interface SparksListScreenProps {
	categoryFilter: string | null
}
/**
 * 笔记本主界面上的卡片列表
 */
export function SparksListScreen({
	categoryFilter
}: SparksListScreenProps) {
	const LNG = useI18n()
	const notebook = useNotebook()!
	const updateNotebook = useNotebookUpdater()
	const isMobile = useMobile()
	const isExtrawide = useExtrawide()
	const pagePadding = isMobile ? 16 : (isExtrawide ? 32 : 24)
	const horizontalCut = useHorizontalCut() + 2 * pagePadding
	const viewWidth = useWindowSize()[0] - horizontalCut
	const minColWidth = 300
	const gridColumns = Math.max(1, Math.floor(viewWidth / minColWidth))

	const [ selectedSpark, setSelectedSpark ] = React.useState<SparkEntity | null>(null)

	const categoryTag = notebook.getCategoryTag()
	let filteredList = notebook.sparks.entries
	if(categoryTag && categoryFilter) {
		filteredList = filteredList.filter((spark) => {
			return categoryFilter == new SparkEntity(spark).getTagValue(categoryTag)[0]
		})
	}

	let setNewDialogOpen = (open: boolean) => void(0) as void

	async function handleNewSpark(values: {[_: string]: string}) {
		const { alias, ctime: ctimeString } = values
		const ctime = new Date(ctimeString)
		if(toCopySpark === null) {
			if(notebook.existSpark(alias)) {
				return LNG('spark.create.error.occupied')
			}
			notebook.createSpark(alias, ctime)
			try {
				await notebook.writeData()
			} catch(err: unknown) {
				return LNG('ui.local_write_error')
			}
			handleSelect(notebook.getSparkEntity(alias)!)
			updateNotebook()
			return null
		} else {
			const newAlias = alias
			if(notebook.existSpark(newAlias)) {
				return LNG('spark.create.error.occupied')
			}
			const current = toCopySpark.copy(newAlias)
			notebook.writeSpark(newAlias, current)
			try {
				await notebook.writeData()
			} catch(err: unknown) {
				return LNG('ui.local_write_error')
			}
			handleSelect(current)
			updateNotebook()
			return null
		}
	}

	/* 新建/复制卡片对话框 */
	let [ toCopySpark, setToCopySpark ] = React.useState<SparkEntity | null>(null)
	const newSparkDialog = <>
		<FormDialog
			title={toCopySpark ? LNG('spark.create.title.copy') : LNG('spark.create.title')}
			preText={<>
				{LNG('spark.create.tips.unsync')}<br />
				{LNG('spark.create.help.alias')}
			</>}
			postText={(values) => {
				const date = new Date(values['ctime'])
				return LNG('spark.create.finaltips', dateDisplayString(date))
			}}
			cancelText={LNG('spark.create.cancel')}
			confirmText={LNG('spark.create.confirm')}
			getSetOpen={(func) => {setNewDialogOpen = func}}
			fields={[
				{
					id: 'alias',
					label: LNG('spark.create.field.alias'),
					validator: (value) => isValidAlias(value) ? null : LNG('spark.create.error.alias'),
					initialValue: () => {
						if(null === toCopySpark) {
							return SparkEntityFactory.randomAlias()
						}
						return toCopySpark.alias + '-copy-' + randomToken(4)
					},
					autoFocus: true
				}, {
					id: 'ctime',
					label: LNG('spark.create.field.ctime'),
					validator: (value) => {
						if(isNaN(new Date(value).getDate())) {
							return LNG('spark.create.error.ctime')
						}
						return null
					},
					initialValue: () => {
						const curr = new Date()
						return dateDisplayString(curr)
					}
				}
			]}
			onConfirm={handleNewSpark}
		/>
	</>
	let setDeleteDialogOpen = (_: boolean) => void(0) as void
	/* 删除对话框 */
	const deleteDialog = <ConfirmDialog
		title={LNG('spark.delete.title')}
		text={<>
			{LNG('spark.delete.tips.1', selectedSpark?.getDisplayTitle(LNG) ?? '')}<br />
			{LNG('spark.delete.tips.2', selectedSpark?.getDisplayTitle(LNG) ?? '')}
		</>}
		cancelText={LNG('spark.delete.cancel')}
		confirmText={LNG('spark.delete.confirm')}
		onConfirm={async () => {
			notebook.deleteSpark(selectedSpark?.alias ?? '')
			try {
				await notebook.writeData()
			} catch(err: unknown) {
				return LNG('ui.local_write_error')
			}
			updateNotebook()
			return null
		}}
		getSetOpen={(val) => setDeleteDialogOpen = val}
	/>
	/* 编辑器 */
	let openEditor = (_: SparkEntity) => void(0) as void
	const editor = (
		<SparkProvider value={selectedSpark}>
			<SparkEditor getOpener={(val) => openEditor = val} />
		</SparkProvider>
	)

	async function handleAction(spark: SparkEntity, action: 'delete' | 'clone' | 'remove') {
		if(action == 'delete') {
			setDeleteDialogOpen(true)
			setSelectedSpark(spark)
		}
		if(action == 'clone') {
			setToCopySpark(spark)
			toCopySpark = spark
			setNewDialogOpen(true)
		}
	}
	function handleSelect(spark: SparkEntity) {
		setSelectedSpark(spark)
		openEditor(spark)
	}

	return <Box sx={{height: '100%', position: 'relative'}}>
		<Fab
			color='primary'
			aria-label='add'
			sx={{position: 'absolute', right: '24px', bottom: '24px'}}
			onClick={() => {setToCopySpark(null); toCopySpark = null; setNewDialogOpen(true)}}
		>
			<Icons.MdAdd fontSize='1.5rem' />
		</Fab>
		{filteredList.length > 0 ? <Box sx={{height: '100%', overflowY: 'auto', padding: pagePadding + 'px', paddingBottom: '96px'}}>
			<Grid container spacing={isMobile ? 2 : 3} columns={gridColumns}>
				<SparksGrid allowActions onAction={handleAction} onSelect={handleSelect} {...{ filteredList }} />
			</Grid>
		</Box> : <NothingPage />}
		{newSparkDialog}
		{deleteDialog}
		{editor}
	</Box>
}

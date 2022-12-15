import { LoadingButton } from '@mui/lab'
import { Box, Button, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { key } from 'localforage'
import React from 'react'
import { SparkEntity, SparkEntityFactory } from '../../../../data/spark/spark-entity'
import { useI18n } from '../../../../lib/i18n/i18n'
import { useMobile } from '../../../../lib/mobile/mobile'
import { useSnackbar } from '../../../../lib/snackbar/snackbar'
import { useWindowSize } from '../../../../lib/util/responsive'
import { isValidAlias } from '../../../../lib/util/string'
import { PopupSelectScreenWithAppbar, useAppbarBackground } from '../../../alert/PopupScreen'
import { FormTextField } from '../../../FormDialog/FormDialog'
import { useNotebook } from '../../../NavDrawer/NotebookContext'
import { NothingPage } from '../../../VoidPage/VoidPage'
import { SparkCategoryTabs } from '../NotebookScreenNormal'
import { SparksGrid } from './SparksGrid'
import * as Icons from 'react-icons/md'

interface SparkSelectScreenProps {
	getOpener: (opener: () => void) => void
	title: string
	onSelect?: (spark: SparkEntity) => Promise<string | null>
	allowExtern?: boolean
}
/**
 * 卡片选择屏幕
 */
export function SparkSelectScreen({ getOpener, title, onSelect, allowExtern }: SparkSelectScreenProps) {
	const [ open, setOpen ] = React.useState(false)
	const [ renderOpen, setRenderOpen ] = React.useState(false)
	const [ renderCloseT, setRenderCloseT ] = React.useState(0)

	const screenWidth = useWindowSize()[0]
	const isMobile = useMobile()
	const windowWidth = isMobile ? screenWidth : Math.min(1200, screenWidth - 144)
	const cardMinWidth = 300
	const columns = Math.max(1, Math.floor(windowWidth / cardMinWidth))
	const notebook = useNotebook()!
	const showSnackbar = useSnackbar()
	const LNG = useI18n()

	const [ categoryFilter, setCategoryFilter ] = React.useState<string | null>(null)
	const categoryTag = notebook.getCategoryTag()

	async function handleSelect(spark: SparkEntity) {
		let result: string | null = null
		if(onSelect) {
			result = await onSelect(spark)
		}
		if(result !== null) {
			showSnackbar('error', result)
		} else {
			setOpen(false)
		}
	}
	
	function setClose() {
		setOpen(false)
		setRenderCloseT(setTimeout(() => setRenderOpen(false), 1000))
	}

	getOpener(() => {
		setOpen(true)
		setRenderOpen(true)
		clearInterval(renderCloseT)
	})
	
	const acceptExtern = allowExtern && categoryTag && categoryTag.externValue && categoryTag.externValue == categoryFilter
	const [ customAlias, setCustomAlias ] = React.useState('')
	const customAliasPass = isValidAlias(customAlias)

	function handleEnterConfirm() {
		const spark = notebook.existSpark(customAlias) ? (
			notebook.getSparkEntity(customAlias)!
		) : (
			SparkEntityFactory.createFake(customAlias, LNG)
		)
		handleSelect(spark)
	}
	function handleCustomAliasKeyDown(evt: React.KeyboardEvent) {
		if(evt.key == 'Enter') {
			if(customAliasPass) {
				handleEnterConfirm()
			}
		}
	}


	const filteredList = renderOpen ? notebook.sparks.entries.filter((item) => {
		if(categoryFilter === null || categoryTag === null) {
			return true
		}
		return (new SparkEntity(item)).getTagValue(categoryTag)[0] == categoryFilter
	}) : []

	return <>
		<PopupSelectScreenWithAppbar open={open} onClose={() => setClose()} title={title}>
			{renderOpen && <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
				{categoryTag && <Box>
					{/* TODO[yezhiyi9670]: 桌面端 Tabs 溢出了该怎么办？ */}
					<SparkCategoryTabs appbarLike={isMobile} categoryTag={categoryTag} value={categoryFilter} onChange={(val) => setCategoryFilter(val)} />
				</Box>}
				<Box sx={{flex: 'auto', overflowY: 'auto', padding: isMobile ? '16px' : '24px'}}>
					{acceptExtern && <>
						<Typography variant='body1' component='div' pb={2}>
							<FormTextField
								id='alias'
								label=''
								placeholder={LNG('ref.nx.tips')}
								value={customAlias}
								onChange={(val) => setCustomAlias(val)}
								size='small'
								sx={{width: '100%'}}
								validator={(val) => isValidAlias(val) ? null : ''}
								onKeyUp={handleCustomAliasKeyDown}
								InputProps={{
									endAdornment: <InputAdornment position="end">
										<IconButton
											onClick={() => handleEnterConfirm()}
											edge="end"
											disabled={!customAliasPass}
										>
											<Icons.MdCheck />
										</IconButton>
									</InputAdornment>
								}}
							/>
						</Typography>
					</>}
					{(filteredList.length != 0 || acceptExtern) ? <Grid container columns={columns} spacing={isMobile ? 2 : 3}>
						<SparksGrid filteredList={filteredList} onSelect={handleSelect} />
					</Grid> : <NothingPage />}
				</Box>
			</Box>}
		</PopupSelectScreenWithAppbar>
	</>
}

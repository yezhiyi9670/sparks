import { Box, ButtonBase, Chip, Grid, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material'
import React from 'react'
import { Spark } from '../../../../data/spark/spark'
import { SparkEntity } from '../../../../data/spark/spark-entity'
import { TagRenderer, tagRenderText } from '../../../../data/tag/tag'
import { useI18n } from '../../../../lib/i18n/i18n'
import { iterateMap } from '../../../../lib/util/array'
import { dateDisplayString } from '../../../../lib/util/date'
import { useNotebook } from '../../../NavDrawer/NotebookContext'
import * as Icons from 'react-icons/md'
import { bindMenu, bindTrigger } from 'material-ui-popup-state/core'
import PopupState from 'material-ui-popup-state'
import { NotebookEntity } from '../../../../data/notebook/notebook-entity'

interface SparksGridProps {
	filteredList: Spark[]
	allowActions?: boolean
	allowRemove?: boolean
	onSelect?: (spark: SparkEntity) => void
	onAction?: (spark: SparkEntity, action: 'delete' | 'clone' | 'remove') => void
}
/**
 * 当前笔记本的卡片网格
 */
export function SparksGrid({ filteredList, allowActions, onSelect, allowRemove, onAction }: SparksGridProps) {
	const notebook = useNotebook()!
	const LNG = useI18n()

	return <>
		{filteredList.map((spark) => {
			const entity = new SparkEntity(spark)

			return <Grid item key={spark.alias} xs={1}>
				<Box>
					<SparkCard notebook={notebook} spark={entity} allowActions={allowActions} allowRemove={allowRemove} onAction={onAction} onSelect={onSelect} />
				</Box>
			</Grid>
		})}
	</>
}

interface SparkCardProps {
	notebook: NotebookEntity
	spark: SparkEntity
	allowActions?: boolean
	allowRemove?: boolean
	onAction?: (spark: SparkEntity, action: 'delete' | 'clone' | 'remove') => void
	onSelect?: (spark: SparkEntity) => void
}
/**
 * 卡片项目
 */
export function SparkCard({ notebook, spark, allowActions, onAction, allowRemove, onSelect }: SparkCardProps) {
	const LNG = useI18n()

	const title = spark.getDisplayTitle(LNG)
	const desc = spark.getDisplayDesc(LNG)
	const cutoffStyle = {whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}

	function handleAction(spark: Spark, action: 'delete' | 'clone' | 'remove') {
		if(onAction) {
			onAction(new SparkEntity(spark), action)
		}
	}

	return (
		<ButtonBase sx={{
			textAlign: 'left',
			width: '100%',
			display: 'block'
		}} component='div' onClick={(evt: React.MouseEvent<HTMLElement>) => {
			const classList = (evt.target as any).classList
			if(classList.contains('MuiBackdrop-root') || classList.contains('MuiMenuItem-root')) {
				return
			}
			if(onSelect) {
				onSelect(new SparkEntity(spark))
			}
		}}>
			<Paper elevation={3} sx={{
				padding: '12px',
				// '&:hover': {
				// 	boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
				// 	cursor: 'pointer'
				// }
			}}>
				{/* 标题 */}
				<Typography variant='body1' gutterBottom sx={{...cutoffStyle, ...(spark.isFake ? {opacity: 0.6} : {})}}>
					{title}
				</Typography>
				{/* 分类目录与描述 */}
				<Typography variant='body2' gutterBottom sx={Object.assign({}, cutoffStyle, {opacity: 0.6})}>
					{spark.getDisplayCategory(LNG, notebook)} · {desc}
				</Typography>
				{/* 标签与操作按钮 */}
				<Typography variant='body2' component='div' sx={{display: 'flex'}} mt={1}>
					{/* 标签 */}
					<Box sx={Object.assign({}, cutoffStyle, {flex: 'auto', color: 'transparent'})}>
						<SparkTagsRenderer spark={spark} notebook={notebook} fallback={
							<span style={{opacity: 0.6}}>
								<Chip
									size='small'
									variant='outlined'
									label={dateDisplayString(new Date(spark.ctime))}
								/>
							</span>
						} />
					</Box>
					{/* 操作按钮 */}
					{allowActions && <PopupState variant='popover'>
						{(popupState) => {
							const { onClick, ...otherTrigger } = bindTrigger(popupState)
							return <>
								<IconButton size='small' sx={{
									transform: 'translateY(-1px)'
								}} onMouseDown={(evt) => evt.stopPropagation()} onClick={(evt) => {
									evt.stopPropagation()
									onClick(evt)
								}} {...otherTrigger}>
									<Icons.MdMoreHoriz fontSize={15} style={{
										transform: 'scale(1.35)'
									}} />
								</IconButton>
								<Menu {...bindMenu(popupState)}>
									<MenuItem onClick={() => {popupState.close(); handleAction(spark, 'clone')}}>{LNG('spark.action.clone')}</MenuItem>
									<MenuItem onClick={() => {popupState.close(); handleAction(spark, 'delete')}}>{LNG('spark.action.delete')}</MenuItem>
								</Menu>
							</>
						}}
					</PopupState>}
					{allowRemove && (
						<IconButton size='small' sx={{
							transform: 'translateY(-1px)'
						}} onMouseDown={(evt) => evt.stopPropagation()} onClick={(evt) => {
							evt.stopPropagation()
							handleAction(spark, 'remove')
						}}>
							<Icons.MdClose fontSize={15} style={{
								transform: 'scale(1.35)'
							}} />
						</IconButton>
					)}
				</Typography>
			</Paper>
		</ButtonBase>
	)
}

interface SparkTagsRendererProps {
	spark: SparkEntity
	notebook: NotebookEntity
	fallback?: React.ReactNode
	tagValues?: {[_: string]: string[]}
	multiline?: boolean
}
/**
 * 卡片全部标签渲染
 */
export function SparkTagsRenderer({ spark, notebook, fallback, tagValues, multiline }: SparkTagsRendererProps) {
	let renderedTagCount = 0
	iterateMap(notebook.tags.tags, (tag) => {
		if(tag.type == 'category') {
			return
		}
		renderedTagCount += tagRenderText(notebook.tags.tags, tag.name, spark.getTagValue(tag, tagValues)).length
	})

	return <>
		{renderedTagCount ? iterateMap(notebook.tags.tags, (tag) => {
			if(tag.type == 'category') {
				return null
			}
			return <TagRenderer key={tag.name} tags={notebook.tags.tags} tagName={tag.name} values={spark.getTagValue(tag, tagValues)} sx={{
				marginRight: '4px',
				...(multiline ? {
					marginBottom: '4px'
				} : {})
			}} />
		}) : fallback}
	</>
}

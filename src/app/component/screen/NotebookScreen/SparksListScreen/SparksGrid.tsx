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

interface SparksGridProps {
	filteredList: Spark[]
	allowActions?: boolean
	onSelect?: (spark: SparkEntity) => void
	onAction?: (spark: SparkEntity, action: 'delete' | 'clone') => void
}
/**
 * 当前笔记本的卡片网格
 */
export function SparksGrid({ filteredList, allowActions, onSelect, onAction }: SparksGridProps) {
	const notebook = useNotebook()!
	const LNG = useI18n()

	const categoryTag = notebook.getCategoryTag()

	function handleAction(spark: Spark, action: 'delete' | 'clone') {
		if(onAction) {
			onAction(new SparkEntity(spark), action)
		}
	}

	return <>
		{filteredList.map((spark) => {
			const entity = new SparkEntity(spark)
			const title = entity.getDisplayTitle(LNG)
			const desc = entity.getDisplayDesc(LNG)
			const cutoffStyle = {whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis'}

			let renderedTagCount = 0
			iterateMap(notebook.tags.tags, (tag) => {
				if(tag.type == 'category') {
					return
				}
				renderedTagCount += tagRenderText(notebook.tags.tags, tag.name, entity.getTagValue(tag)).length
			})
			
			let categoryLabel = LNG('notebook.category.default')
			if(categoryTag) {
				const cateVal = categoryTag.values[entity.getTagValue(categoryTag)[0]]
				if(cateVal.type == 'void') {
					categoryLabel = LNG('notebook.category.void')
				} else if(cateVal.type == 'value') {
					categoryLabel = cateVal.label ?? cateVal.name
				}
			}

			return <Grid item key={spark.alias} xs={1}>
				<Box>
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
							<Typography variant='body1' gutterBottom sx={cutoffStyle}>
								{title}
							</Typography>
							<Typography variant='body2' gutterBottom sx={Object.assign({}, cutoffStyle, {opacity: 0.6})}>
								{categoryLabel} · {desc}
							</Typography>
							<Typography variant='body2' component='div' sx={{display: 'flex'}} mt={1}>
								<Box sx={Object.assign({}, cutoffStyle, {flex: 'auto', color: 'transparent'})}>
									{renderedTagCount ? iterateMap(notebook.tags.tags, (tag) => {
										if(tag.type == 'category') {
											return null
										}
										return <TagRenderer key={tag.name} tags={notebook.tags.tags} tagName={tag.name} values={entity.getTagValue(tag)} sx={{
											marginRight: '4px'
										}} />
									}) : <span style={{opacity: 0.6}}>
										<Chip
											size='small'
											variant='outlined'
											label={dateDisplayString(new Date(spark.ctime))}
										/>
									</span>}
								</Box>
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
							</Typography>
						</Paper>
					</ButtonBase>
				</Box>
			</Grid>
		})}
	</>
}

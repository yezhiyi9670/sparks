import { Box, Chip, FormControl, InputLabel, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { NotebookEntity } from '../../../../../data/notebook/notebook-entity'
import { SparkEntity } from '../../../../../data/spark/spark-entity'
import { useI18n } from '../../../../../lib/i18n/i18n'
import { iterateMap } from '../../../../../lib/util/array'
import { Select } from '@mui/material'
import { TagItem } from '../../../../../data/tag/tag'

type TagDataValues = {[_: string]: string[]}
interface TagsEditorProps {
	notebook: NotebookEntity
	value: TagDataValues
	onChange: (values: TagDataValues) => void
}
/**
 * 选项式标签编辑窗口
 */
export function TagsEditor({ notebook, value, onChange }: TagsEditorProps) {
	const tags = notebook.tags.tags
	const LNG = useI18n()

	let hasAbnormalValues = false

	function handleChange(tag: TagItem, val: string[] | string) {
		if(tag.type == 'multitag') {
			value[tag.name] = val as string[]
		} else {
			if(val == '') {
				if(value[tag.name] !== undefined) {
					delete value[tag.name]
				}
			} else {
				value[tag.name] = [val as string]
			}
		}
		const newValue = Object.assign({}, value)
		onChange(newValue)
	}

	return <>
		{iterateMap(tags, (tag) => {
			let label = ''
			if(tag.label !== null) {
				label = tag.label
			} else {
				if(tag.type == 'category') {
					label = LNG('ste.label.category', tag.name)
				} else {
					label = LNG('ste.label.none', tag.name)
				}
			}

			const isMulti = tag.type == 'multitag'
			let selectedValue: string[] | string = ''
			if(!isMulti) {
				selectedValue = value[tag.name] ? value[tag.name][0] : ''
				if(selectedValue != '' && !tag.values[selectedValue]) {
					selectedValue = ''
					hasAbnormalValues = true
					delete value[tag.name]
				}
			} else {
				selectedValue = value[tag.name] ?? []
			}

			return <Typography key={tag.name} variant='body1' pt={1} pb={1} component='div'>
				<FormControl fullWidth>
					<InputLabel size='small' id={tag.name}>{label}</InputLabel>
					<Select
						labelId={tag.name}
						id={tag.name}
						value={selectedValue}
						label={label}
						multiple={isMulti}
						size='small'
						{...isMulti && {
							renderValue: (selected: string[] | string) => {
								return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
									{(selected as string[]).map((value) => {
										const item = tag.values[value]
										if(!item) {
											return null
										}
										let label = ''
										if(item.label !== null) {
											label = item.label
										} else {
											label = item.name
										}
										return <Chip key={value} label={label} size='small' />
									})}
								</Box>
							}
						}}
						onChange={(evt) => handleChange(tag, evt.target.value)}
					>
						{!isMulti && <MenuItem value={''}><em>{LNG('ste.value.none')}</em></MenuItem>}
						{iterateMap(tag.values, (item) => {
							let label = ''
							let isSpecial = false
							if(item.type == 'void') {
								isSpecial = true
								label = LNG('ste.value.void')
							} else if(item.type == 'default') {
								isSpecial = true
								label = tag.type == 'category' ? LNG('ste.value.default_category') : LNG('ste.value.default')
							} else {
								if(item.label !== null) {
									label = item.label
								} else {
									label = item.name
								}
							}

							return <MenuItem key={item.name} value={item.name}>
								{isSpecial ? <em>{label}</em> : label}
							</MenuItem>
						})}
					</Select>
				</FormControl>
			</Typography>
		})}
	</>

	if(hasAbnormalValues) {
		const newValue = Object.assign({}, value)
		onChange(newValue)
	}
}

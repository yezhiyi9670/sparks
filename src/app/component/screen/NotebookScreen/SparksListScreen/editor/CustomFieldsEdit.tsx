import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import { useI18n } from '../../../../../lib/i18n/i18n'
import { iterateMap } from '../../../../../lib/util/array'
import { randomToken } from '../../../../../lib/util/random'
import { FormDialog } from '../../../../FormDialog/FormDialog'
import * as Icons from 'react-icons/md'

type KeyValues = {[_: string]: string}

interface CustomFieldsEditProps {
	value: KeyValues
	onChange?: (val: KeyValues) => void
}
export function CustommFieldsEdit({ value, onChange }: CustomFieldsEditProps) {
	const LNG = useI18n()
	
	async function handleNewField(values: {[_: string]: string}) {
		let newField = values['key'] as string
		if(value[newField] !== undefined) {
			return LNG('cfe.add.error.exists')
		}
		const newValue = Object.assign({}, value, {[newField]: ''})
		if(onChange) {
			onChange(newValue)
		}
		return null
	}

	let openDialog = (_: boolean) => void(0) as void
	const dialog = <FormDialog
		title={LNG('cfe.add.title')}
		cancelText={LNG('cfe.add.cancel')}
		confirmText={LNG('cfe.add.confirm')}
		getSetOpen={(func) => openDialog = func}
		fields={[
			{
				id: 'key',
				label: LNG('cfe.add.field.name'),
				validator: (value) => value != '' ? null : '',
				initialValue: '',
				autoFocus: true
			}
		]}
		onConfirm={handleNewField}
		hideValid
	/>

	function handleDeleteField(key: string) {
		const newValue = Object.assign({}, value)
		delete newValue[key]
		if(onChange) {
			onChange(newValue)
		}
	}

	function handleChange(key: string, val: string) {
		const newValue = Object.assign({}, value, {[key]: val})
		if(onChange) {
			onChange(newValue)
		}
	}

	return <>
		{iterateMap(value, (val, key) => {
			return <Typography key={key} variant='body1' component='div' gutterBottom sx={{
				display: 'flex'
			}}>
				<TextField
					size='small'
					sx={{
						width: '100%'
					}}
					InputProps={{
						startAdornment: <InputAdornment position="start">{key + ':'}</InputAdornment>,
						endAdornment: <InputAdornment position="end">
							<IconButton
								onClick={() => handleDeleteField(key)}
								edge="end"
							>
								<Icons.MdDelete />
							</IconButton>
						</InputAdornment>
					}}
					value={val}
					onChange={(evt) => handleChange(key, evt.currentTarget.value)}
				/>
			</Typography>
		})}
		<Button variant='outlined' onClick={() => openDialog(true)}>{LNG('cfe.add')}</Button>
		{dialog}
	</>
}

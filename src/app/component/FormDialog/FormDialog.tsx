import React, { ChangeEvent } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material'
import { createDethrottledApplier } from '../../lib/util/event';
import { useI18n } from '../../lib/i18n/i18n';

interface FormTextFieldProps {
	id: string
	label: string
	type?: string
	validator?: (text: string) => string | null
	filter?: (text: string) => boolean
	multiline?: boolean
	value?: string
	initialValue?: string
	onChange?: (value: string) => void
	[_: string]: unknown
	displayValid?: boolean
	dethrottleValidation?: boolean
}
export function FormTextField({
	id, label, type, validator, filter, multiline, value, initialValue, onChange, displayValid, dethrottleValidation, ...other
}: FormTextFieldProps) {
	const [ myValue, setMyValue ] = React.useState(initialValue ?? '')
	const [ dethrottler ] = React.useState({apply: createDethrottledApplier(300)})
	const [ validateResult, setValidateResult ] = React.useState<string | null>(validateInput(value ?? initialValue ?? ''))
	const LNG = useI18n()

	function validateInput(value: string) {
		return validator ? validator(value) : null
	}

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		let nextValue = event.currentTarget.value

		let isOK = true
		if(filter) {
			isOK &&= filter(nextValue)
		}
		if(!isOK) {
			return
		}

		if(onChange) {
			onChange(nextValue)
		}
		setMyValue(nextValue)
		if(dethrottleValidation) {
			dethrottler.apply((value: string) => {
				setValidateResult(validateInput(value))
			})(nextValue)
		} else {
			setValidateResult(validateInput(nextValue))
		}
	}

	return (
		<TextField
			id={id}
			label={label}
			type={type ?? 'text'}
			multiline={multiline ?? false}
			onChange={handleChange}
			value={value ?? myValue}
			{...validateResult !== null ? {
				error: true,
				helperText: validateResult
			} : (
				displayValid ? {
					helperText: LNG('ui.field_valid')
				} : {}
			)}
			{...other} />
	)
}

interface FormField {
	id: string
	label: string
	type?: string
	autoFocus?: boolean
	validator?: (text: string) => string | null
	filter?: (text: string) => boolean
	initialValue?: string | (() => string)
	multiline?: boolean
}
interface FormDialogProps {
	title: string
	preText?: React.ReactNode
	postText?: React.ReactNode | ((values: {[id: string]: string}) => React.ReactNode)
	cancelText: string
	confirmText: string
	fields: FormField[]
	onCancel?: () => void
	onConfirm?: (values: {[id: string]: string}) => Promise<string | null>
	getSetOpen?: (setOpen: (state: boolean) => void) => void
}
export function FormDialog({
	title, preText, postText, cancelText, confirmText, fields,
	onCancel, onConfirm, getSetOpen, ...other
}: FormDialogProps) {
	const [ open, setOpen ] = React.useState(false)
	const [ errorText, setErrorText ] = React.useState('')
	let initialValues: {[id: string]: string} = {}
	for(let item of fields) {
		let initValue = ''
		if(typeof item.initialValue == 'function') {
			initValue = item.initialValue()
		} else {
			initValue = item.initialValue ?? ''
		}
		initialValues[item.id] = initValue
	}
	const [ values, setValues ] = React.useState(initialValues)
	const [ loading, setLoading ] = React.useState(false)

	const theme = useTheme()

	if(getSetOpen) {
		getSetOpen((state: boolean) => {
			if(state == true) {
				setValues(initialValues)
				setLoading(false)
				setErrorText('')
			}
			setOpen(state)
		})
	}

	function handleClose() {
		setOpen(false)
		if(onCancel) {
			onCancel()
		}
	}

	function handleChange(id: string, value: string) {
		setValues(Object.assign({}, values, {[id]: value}))
	}

	async function handleSubmit() {
		setLoading(true)
		let success = true
		if(onConfirm) {
			let msg = await onConfirm(values)
			if(msg !== null) {
				success = false
				setErrorText(msg)
			}
		}
		setLoading(false)
		if(success) {
			setOpen(false)
		}
	}

	function handleKeyup(evt: React.KeyboardEvent) {
		if(evt.key == 'Enter') {
			if(validatePassAll) {
				handleSubmit()
			}
		}
	}

	let validatePassAll = true
	for(let item of fields) {
		if(item.validator) {
			validatePassAll &&= null === item.validator(values[item.id])
		}
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{preText && <DialogContentText>
					{preText}
				</DialogContentText>}
				{fields.map((item) => (
					<FormTextField
						key={item.id}
						fullWidth
						margin='normal'
						autoFocus={!!item.autoFocus}
						id={item.id}
						label={item.label}
						type={item.type ?? 'text'}
						value={values[item.id]}
						filter={item.filter}
						validator={item.validator}
						multiline={item.multiline}
						onChange={(val) => handleChange(item.id, val)}
						onKeyUp={(evt: React.KeyboardEvent) => !item.multiline && handleKeyup(evt)}
						displayValid
						dethrottleValidation
					/>
				))}
				{postText && <DialogContentText>
					{typeof(postText) == 'function' ? postText(values) : postText}
				</DialogContentText>}
				<DialogContentText sx={{
					color: theme.palette.error.main,
					...(errorText ? {} : {display: 'none'})
				}}>
					{errorText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>{cancelText}</Button>
				<LoadingButton onClick={handleSubmit} disabled={!validatePassAll} loading={loading}>{confirmText}</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}

interface ConfirmDialogProps {
	title: string
	text?: React.ReactNode
	cancelText: string
	confirmText: string
	onCancel?: () => void
	onConfirm?: () => Promise<string | null>
	getSetOpen?: (setOpen: (state: boolean) => void) => void
}
export function ConfirmDialog({ title, text, cancelText, confirmText, onCancel, onConfirm, getSetOpen }: ConfirmDialogProps) {
	const [ open, setOpen ] = React.useState(false)
	const [ errorText, setErrorText ] = React.useState('')
	const [ loading, setLoading ] = React.useState(false)

	const theme = useTheme()

	if(getSetOpen) {
		getSetOpen((state: boolean) => {
			if(state == true) {
				setLoading(false)
				setErrorText('')
			}
			setOpen(state)
		})
	}

	function handleClose() {
		setOpen(false)
		if(onCancel) {
			onCancel()
		}
	}

	async function handleSubmit() {
		setLoading(true)
		let success = true
		if(onConfirm) {
			let msg = await onConfirm()
			if(msg !== null) {
				success = false
				setErrorText(msg)
			}
		}
		setLoading(false)
		if(success) {
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{text && <DialogContentText>
					{text}
				</DialogContentText>}
				<DialogContentText sx={{
					color: theme.palette.error.main,
					...(errorText ? {} : {display: 'none'})
				}}>
					{errorText}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} disabled={loading}>{cancelText}</Button>
				<LoadingButton onClick={handleSubmit} loading={loading}>{confirmText}</LoadingButton>
			</DialogActions>
		</Dialog>
	)
}

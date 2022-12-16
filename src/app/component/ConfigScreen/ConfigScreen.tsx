import React, { useEffect } from 'react'
import { useI18n } from '../../lib/i18n/i18n'
import { ConfigAction, ConfigOption, ConfigDefinition, ConfigSection, ConfigActionCallback } from './config-data'
import { Button, Checkbox, FormControlLabel, MenuItem, Select, useTheme } from '@mui/material'
import { Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { CallbackRegistry } from '../../lib/util/event'
import { FormTextField } from '../FormDialog/FormDialog'
import { iterateMap } from '../../lib/util/array'

type ConfigValues = {[_: string]: boolean | string}

/**
 * 提取初始值状态
 */
function initValuesFromDef(definition: ConfigDefinition) {
	let result: ConfigValues = {}

	for(let section of definition.sections) {
		for(let option of section.options) {
			if(option.type == 'text') {
				result[option.key] = option.initialValue ?? ''
			}
			if(option.type == 'switch') {
				result[option.key] = option.initialValue ?? false
			}
			if(option.type == 'select') {
				result[option.key] = option.initialValue
			}
		}
	}

	return result
}

interface ConfigScreenProps {
	definition: ConfigDefinition
	getResetter: (reset: () => void) => void
}
/**
 * 配置界面
 */
export function ConfigScreen({ definition, getResetter, ...other }: ConfigScreenProps) {
	const LNG = useI18n()
	const theme = useTheme()

	const [ values, setValues ] = React.useState<ConfigValues>(initValuesFromDef(definition))

	function updateValues(newValues: ConfigValues) {
		let needUpdate = false
		for(let key in newValues) {
			if(values[key] != newValues[key]) {
				needUpdate = true
				break
			}
		}
		if(needUpdate) {
			const updated = Object.assign({}, values, newValues)
			setValues(updated)
		}
	}

	const resetters = new CallbackRegistry()
	getResetter(() => {
		setValues(initValuesFromDef(definition))
		resetters.call()
	})

	return <>
		{definition.sections.map((section: ConfigSection) => {
			return <ConfigFragSection
				key={section.key}
				i18nPrefix={definition.i18nPrefix}
				section={section}
				getResetter={(val) => resetters.register(val)}
				values={values}
				onUpdate={updateValues}
			/>
		})}
		<ErrorText text={definition.errorText} />
		{/* TODO[unused]: Config definition-level actions */}
		{/* {definition.actions?.map((action: ConfigAction) => {
			return <p>{LNG(definition.i18nPrefix + action.key)}</p>
		})} */}
	</>
}

interface ConfigFragSectionProps {
	i18nPrefix: string
	section: ConfigSection
	getResetter: (reset: () => void) => void
	values: ConfigValues
	onUpdate: (newValues: ConfigValues) => void
}
/**
 * 配置章节
 */
export function ConfigFragSection({ i18nPrefix, section, getResetter, values, onUpdate }: ConfigFragSectionProps) {
	const LNG = useI18n()
	const theme = useTheme()

	const [ loading, setLoading ] = React.useState(false)
	const [ errorText, setErrorText ] = React.useState<string | null>(null)

	function updateValues(values: ConfigValues) {
		onUpdate(values)
	}

	const resetters = new CallbackRegistry()
	getResetter(() => {
		resetters.call()
		setLoading(false)
		setErrorText(null)
	})

	async function handleActionClick(callback: ConfigActionCallback) {
		setLoading(true)
		setErrorText(await callback(values))
		setLoading(false)
	}

	let passAll = true
	for(let option of section.options) {
		if(option.type == 'text') {
			if(option.validator && option.validator(values[option.key] as string) !== null) {
				passAll = false
				break
			}
		}
	}

	return <>
		<Typography variant='h5' gutterBottom mt={3} mb={2}>
			{LNG(i18nPrefix + section.key)}
		</Typography>
		{section.options.map((option) => {
			return <ConfigFragOption
				key={option.key}
				i18nPrefix={i18nPrefix}
				option={option}
				getResetter={(val) => resetters.register(val)}
				values={values}
				onUpdate={updateValues}
			/>
		})}
		<ErrorText text={section.errorText} />
		<ErrorText text={errorText} />
		{section.actions && <Typography variant='body1' mt={3} gutterBottom>
			{section.actions.map((action) => (
				<ActionButton
					key={action.key}
					action={action}
					loading={loading}
					onClick={() => handleActionClick(action.action)}
					text={LNG(i18nPrefix + action.key)}
					disabled={(action.requirePassAll) && !passAll}
				/>
			))}
		</Typography>}
	</>
}

interface ConfigFragOptionProps {
	i18nPrefix: string
	option: ConfigOption
	getResetter: (reset: () => void) => void
	values: ConfigValues
	onUpdate: (newValues: ConfigValues) => void
}
/**
 * 配置选项
 */
function ConfigFragOption({ i18nPrefix, option, getResetter, values, onUpdate }: ConfigFragOptionProps) {
	const LNG = useI18n()
	
	const [ loading, setLoading ] = React.useState(false)
	const [ errorText, setErrorText ] = React.useState<string | null>(null)
	
	getResetter(() => {
		setLoading(false)
		setErrorText(null)
	})

	function handleChange(evt: React.ChangeEvent<HTMLInputElement>, key: string, callback?: ConfigActionCallback) {
		updateValue(key, evt.currentTarget.checked, callback)
	}

	function updateValue(key: string, value: string | boolean, callback?: ConfigActionCallback) {
		if(callback) {
			callback({[key]: value})
		}
		onUpdate({[key]: value})
	}
	
	async function handleActionClick() {
		if(option.type == 'action') {
			setLoading(true)
			let result = await option.action.action({})
			setErrorText(result)
			setLoading(false)
		}
	}

	let stateSuffix = ''
	if(option.currentState !== undefined) {
		stateSuffix = '.' + option.currentState
	}

	let tipsText = LNG(i18nPrefix + option.key + '.tips' + stateSuffix, ...(option.tipToe ?? []))
	
	return <>
		{/* 标题 */}
		<Typography variant='body1' gutterBottom mt={2}>
			{LNG(i18nPrefix + option.key + '.title')}
		</Typography>
		{/* 提示文本 */}
		{!option.noTips && tipsText.split("\n").map((text, index) => (
			<Typography key={index} variant='body2' sx={{opacity: 0.6}} gutterBottom>
				{text}
			</Typography>
		))}
		<Typography variant='body1' gutterBottom component='div'>
			{/* 动作选项 */}
			{option.type == 'action' && <>
				<ErrorText text={errorText} />
				<ActionButton
					action={option.action}
					loading={loading}
					text={LNG(i18nPrefix + option.action.key + stateSuffix)}
					disabled={option.disabled}
					onClick={handleActionClick}
				/>
			</>}
			{/* 开关 */}
			{option.type == 'switch' && <>
				<FormControlLabel control={
					<Checkbox
						checked={values[option.key] as boolean}
						onChange={(evt) => handleChange(evt, option.key, option.onChange)}
					/>
				} label={LNG('ui.enable')} />
			</>}
			{/* 文本 */}
			{option.type == 'text' && <>
				<FormTextField
					id={option.key}
					label=''
					type='text'
					validator={option.validator}
					filter={option.filter}
					multiline={option.multiline}
					value={values[option.key] as string}
					onChange={(val) => updateValue(option.key, val, option.onChange)}
					size='small'
				/>
			</>}
			{/* 选择 */}
			{option.type == 'select' && <>
				<Select
					value={values[option.key]}
					size='small'
					onChange={(evt) => updateValue(option.key, evt.target.value, option.onChange)}
				>
					{iterateMap(option.choices, (itemText, itemKey) => (
						<MenuItem key={itemKey} value={itemKey}>{itemText}</MenuItem>
					))}
				</Select>
			</>}
		</Typography>
	</>
}

interface ActionButtonProps {
	action: ConfigAction
	loading?: boolean
	onClick?: () => void
	text: string
	disabled?: boolean
}
/**
 * 动作按钮
 */
function ActionButton({ action, loading, onClick, text, disabled }: ActionButtonProps) {
	return <LoadingButton
		variant={action.type == 'neutral' ? 'outlined' : 'contained'}
		disableElevation
		disabled={disabled}
		color={{
			positive: 'primary',
			neutral: 'primary',
			negative: 'error'
		}[action.type] as any}
		onClick={onClick}
	>
		{text}
	</LoadingButton>
}

interface ErrorTextProps {
	text: string | null | undefined
}
/**
 * 错误文本
 */
export function ErrorText({ text }: ErrorTextProps) {
	const theme = useTheme()

	return <>
		{text && <Typography variant='body2' gutterBottom sx={{
			color: theme.palette.error.main
		}}>{text}</Typography>}
	</>
}

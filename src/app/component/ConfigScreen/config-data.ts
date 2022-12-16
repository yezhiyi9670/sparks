export type ConfigActionCallback = (values: {[_: string]: string | boolean}) => Promise<string | null>

/**
 * 配置的操作按钮
 */
export interface ConfigAction {
	key: string
	type: 'positive' | 'neutral' | 'negative'
	action: ConfigActionCallback
	requirePassAll?: boolean
}

/**
 * 配置选项
 */
interface ConfigOptionBase {
	key: string
	noTips?: boolean
	currentState?: string
	disabled?: boolean,
	tipToe?: string[]
}
interface ConfigOptionTextExtras {
	type: 'text'
	multiline?: boolean
	initialValue?: string
	validator?: (text: string) => string | null
	filter?: (text: string) => boolean
	onChange?: ConfigActionCallback
}
interface ConfigOptionSelectExtras {
	type: 'select'
	choices: {[_: string]: string},
	initialValue: string
	onChange?: ConfigActionCallback
}
interface ConfigOptionSwitchExtras {
	type: 'switch'
	onChange?: ConfigActionCallback
	initialValue?: boolean
}
interface ConfigOptionActionExtras {
	type: 'action'
	action: ConfigAction
}
interface ConfigOptionVoidExtras {
	type: 'void'
}
export type ConfigOption = ConfigOptionBase & (
	ConfigOptionTextExtras | ConfigOptionSelectExtras | ConfigOptionActionExtras | ConfigOptionVoidExtras | ConfigOptionSwitchExtras
)

/**
 * 配置章节
 */
export interface ConfigSection {
	key: string
	options: ConfigOption[]
	errorText?: string
	actions?: ConfigAction[]
}

/**
 * 配置界面的定义
 */
export interface ConfigDefinition {
	i18nPrefix: string
	sections: ConfigSection[]
	errorText?: string
	actions?: ConfigAction[]
}

/**
 * 生成配置界面定义
 */
export function ConfigDefinition(i18nPrefix: string, sections: ConfigSection[], errorText?: string, actions?: ConfigAction[]): ConfigDefinition {
	return { i18nPrefix, sections, errorText, actions }
}

/**
 * 生成操作按钮
 */
export function ConfigAction(key: string, type: 'positive' | 'neutral' | 'negative', action: ConfigActionCallback, requirePassAll?: boolean): ConfigAction {
	return { key, type, action, requirePassAll }
}

/**
 * 生成章节
 */
export function ConfigSection(key: string, options: ConfigOption[], errorText?: string, actions?: ConfigAction[]): ConfigSection {
	return { key, options, errorText, actions }
}

/**
 * 生成空白项
 */
export function ConfigOptionVoid(key: string, currentState?: string, noTips?: boolean, tipToe?: string[]): ConfigOption {
	return { key, currentState, noTips, type: 'void', disabled: false, tipToe }
}

/**
 * 生成文本项
 */
export function ConfigOptionText(key: string, initialValue: string, onChange: ConfigActionCallback, validator?: (text: string) => string | null, filter?: (text: string) => boolean, currentState?: string, noTips?: boolean, disabled?: boolean, tipToe?: string[]): ConfigOption {
	return { key, currentState, noTips, type: 'text',
		initialValue,
		onChange,
		validator,
		filter,
		disabled,
		tipToe
	}
}

/**
 * 生成选择项
 */
export function ConfigOptionSelect(key: string, initialValue: string, onChange: ConfigActionCallback, choices: {[_: string]: string}, currentState?: string, noTips?: boolean, disabled?: boolean, tipToe?: string[]): ConfigOption {
	return { key, currentState, noTips, type: 'select',
		initialValue,
		onChange,
		choices,
		disabled,
		tipToe
	}
}

/**
 * 生成开关项
 */
export function ConfigOptionSwitch(key: string, initialValue: boolean, onChange: ConfigActionCallback, currentState?: string, noTips?: boolean, disabled?: boolean, tipToe?: string[]): ConfigOption {
	return { key, currentState, noTips, type: 'switch',
		initialValue,
		onChange,
		disabled,
		tipToe
	}
}

/**
 * 生成动作项
 */
export function ConfigOptionAction(key: string, action: ConfigAction, currentState?: string, noTips?: boolean, disabled?: boolean, tipToe?: string[]): ConfigOption {
	return { key, currentState, noTips, type: 'action',
		action,
		disabled,
		tipToe
	}
}

/**
 * 无动作
 */
export const configNoAction = async () => null

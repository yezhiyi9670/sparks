import React from 'react'
import { useI18n } from '../../lib/i18n/i18n'
import { FormDialog } from '../FormDialog/FormDialog'

interface TypeConfirmAlertProps {
	title: string
	text: React.ReactNode
	answer: string
	onConfirm?: () => Promise<string | null>
	getOpener: (opener: () => void) => void
}
export function TypeConfirmAlert({ title, text, answer, onConfirm, getOpener }: TypeConfirmAlertProps) {
	const LNG = useI18n()

	let setDialogOpen = (_: boolean) => undefined as void
	getOpener(() => setDialogOpen(true))

	return (
		<FormDialog
			title={title}
			preText={<>
				{text}<br />
				{LNG('ui.type_confirm', answer)}
			</>}
			cancelText={LNG('ui.type_confirm.cancel')}
			confirmText={LNG('ui.type_confirm.confirm')}
			getSetOpen={(func) => {setDialogOpen = func}}
			fields={[
				{
					id: 'confirm',
					label: LNG('ui.type_confirm.caption'),
					autoFocus: true,
					validator: (value) => value == answer ? null : ''
				}
			]}
			onConfirm={onConfirm}
		/>
	)
}

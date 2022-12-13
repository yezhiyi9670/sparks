import React from 'react'
import { useI18n } from '../../../../lib/i18n/i18n'
import { TestSpaceFill, TestSpaceFillTwo } from '../../../../test/SpaceFill'
import { PopupAppbar, PopupScreen } from '../../../alert/PopupScreen'
import AppbarOutlet from '../../../NavAppbar/AppbarOutlet'
import { useNotebook } from '../../../NavDrawer/NotebookContext'
import { useSpark } from './SparkContext'

interface SparkEditorProps {
	getOpener: (opener: () => void) => void
}
/**
 * 卡片编辑器
 */
export function SparkEditor({ getOpener }: SparkEditorProps) {
	const LNG = useI18n()
	const notebook = useNotebook()!
	const spark = useSpark()!
	
	const [ open, setOpen ] = React.useState(false)

	getOpener(() => {
		setOpen(true)
	})

	function handleClose() {
		setOpen(false)
	}

	return <>
		<PopupScreen open={open}>{spark && <>
			<PopupAppbar title={spark.getDisplayTitle(LNG)} onClose={handleClose} onConfirm={handleClose} />
			<AppbarOutlet>
				<TestSpaceFill />
			</AppbarOutlet>
		</>}</PopupScreen>
	</>
}

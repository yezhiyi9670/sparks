import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-markdown'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import { useMobile } from '../../lib/mobile/mobile'
import { useWideEditor } from '../../lib/util/responsive'
import { useDarkMode } from '../../lib/darkmode/darkmode'
import { width } from '@mui/system'

interface CodeEditorProps {
	name: string
	mode: string
	value: string
	onChange: (val: string) => void
	ref: React.RefObject<AceEditor>
	lineWrap?: boolean
	widthFlag?: number
}
/**
 * 代码编辑器
 */
export const CodeEditor = React.forwardRef((props: CodeEditorProps, ref: React.ForwardedRef<AceEditor>) => {
	const isMobile = useMobile()
	const wideEditor = useWideEditor()
	const darkMode = useDarkMode()

	let rd = (props.widthFlag ?? 0).toString()

	return (
		<AceEditor
			name={props.name}
			mode={props.mode}
			theme={darkMode ? (wideEditor ? 'tomorrow_night' : 'twilight') : 'tomorrow'}
			value={props.value}
			height='100%'
			width={`calc(100% - ${rd}px + ${rd}px)`}
			fontSize={isMobile ? 14 : 16}
			highlightActiveLine={false}
			onChange={props.onChange}
			setOptions={{
				scrollPastEnd: true
			}}
			wrapEnabled={props.lineWrap}
			ref={ref}
		/>
	)
})

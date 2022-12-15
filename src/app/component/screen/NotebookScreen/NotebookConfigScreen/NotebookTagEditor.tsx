import React from 'react'
import { TagsManifest } from '../../../../data/notebook/notebook'
import { AppBar, Box, Dialog, IconButton, Link, Menu, MenuItem, Paper, Toolbar, Typography, useTheme } from '@mui/material'
import { Tags } from '../../../../data/tag/tag'
import { useI18n } from '../../../../lib/i18n/i18n'
import { useNotebook, useNotebookUpdater } from '../../../NavDrawer/NotebookContext'
import { useDarkMode } from '../../../../lib/darkmode/darkmode'
import { SlideUpTransition } from '../../../transition/SlideUpTransition'
import * as Icons from 'react-icons/md'
import { PopupAppbar, PopupScreen, useAppbarBackground } from '../../../alert/PopupScreen'
import AppbarOutlet from '../../../NavAppbar/AppbarOutlet'
import { useWideEditor, useWindowSize } from '../../../../lib/util/responsive'
import { NotebookTagEditGrid, NotebookTagEditGridDesktop } from './NotebookTagEditGrid'
import { TestSpaceFill, TestSpaceFillTwo } from '../../../../test/SpaceFill'
import { CompactToolbar, TitleToolbar, ToolbarDivider, ToolbarIconButton, ToolbarSymbolButton } from '../../../Toolbar/Toolbar'
import AceEditor from 'react-ace'
import { parseTags, TagParseResult } from '../../../../data/tag/tag-parser'
import { createDethrottledApplier, dethrottle } from '../../../../lib/util/event'
import { NotebookStorage } from '../../../../data/notebook/notebook-entity'
import { useMobile } from '../../../../lib/mobile/mobile'
import ReactAce from 'react-ace/lib/ace'
import PopupState from 'material-ui-popup-state'
import { bindMenu, bindTrigger } from 'material-ui-popup-state/core'
import Divider from '@mui/material/Divider'
import { TagsPreview } from './TagsPreview'
import { IssuesDisplay } from '../../../../data/code/issue/IssuesDisplay'
import { ErrorText } from '../../../ConfigScreen/ConfigScreen'
import { useSnackbar } from '../../../../lib/snackbar/snackbar'
import { CodeEditor } from '../../../CodeEditor/CodeEditor'

interface NotebookTagEditorProps {
	getOpener: (opener: () => void) => void
}

/**
 * 笔记本标签编辑对话框
 */
export function NotebookTagEditor({ getOpener }: NotebookTagEditorProps) {
	const LNG = useI18n()
	const darkMode = useDarkMode()
	const notebook = useNotebook()!
	const updateNotebook = useNotebookUpdater()
	const toolbarBackground = useAppbarBackground()
	const theme = useTheme()
	const wideEditor = useWideEditor()
	const isMobile = useMobile()
	const showSnackbar = useSnackbar()
	
	const [ open, setOpen ] = React.useState(false)
	const [ code, setCode ] = React.useState(notebook.tags.code)
	const [ tagResult, setTagResult ] = React.useState<TagParseResult>(parseTags(code))
	// 节流器定义为被记住的 state，不然更新一下就销毁了，没用的
	const [ dethrottler ] = React.useState({apply: createDethrottledApplier(500)})
	const [ dethrottlerSave ] = React.useState({apply: createDethrottledApplier(200)})

	const editorRef = React.createRef<ReactAce>()

	getOpener(() => {
		setOpen(true)
		setCode(notebook.tags.code)
		setTagResult(parseTags(notebook.tags.code))
		setLoading(false)
	})

	function handleClose() {
		setOpen(false)
	}
	async function handleKeyboard(evt: React.KeyboardEvent) {
		// 治一治那些喜欢边打边按 Ctrl-S 的。
		if(evt.ctrlKey && evt.key == 's') {
			// 但是要节流，禁止 DDoS
			dethrottlerSave.apply(handleConfirm)(false)
			evt.preventDefault()
		}
	}
	const [ loading, setLoading ] = React.useState(false)
	async function handleConfirm(doClose: boolean) {
		setLoading(true)
		notebook.tags.code = code
		notebook.tags.tags = parseTags(code).result
		try {
			await NotebookStorage.write(notebook.alias, notebook.toData())
			setLoading(false)
			if(doClose) {
				setOpen(false)
			}
			updateNotebook()
		} catch(err: unknown) {
			setLoading(false)
			showSnackbar('error', LNG('ui.local_write_error'))
		}
	}

	function reparseTags(code: string) {
		const parseResult = parseTags(code)
		setTagResult(parseResult)
	}

	function handleEditChange(value: string) {
		setCode(value)
		dethrottler.apply(reparseTags)(value)
	}

	function insertSymbol(value: string, paired?: boolean) {
		editorRef.current?.editor.insert(value)
		if(paired) {
			editorRef.current?.editor.navigateLeft()
		}
		editorRef.current?.editor.focus()
	}
	function navigate(sign: -1 | 1) {
		if(sign == -1) {
			editorRef.current?.editor.navigateLeft()
		} else {
			editorRef.current?.editor.navigateRight()
		}
		editorRef.current?.editor.focus()
	}

	// 编辑器工具栏
	const editorToolbar = (
		<CompactToolbar>
			{/* 上下文符号 */}
			{notebook.useContextualSymbols() && <>
				<ToolbarIconButton icon={Icons.MdArrowLeft} onClick={() => navigate(-1)} />
				<ToolbarIconButton icon={Icons.MdArrowRight} onClick={() => navigate(1)} />
				<ToolbarDivider />
				<ToolbarIconButton icon={Icons.MdArrowRightAlt} onClick={() => insertSymbol("\t")} />
				<ToolbarSymbolButton symbol='#' onClick={() => insertSymbol('#')} />
				<ToolbarSymbolButton symbol='"' onClick={() => insertSymbol('""', true)} />
				<ToolbarSymbolButton symbol='(' onClick={() => insertSymbol('()', true)} />
				<ToolbarSymbolButton symbol=')' onClick={() => insertSymbol(')')} />
				<ToolbarDivider />
			</>}
			{/* 快速短语 */}
			<PopupState variant='popover' >
				{(popupState) => <>
					<ToolbarIconButton icon={Icons.MdAdd} {...bindTrigger(popupState)} />
					<Menu {...bindMenu(popupState)}>
						{['tag', 'multitag', 'category', '', 'void', 'default', '', 'value', 'initValue', 'externValue', '', 'color', 'delimiter'].map((item, index) => {
							if(item == '') {
								return <Divider key={index} />
							}
							return <MenuItem key={index} onClick={() => {
								popupState.close()
								setTimeout(() => insertSymbol(item), 1)
							}}>{item}</MenuItem>
						})}
					</Menu>
				</>}
			</PopupState>
			
		</CompactToolbar>
	)
	// 编辑器
	const editorBox = (
		<Box sx={{
			flex: 'auto',
			'.ace_mobile-menu': {
				display: 'none'
			}
		}}>
			<div style={{
				height: '100%'
			}} onKeyDown={handleKeyboard}>
				<CodeEditor
					name='tag-edit'
					mode='python'
					value={code}
					onChange={(value) => handleEditChange(value)}
					ref={editorRef}
				/>
			</div>
		</Box>
	)
	const editor = <>
		{wideEditor ? <>
			{editorToolbar}
			{editorBox}
		</> : <>
			{editorBox}
			{editorToolbar}
		</>}
	</>

	const previewer = <>
		{wideEditor && <TitleToolbar>
			{LNG('notebook.tag.tab.preview')}
		</TitleToolbar>}
		<Box sx={{
			flex: 'auto',
			overflowY: 'auto',
			padding: wideEditor ? '12px' : '16px'
		}}>
			<IssuesDisplay code={code} issues={tagResult.issues} />
			<TagsPreview tags={tagResult.result} noneText={LNG('notebook.tag.preview.none')} />
			<Link href={LNG('notebook.tag.help.link')} target='_blank' variant='body2'>
				{LNG('notebook.tag.help.text')}
			</Link>
		</Box>
	</>

	return <>
		<PopupScreen open={open}>
			<PopupAppbar title={LNG('notebook.tag.title')} onClose={handleClose} onConfirm={() => handleConfirm(true)} disabled={loading} />
			<AppbarOutlet>
				<NotebookTagEditGrid
					editor={editor}
					previewer={previewer}
				/>
			</AppbarOutlet>
		</PopupScreen>
	</>
}

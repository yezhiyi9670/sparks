import { Box, Button, Chip, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { SparkEntity } from '../../../../data/spark/spark-entity'
import { useI18n } from '../../../../lib/i18n/i18n'
import { useSnackbar } from '../../../../lib/snackbar/snackbar'
import { dateDisplayString } from '../../../../lib/util/date'
import { createDethrottledApplier } from '../../../../lib/util/event'
import { isValidAlias, isValidDateStr } from '../../../../lib/util/string'
import { TestSpaceFill, TestSpaceFillTwo } from '../../../../test/SpaceFill'
import { PopupAppbar, PopupScreen } from '../../../alert/PopupScreen'
import { ErrorText } from '../../../ConfigScreen/ConfigScreen'
import { FormTextField } from '../../../FormDialog/FormDialog'
import AppbarOutlet from '../../../NavAppbar/AppbarOutlet'
import { useNotebook, useNotebookUpdater } from '../../../NavDrawer/NotebookContext'
import { NotebookTagEditor } from '../NotebookConfigScreen/NotebookTagEditor'
import { CustommFieldsEdit } from './editor/CustomFieldsEdit'
import { OriginEdit, PrevEdit } from './editor/OriginEdit'
import { TagsEditor } from './editor/TagsEditor'
import { SparkProvider, useSpark, useSparkAliasStack } from './SparkContext'
import { SparkEditGrid } from './SparkEditGrid'
import { SparkTagsRenderer } from './SparksGrid'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import 'ace-builds/src-noconflict/mode-python'
import { TypoBox } from '../../../TypoBox/TypeBox'
import { CodeEditor } from '../../../CodeEditor/CodeEditor'
import AceEditor from 'react-ace'
import { CompactToolbar, ToolbarIconButton } from '../../../Toolbar/Toolbar'
import * as Icons from 'react-icons/md'
import { useWideEditor } from '../../../../lib/util/responsive'
import { DomRender } from '../../../../lib/DomRender/DomRender'
import { parseMarkdownSafe } from '../../../../lib/markdown/markdown'

interface SparkEditorProps {
	getOpener: (opener: (spark: SparkEntity) => void) => void
}
/**
 * 卡片编辑器
 */
export function SparkEditor({ getOpener }: SparkEditorProps) {
	const LNG = useI18n()
	const notebook = useNotebook()!
	const updateNotebook = useNotebookUpdater()
	const spark = useSpark()!
	const [ saveDethrottler ] = React.useState({apply: createDethrottledApplier(200)})
	const [ mdDethrottler ] = React.useState({apply: createDethrottledApplier(500)})
	const showSnackbar = useSnackbar()
	const openedSparks = useSparkAliasStack()
	const wideEditor = useWideEditor()

	const [ open, setOpen ] = React.useState(false)
	const [ renderOpen, setRenderOpen ] = React.useState(false)
	const [ renderCloseT, setRenderCloseT ] = React.useState(0)

	const [ loading, setLoading ] = React.useState(false)

	const theme = useTheme()

	getOpener((spark) => {
		clearTimeout(renderCloseT)
		setOpen(true)
		setRenderOpen(true)
		setTitle(spark.title)
		setDesc(spark.desc)
		setAlias(spark.alias)
		setMeta(spark.meta)
		setTagsData(spark.tags)
		setPrevAlias(spark.prev)
		setOriginList(spark.origin)
		setLoading(false)
		setMdContent(spark.content)
		setMdHtml(parseMarkdownSafe(spark.content))
		setCtimeStr(dateDisplayString(new Date(spark.ctime)))
		setMtimeStr(dateDisplayString(new Date(spark.mtime)))
		setSplitType('preview')
	})

	function setClose() {
		setOpen(false)
		setSubSpark(null)
		setRenderCloseT(setTimeout(() => setRenderOpen(false), 1000))
	}

	function handleClose() {
		setClose()
	}

	let acceptValues = true

	/* ===== 子屏幕编辑器 ===== */
	let openSubEditor = (_: SparkEntity) => void(0) as void
	const [ subSpark, setSubSpark ] = React.useState<SparkEntity | null>(null)
	let subEditor = renderOpen && spark && <SparkProvider value={subSpark}>
		<SparkEditor getOpener={(func) => openSubEditor = func} />
	</SparkProvider>
	function openSubSpark(spark: SparkEntity) {
		if(spark.isFake) {
			showSnackbar('warning', LNG('spark.sub.extern'))
			return
		}
		if(openedSparks.indexOf(spark.alias) != -1) {
			showSnackbar('warning', LNG('spark.sub.opened'))
			return
		}
		setSubSpark(spark)
		openSubEditor(spark)
	}

	/* ===== 标题编辑框 ===== */
	const [ title, setTitle ] = React.useState('')
	const titleEdit = <>
		<TextField
			id='title'
			label={LNG('spark.section.title')}
			type='text'
			placeholder={LNG('spark.untitled')}
			value={title}
			sx={{width: '100%'}}
			onChange={(evt) => setTitle(evt.currentTarget.value)}
		/>
	</>

	/* ===== 别名编辑框 ===== */
	const [ alias, setAlias ] = React.useState('')
	const aliasEdit = <>
		<FormTextField
			id='alias'
			label=''
			size='small'
			value={alias}
			onChange={(val) => setAlias(val)}
			validator={(val) => isValidAlias(val) ? null : LNG('spark.error.alias')}
			dethrottleValidation
		/>
	</>
	acceptValues &&= isValidAlias(alias)

	/* ===== 简介编辑框 ===== */
	const [ desc, setDesc ] = React.useState('')
	const descEdit = <>
		<TextField
			id='desc'
			label=''
			size='small'
			type='text'
			placeholder={LNG('spark.help.desc')}
			value={desc}
			sx={{width: '100%'}}
			onChange={(evt) => setDesc(evt.currentTarget.value)}
		/>
	</>

	/* ===== 自定义字段 ===== */
	const [ meta, setMeta ] = React.useState<{[_: string]: string}>({})
	const metaEdit = <>
		<CustommFieldsEdit value={meta} onChange={(val) => setMeta(val)} />
	</>

	/* ===== 基本信息 (实时更新“选项式标签”的内容) ===== */
	const [ ctimeStr, setCtimeStr ] = React.useState('')
	const [ mtimeStr, setMtimeStr ] = React.useState('')
	const [ tagsData, setTagsData ] = React.useState<{[_: string]: string[]}>({})
	const infoEdit = <>
		<Typography variant='body1' component='div' gutterBottom>
			{LNG('spark.section.info.tags')}
		</Typography>
		<Typography variant='body1' component='div' gutterBottom mb={2}>
			<Chip
				size='small'
				variant='outlined'
				label={spark ? spark.getDisplayCategory(LNG, notebook, tagsData) : ''}
				sx={{
					marginRight: '4px',
					marginBottom: '4px'
				}}
			/>
			<SparkTagsRenderer spark={spark} notebook={notebook} tagValues={tagsData} multiline />
		</Typography>
		<Typography variant='body1' component='div' gutterBottom>
			{LNG('spark.section.info.ctime')}
		</Typography>
		<Typography variant='body1' component='div' gutterBottom mb={2}>
			<Chip
				size='small'
				variant='outlined'
				label={dateDisplayString(new Date(ctimeStr))}
			/>
		</Typography>
		<Typography variant='body1' component='div' gutterBottom pt={1}>
			<FormTextField
				id='ctime'
				label={LNG('spark.field.ctime')}
				size='small'
				value={ctimeStr}
				onChange={(val) => setCtimeStr(val)}
				validator={(val) => isValidDateStr(val) ? null : LNG('spark.error.ctime')}
				sx={{width: '100%'}}
				dethrottleValidation
			/>
		</Typography>
		<Typography variant='body1' component='div' gutterBottom mt={2}>
			<FormTextField
				id='ctime'
				label={LNG('spark.field.mtime')}
				size='small'
				value={mtimeStr}
				disabled
				sx={{width: '100%'}}
			/>
		</Typography>
	</>
	acceptValues &&= isValidDateStr(ctimeStr)

	/* ===== 选项式标签 ===== */
	let openTagEditor = () => void(0) as void
	const tagsEdit = <>
		<TagsEditor notebook={notebook} value={tagsData} onChange={(val) => setTagsData(val)} />
		<Typography variant='body1' component='div' pt={1}>
			<Button variant='outlined' onClick={() => openTagEditor()} color='warning'>
				{LNG('spark.tags.editdef')}
			</Button>
		</Typography>
		<NotebookTagEditor getOpener={(func) => openTagEditor = func} />
	</>

	/* ===== 来源 ===== */
	const [ prevAlias, setPrevAlias ] = React.useState<string | null>(null)
	const [ originList, setOriginList ] = React.useState<string[]>([])
	const originEdit = <>
		<Typography variant='body1' component='div' gutterBottom>
			{LNG('spark.origin.prev')}
		</Typography>
		<PrevEdit notebook={notebook} spark={spark} value={prevAlias} onChange={(val) => setPrevAlias(val)} onSelect={(spark) => openSubSpark(spark)} />
		<Typography variant='body1' component='div' gutterBottom pt={2}>
			{LNG('spark.origin.origin')}
		</Typography>
		<OriginEdit notebook={notebook} spark={spark} value={originList} onChange={(val) => setOriginList(val)} onSelect={(spark) => openSubSpark(spark)} />
	</>

	/* ===== Markdown 编辑窗口 ===== */
	const [ mdContent, setMdContent ] = React.useState('')
	const [ mdHtml, setMdHtml ] = React.useState('')
	const [ splitType, setSplitType ] = React.useState<'edit' | 'preview' | 'split'>('preview')
	const editorRef = React.createRef<AceEditor>()
	function handleEditChange(val: string) {
		setMdContent(val)
		console.log('Change')
		// mdDethrottler.apply(() => {
		// 	setMdHtml(parseMarkdownSafe(val))
		// })()
	}
	
	const editorBox = (
		<Box sx={{
			flex: 'auto',
			height: '100%',
			'.ace_mobile-menu': {
				display: 'none'
			}
		}}>
			<CodeEditor
				name='spark-content'
				mode='markdown'
				value={mdContent}
				onChange={(value) => handleEditChange(value)}
				ref={editorRef}
				lineWrap
			/>
		</Box>
	)
	const previewBox = (
		<Box sx={{
			flex: 'auto',
			height: '100%',
			overflowY: 'auto',
			padding: '16px'
		}}>
			<DomRender renderer={(ele) => {
				ele.innerHTML = mdHtml
			}} />
		</Box>
	)
	const toolbarStuff = <></>
	const toolbarBox = (
		<CompactToolbar>
			{toolbarStuff}
			{wideEditor && <>
				<ToolbarIconButton icon={Icons.MdEdit} onClick={() => {
					setSplitType('edit')
				}} />
				<ToolbarIconButton icon={Icons.MdVerticalSplit} onClick={() => {
					setSplitType('split')
				}} />
				<ToolbarIconButton icon={Icons.MdPreview} onClick={() => {
					setSplitType('preview')
				}} />
			</>}
		</CompactToolbar>
	)
	const mobileEditor = (
		<Box sx={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
			{editorBox}
			{toolbarBox}
		</Box>
	)
	const mobilePreviewer = (
		<Box sx={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
			{previewBox}
		</Box>
	)
	const desktopEditor = (
		<Box sx={{
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		}}>
			{toolbarBox}
			<Box sx={{
				flex: 'auto',
				display: 'flex',
				overflowY: 'hidden'
			}}>
				{/* 编辑工具 */}
				<Box sx={{
					flex: 1,
					height: '100%',
					...(splitType == 'preview' && {
						display: 'none'
					})
				}}>
					{editorBox}
				</Box>
				{/* 分割线 */}
				<Box sx={{
					width: '1px',
					height: '100%',
					backgroundColor: theme.palette.divider,
					...(splitType != 'split' && {
						display: 'none'
					})
				}} />
				{/* 预览工具 */}
				<Box sx={{
					flex: 1,
					height: '100%',
					...(splitType == 'edit' && {
						display: 'none'
					})
				}}>
					{previewBox}
				</Box>
			</Box>
		</Box>
	)

	/* ===== 保存 ===== */
	function handleSave(doClose: boolean) {
		const oldAlias = spark.alias
		if(alias != oldAlias && notebook.existSpark(alias)) {
			setLoading(false)
			showSnackbar('error', LNG('spark.create.error.occupied'))
			return
		}
		spark.title = title
		spark.desc = desc
		spark.alias = alias
		spark.meta = meta
		spark.tags = tagsData
		spark.prev = prevAlias
		spark.origin = originList
		spark.ctime = +new Date(ctimeStr)
		spark.content = mdContent
		spark.updateMtime()
		notebook.writeSpark(oldAlias, spark)
		setLoading(true)
		try {
			notebook.writeData()
			updateNotebook()
			setLoading(false)
			if(doClose) {
				setClose()
			}
			return null
		} catch(err: unknown) {
			setLoading(false)
			showSnackbar('error', LNG('ui.local_write_error'))
		}
	}

	return <>
		<PopupScreen open={open}>{spark && <>
			<PopupAppbar title={title != '' ? title : LNG('spark.untitled')} onClose={handleClose} onConfirm={() => handleSave(true)} disabled={loading} disableSave={!acceptValues} />
			<AppbarOutlet>
				<SparkEditGrid
					titleInput={titleEdit}
					mobileEditor={[
						mobileEditor,
						mobilePreviewer
					]}
					desktopEditor={desktopEditor}
					alias={aliasEdit}
					desc={descEdit}
					meta={metaEdit}
					basicInfo={infoEdit}
					tagging={tagsEdit}
					origin={originEdit}
					onCtrlS={() => saveDethrottler.apply(handleSave)(false)}
				/>
			</AppbarOutlet>
		</>}</PopupScreen>
		{subEditor}
	</>
}

import React from 'react'
import { ConstructingPage } from '../../../VoidPage/VoidPage'
import { TypoBox } from '../../../TypoBox/TypeBox'
import { Typography } from '@mui/material'
import { useI18n } from '../../../../lib/i18n/i18n'
import { ConfigAction, ConfigDefinition, configNoAction, ConfigOptionAction, ConfigOptionSwitch, ConfigOptionText, ConfigOptionVoid, ConfigSection } from '../../../ConfigScreen/config-data'
import { useNotebook, useNotebookUpdater } from '../../../NavDrawer/NotebookContext'
import { isValidAlias } from '../../../../lib/util/string'
import { iterateSize } from '../../../../lib/util/array'
import { ConfigScreen } from '../../../ConfigScreen/ConfigScreen'
import { ScrollRoot } from '../../../TypoBox/ScrollRoot'
import { NotebookStorage } from '../../../../data/notebook/notebook-entity'
import { TypeConfirmAlert } from '../../../alert/TypeConfirmAlert'
import { NotebookTagEditor } from './NotebookTagEditor'
import { TestDOMRender } from '../../../../test/dom-render'

interface NotebookConfigScreen {
	getResetter: (reset: () => void) => void
}
export function NotebookConfigScreen({ getResetter } : NotebookConfigScreen) {
	const LNG = useI18n()
	const notebook = useNotebook()!
	const updateNotebook = useNotebookUpdater()

	const configDefinition = ConfigDefinition('notebook.config.', [
		// 基本信息
		ConfigSection('info', [
			// 笔记本标题
			ConfigOptionText('name', notebook.name, configNoAction, (text) => {
				return text == '' ? LNG('notebook.create.error.name') : null
			}, () => true),
			// 笔记本别名
			ConfigOptionText('alias', notebook.alias, configNoAction, (text) => {
				return isValidAlias(text) ? null : LNG('notebook.create.error.alias')
			}, () => true),
		], undefined, [
			// 保存
			ConfigAction('info.action', 'positive', async (values) => {
				const alias = values['alias'] as string
				const oldAlias = notebook.alias
				const aliasMatch = alias == oldAlias
				if(!aliasMatch && await NotebookStorage.exists(alias)) {
					return LNG('notebook.create.error.occupied')
				}
				notebook.name = values['name'] as string
				notebook.alias = alias
				try {
					await NotebookStorage.write(oldAlias, notebook.toData())
				} catch(err: unknown) {
					return LNG('notebook.create.error.write')
				}
				try {
					if(!aliasMatch) {
						await NotebookStorage.move(oldAlias, alias)
					}
				} catch(err: unknown) {}
				updateNotebook()
				return null
			}, true)
		]),
		// 数据
		ConfigSection('data', [
			// 选项式标签
			ConfigOptionAction('tags', ConfigAction(
				'tags.action', 'neutral', async () => {
					openTagEditor()
					return null
				}
			), undefined, false, false, [iterateSize(notebook.tags.tags).toString()]),
			// 数据同步
			ConfigOptionAction('sync', ConfigAction(
				'sync.action', 'neutral', configNoAction
			), 'nyi', false, true),
			// 导出笔记本
			ConfigOptionAction('export', ConfigAction(
				'export.action', 'neutral', async () => {
					console.log('Export')
					return null
				}
			), undefined, false, true),
			// 批量导入
			ConfigOptionAction('import', ConfigAction(
				'import.action', 'neutral', async () => {
					console.log('Import')
					return null
				}
			), undefined, false, true),
		]),
		// 功能
		ConfigSection('function', [
			ConfigOptionSwitch('cs_desktop', notebook.config.useContextualSymbolsDesktop, async (values) => {
				notebook.config.useContextualSymbolsDesktop = values['cs_desktop'] as boolean
				try {
					await NotebookStorage.write(notebook.alias, notebook.toData())
				} catch(err: unknown) {}
				return null
			}),
			ConfigOptionSwitch('cs_mobile', notebook.config.useContextualSymbolsMobile, async (values) => {
				notebook.config.useContextualSymbolsMobile = values['cs_mobile'] as boolean
				try {
					await NotebookStorage.write(notebook.alias, notebook.toData())
				} catch(err: unknown) {}
				return null
			})
		]),
		// 危险区
		ConfigSection('danger', [
			// 导入并覆盖
			ConfigOptionAction('overlap', ConfigAction(
				'overlap.action', 'neutral', async () => {
					console.log('Overlap')
					return null
				}
			), undefined, false, true),
			// 删除
			ConfigOptionAction('delete', ConfigAction(
				'delete.action', 'negative', async () => {
					openDeleteDialog()
					return null
				}
			))
		])
	])

	// 打开删除对话框
	let openDeleteDialog = () => undefined as void
	// 删除笔记本
	async function handleDelete() {
		try {
			await NotebookStorage.delete(notebook.alias)
		} catch(err: unknown) {
			return LNG('notebook.create.error.write')
		}
		return null
	}

	// 打开标签编辑对话框
	let openTagEditor = () => undefined as void

	return <>
		<ScrollRoot>
			<TypoBox>
				<Typography variant="h4" gutterBottom>
					{LNG('notebook.config')}
				</Typography>
				<Typography variant='subtitle2' gutterBottom sx={{opacity: 0.6}}>
					{LNG('notebook.config.tips')}
				</Typography>
				{/* 配置界面 */}
				<ConfigScreen definition={configDefinition} getResetter={getResetter} />
				{/* <TestDOMRender /> */}
			</TypoBox>
		</ScrollRoot>
		{/* 删除确认对话框 */}
		<TypeConfirmAlert
			title={LNG('notebook.delete.title')}
			text={LNG('notebook.delete.desc', notebook.name)}
			answer={notebook.alias}
			getOpener={(opener) => openDeleteDialog = opener}
			onConfirm={handleDelete}
		/>
		{/* 标签编辑器 */}
		<NotebookTagEditor
			getOpener={(opener) => openTagEditor = opener}
		/>
	</>
}

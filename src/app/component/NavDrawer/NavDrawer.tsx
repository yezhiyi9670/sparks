import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid, useTheme } from '@mui/material';
import { createUseStyles } from 'react-jss'
import { useMobile } from '../../lib/mobile/mobile';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useI18n } from '../../lib/i18n/i18n';
import * as Icons from 'react-icons/md'
import subpages from './const/subpages'
import { NotebookStorage, NotebooksData, NotebookEntityFactory, NotebookEntity } from '../../data/notebook/notebook-entity';
import { randomToken } from '../../lib/util/random';
import { FormDialog, FormTextField } from '../FormDialog/FormDialog';
import { isValidAlias } from '../../lib/util/string';
import { Notebook } from '../../data/notebook/notebook';
import { NotebookProvider } from './NotebookContext';
import { PreferencesStorage } from '../../data/preference/preferences';
import { useOnceEffect } from '../../lib/util/event';
import { iterateSize } from '../../lib/util/array';
import { HorizontalCut } from '../../lib/util/responsive';

const useStyles = createUseStyles({
	NavDrawerOutlet: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
	}
})

interface NavItemProps {
	text: string
	icon?: React.ReactNode
	onClick?: (_: React.SyntheticEvent) => void
	selected?: boolean,
	disabled?: boolean
}
/**
 * 导航菜单项
 */
export function NavItem({ text, icon, onClick, selected, disabled, ...other }: NavItemProps) {
	return (
		<ListItem disablePadding {...selected && { selected: true }}>
			<ListItemButton disabled={disabled} onClick={(e: React.SyntheticEvent) => onClick && onClick(e)}>
				<ListItemIcon sx={{ fontSize: 24 }}>
					{icon}
				</ListItemIcon>
				<ListItemText primary={text} sx={{whiteSpace: 'nowrap'}} />
			</ListItemButton>
		</ListItem>
	)
}

interface NotebookSelectorProps {
	currentItem: Notebook | null
	onChange: (_: Notebook | null) => void
	activeSelect: boolean
	onDataUpdate: (_: NotebooksData | null) => void
}

/**
 * 笔记本列表
 */
function NotebookList({ currentItem, onChange, activeSelect, onDataUpdate, ...other }: NotebookSelectorProps) {
	// <List>
	// 	<NavItem text='Notebook 1' icon={<Icons.MdBook />} selected />
	// 	<NavItem text='Notebook 2' icon={<Icons.MdBook />} />
	// </List>

	const [token] = React.useState(randomToken(32))
	const [notebooks, setNotebooks] = React.useState<NotebooksData | null>(null)

	const LNG = useI18n()
	React.useEffect(() => {
		NotebookStorage.callbacks.register(() => {
			NotebookStorage.getStore().then((value) => {
				setNotebooks(value)
				onDataUpdate(value)
			})
		}, token)
		return () => {
			NotebookStorage.callbacks.remove(token)
		}
	})

	if (notebooks) {
		let items: React.ReactNode[] = []
		for (let alias in notebooks) {
			const notebook = notebooks[alias]
			items.push(
				<NavItem key={notebook.alias} text={notebook.name} icon={<Icons.MdBook />} {...alias == currentItem?.alias && activeSelect && {
					selected: true
				}} onClick={(event: React.SyntheticEvent) => {
					if(onChange) {
						onChange(notebook)
					}
				}} />
			)
		}

		return <List>
			{items}
		</List>
	}
	return <List>
		<NavItem text={LNG('ui.loading')} />
	</List>
}

/**
 * 导航栏上的笔记本列表（以及“新建”“导入”按钮）
 */
function NotebookNavList({ currentItem, onChange, onDataUpdate, activeSelect, ...other }: NotebookSelectorProps) {
	const LNG = useI18n()

	let setNewDialogOpen = (state: boolean) => undefined as void

	function handleNotebookSelect(state: Notebook | null) {
		PreferencesStorage.setItem('last-notebook', state ? state.alias : '')
		onChange(state)
	}

	async function handleNewNotebook(values: {[_: string]: string}) {
		let newNotebook = NotebookEntityFactory.createNew(values.alias as string, LNG)
		newNotebook.name = values.name as string
		
		if(await NotebookStorage.exists(newNotebook.alias)) {
			return LNG('notebook.create.error.occupied')
		}

		try {
			NotebookStorage.write(newNotebook.alias, newNotebook.toData())
		} catch(err) {
			return LNG('notebook.create.error.write')
		}

		handleNotebookSelect(newNotebook.toData())

		return null
	}

	/* 新建笔记本对话框 */
	const newDialog = (
		<FormDialog
			title={LNG('notebook.create.title')}
			preText={<>
				{LNG('notebook.create.tips')}<br />
				{LNG('notebook.create.help.alias')}
			</>}
			cancelText={LNG('notebook.create.cancel')}
			confirmText={LNG('notebook.create.confirm')}
			getSetOpen={(func) => {setNewDialogOpen = func}}
			fields={[
				{
					id: 'name',
					label: LNG('notebook.create.field.name'),
					autoFocus: true,
					validator: (value) => value.length > 0 ? null : LNG('notebook.create.error.name')
				},
				{
					id: 'alias',
					label: LNG('notebook.create.field.alias'),
					validator: (value) => isValidAlias(value) ? null : LNG('notebook.create.error.alias'),
					initialValue: () => true ? '' : NotebookEntityFactory.randomAlias()
				}
			]}
			onConfirm={handleNewNotebook}
		/>
	)

	return (
		<>
			<NotebookList {...{ currentItem, onChange: handleNotebookSelect, activeSelect, onDataUpdate }} />
			<Divider />
			<List>
				<NavItem text={LNG('nav.drawer.notebook.new')} icon={<Icons.MdAdd />} onClick={() => setNewDialogOpen(true)} />
				<NavItem text={LNG('nav.drawer.notebook.import')} icon={<Icons.MdImportContacts />} />
			</List>
			{newDialog}
		</>
	)
}

interface NavDrawerFrameProps {
	open: boolean
	children: (page: string) => React.ReactNode
	onClose?: () => void
}
/**
 * 侧边导航栏脚手架
 */
export default function NavDrawerFrame({ open, children, onClose, ...other }: NavDrawerFrameProps) {
	const drawerWidth = 280
	const classes = useStyles()
	const theme = useTheme()
	const isMobile = useMobile()
	const LNG = useI18n()

	const [navTab, setNavTab] = React.useState('notebook')
	const [subpage, setSubpage] = React.useState('notebook')
	const [notebook, setNotebook] = React.useState<NotebookEntity | null>(null)

	function handleNavSelect() {
		if(isMobile) {
			if(onClose) {
				onClose()
			}
		}
	}
	function handleNotebookSelect(val: Notebook | null) {
		handleNavSelect()
		setSubpage('notebook')
		setNotebook(val ? new NotebookEntity(val) : val)
	}
	useOnceEffect(() => {
		PreferencesStorage.getItem('last-notebook', '').then(async (val) => {
			if(val) {
				if(await NotebookStorage.exists(val)) {
					handleNotebookSelect(await NotebookStorage.read(val))
				}
			}
		})
	})
	function handleSubpageSelect(val: string) {
		handleNavSelect()
		setSubpage(val)
	}
	async function handleDataUpdate(notebooks: NotebooksData | null) {
		if(notebooks) {
			if(notebook && !notebooks[notebook.alias]) {
				if(iterateSize(notebooks) == 0) {
					setNotebook(null)
				} else {
					for(let index in notebooks) {
						setNotebook(new NotebookEntity(notebooks[index]))
						PreferencesStorage.setItem('last-notebook', notebooks[index].alias)
						break
					}
				}
			}
		}
	}
	async function updateCurrentNotebook() {
		// 去你妈的 immutability
		setNotebook(new NotebookEntity(notebook!.toData()))
	}
	React.useEffect(() => {
		let func = () => NotebookStorage.getStore().then((value) => {
			handleDataUpdate(value)
		})
		const token = NotebookStorage.callbacks.register(func)
		return () => {
			NotebookStorage.callbacks.remove(token)
		}
	})

	const hCut = !isMobile && open ? drawerWidth : 0

	return (
		<>
			<Drawer
				variant={isMobile ? 'temporary' : 'persistent'}
				open={open}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
				}}
				onClose={() => onClose && onClose()}
			>
				<Toolbar />
				<Box sx={{ overflowY: 'hidden', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs variant="fullWidth" value={navTab} onChange={(_, val: string) => { setNavTab(val) }} >
							<Tab label={LNG('nav.drawer.tab.notebook')} value="notebook" />
							<Tab label={LNG('nav.drawer.tab.settings')} value="settings" />
						</Tabs>
					</Box>
					<Box sx={{overflowY: 'auto', flex: 1}}>
						{/* 笔记本列表 */}
						{navTab == 'notebook' && <NotebookNavList currentItem={notebook} onChange={handleNotebookSelect} activeSelect={subpage == 'notebook'} onDataUpdate={() => undefined} />}
						{/* 设置菜单 */}
						{navTab == 'settings' && (
							<List>
								{subpages.items.map((item) => (
									item.type == 'settings' && <NavItem key={item.key} text={LNG(subpages.i18nPrefix + item.key)} icon={item.icon} onClick={() => handleSubpageSelect(item.key)} {...subpage == item.key && {selected: true}} {...item.requireLogin && {disabled: true}} />
								))}
							</List>
						)}
					</Box>
				</Box>
			</Drawer>
			<div className={classes.NavDrawerOutlet} style={{
				paddingLeft: (open && !isMobile) ? drawerWidth : 0,
				transition: theme.transitions.create('padding-left', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				...(open && {
					transition: theme.transitions.create('padding-left', {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),
				})
			}}>
				{/* 传递笔记本信息到下一级 */}
				<NotebookProvider value={notebook} updater={updateCurrentNotebook}>
					<HorizontalCut value={hCut}>
						{children(subpage)}
					</HorizontalCut>
				</NotebookProvider>
			</div>
		</>
	)
}

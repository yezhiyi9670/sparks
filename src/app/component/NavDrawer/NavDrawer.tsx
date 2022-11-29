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
import settingsItems from './const/settingsItems'

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
	selected?: boolean
}
function NavItem({ text, icon, onClick, selected, ...other }: NavItemProps) {
	return (
		<ListItem disablePadding {...selected && {selected: true}}>
			<ListItemButton onClick={(e: React.SyntheticEvent) => onClick && onClick(e)}>
				<ListItemIcon sx={{fontSize: 24}}>
					{icon}
				</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	)
}

interface NavDrawerFrameProps {
	open: boolean
	children: React.ReactNode
	onClose?: () => void
}
export default function NavDrawerFrame({ open, children, onClose, ...other }: NavDrawerFrameProps) {
	const drawerWidth = 280
	const classes = useStyles()
	const theme = useTheme()
	const isMobile = useMobile()
	const LNG = useI18n()

	const [ navTab, setNavTab ] = React.useState('notebook')

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
				<Box sx={{ overflow: 'auto' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs variant="fullWidth" value={navTab} onChange={(_, val: string) => {setNavTab(val)}} aria-label="lab API tabs example">
							<Tab label={LNG('nav.drawer.tab.notebook')} value="notebook" />
							<Tab label={LNG('nav.drawer.tab.settings')} value="settings" />
						</Tabs>
					</Box>
					{navTab == 'notebook' && <>
						<List>
							<NavItem text='Notebook 1' icon={<Icons.MdBook />} selected />
							<NavItem text='Notebook 2' icon={<Icons.MdBook />} />
						</List>
						<Divider />
						<List>
							<NavItem text={LNG('nav.drawer.notebook.new')} icon={<Icons.MdAdd />} />
						</List>
					</>}
					{navTab == 'settings' && (
						<List>
							{settingsItems.items.map((item) => (
								<NavItem key={item.key} text={LNG(settingsItems.i18nPrefix + item.key)} icon={item.icon} />
							))}
						</List>
					)}
				</Box>
			</Drawer>
			<div className={classes.NavDrawerOutlet} style={{
				paddingLeft: (open && !isMobile) ? drawerWidth : 0,
				transition: theme.transitions.create('padding-left',{
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen
				}),
				...(open && {
					transition: theme.transitions.create('padding-left',{
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),
				})
			}}>
				{children}
			</div>
		</>
	)
}

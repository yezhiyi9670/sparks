import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Divider } from '@mui/material'
import * as Icon from 'react-icons/md'
import { useDarkMode, useDarkModeSetter } from '../../lib/darkmode/darkmode'
import { useI18n } from '../../lib/i18n/i18n'
import { useMobile } from '../../lib/mobile/mobile'

interface NavAppbarProps {
	onMenuToggle: () => void
}

export default function NavAppbar({ onMenuToggle, ...other }: NavAppbarProps) {
	const LNG = useI18n()
	const isMobile = useMobile()
	
	const darkMode = useDarkMode()
	const setDarkMode = useDarkModeSetter()
	const ModeToggleIcon = darkMode ? Icon.MdLightMode : Icon.MdDarkMode
	
	const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null)

	function handleMenu(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	function handleDarkMode() {
		setDarkMode(!darkMode)
	}

	return (
		<AppBar position="fixed" sx={{
			boxShadow: 'none',
			background: darkMode ? '#333333' : '#ECECEC',
			color: darkMode ? 'white' : '#333333',
		}}>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{mr: 2}}
					onClick={onMenuToggle}
				>
					<Icon.MdMenu />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Sparks
				</Typography>
				<div>
					<IconButton
						size="large"
						aria-label="toggle dark mode"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit"
						onClick={handleDarkMode}
					>
						<ModeToggleIcon />
					</IconButton>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit"
						onClick={handleMenu}
					>
						<Icon.MdAccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose} sx={{fontWeight: 700}}>{LNG('nav.user.username', 'null')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.user.account')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.user.subscription')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.user.logout')}</MenuItem>
						<Divider sx={{my: 0.5}} />
						<MenuItem onClick={handleClose} sx={{fontWeight: 700}}>{LNG('nav.guest.username')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.guest.login')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.guest.register')}</MenuItem>
						<Divider sx={{my: 0.5}} />
						<MenuItem onClick={handleClose}>{LNG('nav.option.preferences')}</MenuItem>
						<MenuItem onClick={handleClose}>{LNG('nav.option.sync')}</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	)
}

import { Box, Divider, IconButton, Toolbar, useTheme } from '@mui/material'
import React from 'react'
import { IconType } from 'react-icons'
import { useAppbarBackground } from '../alert/PopupScreen'

export function CompactToolbar({ children, ...other }: {children: React.ReactNode}) {
	const toolbarBackground = useAppbarBackground()

	return (
		<Toolbar variant='dense' disableGutters sx={{backgroundColor: toolbarBackground, minHeight: '40px', padding: '0 4px'}}>
			{children}
		</Toolbar>
	)
}
export function TitleToolbar({ children, ...other }: {children: React.ReactNode}) {
	const toolbarBackground = useAppbarBackground()

	return (
		<Toolbar variant='dense' disableGutters sx={{backgroundColor: toolbarBackground, minHeight: '40px', padding: '0 8px'}}>
			{children}
		</Toolbar>
	)
}

interface ToolbarButtonProps {
	onClick?: (_: React.MouseEvent<any, MouseEvent>) => void
	disabled?: boolean
}
export function ToolbarIconButton({ onClick, icon, ...other }: {
	icon: IconType
} & ToolbarButtonProps) {
	const Icon = icon
	
	return (
		<IconButton size='small' onClick={onClick} {...other}>
			<Icon fontSize='24px' />
		</IconButton>
	)
}
export function ToolbarSymbolButton({ onClick, symbol, ...other }: {
	symbol: string
} & ToolbarButtonProps) {
	return (
		<IconButton size='small' onClick={onClick} sx={{width: '34px', height: '34px', fontSize: '18px', fontWeight: 700}} {...other}>
			{symbol}
		</IconButton>
	)
}
export function ToolbarDivider() {
	const theme = useTheme()

	return <Box sx={{
		backgroundColor: theme.palette.divider,
		width: '1.5px',
		height: '26px',
		display: 'inline-block',
		margin: '0 4px'
	}}></Box>
}

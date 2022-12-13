import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SlideUpTransition } from '../transition/SlideUpTransition'
import * as Icons from 'react-icons/md'
import { useDarkMode } from '../../lib/darkmode/darkmode'

interface PopupScreenProps {
	open: boolean
	children?: React.ReactNode
}
/**
 * 子屏幕式弹窗
 */
export function PopupScreen({ open, children }: PopupScreenProps) {
	return (
		<Dialog
			fullScreen
			open={open}
			TransitionComponent={SlideUpTransition}
			sx={{
				'>.MuiBackdrop-root': {
					// 上滑效果没什么问题，但是后面的暗色遮罩会显得压抑——至少，Android 里面是没有这个遮罩的。
					visibility: 'hidden'
				},
				'>.MuiDialog-container>.MuiDialog-paper': {
					// 暗色模式背景色问题
					backgroundImage: 'none'
				}
			}}
		>
			{children}
		</Dialog>
	)
}

export function useAppbarBackground() {
	const darkMode = useDarkMode()
	return darkMode ? '#333333' : '#ECECEC'
}

interface PopupAppbarProps {
	title: string
	onClose?: () => void
	onConfirm?: () => void
}
/**
 * 子屏幕上的应用栏
 */
export function PopupAppbar({ title, onClose, onConfirm }: PopupAppbarProps) {
	const darkMode = useDarkMode()
	const background = useAppbarBackground()

	return (
		<AppBar position='fixed' sx={{
			boxShadow: 'none',
			background: background,
			color: darkMode ? 'white' : '#333333',
		}}>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{mr: 2}}
					onClick={onClose}
				>
					<Icons.MdClose />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap', flexGrow: 1, flexShrink: 1, overflowX: 'hidden', textOverflow: 'ellipsis' }}>
					{title}
				</Typography>
				<div style={{whiteSpace: 'nowrap'}}>
					<IconButton
						size="large"
						aria-label="toggle dark mode"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={onConfirm}
					>
						<Icons.MdDone />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
	)
}

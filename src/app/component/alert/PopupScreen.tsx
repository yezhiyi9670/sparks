import { AppBar, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SlideUpTransition } from '../transition/SlideUpTransition'
import * as Icons from 'react-icons/md'
import { useDarkMode } from '../../lib/darkmode/darkmode'
import { useMobile } from '../../lib/mobile/mobile'
import AppbarOutlet from '../NavAppbar/AppbarOutlet'

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
/**
 * 选择弹窗
 * 此弹窗在移动端（W < 600）上的宽度为 100%，其他界面上的宽度为 100% - 144px，最大 1000px。
 */
export function PopupSelectScreenWithAppbar({ open, title, children, onClose, dividers }: PopupScreenProps & {
	onClose: () => void
	title: string
	dividers?: boolean
}) {
	const isMobile = useMobile()
	
	return (
		<Dialog
			open={open}
			onClose={onClose}
			{...isMobile ? {
				fullScreen: true,
				TransitionComponent: SlideUpTransition,
				sx: {
					'>.MuiBackdrop-root': {
						// 上滑效果没什么问题，但是后面的暗色遮罩会显得压抑——至少，Android 里面是没有这个遮罩的。
						visibility: 'hidden'
					},
					'>.MuiDialog-container>.MuiDialog-paper': {
						// 暗色模式背景色问题
						backgroundImage: 'none'
					}
				}
			} : {
				sx: {
					'>.MuiDialog-container>.MuiPaper-root': {
						width: 'calc(100% - 144px)',
						maxWidth: '1200px',
						height: 'calc(100% - 144px)'
					}
				}
			}}
		>
			{!isMobile && <>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent dividers={dividers} sx={{padding: 0}}>
					{children}
				</DialogContent>
			</>}
			{isMobile && <>
				<PopupAppbar title={title} noSave onClose={onClose} />
				<AppbarOutlet>
					{children}
				</AppbarOutlet>
			</>}
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
	disabled?: boolean
	disableSave?: boolean
	noSave?: boolean
}
/**
 * 子屏幕上的应用栏
 */
export function PopupAppbar({ title, onClose, onConfirm, disabled, disableSave, noSave }: PopupAppbarProps) {
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
					disabled={disabled}
				>
					<Icons.MdClose />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap', flexGrow: 1, flexShrink: 1, overflowX: 'hidden', textOverflow: 'ellipsis' }}>
					{title}
				</Typography>
				{!noSave && <div style={{whiteSpace: 'nowrap'}}>
					<IconButton
						size="large"
						aria-label="toggle dark mode"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={onConfirm}
						disabled={disabled || disableSave}
					>
						<Icons.MdDone />
					</IconButton>
				</div>}
			</Toolbar>
		</AppBar>
	)
}

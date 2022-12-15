import { Box, Grid, Paper } from '@mui/material'
import React from 'react'

/*
这是在桌面端编辑界面上使用的块状编辑窗口
*/

interface HasChildren {
	children: React.ReactNode
}

/**
 * 外层滚动根
 */
export function FlowGridScrollRoot(props: HasChildren & {
	scrollable?: boolean
}) {
	return (
		<Box sx={{
			height: '100%', overflowY: 'auto',
			padding: '8px'
		}}>
			{props.children}
		</Box>
	)
}

/**
 * 包裹网格
 */
export function FlowGridGrid(props: HasChildren) {
	return (
		<Grid container sx={{
			height: '100%', maxWidth: '1550px', margin: '0 auto',
			overflowY: 'visible'
		}}>
			{props.children}
		</Grid>
	)
}

/**
 * 自动列
 */
export function FlowGridLeft(props: HasChildren) {
	return (
		<Box sx={{
			height: '100%',
			flexGrow: 1,
			padding: '12px',
			overflowY: 'visible'
		}}>
			{props.children}
		</Box>
	)
}

/**
 * 边栏列
 */
export function FlowGridSide(props: HasChildren) {
	return (
		<Box sx={{
			height: '100%', width: '304px', padding: '12px'
		}}>
			{props.children}
		</Box>
	)
}

/**
 * 高度项目
 */
export function FlowGridItem(props: HasChildren & {
	gutterBottom?: boolean
	height: string | number
}) {
	return (
		<Box sx={{
			height: props.height,
			...(props.gutterBottom ? {
				marginBottom: '24px'
			} : {})
		}}>
			{props.children}
		</Box>
	)
}

/**
 * 项目卡片
 */
export function FlowGridCard({ children, notFull, allowOverflow, noShadow }: {children: React.ReactNode, notFull?: boolean, allowOverflow?: boolean, noShadow?: boolean}) {
	return <Paper elevation={noShadow ? 0 : 3} sx={{
		display: 'flex',
		flexDirection: 'column',
		[notFull ? 'maxHeight' : 'height']: '100%',
		borderRadius: '6px',
		overflow: 'hidden',
		...(allowOverflow ? {
			overflow: 'visible'
		} : {})
	}}>{children}</Paper>
}

/**
 * 列终止
 */
export function FlowGridEnd() {
	return <Box sx={{
		height: '1px'
	}}></Box>
}

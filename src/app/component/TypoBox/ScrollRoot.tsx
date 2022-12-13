import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	ScrollRoot: {
		height: '100%',
		overflowY: 'auto',
		width: '100%'
	}
})

interface ScrollRootProps {
	children: React.ReactNode
}
/**
 * 滚动视图
 */
export function ScrollRoot({ children }: ScrollRootProps) {
	const classes = useStyles()
	
	return <div className={classes.ScrollRoot}>
		{children}
	</div>
}

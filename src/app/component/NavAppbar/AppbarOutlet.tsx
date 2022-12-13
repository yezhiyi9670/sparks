import { useMobile } from '../../lib/mobile/mobile'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	AppbarOutlet: {
		position: 'fixed',
		left: 0,
		right: 0,
		top: 56,
		bottom: 0,
		'@media(min-width: 600px)': {
			top: 64
		}
	},
	AppbarOutlet_inner: {
		position: 'relative',
		width: '100%',
		height: '100%'
	}
})

export default function AppbarOutlet({children, ...other}: {children?: React.ReactNode}) {
	const classes = useStyles()

	return (
		<div className={classes.AppbarOutlet} {...other}>
			<div className={classes.AppbarOutlet_inner}>
				{children}
			</div>
		</div>
	)
}

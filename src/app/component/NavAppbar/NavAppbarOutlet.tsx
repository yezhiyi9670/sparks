import { useMobile } from '../../lib/mobile/mobile'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	NavbarAppOutlet: {
		position: 'fixed',
		left: 0,
		right: 0,
		top: 56,
		bottom: 0,
		'@media(min-width: 600px)': {
			top: 64
		}
	},
	NavAppbarOutlet_inner: {
		position: 'relative',
		width: '100%',
		height: '100%'
	}
})

export default function NavAppbarOutlet({children, ...other}: {children?: React.ReactNode}) {
	const classes = useStyles()

	return (
		<div className={classes.NavbarAppOutlet} {...other}>
			<div className={classes.NavAppbarOutlet_inner}>
				{children}
			</div>
		</div>
	)
}

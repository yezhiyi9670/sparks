import React from 'react'
import NavAppbar from './component/NavAppbar/NavAppbar'
import NavAppbarOutlet from './component/NavAppbar/NavAppbarOutlet'
import NavDrawerFrame from './component/NavDrawer/NavDrawer'
import { MobileProvider } from './lib/mobile/mobile'

export function AppMobile() {
	const [ drawerOpen, setDrawerOpen ] = React.useState(false)

	return <MobileProvider value={true}>
		<NavDrawerFrame onClose={() => setDrawerOpen(false)} open={drawerOpen}>
			<NavAppbar onMenuToggle={() => setDrawerOpen(!drawerOpen)} />
			<NavAppbarOutlet>
			</NavAppbarOutlet>
		</NavDrawerFrame>
	</MobileProvider>
}

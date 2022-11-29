import React from 'react'
import NavAppbar from './component/NavAppbar/NavAppbar'
import NavAppbarOutlet from './component/NavAppbar/NavAppbarOutlet'
import NavDrawerFrame from './component/NavDrawer/NavDrawer'
import { useI18n } from './lib/i18n/i18n'
import { MobileProvider } from './lib/mobile/mobile'

export function AppDesktop() {
	const [ drawerOpen, setDrawerOpen ] = React.useState(true)

	return <MobileProvider value={false}>
		<NavAppbar onMenuToggle={() => setDrawerOpen(!drawerOpen)} />
		<NavAppbarOutlet>
			<NavDrawerFrame open={drawerOpen}>
			</NavDrawerFrame>
		</NavAppbarOutlet>
	</MobileProvider>
}

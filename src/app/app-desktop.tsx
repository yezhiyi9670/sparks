import React from 'react'
import NavAppbar from './component/NavAppbar/NavAppbar'
import AppbarOutlet from './component/NavAppbar/AppbarOutlet'
import NavDrawerFrame from './component/NavDrawer/NavDrawer'
import { useNotebook } from './component/NavDrawer/NotebookContext'
import { NotebookScreen } from './component/screen/NotebookScreen/NotebookScreen'
import { SettingsScreen } from './component/screen/SettingsScreen/SettingsScreen'
import { useI18n } from './lib/i18n/i18n'
import { MobileProvider } from './lib/mobile/mobile'

export function AppDesktop() {
	const [ drawerOpen, setDrawerOpen ] = React.useState(true)

	return <>
		<NavAppbar onMenuToggle={() => setDrawerOpen(!drawerOpen)} />
		<AppbarOutlet>
			<NavDrawerFrame open={drawerOpen}>
				{(page) => page == 'notebook' ? 
					<NotebookScreen desktopDrawerOpen={drawerOpen} /> :
					<SettingsScreen page={page} />}
			</NavDrawerFrame>
		</AppbarOutlet>
	</>
}

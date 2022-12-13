import React from 'react'
import NavAppbar from './component/NavAppbar/NavAppbar'
import AppbarOutlet from './component/NavAppbar/AppbarOutlet'
import NavDrawerFrame from './component/NavDrawer/NavDrawer'
import { NotebookScreen } from './component/screen/NotebookScreen/NotebookScreen'
import { MobileProvider } from './lib/mobile/mobile'
import { SettingsScreen } from './component/screen/SettingsScreen/SettingsScreen'
import { useNotebook } from './component/NavDrawer/NotebookContext'
import subpages from './component/NavDrawer/const/subpages'
import { findWithKey } from './lib/util/array'
import { useI18n } from './lib/i18n/i18n'

function TitledNavAppbar(props: {page: string, onMenuToggle: () => void}) {
	const notebook = useNotebook()
	const LNG = useI18n()

	let title: undefined | string = undefined
	if(props.page == 'notebook') {
		if(notebook) {
			title = notebook.name
		}
	} else {
		title = LNG(subpages.i18nPrefix + props.page)
	}

	return <NavAppbar onMenuToggle={props.onMenuToggle} title={title} />
}

export function AppMobile() {
	const [ drawerOpen, setDrawerOpen ] = React.useState(false)

	return <>
		<NavDrawerFrame onClose={() => setDrawerOpen(false)} open={drawerOpen}>
			{(page) => {return <>
				<TitledNavAppbar onMenuToggle={() => setDrawerOpen(!drawerOpen)} page={page} />
				<AppbarOutlet>
					{page == 'notebook' ? 
						<NotebookScreen desktopDrawerOpen={false} /> :
						<SettingsScreen page={page} />}
				</AppbarOutlet>
			</>}}
		</NavDrawerFrame>
	</>
}

import { Box } from '@mui/material'
import { useI18n } from '../../lib/i18n/i18n'
import React from 'react'
import * as Icons from 'react-icons/md'

interface VoidPageProps {
	title: string
	tips: React.ReactNode
	icon: React.ReactNode
}
export function VoidPage({ title, tips, icon, ...other }: VoidPageProps) {
	return <Box sx={{padding: '24px', height: '100%', width: '100%', display: 'table', userSelect: 'none'}}>
		<Box sx={{display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', opacity: 0.5}}>
			<span style={{fontSize: '80px'}}>{icon}</span><br />
			<span style={{display: 'inline-block', fontSize: '24px', marginTop: '-0.8em'}}>{title}</span><br />
			<span style={{display: 'inline-block', marginTop: '0.75em', marginBottom: '32px'}}>{tips}</span>
		</Box>
	</Box>
}
export function ConstructingPage({ desc, ...other }: {desc: string}) {
	const LNG = useI18n()

	return <VoidPage
		icon={<Icons.MdConstruction />}
		title={LNG('ui.wip.title')}
		tips={<>{LNG('ui.wip.tips')}<br />{desc}</>} />
}

export function ConstructingPageSecret({ desc, ...other }: {desc: string}) {
	const LNG = useI18n()

	return <VoidPage
		icon={<Icons.MdHelpCenter />}
		title={LNG('ui.wip_secret.title')}
		tips={<>{LNG('ui.wip_secret.tips')}<br />{desc}</>} />
}

export function NothingPage() {
	const LNG = useI18n()

	return <VoidPage
		icon={<Icons.MdBorderClear />}
		title={LNG('ui.empty.title')}
		tips={LNG('ui.empty.tips')}
	/>
}

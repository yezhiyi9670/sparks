import { ConstructingPage, VoidPage } from '../../../component/VoidPage/VoidPage'
import { useI18n } from '../../../lib/i18n/i18n'
import React from 'react'
import * as Icons from 'react-icons/md'
import { useTitleSetter } from '../../../lib/util/dom'
import subpages from '../../NavDrawer/const/subpages'

interface SettingsScreenProps {
	page: string
}
export function SettingsScreen({ page, ...other }: SettingsScreenProps) {
	const LNG = useI18n()
	const setTitle = useTitleSetter()

	setTitle(LNG('title.settings', LNG('sparks'), LNG(subpages.i18nPrefix + page)))
	
	return <ConstructingPage desc={page} />
}

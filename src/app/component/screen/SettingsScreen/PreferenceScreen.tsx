import { Typography } from '@mui/material'
import React from 'react'
import { getAvailableLanguages, useI18n } from '../../../lib/i18n/i18n'
import { useLanguage, useLanguageSetter } from '../../../lib/i18n/SwitchableLanguage'
import { ConfigDefinition, ConfigOptionSelect, ConfigSection } from '../../ConfigScreen/config-data'
import { ConfigScreen } from '../../ConfigScreen/ConfigScreen'
import { ScrollRoot } from '../../TypoBox/ScrollRoot'
import { TypoBox } from '../../TypoBox/TypeBox'
import { NothingPage } from '../../VoidPage/VoidPage'

export function PreferenceScreen() {
	const LNG = useI18n()
	const languageKey = useLanguage()
	const setLanguage = useLanguageSetter()

	let resetter = () => {}
	React.useEffect(() => {
		resetter()
	})

	const configDefinition = ConfigDefinition('pref.', [
		// 界面选项
		ConfigSection('ui', [
			ConfigOptionSelect('language', languageKey, async (values) => {
				setLanguage(values['language'] as string)
				return null
			}, getAvailableLanguages())
		])
	])

	return (
		<ScrollRoot>
			<TypoBox>
				<Typography variant="h4" gutterBottom>
					{LNG('pref.title')}
				</Typography>
				<Typography variant='subtitle2' gutterBottom sx={{opacity: 0.6}}>
					{LNG('pref.tips')}
				</Typography>
				<ConfigScreen definition={configDefinition} getResetter={(func) => resetter = func} />
			</TypoBox>
		</ScrollRoot>
	)
}

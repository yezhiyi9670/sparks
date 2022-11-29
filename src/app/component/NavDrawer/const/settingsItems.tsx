import React from 'react'
import * as Icons from 'react-icons/md'

export interface settingsItemsSchema {
	i18nPrefix: string,
	items: {
		key: string,
		icon: React.ReactNode
	}[]
}

const settingsItems: settingsItemsSchema = {
	i18nPrefix: 'nav.drawer.settings.',
	items: [
		{
			key: 'account',
			icon: <Icons.MdAccountCircle />
		},
		{
			key: 'preferences',
			icon: <Icons.MdSettings />
		},
		{
			key: 'sync',
			icon: <Icons.MdSync />
		},
		{
			key: 'api',
			icon: <Icons.MdApi />
		},
		{
			key: 'subscription',
			icon: <Icons.MdPayment />
		}
	]
}

export default settingsItems

import React from 'react'
import * as Icons from 'react-icons/md'

export interface subpageSchema {
	i18nPrefix: string,
	items: {
		type: 'settings' | 'notebook'
		key: string,
		icon: React.ReactNode,
		requireLogin: boolean
	}[]
}

const subpages: subpageSchema = {
	i18nPrefix: 'nav.drawer.settings.',
	items: [
		{
			type: 'notebook',
			key: 'notebook',
			icon: <Icons.MdBook />,
			requireLogin: false
		},
		{
			type: 'settings',
			key: 'account',
			icon: <Icons.MdAccountCircle />,
			requireLogin: true
		},
		{
			type: 'settings',
			key: 'sync',
			icon: <Icons.MdSync />,
			requireLogin: true
		},
		{
			type: 'settings',
			key: 'preferences',
			icon: <Icons.MdSettings />,
			requireLogin: false
		},
		{
			type: 'settings',
			key: 'api',
			icon: <Icons.MdApi />,
			requireLogin: true
		},
		{
			type: 'settings',
			key: 'subscription',
			icon: <Icons.MdPayment />,
			requireLogin: true
		}
	]
}

export default subpages

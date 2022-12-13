import React from 'react'
import * as Icons from 'react-icons/md'

interface SubpagesSchema {
	i18nPrefix: string,
	items: {
		key: string,
		icon: React.ReactNode
	}[]
}

const subpages: SubpagesSchema = {
	i18nPrefix: 'notebook.nav.',
	items: [
		{
			key: 'sparks',
			icon: <Icons.MdStickyNote2 />
		},
		{
			key: 'tree',
			icon: <Icons.MdAccountTree />
		},
		{
			key: 'media',
			icon: <Icons.MdPermMedia />
		},
		{
			key: 'config',
			icon: <Icons.MdBuild />
		}
	]
}

export default subpages

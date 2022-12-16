import React, { useEffect } from 'react'

export function TestUpdateDetector(props: {label?: string, [_: string]: unknown}) {
	useEffect(() => {
		console.log('detect update', props.label)
	})

	return null
}

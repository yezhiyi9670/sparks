import { Box } from '@mui/material'
import React, { useEffect } from 'react'

export function TestDOMRender() {
	const ref = React.createRef<HTMLDivElement>()

	useEffect(() => {
		if(ref.current) {
			ref.current.innerHTML = 'CSS <i><b>IS</b></i> AWESOME'
		}
	})
	
	return (
		<Box ref={ref}>
			
		</Box>
	)
}

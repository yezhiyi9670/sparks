import { Box } from '@mui/material'
import React from 'react'
import { useMobile } from '../../lib/mobile/mobile'

interface TypeBoxProps {
	children: React.ReactNode
}
export function TypoBox({children, ...other}: TypeBoxProps) {
	const isMobile = useMobile()

	return <Box sx={{padding: isMobile ? '16px' : '32px'}}>
		{children}
	</Box>
}

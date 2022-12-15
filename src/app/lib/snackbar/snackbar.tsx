import { Snackbar, Alert } from '@mui/material'
import React from 'react'
import { randomToken } from '../util/random'

type Severity = 'info' | 'warning'| 'error' | 'success'
const SnackbarContext = React.createContext((severity: Severity, text: string, duration?: number) => {})

let displayToken = '' 
export function SnackbarProvider({ children }: {children: React.ReactNode}) {
	const [ open, setOpen ] = React.useState(false)
	const [ text, setText ] = React.useState('')
	const [ severity, setSeverity ] = React.useState<Severity>('info')

	function handleClose() {
		setOpen(false)
	}
	function showSnackbar(severity: Severity, text: string, duration: number = 2500) {
		const myToken = randomToken(12)
		displayToken = myToken
		setText(text)
		setSeverity(severity)
		setOpen(true)
		setTimeout(() => {
			if(myToken == displayToken) {
				setOpen(false)
			}
		}, duration)
	}

	return <>
		<SnackbarContext.Provider value={showSnackbar}>
			{children}
		</SnackbarContext.Provider>
		<Snackbar open={open}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	</>
}

export function useSnackbar() {
	return React.useContext(SnackbarContext)
}

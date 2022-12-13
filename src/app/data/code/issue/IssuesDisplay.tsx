import { Typography, useTheme } from '@mui/material';
import React from 'react'
import { useI18n } from '../../../lib/i18n/i18n';
import { findLineNumber } from '../../../lib/util/string';
import { Issue } from './issue';

export function IssuesDisplay({ issues, code, ...other }: {issues: Issue[], code: string}) {
	const theme = useTheme()
	const LNG = useI18n()

	if(issues.length == 0) {
		return <Typography variant='body2' gutterBottom>
			{LNG('issue.none')}
		</Typography>
	}
	return <>
		{issues.map((issue, index) => {
			let keyType = issue.key
			if(keyType.indexOf('.') != -1) {
				keyType = keyType.substring(0, keyType.indexOf('.'))
			}

			return <React.Fragment key={index}>
				<Typography variant='body2' gutterBottom sx={{
					// color: theme.palette.warning.main
				}}>
					{LNG('issue.msg_template',
						LNG('severity.' + issue.severity),
						LNG('issue.' + keyType),
						findLineNumber(code, issue.index),
						LNG('issue.' + issue.key, ...(issue.args ?? []))
					)}
				</Typography>
			</React.Fragment>
		})}
	</>
}

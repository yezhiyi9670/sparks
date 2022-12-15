import { Icon, Typography } from '@mui/material'
import React from 'react'
import { TagChip, TagRenderer, tagRenderText, Tags } from '../../../../data/tag/tag'
import { useI18n } from '../../../../lib/i18n/i18n'
import { iterateMap, iterateSize } from '../../../../lib/util/array'
import { resolveAdaptiveColor } from '../../../../lib/util/color'
import * as Icons from 'react-icons/md'

interface TagsPreviewProps {
	tags: Tags
	noneText: string
	disableGutterTop?: boolean
}
export function TagsPreview({ tags, noneText, disableGutterTop }: TagsPreviewProps) {
	const LNG = useI18n()

	const size = iterateSize(tags)

	if(size == 0) {
		return (
			<Typography variant='body2' gutterBottom>
				{noneText}
			</Typography>
		)
	} else {
		let isFirst = true
		return <>
			{iterateMap(tags, (tag) => {
				let myFirst = isFirst
				isFirst = false
				let icon = <Icons.MdLocalOffer fontSize={18} style={{transform: 'translateY(4px)'}} />
				if(tag.type == 'category') {
					icon = <Icons.MdFolder fontSize={18} style={{transform: 'translateY(4px)'}} />
				} else if(tag.type == 'multitag') {
					icon = <Icons.MdStyle fontSize={18} style={{transform: 'translateY(4px)'}} />
				}
				return <React.Fragment key={tag.name}>
					<Typography variant='body1' gutterBottom mt={myFirst && disableGutterTop ? 0 : 2} sx={{
						whiteSpace: 'nowrap',
						overflowX: 'hidden',
						textOverflow: 'ellipsis'
					}}>
						{icon} {tag.label ? tag.label : LNG('notebook.tag.preview.titleless')}
					</Typography>
					{/* 标签预览 */}
					<Typography variant='body2' component='div' gutterBottom>
						{iterateMap(tag.values, (value) => {
							if(value.type == 'void') {
								return <TagChip
									key={value.name}
									text={LNG('notebook.tag.preview.void')}
									color={resolveAdaptiveColor('Grey-T200')!}
									sx={{marginRight: '4px', marginBottom: '6px'}}
								/>
							}
							return <React.Fragment key={value.name}>
								<TagRenderer tags={tags} tagName={tag.name} values={[value.name]} sx={{marginRight: '4px', marginBottom: '6px'}} />
							</React.Fragment>
						})}
					</Typography>
					{/* 代号 */}
					<Typography variant='body2' component='div' gutterBottom mt={-0.5} sx={{
						opacity: 0.6,
						whiteSpace: 'nowrap',
						overflowX: 'hidden',
						textOverflow: 'ellipsis'
					}}>
						{LNG('notebook.tag.preview.codename', tag.name)}
					</Typography>
					{/* 默认值 */}
					{tag.type != 'multitag' && <Typography variant='body2' component='div' gutterBottom sx={{
						opacity: 0.6,
						whiteSpace: 'nowrap',
						overflowX: 'hidden',
						textOverflow: 'ellipsis'
					}} mt={-0.5}>
						{(() => {
							let defaultValue = tag.values[tag.defaultValue]
							let defaultLabel = ''
							if(defaultValue.type == 'value') {
								defaultLabel = defaultValue.label ?? defaultValue.name
							} else if(defaultValue.type == 'default') {
								defaultLabel = LNG('notebook.tag.preview.default')
							} else {
								defaultLabel = LNG('notebook.tag.preview.void')
							}
							return LNG('notebook.tag.preview.default_value', defaultLabel)
						})()}
					</Typography>}
					{/* 外源值 */}
					{tag.type == 'category' && tag.externValue !== null && <Typography variant='body2' component='div' gutterBottom sx={{
						opacity: 0.6,
						whiteSpace: 'nowrap',
						overflowX: 'hidden',
						textOverflow: 'ellipsis'
					}} mt={-0.5}>
						{LNG('notebook.tag.preview.has_extern')}
					</Typography>}
				</React.Fragment>
			})}
			<Typography variant='body2' gutterBottom mt={2}>
				{LNG('notebook.tag.preview.total', size)}
			</Typography>
		</>
	}
}

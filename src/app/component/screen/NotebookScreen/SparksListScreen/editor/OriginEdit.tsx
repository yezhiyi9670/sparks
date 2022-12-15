import { Button, Typography } from '@mui/material'
import React from 'react'
import { Notebook } from '../../../../../data/notebook/notebook'
import { NotebookEntity, NotebookEntityFactory } from '../../../../../data/notebook/notebook-entity'
import { SparkEntity, SparkEntityFactory } from '../../../../../data/spark/spark-entity'
import { useI18n } from '../../../../../lib/i18n/i18n'
import { SparkSelectScreen } from '../SparkSelectScreen'
import { SparkCard } from '../SparksGrid'

interface PrevEditProps {
	notebook: NotebookEntity
	spark: SparkEntity
	value: string | null
	onChange: (_: string | null) => void
	onSelect?: (_: SparkEntity) => void
}
/**
 * 上一个版本的选择器
 */
export function PrevEdit({ notebook, spark, value, onChange, onSelect }: PrevEditProps) {
	const LNG = useI18n()

	const prevSpark = value !== null ? notebook.getSparkEntity(value) : null

	let openSparkPicker = () => void(0) as void
	const sparkPicker = <SparkSelectScreen
		title={LNG('spark.origin.prev.caption')}
		getOpener={(func) => openSparkPicker = func}
		onSelect={async (selectedSpark: SparkEntity) => {
			if(selectedSpark.alias == spark.alias) {
				return LNG('ref.error.self')
			}
			let curr: SparkEntity | null = selectedSpark
			while(curr !== null) {
				if(curr.alias == spark.alias) {
					return LNG('ref.error.circle')
				}
				curr = curr.getPrevSpark(notebook)
				if(curr !== null && curr.alias == selectedSpark.alias) {
					break
				}
			}
			onChange(selectedSpark.alias)
			return null
		}}
	/>

	return <>
		<Typography variant='body2' gutterBottom component='div' pb={1}>
			{prevSpark ? <>
				<SparkCard
					notebook={notebook}
					spark={prevSpark}
					allowRemove
					onAction={() => {
						onChange(null)
					}}
					onSelect={(spark) => {
						onSelect && onSelect(spark)
					}}
				/>
			</> : <>
				{LNG('spark.origin.prev.none')}
			</>}
		</Typography>
		<Typography variant='body1'>
			<Button variant='outlined' onClick={() => openSparkPicker()}>
				{LNG('spark.origin.choose')}
			</Button>
		</Typography>
		{sparkPicker}
	</>
}

interface OriginEditProps {
	notebook: NotebookEntity
	spark: SparkEntity
	value: string[]
	onChange: (_: string[]) => void
	onSelect?: (_: SparkEntity) => void
}
/**
 * 灵感来源选择器
 */
export function OriginEdit({ notebook, spark, value, onChange, onSelect }: OriginEditProps) {
	const LNG = useI18n()

	let openSparkPicker = () => void(0) as void
	const sparkPicker = <SparkSelectScreen
		title={LNG('spark.origin.origin.caption')}
		getOpener={(func) => openSparkPicker = func}
		onSelect={async (selectedSpark: SparkEntity) => {
			if(selectedSpark.alias == spark.alias) {
				return LNG('ref.error.self.origin')
			}
			if(value.indexOf(selectedSpark.alias) != -1) {
				return LNG('ref.error.selected')
			}
			onChange(value.concat([selectedSpark.alias]))
			return null
		}}
		allowExtern
	/>

	function onRemove(index: number) {
		const newValue = value.slice()
		newValue.splice(index, 1)
		onChange(newValue)
	}

	const sparkDisplayList = value.map((alias, index) => {
		const originSpark = notebook.existSpark(alias) ? (
			notebook.getSparkEntity(alias)!
		) : (
			SparkEntityFactory.createFake(alias, LNG)
		)
		if(originSpark.isFake && !notebook.acceptNonexistentSpark()) {
			return undefined
		}
		return <Typography key={alias} variant='body2' gutterBottom component='div' pb={1}>
			<SparkCard
				notebook={notebook}
				spark={originSpark}
				allowRemove
				onAction={() => onRemove(index)}
				onSelect={(spark) => {
					onSelect && onSelect(spark)
				}}
			/>
		</Typography>
	}).filter((item) => item !== undefined)

	return <>
		{sparkDisplayList.length != 0 ? sparkDisplayList : <>
			<Typography variant='body2' gutterBottom component='div' pt={1} pb={1}>
				{LNG('spark.origin.prev.none')}
			</Typography>
		</>}
		<Typography variant='body1'>
			<Button variant='outlined' onClick={() => openSparkPicker()}>
				{LNG('spark.origin.add')}
			</Button>
		</Typography>
		{sparkPicker}
	</>
}

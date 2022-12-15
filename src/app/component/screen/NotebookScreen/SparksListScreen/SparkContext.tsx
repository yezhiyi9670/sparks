import React from 'react'
import { SparkEntity } from '../../../../data/spark/spark-entity'

const SparkContext = React.createContext<[SparkEntity | null, string[]]>([null, []])

interface SparkProviderProps {
	value: SparkEntity | null
	children: React.ReactNode
}
/**
 * 提供卡片
 */
export function SparkProvider({ value, children }: SparkProviderProps) {
	const lst = useSparkAliasStack()
	
	return (
		<SparkContext.Provider value={[value, value ? lst.concat([value.alias]) : lst]}>
			{children}
		</SparkContext.Provider>
	)
}

/**
 * 获取卡片
 */
export function useSpark() {
	return React.useContext(SparkContext)[0]
}

/**
 * 获取卡片别名列表
 */
export function useSparkAliasStack() {
	return React.useContext(SparkContext)[1]
}


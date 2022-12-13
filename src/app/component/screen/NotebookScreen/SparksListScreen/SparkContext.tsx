import React from 'react'
import { SparkEntity } from '../../../../data/spark/spark-entity'

const SparkContext = React.createContext<SparkEntity | null>(null)

interface SparkProviderProps {
	value: SparkEntity | null
	children: React.ReactNode
}
/**
 * 提供卡片
 */
export function SparkProvider({ value, children }: SparkProviderProps) {
	return (
		<SparkContext.Provider value={value}>
			{children}
		</SparkContext.Provider>
	)
}

/**
 * 获取卡片
 */
export function useSpark() {
	return React.useContext(SparkContext)
}


import React from 'react'
import { NotebookEntity } from '../../data/notebook/notebook-entity'

/**
 * 当前选中笔记本
 */
export const NotebookContext = React.createContext<[
	NotebookEntity | null, () => void
]>([null as NotebookEntity | null, () => void(0) as void])

/**
 * 使用当前选中的笔记本
 */
export function useNotebook() {
	return React.useContext(NotebookContext)[0]
}
/**
 * 使用笔记本更新器
 */
export function useNotebookUpdater() {
	return React.useContext(NotebookContext)[1]
}

interface NotebookProviderProps {
	value: NotebookEntity | null
	updater: () => void
	children: React.ReactNode
}
export function NotebookProvider({ value, children, updater, ...other }: NotebookProviderProps) {
	return (
		<NotebookContext.Provider value={[value, updater]}>
			{children}
		</NotebookContext.Provider>
	)
}

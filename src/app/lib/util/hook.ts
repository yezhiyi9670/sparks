import React, { useMemo, useRef } from 'react'
import { randomToken } from './random'

/**
 * 记忆回调函数
 */
export function useCallback<T>(val: T, deps: React.DependencyList, updateCall?: () => void) {
	return React.useMemo(() => {
		if(updateCall) updateCall()
		return val
	}, deps)
}

const realFunctionDb: {[_: string]: Function} = {}
const implFunctionDb: {[_: string]: Function} = {}

/**
 * 记忆渲染函数中的方法
 * 
 * useMethod 以一个函数为参数，且返回相同类型的函数。在同一个组件生命周期中，返回的函数保持恒定，但是执行时会始终指向最新的函数。
 */
export function useMethod<T extends Function>(val: T): T {
	const realFuncRef = useRef(val)
	realFuncRef.current = val
	const callerFunc = useMemo(() => {
		return function(this: any) {
			return realFuncRef.current.apply(this, arguments)
		}
	}, [])
	return callerFunc as any as T
}

import materialColors1 from "./const/material-colors"

export const materialColors = materialColors1

export function rgb2hex(rgb: [number, number, number]) {
	let hexd = '0123456789ABCDEF'
	return rgb.map((value) =>
		hexd[Math.floor(value / 16)] + hexd[value % 16]
	).join('')
}

/**
 * 根据颜色描述符获取颜色
 * 
 * Example:
 * 
 * ```
 * #66CCFF
 * Black-T1000
 * ```
 */
export function resolveColor(color: string): string | null {
	let hexRegex = /^#([0-9a-zA-Z]{6})$/
	if(hexRegex.test(color)) {
		return color
	}
	if(-1 != color.indexOf('-')) {
		let [ scheme, grade ] = color.split('-')
		scheme = scheme.trim()
		grade = grade.trim()
		let rgb = materialColors[scheme]?.colors[grade]?.color
		if(!rgb) {
			return null
		}
		return '#' + rgb2hex(rgb)
	}
	return null
}

/**
 * 自适应颜色，包含一对亮色/暗色模式下使用的颜色
 */
export interface AdaptiveColor {
	light: string
	dark: string
}

/**
 * 根据描述符获得自适应颜色
 * 
 * Example:
 * ```plain
 * Red-100
 * Red-100/Red-700
 * #FFFFFF/#000000
 * ```
 */
export function resolveAdaptiveColor(descriptor: string): AdaptiveColor | null {
	if(-1 != descriptor.indexOf('/')) {
		let [ color1, color2 ] = descriptor.split('/')
		let resolve1 = resolveColor(color1.trim())
		let resolve2 = resolveColor(color2.trim())
		if(!resolve1 || !resolve2) {
			return null
		}
		return {
			light: resolve1,
			dark: resolve2
		}
	}
	if(-1 != descriptor.indexOf('-')) {
		let [ scheme, grade ] = descriptor.split('-')
		scheme = scheme.trim()
		grade = grade.trim()
		let color = materialColors[scheme]?.colors[grade]
		if(!color) {
			return null
		}
		return {
			light: '#' + rgb2hex(color.color),
			dark: '#' + rgb2hex(color.darkSubstitute)
		}
	}
	return null
}

export interface Media {
	/**
	 * 系统分配的 ID
	 */
	gid: number
	/**
	 * 文件名（含扩展名）
	 */
	name: string
	/**
	 * 文件 MIME 类型（可以根据文件名推断，也可以独立修改）
	 */
	mime: string
	/**
	 * 文件的简短描述
	 */
	desc: string
	/**
	 * 媒体的第一次创建时间（用户可修改）
	 */
	ctime: number
	/**
	 * 媒体内容
	 */
	file: Blob | null
	/**
	 * 媒体二进制数据的修改时间
	 */
	filemtime: number
	/**
	 * 媒体基本信息的修改时间
	 */
	inodemtime: number
}

export default {
	// The .lang files are converted to scripts using an external tool
	// If you want to modify, edit .ts files directly for convenience

	// For contributers:
	// - We DO NOT currently provide a way for adding a new language. That's coming soon™.
	// - You should always provide .lang files. The format is fairly simple so implement your own tool to convert it if testing is needed
	// - NEVER add, remove entries or comments, or change the order of them.

	"i18n.self_name": "简体中文 (中国大陆)",

	// Title
	// parameters: ${0} - App title, ${1} - Notebook title / Settings page title, ${2} - Item title
	"title.idle": "${0}",
	"title.settings": "${0}: ${1}",
	"title.notebook": "${1}",
	"title.view.media": "媒体 ${2} ‹ ${1}",
	"title.new.media": "新建媒体 ‹ ${1}",
	"title.view.tags": "编辑标签 ‹ ${1}",
	"title.view.spark": "${2} ‹ ${1}",
	"title.new.spark": "新建卡片 ‹ ${1}",

	// Crashed
	"crashed.icon": ":(",
	"crashed.title": "此界面遇到了一些问题",
	"crashed.subtitle": "我们没有收集任何信息，因为我们尊重你的隐私",
	"crashed.details": "详细信息",
	"crashed.recover": "试图恢复",

	// App name
	"nav.app_title": "Sparks",

	// User menu
	"nav.user.username": "已登录到 ${0}",
	"nav.user.account": "账户设置",
	"nav.user.subscription": "订阅",
	"nav.user.logout": "登出",

	// Options menu
	"nav.option.preferences": "偏好设置",
	"nav.option.sync": "同步设置",

	// Guest menu
	"nav.guest.username": "游客",
	"nav.guest.login": "登录",
	"nav.guest.register": "注册",
	"nav.guest.tips": "即使不登录，你也可以在本地存储内容，或者使用已经挂载的同步源。",

	// Nav drawer
	"nav.drawer.tab.notebook": "笔记本",
	"nav.drawer.tab.settings": "设置",
	"nav.drawer.notebook.new": "新建",
	"nav.drawer.settings.account": "账户设置",
	"nav.drawer.settings.preferences": "偏好设置",
	"nav.drawer.settings.sync": "同步设置",
	"nav.drawer.settings.api": "API 参考",
	"nav.drawer.settings.subscription": "订阅",

	// Notebook nav
	"nav.book.view": "查看",
	"nav.book.graph": "图象",
	"nav.book.media": "媒体",
	"nav.book.config": "配置",

	// Code issue severity
	"severity.notice": "提示",
	"severity.unstd": "不合规范",
	"severity.warning": "警告",
	"severity.error": "错误",
	"severity.fatal": "致命错误",
	"issue.msg_template": "${0} / ${1}：第${2}行 - ${3}",
	// Code issues - general
	"issue.general.unexpected_token": "未预料的 ${0} ${1}，期望 ${2}",
	// Code issues - tokenization
	"issue.token": "语法",
	"issue.token.unclosed_string": "字符串未闭合",
	"issue.token.unclosed_comment": "此处开始的块注释未闭合",
	"issue.token.invalid_escape": "字符串中无效的转义序列 ${0}",
	// Code issues - tagging
	"issue.tag.dupe_tag": "重复定义的标签 ${0}",
	"issue.tag.void_multitag": "多选标签不能声明空白或默认值",
	"issue.tag.dupe_value": "重复定义的值 ${0}",
	"issue.tag.no_values": "标签 ${0} 没有可取的值",
	"issue.tag.invalid_color": "颜色描述 ${0} 无效",

	// Greeting
	"greeting": "你好，世界！",

	// Test
	"test.template": "测试文本 #0 - ${0}, #1 - ${1}, #2 - ${2}; 转义符 ${$0}, ${$1}, ${$2}, ${$3}",
}
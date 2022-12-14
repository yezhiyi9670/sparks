export default {
	// The .lang files are converted to scripts using an external tool
	// If you want to modify, edit .ts files directly for convenience

	// For contributers:
	// - We DO NOT currently provide a way for adding a new language. That's coming soon™.
	// - You should always provide .lang files. The format is fairly simple so implement your own tool to convert it if testing is needed
	// - NEVER add, remove entries or comments, or change the order of them.

	"i18n.self_name": "简体中文 (中国)",

	"sparks": "只言片语",

	// Normal UI
	"ui.loading": "加载中...",
	"ui.wip.title": "正在施工",
	"ui.wip.tips": "此页面正在开发，即将到来",
	"ui.wip_secret.title": "还没想好放什么",
	"ui.wip_secret.tips": "猜猜看？",
	"ui.enable": "启用",
	"ui.type_confirm": "请在下面输入 ${0} 以确认操作",
	"ui.type_confirm.cancel": "取消",
	"ui.type_confirm.confirm": "确定",
	"ui.type_confirm.caption": "确认",
	"ui.field_valid": "此输入没有问题。",
	"ui.local_write_error": "写入失败。存储空间可能不足。",
	"ui.empty.title": "无内容",
	"ui.empty.tips": "没有符合筛选条件的项目",

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
	"crashed.title": "去 世 力",
	"crashed.tips": "此部分出现了一些未预期的问题",
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
	"nav.option.sync": "同步源",

	// Guest menu
	"nav.guest.username": "游客",
	"nav.guest.login": "登录",
	"nav.guest.register": "注册",
	"nav.guest.tips": "即使不登录，你也可以在本地存储内容，或者使用已经挂载的同步源。",

	// Nav drawer
	"nav.drawer.tab.notebook": "笔记本",
	"nav.drawer.tab.settings": "设置",
	"nav.drawer.notebook.new": "新建",
	"nav.drawer.notebook.import": "导入",
	"nav.drawer.settings.account": "账户设置",
	"nav.drawer.settings.preferences": "偏好设置",
	"nav.drawer.settings.sync": "同步源",
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
	"issue.none": "没有发现任何问题",
	// Code issues - general
	"issue.general": "通用",
	"issue.general.unexpected_token": "未预料的 ${0} ${1}，期望 ${2}",
	// Code issues - tokenization
	"issue.token": "语法",
	"issue.token.unclosed_string": "字符串未闭合",
	"issue.token.unclosed_comment": "此处开始的块注释未闭合",
	"issue.token.invalid_escape": "字符串中无效的转义序列 ${0}",
	// Code issues - tagging
	"issue.tag": "标签",
	"issue.tag.dupe_tag": "重复定义的标签 ${0}",
	"issue.tag.void_multitag": "多选标签不能声明空白或默认值",
	"issue.tag.dupe_value": "重复定义的值 ${0}",
	"issue.tag.no_values": "标签 ${0} 没有可取的值",
	"issue.tag.invalid_color": "颜色描述 ${0} 无效",

	// Notebook
	"notebook.create.title": "新建笔记本",
	"notebook.create.tips": "笔记本创建后将存储在你的浏览器上。你可以导出和导入数据，也可以通过登录并添加同步源来实现跨设备同步。",
	"notebook.create.field.name": "名称",
	"notebook.create.field.alias": "别名",
	"notebook.create.help.alias": "别名是笔记本的唯一标识符，可以使用字母、数字和连字符。",
	"notebook.create.cancel": "取消",
	"notebook.create.confirm": "创建",
	"notebook.create.error.name": "名称不能，至少不应该为空。",
	"notebook.create.error.alias": "别名不符合要求。",
	"notebook.create.error.occupied": "此别名已经被占用。",
	"notebook.create.error.write": "写入失败。存储空间可能不足。",
	"notebook.void.title": "没有任何笔记本",
	"notebook.void.tips.desktop": "点击左侧菜单中的“新建”以开始记录",
	"notebook.void.tips.mobile": "点击左上角打开菜单，选择“新建”以开始记录",
	"notebook.nav.sparks": "卡片",
	"notebook.nav.tree": "树图",
	"notebook.nav.media": "媒体",
	"notebook.nav.config": "配置",
	"notebook.cfilter.void.title": "无分类目录",
	"notebook.cfilter.void.tips": "你可以在笔记本配置中添加标签",
	"notebook.cfilter.val.void": "无数值",
	"notebook.cfilter.val.default": "默认值",

	// Notebook config
	"notebook.config": "笔记本配置",
	"notebook.config.tips": "此界面包含了笔记本的基本信息、标签、数据导入导出、同步以及删除选项。",
	// Basic info
	"notebook.config.info": "基本信息",
	"notebook.config.name.title": "名称",
	"notebook.config.name.tips": "名称将会显示在菜单及页面标题中",
	"notebook.config.alias.title": "别名",
	"notebook.config.alias.tips": "别名是笔记本的唯一标识符，只能包含字母、数字和连字符，长度至少为 2。",
	"notebook.config.info.action": "更新基本信息",
	// Data
	"notebook.config.data": "数据",
	"notebook.config.tags.title": "选项式标签",
	"notebook.config.tags.tips": "当前定义了 ${0} 组标签",
	"notebook.config.tags.action": "编辑标签",
	"notebook.config.sync.title": "数据同步",
	"notebook.config.sync.tips.nyi": "数据同步功能尚未实现。你仍然可以通过导入导出的功能来转移数据。",
	"notebook.config.sync.action.nyi": "敬请期待",
	"notebook.config.sync.tips.false": "添加同步源来实现数据同步。这会将本地的所有卡片、媒体覆盖到同步源中；选项式标签则只能保留一份，你可以自行选择要保留哪个。功能配置不会同步。",
	"notebook.config.sync.action.false": "添加同步源",
	"notebook.config.sync.tips.true": "此笔记本正在通过 ${0} 跨设备同步数据。若解除同步源连接，所有本地数据都会保留，但不能继续进行同步。",
	"notebook.config.sync.action.true": "解除同步",
	"notebook.config.export.title": "导出笔记本",
	"notebook.config.export.tips": "这将会将笔记本内的所有数据一并导出为一个 sparks-notebook 文件，这可能需要一些时间。该文件本质是 zip 文件，你可以将其解压获得可导入的单个卡片、媒体或配置文件。",
	"notebook.config.export.action": "导出",
	"notebook.config.import.title": "批量导入",
	"notebook.config.import.tips": "这将会将 sparks-notebook 文件中的所有卡片、媒体导入当前笔记本，并覆盖所有别名相同的内容。笔记本配置文件只能保留一份，你可以自行选择要保留哪个。笔记本的名称、别名不会被更改。\n导入包含检查损坏文件的机制。",
	"notebook.config.import.action": "导入",
	// Function
	"notebook.config.function": "功能设置",
	"notebook.config.cs_desktop.title": "在桌面端上使用上下文符号",
	"notebook.config.cs_desktop.tips": "在桌面端上，编辑框的顶部处根据当前编辑的内容和光标位置显示你可能需要的符号，以方便你的输入。",
	"notebook.config.cs_mobile.title": "在移动端上使用上下文符号",
	"notebook.config.cs_mobile.tips": "在移动端上，屏幕底部（虚拟键盘上方）根据当前编辑的内容和光标位置显示你可能需要的符号，以方便你的输入。",
	// Danger zone
	"notebook.config.danger": "危险区",
	"notebook.config.overlap.title": "导入并覆盖",
	"notebook.config.overlap.tips": "导入 sparks-notebook 文件。这相当于删除此笔记本，然后导入新的文件。不过，此笔记本的名称和别名将保持不变。",
	"notebook.config.overlap.action": "导入",
	"notebook.config.delete.title": "删除笔记本",
	"notebook.config.delete.tips": "永久地从浏览器中删除此笔记本——不会有什么神奇的撤销按钮！\n若启用同步，同步源上的数据不会受影响。",
	"notebook.config.delete.action": "删除",
	"notebook.delete.title": "删除笔记本",
	"notebook.delete.desc": "你即将删除笔记本 ${0}",
	// Config overview
	"notebook.overview.tag.none": "没有定义选项式标签",
	"notebook.overview.name": "名称：${0}",
	"notebook.overview.alias": "别名：${0}",
	"notebook.nocate.title": "没有分类目录",
	"notebook.nocate.tips": "在笔记本配置 › 选项式标签中定义类型为 category 的标签。它们将会出现在这里。",
	"notebook.category.void": "空白",
	"notebook.category.default": "未分类",
	"notebook.category.all": "全部",

	// Notebook tag editor
	"notebook.tag.title": "编辑标签",
	"notebook.tag.tab.editor": "编辑",
	"notebook.tag.tab.preview": "预览",
	"notebook.tag.preview.none": "未定义任何标签。如果需要帮助或例子，请点击下面的链接。",
	"notebook.tag.help.text": "选项式标签帮助",
	"notebook.tag.help.link": "https://sparks-docs.wmsdf.cf/selective-tagging",
	"notebook.tag.preview.total": "共计 ${0} 组标签",
	"notebook.tag.preview.codename": "代号：${0}",
	"notebook.tag.preview.default_value": "默认值：${0}",
	"notebook.tag.preview.void": "空白",
	"notebook.tag.preview.default": "默认",
	"notebook.tag.preview.titleless": "无标题",
	"notebook.tag.preview.has_extern": "允许不存在的卡片",
	"notebook.tag.default.c.start_tag": "使用 tag/multitag/category 来开始一组标签",
	"notebook.tag.default.c.only_one_category": "category 表示分类目录，仅能存在一组",
	"notebook.tag.default.c.multitag": "multitag 标签组中多个值可以多选",
	"notebook.tag.default.c.void": "void 表示该标签组可以不选择值",
	"notebook.tag.default.c.default": "default 表示标签的默认值，在分类目录中表示未分类",
	"notebook.tag.default.c.color": "使用 color 定义标签组颜色",
	"notebook.tag.default.c.delimiter": "使用 delimiter 表示标签组与标签值名称间的分隔符",
	"notebook.tag.default.c.nolabel": "标签组或标签值可以没有显示名称",
	"notebook.tag.default.l.music": "音乐",
	"notebook.tag.default.l.literature": "文学",
	"notebook.tag.default.l.design": "设计",
	"notebook.tag.default.l.another": "另一个组",
	"notebook.tag.default.l.option": "选项 ${0}",

	// Sparks screen
	"spark.create.title": "新建卡片",
	"spark.create.title.copy": "复制卡片",
	"spark.create.tips.unsync": "卡片创建后将存储在浏览器中。你可以使用导入和导出功能来转移或备份数据。",
	"spark.create.tips.sync": "卡片创建后将立即同步到云端，但是仍然建议你通过导出的方式保留备份。",
	"spark.create.help.alias": "别名是卡片在此笔记本中的唯一标识符，可以使用字母、数字和连字符。建议使用与标题有关的字符串。",
	"spark.create.field.alias": "别名",
	"spark.create.error.alias": "别名不符合要求。",
	"spark.create.field.ctime": "创建时间",
	"spark.create.error.ctime": "时间格式无法解析。请尝试使用世界上大多数地区使用的格式。",
	"spark.create.finaltips": "你输入的创建时间是 ${0}。",
	"spark.create.cancel": "取消",
	"spark.create.confirm": "创建",
	"spark.create.error.occupied": "此别名已经被占用。",
	"spark.untitled": "无标题",
	"spark.nodesc": "没有描述文字",
	"spark.action.delete": "删除",
	"spark.action.clone": "创建副本",
	"spark.delete.title": "删除卡片",
	"spark.delete.tips.1": "确定删除卡片 ${0}？",
	"spark.delete.tips.2": "你将永久失去此卡片（真的很久！）",
	"spark.delete.cancel": "取消",
	"spark.delete.confirm": "确定",
	"spark.tab.view": "查看",
	"spark.tab.split": "分割",
	"spark.tab.edit": "编辑",
	"spark.tab.props": "属性",
	"spark.section.title": "标题",
	"spark.section.edit": "编辑与预览",
	"spark.section.info": "基本信息",
	"spark.section.info.tags": "标签",
	"spark.section.info.ctime": "创建时间",
	"spark.section.alias": "别名",
	"spark.section.desc": "简介",
	"spark.section.tagging": "选项式标签",
	"spark.section.meta": "自定义字段",
	"spark.section.origin": "版本关系",
	"spark.help.desc": "简短的描述或副标题",
	"spark.error.alias": "别名不符合要求。",
	"spark.field.ctime": "创建时间",
	"spark.field.mtime": "修改时间",
	"spark.error.ctime": "时间格式无法解析。请尝试使用世界上大多数地区使用的格式。",
	"spark.tags.none": "没有标签",
	"spark.tags.editdef": "编辑标签定义文件",
	"spark.origin.prev": "上一个版本",
	"spark.origin.prev.caption": "选择上一个版本",
	"spark.origin.origin.caption": "选择灵感来源",
	"spark.origin.prev.none": "未选择卡片",
	"spark.origin.choose": "选择",
	"spark.origin.origin": "灵感来源",
	"spark.origin.add": "添加",
	"spark.sub.extern": "不能打开不存在的卡片",
	"spark.sub.opened": "此卡片已经在某处被打开",

	// Custom fields editor
	"cfe.add": "新增字段",
	"cfe.add.title": "新增字段",
	"cfe.add.field.name": "字段名",
	"cfe.add.cancel": "取消",
	"cfe.add.confirm": "确定",
	"cfe.add.error.exists": "此字段已经存在",

	// Selective tagging editor
	"ste.label.none": "无标题 (${0})",
	"ste.label.category": "分类目录 (${0})",
	"ste.value.none": "未指定",
	"ste.value.void": "空白",
	"ste.value.default": "默认值",
	"ste.value.default_category": "未分类",

	// Origin edit
	"ref.error.self": "不能选择自身作为上一个版本",
	"ref.error.self.origin": "不能选择自身作为来源",
	"ref.error.circle": "不能选择自身的后继作为上一个版本",
	"ref.error.selected": "此卡片已经选择过了",
	"ref.desc.nx": "不存在的卡片",
	"ref.nx.tips": "输入任意别名并确定（可以不存在）",
	"ref.nx.accept": "确定",

	// Markdown
	"md.none$unsafe": "没有正文内容。进入编辑器视图即可编辑。",

	// Preferences
	"pref.title": "偏好设置",
	"pref.tips": "这些是本设备上的全局设置。",
	"pref.ui": "用户界面",
	"pref.language.title": "语言",
	"pref.language.tips": "选择界面的显示语言",

	// Test
	"test.template": "测试文本 #0 - ${0}, #1 - ${1}, #2 - ${2}; 转义符 ${$0}, ${$1}, ${$2}, ${$3}",
}
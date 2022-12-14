export default {
	// The .lang files are converted to scripts using an external tool
	// If you want to modify, edit .ts files directly for convenience

	// For contributers:
	// - We DO NOT currently provide a way for adding a new language. That's coming soon™.
	// - You should always provide .lang files. The format is fairly simple so implement your own tool to convert it if testing is needed
	// - NEVER add, remove entries or comments, or change the order of them.

	"i18n.self_name": "English (United States)",

	"sparks": "Sparks",

	// Normal UI
	"ui.loading": "Loading...",
	"ui.wip.title": "Work in progress",
	"ui.wip.tips": "The page is under construction and is coming soon™",
	"ui.wip_secret.title": "Dunno what to put here",
	"ui.wip_secret.tips": "Have a guess?",
	"ui.enable": "Enable",
	"ui.type_confirm": "Type ${0} below to confirm",
	"ui.type_confirm.cancel": "Cancel",
	"ui.type_confirm.confirm": "Confirm",
	"ui.type_confirm.caption": "Confirmation",
	"ui.field_valid": "This input is valid.",
	"ui.local_write_error": "Failed to write. Storage may be insufficient.",
	"ui.empty.title": "Nothing",
	"ui.empty.tips": "No items matching the filter",

	// Title
	// parameters: ${0} - App title, ${1} - Notebook title / Settings page title, ${2} - Item title
	"title.idle": "${0}",
	"title.settings": "${0}: ${1}",
	"title.notebook": "${1}",
	"title.view.media": "Media ${2} ‹ ${1}",
	"title.new.media": "New media ‹ ${1}",
	"title.view.tags": "Edit tags ‹ ${1}",
	"title.view.spark": "${2} ‹ ${1}",
	"title.new.spark": "New card ‹ ${1}",

	// Crashed
	"crashed.title": "LOL, I DIED",
	"crashed.tips": "Something unexpected happened here",
	"crashed.details": "Details",
	"crashed.recover": "Try to recover",

	// App name
	"nav.app_title": "Sparks",

	// User menu
	"nav.user.username": "Logged in as ${0}",
	"nav.user.account": "Account settings",
	"nav.user.subscription": "Subscription",
	"nav.user.logout": "Logout",

	// Options menu
	"nav.option.preferences": "Preferences",
	"nav.option.sync": "Sync source",

	// Guest menu
	"nav.guest.username": "Guest",
	"nav.guest.login": "Login",
	"nav.guest.register": "Register",
	"nav.guest.tips": "You can store contents locally or use already-mounted sync sources, without logging in.",

	// Nav drawer
	"nav.drawer.tab.notebook": "Notebooks",
	"nav.drawer.tab.settings": "Settings",
	"nav.drawer.notebook.new": "New",
	"nav.drawer.notebook.import": "Import",
	"nav.drawer.settings.account": "Account settings",
	"nav.drawer.settings.preferences": "Preferences",
	"nav.drawer.settings.sync": "Sync sources",
	"nav.drawer.settings.api": "API reference",
	"nav.drawer.settings.subscription": "Subscription",

	// Notebook nav
	"nav.book.view": "View",
	"nav.book.graph": "Graph",
	"nav.book.media": "Media",
	"nav.book.config": "Config",

	// Code issue severity
	"severity.notice": "Notice",
	"severity.unstd": "Non-standard",
	"severity.warning": "Warning",
	"severity.error": "Error",
	"severity.fatal": "Fatal error",
	"issue.msg_template": "${0} / ${1}: Line ${2} - ${3}",
	"issue.none": "No issues found",
	// Code issues - general
	"issue.general": "General",
	"issue.general.unexpected_token": "Unexpected ${0} token ${1}, expected ${2}",
	// Code issues - tokenization
	"issue.token": "Syntax",
	"issue.token.unclosed_string": "String literal is not closed",
	"issue.token.unclosed_comment": "Block comment starting from here is not closed",
	"issue.token.invalid_escape": "Invalid escape sequence ${0} in string",
	// Code issues - tagging
	"issue.tag": "Tag",
	"issue.tag.dupe_tag": "Duplicate tag ${0}",
	"issue.tag.void_multitag": "Multiselect tag cannot have void or default values",
	"issue.tag.dupe_value": "Duplicate value ${0}",
	"issue.tag.no_values": "Tag ${0} has no selectable values",
	"issue.tag.invalid_color": "Color descriptor ${0} is invalid",

	// Notebook
	"notebook.create.title": "New notebook",
	"notebook.create.tips": "Notebooks will be stored on your browser upon creation. You can export/import data, or login and synchronize data.",
	"notebook.create.field.name": "Name",
	"notebook.create.field.alias": "Alias",
	"notebook.create.help.alias": "Alias is the unique identifier of a notebook. You may use letters, numbers and hyphens.",
	"notebook.create.cancel": "Cancel",
	"notebook.create.confirm": "Create",
	"notebook.create.error.name": "Name should not be empty.",
	"notebook.create.error.alias": "Alias does not satisfy the requirements.",
	"notebook.create.error.occupied": "This alias is already used.",
	"notebook.create.error.write": "Failed to write. Storage may be insufficient.",
	"notebook.void.title": "No notebooks available",
	"notebook.void.tips.desktop": "Click 'New' on the left to start taking notes",
	"notebook.void.tips.mobile": "Click the upper-left corner, and then 'New' to start taking notes",
	"notebook.nav.sparks": "Sparks",
	"notebook.nav.tree": "Tree",
	"notebook.nav.media": "Media",
	"notebook.nav.config": "Config",
	"notebook.cfilter.void.title": "No category",
	"notebook.cfilter.void.tips": "You could add tags in notebook config",
	"notebook.cfilter.val.void": "Void",
	"notebook.cfilter.val.default": "Default",

	// Notebook config
	"notebook.config": "Notebook config",
	"notebook.config.tips": "This page consists of basic info, tags, data export/import, sync and delete options of a notebook.",
	// Basic info
	"notebook.config.info": "Basic info",
	"notebook.config.name.title": "Name",
	"notebook.config.name.tips": "Name will be displayed in the menu, and on the title of the page.",
	"notebook.config.alias.title": "Alias",
	"notebook.config.alias.tips": "Alias is the unique identifier of a notebook, which can only contain letters, numbers and hyphens, and should have at least 2 characters.",
	"notebook.config.info.action": "Update basic info",
	// Data
	"notebook.config.data": "Data",
	"notebook.config.tags.title": "Selective tagging",
	"notebook.config.tags.tips": "Currently, ${0} groups have been defined.",
	"notebook.config.tags.action": "Edit tags",
	"notebook.config.sync.title": "Data sync",
	"notebook.config.sync.tips.nyi": "Data sync is not implemented yet. You can still transfer data using export/import.",
	"notebook.config.sync.action.nyi": "Coming soon™",
	"notebook.config.sync.tips.false": "Add sync source to synchronize data. This will push all your current sparks and media onto the source. However, only one selective tag code can be preserved, and you can choose which to. Function settings will not be synchronized.",
	"notebook.config.sync.action.false": "Add source",
	"notebook.config.sync.tips.true": "This notebook is synchronized through source ${0}. All your local data will be preserved if the sync source gets detached, but you'll no longer be able to synchronize.",
	"notebook.config.sync.action.true": "Detach source",
	"notebook.config.export.title": "Export notebook",
	"notebook.config.export.tips": "This action will export everything in the notebook into one sparks-notebook file, which may take some time. The file is essentially a zip file, so you can extract it to get single importable spark, media or config file.",
	"notebook.config.export.action": "Export",
	"notebook.config.import.title": "Bulk import",
	"notebook.config.import.tips": "This will import all sparks and media from a sparks-notebook file, overwriting existing ones with identical aliases. Only one config file can be preserved, and you can choose which to. Name and alias of this notebook will be unchanged.\nThere is a mechanism to detect corrupt files.",
	"notebook.config.import.action": "Import",
	// Function
	"notebook.config.function": "Function settings",
	"notebook.config.cs_desktop.title": "Use contextual symbols on desktop",
	"notebook.config.cs_desktop.tips": "On desktop, show symbols you may need on top of the edit area based on the current content and the position of the cursor for your convenience.",
	"notebook.config.cs_mobile.title": "Use contextual symbols on mobile",
	"notebook.config.cs_mobile.tips": "On mobile, show symbols you may need on the bottom (above the virtual keyboard) based on the current content and the position of the cursor for your convenience.",
	// Danger zone
	"notebook.config.danger": "Danger zone",
	"notebook.config.overlap.title": "Import and overwrite",
	"notebook.config.overlap.tips": "Import sparks-notebook file. This is equivalent to deleting the current notebook and then importing the file. However, name and alias of this notebook will be unchanged.",
	"notebook.config.overlap.action": "Import",
	"notebook.config.delete.title": "Delete notebook",
	"notebook.config.delete.tips": "Permanently delete this notebook from the browser - there are no fantastic undo buttons!\nAttached sync source will not be affected.",
	"notebook.config.delete.action": "Delete",
	"notebook.delete.title": "Delete notebook",
	"notebook.delete.desc": "You're about to delete notebook ${0}",
	// Config overview
	"notebook.overview.tag.none": "No selective tags defined",
	"notebook.overview.name": "Name: ${0}",
	"notebook.overview.alias": "Alias: ${0}",
	"notebook.nocate.title": "No categories",
	"notebook.nocate.tips": "Define category tags in Config › Selective tagging. They will appear here.",
	"notebook.category.void": "Void",
	"notebook.category.default": "Uncategorized",
	"notebook.category.all": "All",

	// Notebook tag editor
	"notebook.tag.title": "Edit tags",
	"notebook.tag.tab.editor": "Edit",
	"notebook.tag.tab.preview": "Preview",
	"notebook.tag.preview.none": "No tags defined. Click the link below if you need help or examples.",
	"notebook.tag.help.text": "Selective tagging help",
	"notebook.tag.help.link": "https://sparks-docs.wmsdf.cf/selective-tagging",
	"notebook.tag.preview.total": "${0} groups in total",
	"notebook.tag.preview.codename": "Codename: ${0}",
	"notebook.tag.preview.default_value": "Default: ${0}",
	"notebook.tag.preview.void": "Void",
	"notebook.tag.preview.default": "Default",
	"notebook.tag.preview.titleless": "Untitled",
	"notebook.tag.preview.has_extern": "Accepts non-existent spark",
	"notebook.tag.default.c.start_tag": "Start a group of tags with tag/multitag/category",
	"notebook.tag.default.c.only_one_category": "category stands for category directory and there can only be one group",
	"notebook.tag.default.c.multitag": "multitag allows choosing multiple tag values from a group",
	"notebook.tag.default.c.void": "void stands for blank value for this group",
	"notebook.tag.default.c.default": "default stands for the default value of a group, or Uncategorized in category directory",
	"notebook.tag.default.c.color": "Use color to define color of the group",
	"notebook.tag.default.c.delimiter": "Use delimiter to set the delimiter between group label and value label",
	"notebook.tag.default.c.nolabel": "Tag groups or values can have no display label",
	"notebook.tag.default.l.music": "Music",
	"notebook.tag.default.l.literature": "Literature",
	"notebook.tag.default.l.design": "Design",
	"notebook.tag.default.l.another": "Another group",
	"notebook.tag.default.l.option": "Option ${0}",

	// Sparks screen
	"spark.create.title": "New spark",
	"spark.create.title.copy": "Clone spark",
	"spark.create.tips.unsync": "Sparks will be stored in your browser. You can transfer or backup data by exporting/importing.",
	"spark.create.tips.sync": "Sparks will be synchronized to the cloud upon creation. It's recommended that you keep an export as a backup.",
	"spark.create.help.alias": "Alias is the unique identifier of a spark in this notebook. You may use letters, numbers and hyphens. Using title-related strings is recommended.",
	"spark.create.field.alias": "Alias",
	"spark.create.error.alias": "Alias does not satisfy the requirements.",
	"spark.create.field.ctime": "Creation time",
	"spark.create.error.ctime": "Time format cannot be parsed. Try using the format used in most regions of the world.",
	"spark.create.finaltips": "The creation time you input is ${0}.",
	"spark.create.cancel": "Cancel",
	"spark.create.confirm": "Create",
	"spark.create.error.occupied": "This alias is already used.",
	"spark.untitled": "Untitled",
	"spark.nodesc": "No description text",
	"spark.action.delete": "Delete",
	"spark.action.clone": "Clone",
	"spark.delete.title": "Delete spark",
	"spark.delete.tips.1": "Are you sure to delete spark ${0}?",
	"spark.delete.tips.2": "You will lose this spark forever (a really long time!)",
	"spark.delete.cancel": "Cancel",
	"spark.delete.confirm": "Confirm",
	"spark.tab.view": "View",
	"spark.tab.split": "Split",
	"spark.tab.edit": "Edit",
	"spark.tab.props": "Props",
	"spark.section.title": "Title",
	"spark.section.edit": "Edit & Preview",
	"spark.section.info": "Basic info",
	"spark.section.info.tags": "Tags",
	"spark.section.info.ctime": "Time created",
	"spark.section.alias": "Alias",
	"spark.section.desc": "Description",
	"spark.section.tagging": "Selective tagging",
	"spark.section.meta": "Custom fields",
	"spark.section.origin": "Version relation",
	"spark.help.desc": "A short description or subtitle",
	"spark.error.alias": "Alias does not satisfy the requirements.",
	"spark.field.ctime": "Time created",
	"spark.field.mtime": "Time modified",
	"spark.error.ctime": "Time format cannot be parsed. Try using the format used in most regions of the world.",
	"spark.tags.none": "No tags",
	"spark.tags.editdef": "Edit tag definition file",
	"spark.origin.prev": "Previous version",
	"spark.origin.prev.caption": "Select previous version",
	"spark.origin.origin.caption": "Select inspiration source",
	"spark.origin.prev.none": "No selected spark",
	"spark.origin.choose": "Select",
	"spark.origin.origin": "Inspiration source",
	"spark.origin.add": "Add",
	"spark.sub.extern": "Cannot open non-existent spark",
	"spark.sub.opened": "This spark is already opened somewhere",

	// Custom fields editor
	"cfe.add": "Add field",
	"cfe.add.title": "Add field",
	"cfe.add.field.name": "Field name",
	"cfe.add.cancel": "Cancel",
	"cfe.add.confirm": "Confirm",
	"cfe.add.error.exists": "This field already exists",

	// Selective tagging editor
	"ste.label.none": "Untitled (${0})",
	"ste.label.category": "Category (${0})",
	"ste.value.none": "Unspecified",
	"ste.value.void": "Void",
	"ste.value.default": "Default",
	"ste.value.default_category": "Uncategorized",

	// Origin edit
	"ref.error.self": "Cannot select self as the previous version",
	"ref.error.self.origin": "Cannot select self as origin",
	"ref.error.circle": "Cannot select descants as previous version",
	"ref.error.selected": "This spark is already selected",
	"ref.desc.nx": "Non-existent spark",
	"ref.nx.tips": "Input any alias and confirm (can be non-existent)",
	"ref.nx.accept": "Accept",

	// Markdown
	"md.none$unsafe": "No article content. Enter the editor view to edit.",

	// Preferences
	"pref.title": "Preferencecs",
	"pref.tips": "These are global settings on this device.",
	"pref.ui": "User interface",
	"pref.language.title": "Language",
	"pref.language.tips": "Select the display language of the UI",

	// Test
	"test.template": "Test #0 - ${0}, #1 - ${1}, #2 - ${2}; raw ${$0}, ${$1}, ${$2}, ${$3}",
}
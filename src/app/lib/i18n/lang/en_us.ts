export default {
	// The .lang files are converted to scripts using an external tool
	// If you want to modify, edit .ts files directly for convenience

	// For contributers:
	// - We DO NOT currently provide a way for adding a new language. That's coming soon™.
	// - You should always provide .lang files. The format is fairly simple so implement your own tool to convert it if testing is needed
	// - NEVER add, remove entries or comments, or change the order of them.

	"i18n.self_name": "English (United States)",

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
	"crashed.icon": ":(",
	"crashed.title": "An error occured in this element",
	"crashed.subtitle": "We did not collect anything because we respect your privacy",
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
	"nav.option.sync": "Sync settings",

	// Guest menu
	"nav.guest.username": "Guest",
	"nav.guest.login": "Login",
	"nav.guest.register": "Register",
	"nav.guest.tips": "You can store contents locally or use already-mounted sync sources, without logging in.",

	// Nav drawer
	"nav.drawer.tab.notebook": "Notebooks",
	"nav.drawer.tab.settings": "Settings",
	"nav.drawer.notebook.new": "New",
	"nav.drawer.settings.account": "Account settings",
	"nav.drawer.settings.preferences": "Preferences",
	"nav.drawer.settings.sync": "Sync settings",
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
	// Code issues - general
	"issue.general.unexpected_token": "Unexpected ${0} token ${1}, expected ${2}",
	// Code issues - tokenization
	"issue.token": "Syntax",
	"issue.token.unclosed_string": "String literal is not closed",
	"issue.token.unclosed_comment": "Block comment starting from here is not closed",
	"issue.token.invalid_escape": "Invalid escape sequence ${0} in string",
	// Code issues - tagging
	"issue.tag.dupe_tag": "Duplicate tag ${0}",
	"issue.tag.void_multitag": "Multiselect tag cannot have void or default values",
	"issue.tag.dupe_value": "Duplicate value ${0}",
	"issue.tag.no_values": "Tag ${0} has no selectable values",
	"issue.tag.invalid_color": "Color descriptor ${0} is invalid",

	// Greeting
	"greeting": "Hello, world!",

	// Test
	"test.template": "Test #0 - ${0}, #1 - ${1}, #2 - ${2}; raw ${$0}, ${$1}, ${$2}, ${$3}",
}
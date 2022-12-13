import { LanguageFunction, useI18n } from "../../../lib/i18n/i18n";
import { parseTags } from "../../tag/tag-parser";
import { TagsManifest } from "../notebook";

/**
 * 获取默认标签数据
 */
export function getDefaultTagsManifest(LNG: LanguageFunction) {
	function LNT(key: string, ...args: any[]) {
		return LNG('notebook.tag.default.' + key, ...args)
	}

	const code = `# ${LNT('c.start_tag')}
# ${LNT('c.only_one_category')}
# ${LNT('c.multitag')}
category category (
	# ${LNT('c.default')}
	default
	value music "${LNT('l.music')}"
	value literature "${LNT('l.literature')}"
	value design "${LNT('l.design')}"
)
tag testTag "${LNT('l.another')}" (
	# ${LNT('c.void')}
	void
	color 'Green-T100' # ${LNT('c.color')}
	delimiter ' / ' # ${LNT('c.delimiter')}
	value option1 "${LNT('l.option', 1)}"
	value option2 "${LNT('l.option', 2)}"
	value option3 "${LNT('l.option', 3)}"
)
# ${LNT('c.nolabel')}
`

	const defaultTagsManifest: TagsManifest = {
		code: code,
		tags: parseTags(code).result
	}

	return defaultTagsManifest
}

interface MaterialColors {
	[scheme: string]: {
		scheme: string,
		colors: {
			[grade: string]: {
				color: [number, number, number],
				type: 'light' | 'dark',
				grade: string,
				darkSubstitute: [number, number, number]
			}
		}
	}
}

const materialColors: MaterialColors = {
	"Red": {
		"scheme": "Red",
		"colors": {
			"T50": {
				"color": [
					255,
					235,
					238
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					183,
					28,
					28
				]
			},
			"T100": {
				"color": [
					255,
					205,
					210
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					183,
					28,
					28
				]
			},
			"T200": {
				"color": [
					239,
					154,
					154
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					198,
					40,
					40
				]
			},
			"T300": {
				"color": [
					229,
					115,
					115
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					198,
					40,
					40
				]
			},
			"T400": {
				"color": [
					239,
					83,
					80
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					211,
					47,
					47
				]
			},
			"T500": {
				"color": [
					244,
					67,
					54
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					211,
					47,
					47
				]
			},
			"T600": {
				"color": [
					229,
					57,
					53
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					229,
					57,
					53
				]
			},
			"T700": {
				"color": [
					211,
					47,
					47
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					229,
					57,
					53
				]
			},
			"T800": {
				"color": [
					198,
					40,
					40
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					244,
					67,
					54
				]
			},
			"T900": {
				"color": [
					183,
					28,
					28
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					244,
					67,
					54
				]
			},
			"A100": {
				"color": [
					255,
					138,
					128
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					213,
					0,
					0
				]
			},
			"A200": {
				"color": [
					255,
					82,
					82
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					213,
					0,
					0
				]
			},
			"A400": {
				"color": [
					255,
					23,
					68
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					255,
					23,
					68
				]
			},
			"A700": {
				"color": [
					213,
					0,
					0
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					255,
					23,
					68
				]
			}
		}
	},
	"Pink": {
		"scheme": "Pink",
		"colors": {
			"T50": {
				"color": [
					252,
					228,
					236
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					136,
					14,
					79
				]
			},
			"T100": {
				"color": [
					248,
					187,
					208
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					136,
					14,
					79
				]
			},
			"T200": {
				"color": [
					244,
					143,
					177
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					173,
					20,
					87
				]
			},
			"T300": {
				"color": [
					240,
					98,
					146
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					173,
					20,
					87
				]
			},
			"T400": {
				"color": [
					236,
					64,
					122
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					194,
					24,
					91
				]
			},
			"T500": {
				"color": [
					233,
					30,
					99
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					194,
					24,
					91
				]
			},
			"T600": {
				"color": [
					216,
					27,
					96
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					216,
					27,
					96
				]
			},
			"T700": {
				"color": [
					194,
					24,
					91
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					216,
					27,
					96
				]
			},
			"T800": {
				"color": [
					173,
					20,
					87
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					233,
					30,
					99
				]
			},
			"T900": {
				"color": [
					136,
					14,
					79
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					233,
					30,
					99
				]
			},
			"A100": {
				"color": [
					255,
					128,
					171
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					197,
					17,
					98
				]
			},
			"A200": {
				"color": [
					255,
					64,
					129
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					197,
					17,
					98
				]
			},
			"A400": {
				"color": [
					245,
					0,
					87
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					245,
					0,
					87
				]
			},
			"A700": {
				"color": [
					197,
					17,
					98
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					245,
					0,
					87
				]
			}
		}
	},
	"Purple": {
		"scheme": "Purple",
		"colors": {
			"T50": {
				"color": [
					243,
					229,
					245
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					74,
					20,
					140
				]
			},
			"T100": {
				"color": [
					225,
					190,
					231
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					74,
					20,
					140
				]
			},
			"T200": {
				"color": [
					206,
					147,
					216
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					106,
					27,
					154
				]
			},
			"T300": {
				"color": [
					186,
					104,
					200
				],
				"type": "dark",
				"grade": "T300",
				"darkSubstitute": [
					106,
					27,
					154
				]
			},
			"T400": {
				"color": [
					171,
					71,
					188
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					123,
					31,
					162
				]
			},
			"T500": {
				"color": [
					156,
					39,
					176
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					123,
					31,
					162
				]
			},
			"T600": {
				"color": [
					142,
					36,
					170
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					142,
					36,
					170
				]
			},
			"T700": {
				"color": [
					123,
					31,
					162
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					142,
					36,
					170
				]
			},
			"T800": {
				"color": [
					106,
					27,
					154
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					156,
					39,
					176
				]
			},
			"T900": {
				"color": [
					74,
					20,
					140
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					156,
					39,
					176
				]
			},
			"A100": {
				"color": [
					234,
					128,
					252
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					170,
					0,
					255
				]
			},
			"A200": {
				"color": [
					224,
					64,
					251
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					170,
					0,
					255
				]
			},
			"A400": {
				"color": [
					213,
					0,
					249
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					213,
					0,
					249
				]
			},
			"A700": {
				"color": [
					170,
					0,
					255
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					213,
					0,
					249
				]
			}
		}
	},
	"DeepPurple": {
		"scheme": "DeepPurple",
		"colors": {
			"T50": {
				"color": [
					237,
					231,
					246
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					49,
					27,
					146
				]
			},
			"T100": {
				"color": [
					209,
					196,
					233
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					49,
					27,
					146
				]
			},
			"T200": {
				"color": [
					179,
					157,
					219
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					69,
					39,
					160
				]
			},
			"T300": {
				"color": [
					149,
					117,
					205
				],
				"type": "dark",
				"grade": "T300",
				"darkSubstitute": [
					69,
					39,
					160
				]
			},
			"T400": {
				"color": [
					126,
					87,
					194
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					81,
					45,
					168
				]
			},
			"T500": {
				"color": [
					103,
					58,
					183
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					81,
					45,
					168
				]
			},
			"T600": {
				"color": [
					94,
					53,
					177
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					94,
					53,
					177
				]
			},
			"T700": {
				"color": [
					81,
					45,
					168
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					94,
					53,
					177
				]
			},
			"T800": {
				"color": [
					69,
					39,
					160
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					103,
					58,
					183
				]
			},
			"T900": {
				"color": [
					49,
					27,
					146
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					103,
					58,
					183
				]
			},
			"A100": {
				"color": [
					179,
					136,
					255
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					98,
					0,
					234
				]
			},
			"A200": {
				"color": [
					124,
					77,
					255
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					98,
					0,
					234
				]
			},
			"A400": {
				"color": [
					101,
					31,
					255
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					101,
					31,
					255
				]
			},
			"A700": {
				"color": [
					98,
					0,
					234
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					101,
					31,
					255
				]
			}
		}
	},
	"Indigo": {
		"scheme": "Indigo",
		"colors": {
			"T50": {
				"color": [
					232,
					234,
					246
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					26,
					35,
					126
				]
			},
			"T100": {
				"color": [
					197,
					202,
					233
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					26,
					35,
					126
				]
			},
			"T200": {
				"color": [
					159,
					168,
					218
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					40,
					53,
					147
				]
			},
			"T300": {
				"color": [
					121,
					134,
					203
				],
				"type": "dark",
				"grade": "T300",
				"darkSubstitute": [
					40,
					53,
					147
				]
			},
			"T400": {
				"color": [
					92,
					107,
					192
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					48,
					63,
					159
				]
			},
			"T500": {
				"color": [
					63,
					81,
					181
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					48,
					63,
					159
				]
			},
			"T600": {
				"color": [
					57,
					73,
					171
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					57,
					73,
					171
				]
			},
			"T700": {
				"color": [
					48,
					63,
					159
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					57,
					73,
					171
				]
			},
			"T800": {
				"color": [
					40,
					53,
					147
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					63,
					81,
					181
				]
			},
			"T900": {
				"color": [
					26,
					35,
					126
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					63,
					81,
					181
				]
			},
			"A100": {
				"color": [
					140,
					158,
					255
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					48,
					79,
					254
				]
			},
			"A200": {
				"color": [
					83,
					109,
					254
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					48,
					79,
					254
				]
			},
			"A400": {
				"color": [
					61,
					90,
					254
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					61,
					90,
					254
				]
			},
			"A700": {
				"color": [
					48,
					79,
					254
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					61,
					90,
					254
				]
			}
		}
	},
	"Blue": {
		"scheme": "Blue",
		"colors": {
			"T50": {
				"color": [
					227,
					242,
					253
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					13,
					71,
					161
				]
			},
			"T100": {
				"color": [
					187,
					222,
					251
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					13,
					71,
					161
				]
			},
			"T200": {
				"color": [
					144,
					202,
					249
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					21,
					101,
					192
				]
			},
			"T300": {
				"color": [
					100,
					181,
					246
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					21,
					101,
					192
				]
			},
			"T400": {
				"color": [
					66,
					165,
					245
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					25,
					118,
					210
				]
			},
			"T500": {
				"color": [
					33,
					150,
					243
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					25,
					118,
					210
				]
			},
			"T600": {
				"color": [
					30,
					136,
					229
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					30,
					136,
					229
				]
			},
			"T700": {
				"color": [
					25,
					118,
					210
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					30,
					136,
					229
				]
			},
			"T800": {
				"color": [
					21,
					101,
					192
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					33,
					150,
					243
				]
			},
			"T900": {
				"color": [
					13,
					71,
					161
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					33,
					150,
					243
				]
			},
			"A100": {
				"color": [
					130,
					177,
					255
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					41,
					98,
					255
				]
			},
			"A200": {
				"color": [
					68,
					138,
					255
				],
				"type": "dark",
				"grade": "A200",
				"darkSubstitute": [
					41,
					98,
					255
				]
			},
			"A400": {
				"color": [
					41,
					121,
					255
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					41,
					121,
					255
				]
			},
			"A700": {
				"color": [
					41,
					98,
					255
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					41,
					121,
					255
				]
			}
		}
	},
	"LightBlue": {
		"scheme": "LightBlue",
		"colors": {
			"T50": {
				"color": [
					225,
					245,
					254
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					1,
					87,
					155
				]
			},
			"T100": {
				"color": [
					179,
					229,
					252
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					1,
					87,
					155
				]
			},
			"T200": {
				"color": [
					129,
					212,
					250
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					2,
					119,
					189
				]
			},
			"T300": {
				"color": [
					79,
					195,
					247
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					2,
					119,
					189
				]
			},
			"T400": {
				"color": [
					41,
					182,
					246
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					2,
					136,
					209
				]
			},
			"T500": {
				"color": [
					3,
					169,
					244
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					2,
					136,
					209
				]
			},
			"T600": {
				"color": [
					3,
					155,
					229
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					3,
					155,
					229
				]
			},
			"T700": {
				"color": [
					2,
					136,
					209
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					3,
					155,
					229
				]
			},
			"T800": {
				"color": [
					2,
					119,
					189
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					3,
					169,
					244
				]
			},
			"T900": {
				"color": [
					1,
					87,
					155
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					3,
					169,
					244
				]
			},
			"A100": {
				"color": [
					128,
					216,
					255
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					0,
					145,
					234
				]
			},
			"A200": {
				"color": [
					64,
					196,
					255
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					0,
					145,
					234
				]
			},
			"A400": {
				"color": [
					0,
					176,
					255
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					0,
					176,
					255
				]
			},
			"A700": {
				"color": [
					0,
					145,
					234
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					0,
					176,
					255
				]
			}
		}
	},
	"Cyan": {
		"scheme": "Cyan",
		"colors": {
			"T50": {
				"color": [
					224,
					247,
					250
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					0,
					96,
					100
				]
			},
			"T100": {
				"color": [
					178,
					235,
					242
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					0,
					96,
					100
				]
			},
			"T200": {
				"color": [
					128,
					222,
					234
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					0,
					131,
					143
				]
			},
			"T300": {
				"color": [
					77,
					208,
					225
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					0,
					131,
					143
				]
			},
			"T400": {
				"color": [
					38,
					198,
					218
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					0,
					151,
					167
				]
			},
			"T500": {
				"color": [
					0,
					188,
					212
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					0,
					151,
					167
				]
			},
			"T600": {
				"color": [
					0,
					172,
					193
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					0,
					172,
					193
				]
			},
			"T700": {
				"color": [
					0,
					151,
					167
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					0,
					172,
					193
				]
			},
			"T800": {
				"color": [
					0,
					131,
					143
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					0,
					188,
					212
				]
			},
			"T900": {
				"color": [
					0,
					96,
					100
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					0,
					188,
					212
				]
			},
			"A100": {
				"color": [
					132,
					255,
					255
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					0,
					184,
					212
				]
			},
			"A200": {
				"color": [
					24,
					255,
					255
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					0,
					184,
					212
				]
			},
			"A400": {
				"color": [
					0,
					229,
					255
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					0,
					229,
					255
				]
			},
			"A700": {
				"color": [
					0,
					184,
					212
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					0,
					229,
					255
				]
			}
		}
	},
	"Teal": {
		"scheme": "Teal",
		"colors": {
			"T50": {
				"color": [
					224,
					242,
					241
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					0,
					77,
					64
				]
			},
			"T100": {
				"color": [
					178,
					223,
					219
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					0,
					77,
					64
				]
			},
			"T200": {
				"color": [
					128,
					203,
					196
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					0,
					105,
					92
				]
			},
			"T300": {
				"color": [
					77,
					182,
					172
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					0,
					105,
					92
				]
			},
			"T400": {
				"color": [
					38,
					166,
					154
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					0,
					121,
					107
				]
			},
			"T500": {
				"color": [
					0,
					150,
					136
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					0,
					121,
					107
				]
			},
			"T600": {
				"color": [
					0,
					137,
					123
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					0,
					137,
					123
				]
			},
			"T700": {
				"color": [
					0,
					121,
					107
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					0,
					137,
					123
				]
			},
			"T800": {
				"color": [
					0,
					105,
					92
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					0,
					150,
					136
				]
			},
			"T900": {
				"color": [
					0,
					77,
					64
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					0,
					150,
					136
				]
			},
			"A100": {
				"color": [
					167,
					255,
					235
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					0,
					191,
					165
				]
			},
			"A200": {
				"color": [
					100,
					255,
					218
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					0,
					191,
					165
				]
			},
			"A400": {
				"color": [
					29,
					233,
					182
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					29,
					233,
					182
				]
			},
			"A700": {
				"color": [
					0,
					191,
					165
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					29,
					233,
					182
				]
			}
		}
	},
	"Green": {
		"scheme": "Green",
		"colors": {
			"T50": {
				"color": [
					232,
					245,
					233
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					27,
					94,
					32
				]
			},
			"T100": {
				"color": [
					200,
					230,
					201
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					27,
					94,
					32
				]
			},
			"T200": {
				"color": [
					165,
					214,
					167
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					46,
					125,
					50
				]
			},
			"T300": {
				"color": [
					129,
					199,
					132
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					46,
					125,
					50
				]
			},
			"T400": {
				"color": [
					102,
					187,
					106
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					56,
					142,
					60
				]
			},
			"T500": {
				"color": [
					76,
					175,
					80
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					56,
					142,
					60
				]
			},
			"T600": {
				"color": [
					67,
					160,
					71
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					67,
					160,
					71
				]
			},
			"T700": {
				"color": [
					56,
					142,
					60
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					67,
					160,
					71
				]
			},
			"T800": {
				"color": [
					46,
					125,
					50
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					76,
					175,
					80
				]
			},
			"T900": {
				"color": [
					27,
					94,
					32
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					76,
					175,
					80
				]
			},
			"A100": {
				"color": [
					185,
					246,
					202
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					0,
					200,
					83
				]
			},
			"A200": {
				"color": [
					105,
					240,
					174
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					0,
					200,
					83
				]
			},
			"A400": {
				"color": [
					0,
					230,
					118
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					0,
					230,
					118
				]
			},
			"A700": {
				"color": [
					0,
					200,
					83
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					0,
					230,
					118
				]
			}
		}
	},
	"LightGreen": {
		"scheme": "LightGreen",
		"colors": {
			"T50": {
				"color": [
					241,
					248,
					233
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					51,
					105,
					30
				]
			},
			"T100": {
				"color": [
					220,
					237,
					200
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					51,
					105,
					30
				]
			},
			"T200": {
				"color": [
					197,
					225,
					165
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					85,
					139,
					47
				]
			},
			"T300": {
				"color": [
					174,
					213,
					129
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					85,
					139,
					47
				]
			},
			"T400": {
				"color": [
					156,
					204,
					101
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					104,
					159,
					56
				]
			},
			"T500": {
				"color": [
					139,
					195,
					74
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					104,
					159,
					56
				]
			},
			"T600": {
				"color": [
					124,
					179,
					66
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					124,
					179,
					66
				]
			},
			"T700": {
				"color": [
					104,
					159,
					56
				],
				"type": "light",
				"grade": "T700",
				"darkSubstitute": [
					124,
					179,
					66
				]
			},
			"T800": {
				"color": [
					85,
					139,
					47
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					139,
					195,
					74
				]
			},
			"T900": {
				"color": [
					51,
					105,
					30
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					139,
					195,
					74
				]
			},
			"A100": {
				"color": [
					204,
					255,
					144
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					100,
					221,
					23
				]
			},
			"A200": {
				"color": [
					178,
					255,
					89
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					100,
					221,
					23
				]
			},
			"A400": {
				"color": [
					118,
					255,
					3
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					118,
					255,
					3
				]
			},
			"A700": {
				"color": [
					100,
					221,
					23
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					118,
					255,
					3
				]
			}
		}
	},
	"Lime": {
		"scheme": "Lime",
		"colors": {
			"T50": {
				"color": [
					249,
					251,
					231
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					130,
					119,
					23
				]
			},
			"T100": {
				"color": [
					240,
					244,
					195
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					130,
					119,
					23
				]
			},
			"T200": {
				"color": [
					230,
					238,
					156
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					158,
					157,
					36
				]
			},
			"T300": {
				"color": [
					220,
					231,
					117
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					158,
					157,
					36
				]
			},
			"T400": {
				"color": [
					212,
					225,
					87
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					175,
					180,
					43
				]
			},
			"T500": {
				"color": [
					205,
					220,
					57
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					175,
					180,
					43
				]
			},
			"T600": {
				"color": [
					192,
					202,
					51
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					192,
					202,
					51
				]
			},
			"T700": {
				"color": [
					175,
					180,
					43
				],
				"type": "light",
				"grade": "T700",
				"darkSubstitute": [
					192,
					202,
					51
				]
			},
			"T800": {
				"color": [
					158,
					157,
					36
				],
				"type": "light",
				"grade": "T800",
				"darkSubstitute": [
					205,
					220,
					57
				]
			},
			"T900": {
				"color": [
					130,
					119,
					23
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					205,
					220,
					57
				]
			},
			"A100": {
				"color": [
					244,
					255,
					129
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					174,
					234,
					0
				]
			},
			"A200": {
				"color": [
					238,
					255,
					65
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					174,
					234,
					0
				]
			},
			"A400": {
				"color": [
					198,
					255,
					0
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					198,
					255,
					0
				]
			},
			"A700": {
				"color": [
					174,
					234,
					0
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					198,
					255,
					0
				]
			}
		}
	},
	"Yellow": {
		"scheme": "Yellow",
		"colors": {
			"T50": {
				"color": [
					255,
					253,
					231
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					245,
					127,
					23
				]
			},
			"T100": {
				"color": [
					255,
					249,
					196
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					245,
					127,
					23
				]
			},
			"T200": {
				"color": [
					255,
					245,
					157
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					249,
					168,
					37
				]
			},
			"T300": {
				"color": [
					255,
					241,
					118
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					249,
					168,
					37
				]
			},
			"T400": {
				"color": [
					255,
					238,
					88
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					251,
					192,
					45
				]
			},
			"T500": {
				"color": [
					255,
					235,
					59
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					251,
					192,
					45
				]
			},
			"T600": {
				"color": [
					253,
					216,
					53
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					253,
					216,
					53
				]
			},
			"T700": {
				"color": [
					251,
					192,
					45
				],
				"type": "light",
				"grade": "T700",
				"darkSubstitute": [
					253,
					216,
					53
				]
			},
			"T800": {
				"color": [
					249,
					168,
					37
				],
				"type": "light",
				"grade": "T800",
				"darkSubstitute": [
					255,
					235,
					59
				]
			},
			"T900": {
				"color": [
					245,
					127,
					23
				],
				"type": "light",
				"grade": "T900",
				"darkSubstitute": [
					255,
					235,
					59
				]
			},
			"A100": {
				"color": [
					255,
					255,
					141
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					255,
					214,
					0
				]
			},
			"A200": {
				"color": [
					255,
					255,
					0
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					255,
					214,
					0
				]
			},
			"A400": {
				"color": [
					255,
					234,
					0
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					255,
					234,
					0
				]
			},
			"A700": {
				"color": [
					255,
					214,
					0
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					255,
					234,
					0
				]
			}
		}
	},
	"Amber": {
		"scheme": "Amber",
		"colors": {
			"T50": {
				"color": [
					255,
					248,
					225
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					255,
					111,
					0
				]
			},
			"T100": {
				"color": [
					255,
					236,
					179
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					255,
					111,
					0
				]
			},
			"T200": {
				"color": [
					255,
					224,
					130
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					255,
					143,
					0
				]
			},
			"T300": {
				"color": [
					255,
					213,
					79
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					255,
					143,
					0
				]
			},
			"T400": {
				"color": [
					255,
					202,
					40
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					255,
					160,
					0
				]
			},
			"T500": {
				"color": [
					255,
					193,
					7
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					255,
					160,
					0
				]
			},
			"T600": {
				"color": [
					255,
					179,
					0
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					255,
					179,
					0
				]
			},
			"T700": {
				"color": [
					255,
					160,
					0
				],
				"type": "light",
				"grade": "T700",
				"darkSubstitute": [
					255,
					179,
					0
				]
			},
			"T800": {
				"color": [
					255,
					143,
					0
				],
				"type": "light",
				"grade": "T800",
				"darkSubstitute": [
					255,
					193,
					7
				]
			},
			"T900": {
				"color": [
					255,
					111,
					0
				],
				"type": "light",
				"grade": "T900",
				"darkSubstitute": [
					255,
					193,
					7
				]
			},
			"A100": {
				"color": [
					255,
					229,
					127
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					255,
					171,
					0
				]
			},
			"A200": {
				"color": [
					255,
					215,
					64
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					255,
					171,
					0
				]
			},
			"A400": {
				"color": [
					255,
					196,
					0
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					255,
					196,
					0
				]
			},
			"A700": {
				"color": [
					255,
					171,
					0
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					255,
					196,
					0
				]
			}
		}
	},
	"Orange": {
		"scheme": "Orange",
		"colors": {
			"T50": {
				"color": [
					255,
					243,
					224
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					230,
					81,
					0
				]
			},
			"T100": {
				"color": [
					255,
					224,
					178
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					230,
					81,
					0
				]
			},
			"T200": {
				"color": [
					255,
					204,
					128
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					239,
					108,
					0
				]
			},
			"T300": {
				"color": [
					255,
					183,
					77
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					239,
					108,
					0
				]
			},
			"T400": {
				"color": [
					255,
					167,
					38
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					245,
					124,
					0
				]
			},
			"T500": {
				"color": [
					255,
					152,
					0
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					245,
					124,
					0
				]
			},
			"T600": {
				"color": [
					251,
					140,
					0
				],
				"type": "light",
				"grade": "T600",
				"darkSubstitute": [
					251,
					140,
					0
				]
			},
			"T700": {
				"color": [
					245,
					124,
					0
				],
				"type": "light",
				"grade": "T700",
				"darkSubstitute": [
					251,
					140,
					0
				]
			},
			"T800": {
				"color": [
					239,
					108,
					0
				],
				"type": "light",
				"grade": "T800",
				"darkSubstitute": [
					255,
					152,
					0
				]
			},
			"T900": {
				"color": [
					230,
					81,
					0
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					255,
					152,
					0
				]
			},
			"A100": {
				"color": [
					255,
					209,
					128
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					255,
					109,
					0
				]
			},
			"A200": {
				"color": [
					255,
					171,
					64
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					255,
					109,
					0
				]
			},
			"A400": {
				"color": [
					255,
					145,
					0
				],
				"type": "light",
				"grade": "A400",
				"darkSubstitute": [
					255,
					145,
					0
				]
			},
			"A700": {
				"color": [
					255,
					109,
					0
				],
				"type": "light",
				"grade": "A700",
				"darkSubstitute": [
					255,
					145,
					0
				]
			}
		}
	},
	"DeepOrange": {
		"scheme": "DeepOrange",
		"colors": {
			"T50": {
				"color": [
					251,
					233,
					231
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					191,
					54,
					12
				]
			},
			"T100": {
				"color": [
					255,
					204,
					188
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					191,
					54,
					12
				]
			},
			"T200": {
				"color": [
					255,
					171,
					145
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					216,
					67,
					21
				]
			},
			"T300": {
				"color": [
					255,
					138,
					101
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					216,
					67,
					21
				]
			},
			"T400": {
				"color": [
					255,
					112,
					67
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					230,
					74,
					25
				]
			},
			"T500": {
				"color": [
					255,
					87,
					34
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					230,
					74,
					25
				]
			},
			"T600": {
				"color": [
					244,
					81,
					30
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					244,
					81,
					30
				]
			},
			"T700": {
				"color": [
					230,
					74,
					25
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					244,
					81,
					30
				]
			},
			"T800": {
				"color": [
					216,
					67,
					21
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					255,
					87,
					34
				]
			},
			"T900": {
				"color": [
					191,
					54,
					12
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					255,
					87,
					34
				]
			},
			"A100": {
				"color": [
					255,
					158,
					128
				],
				"type": "light",
				"grade": "A100",
				"darkSubstitute": [
					221,
					44,
					0
				]
			},
			"A200": {
				"color": [
					255,
					110,
					64
				],
				"type": "light",
				"grade": "A200",
				"darkSubstitute": [
					221,
					44,
					0
				]
			},
			"A400": {
				"color": [
					255,
					61,
					0
				],
				"type": "dark",
				"grade": "A400",
				"darkSubstitute": [
					255,
					61,
					0
				]
			},
			"A700": {
				"color": [
					221,
					44,
					0
				],
				"type": "dark",
				"grade": "A700",
				"darkSubstitute": [
					255,
					61,
					0
				]
			}
		}
	},
	"Brown": {
		"scheme": "Brown",
		"colors": {
			"T50": {
				"color": [
					239,
					235,
					233
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					62,
					39,
					35
				]
			},
			"T100": {
				"color": [
					215,
					204,
					200
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					62,
					39,
					35
				]
			},
			"T200": {
				"color": [
					188,
					170,
					164
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					78,
					52,
					46
				]
			},
			"T300": {
				"color": [
					161,
					136,
					127
				],
				"type": "dark",
				"grade": "T300",
				"darkSubstitute": [
					78,
					52,
					46
				]
			},
			"T400": {
				"color": [
					141,
					110,
					99
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					93,
					64,
					55
				]
			},
			"T500": {
				"color": [
					121,
					85,
					72
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					93,
					64,
					55
				]
			},
			"T600": {
				"color": [
					109,
					76,
					65
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					109,
					76,
					65
				]
			},
			"T700": {
				"color": [
					93,
					64,
					55
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					109,
					76,
					65
				]
			},
			"T800": {
				"color": [
					78,
					52,
					46
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					121,
					85,
					72
				]
			},
			"T900": {
				"color": [
					62,
					39,
					35
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					121,
					85,
					72
				]
			}
		}
	},
	"Grey": {
		"scheme": "Grey",
		"colors": {
			"T50": {
				"color": [
					250,
					250,
					250
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					33,
					33,
					33
				]
			},
			"T100": {
				"color": [
					245,
					245,
					245
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					33,
					33,
					33
				]
			},
			"T200": {
				"color": [
					238,
					238,
					238
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					66,
					66,
					66
				]
			},
			"T300": {
				"color": [
					224,
					224,
					224
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					66,
					66,
					66
				]
			},
			"T400": {
				"color": [
					189,
					189,
					189
				],
				"type": "light",
				"grade": "T400",
				"darkSubstitute": [
					97,
					97,
					97
				]
			},
			"T500": {
				"color": [
					158,
					158,
					158
				],
				"type": "light",
				"grade": "T500",
				"darkSubstitute": [
					97,
					97,
					97
				]
			},
			"T600": {
				"color": [
					117,
					117,
					117
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					117,
					117,
					117
				]
			},
			"T700": {
				"color": [
					97,
					97,
					97
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					117,
					117,
					117
				]
			},
			"T800": {
				"color": [
					66,
					66,
					66
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					158,
					158,
					158
				]
			},
			"T900": {
				"color": [
					33,
					33,
					33
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					158,
					158,
					158
				]
			}
		}
	},
	"BlueGrey": {
		"scheme": "BlueGrey",
		"colors": {
			"T50": {
				"color": [
					236,
					239,
					241
				],
				"type": "light",
				"grade": "T50",
				"darkSubstitute": [
					38,
					50,
					56
				]
			},
			"T100": {
				"color": [
					207,
					216,
					220
				],
				"type": "light",
				"grade": "T100",
				"darkSubstitute": [
					38,
					50,
					56
				]
			},
			"T200": {
				"color": [
					176,
					190,
					197
				],
				"type": "light",
				"grade": "T200",
				"darkSubstitute": [
					55,
					71,
					79
				]
			},
			"T300": {
				"color": [
					144,
					164,
					174
				],
				"type": "light",
				"grade": "T300",
				"darkSubstitute": [
					55,
					71,
					79
				]
			},
			"T400": {
				"color": [
					120,
					144,
					156
				],
				"type": "dark",
				"grade": "T400",
				"darkSubstitute": [
					69,
					90,
					100
				]
			},
			"T500": {
				"color": [
					96,
					125,
					139
				],
				"type": "dark",
				"grade": "T500",
				"darkSubstitute": [
					69,
					90,
					100
				]
			},
			"T600": {
				"color": [
					84,
					110,
					122
				],
				"type": "dark",
				"grade": "T600",
				"darkSubstitute": [
					84,
					110,
					122
				]
			},
			"T700": {
				"color": [
					69,
					90,
					100
				],
				"type": "dark",
				"grade": "T700",
				"darkSubstitute": [
					84,
					110,
					122
				]
			},
			"T800": {
				"color": [
					55,
					71,
					79
				],
				"type": "dark",
				"grade": "T800",
				"darkSubstitute": [
					96,
					125,
					139
				]
			},
			"T900": {
				"color": [
					38,
					50,
					56
				],
				"type": "dark",
				"grade": "T900",
				"darkSubstitute": [
					96,
					125,
					139
				]
			}
		}
	},
	"Black": {
		"scheme": "Black",
		"colors": {
			"T1000": {
				"color": [
					0,
					0,
					0
				],
				"type": "dark",
				"grade": "T1000",
				"darkSubstitute": [
					255,
					255,
					255
				]
			},
			"T0": {
				"color": [
					255,
					255,
					255
				],
				"type": "light",
				"grade": "T0",
				"darkSubstitute": [
					0,
					0,
					0
				]
			}
		}
	}
}

export default materialColors

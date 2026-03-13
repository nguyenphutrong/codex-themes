export const THEME_DEFAULT_FONT_CHOICE = "__theme_default__";
export const CUSTOM_FONT_CHOICE = "__custom_font__";

export const POPULAR_DEV_FONTS = [
	"Maple Mono NF",
	"JetBrains Mono",
	"Geist Mono",
	"IBM Plex Mono",
	"Fira Code",
	"Iosevka",
	"Cascadia Code",
	"Commit Mono",
	"Victor Mono",
] as const;

export interface ThemeFontPreferences {
	uiChoice: string;
	codeChoice: string;
	uiCustom: string;
	codeCustom: string;
}

export interface ResolvedThemeFonts {
	ui: string | null;
	code: string | null;
}

export const DEFAULT_THEME_FONT_PREFERENCES: ThemeFontPreferences = {
	uiChoice: "__theme_default__",
	codeChoice: "__theme_default__",
	uiCustom: "",
	codeCustom: "",
};

export function resolveThemeFontChoice(choice: string, custom: string) {
	if (choice === THEME_DEFAULT_FONT_CHOICE) {
		return null;
	}

	if (choice === CUSTOM_FONT_CHOICE) {
		return custom.trim() || null;
	}

	return choice.trim() || null;
}

export function resolveThemeFonts(
	preferences: ThemeFontPreferences,
): ResolvedThemeFonts {
	return {
		ui: resolveThemeFontChoice(preferences.uiChoice, preferences.uiCustom),
		code: resolveThemeFontChoice(
			preferences.codeChoice,
			preferences.codeCustom,
		),
	};
}

export function sanitizeThemeFontPreferences(
	value: unknown,
): ThemeFontPreferences {
	if (!value || typeof value !== "object") {
		return DEFAULT_THEME_FONT_PREFERENCES;
	}

	const candidate = value as Partial<ThemeFontPreferences>;
	return {
		uiChoice:
			typeof candidate.uiChoice === "string" && candidate.uiChoice.length
				? candidate.uiChoice
				: DEFAULT_THEME_FONT_PREFERENCES.uiChoice,
		codeChoice:
			typeof candidate.codeChoice === "string" && candidate.codeChoice.length
				? candidate.codeChoice
				: DEFAULT_THEME_FONT_PREFERENCES.codeChoice,
		uiCustom: typeof candidate.uiCustom === "string" ? candidate.uiCustom : "",
		codeCustom:
			typeof candidate.codeCustom === "string" ? candidate.codeCustom : "",
	};
}

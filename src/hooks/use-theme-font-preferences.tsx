import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	DEFAULT_THEME_FONT_PREFERENCES,
	resolveThemeFonts,
	sanitizeThemeFontPreferences,
	type ThemeFontPreferences,
} from "#/lib/theme-fonts";

const THEME_FONT_PREFERENCES_STORAGE_KEY = "codex-themes:font-preferences";

interface ThemeFontPreferencesContextValue {
	preferences: ThemeFontPreferences;
	resolvedFonts: ReturnType<typeof resolveThemeFonts>;
	updatePreference<K extends keyof ThemeFontPreferences>(
		key: K,
		value: ThemeFontPreferences[K],
	): void;
	resetPreferences(): void;
}

const ThemeFontPreferencesContext =
	createContext<ThemeFontPreferencesContextValue>({
		preferences: DEFAULT_THEME_FONT_PREFERENCES,
		resolvedFonts: resolveThemeFonts(DEFAULT_THEME_FONT_PREFERENCES),
		updatePreference: () => {},
		resetPreferences: () => {},
	});

export function ThemeFontPreferencesProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [preferences, setPreferences] = useState<ThemeFontPreferences>(
		DEFAULT_THEME_FONT_PREFERENCES,
	);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(
				THEME_FONT_PREFERENCES_STORAGE_KEY,
			);
			if (!stored) {
				return;
			}

			setPreferences(sanitizeThemeFontPreferences(JSON.parse(stored)));
		} catch {
			setPreferences(DEFAULT_THEME_FONT_PREFERENCES);
		}
	}, []);

	useEffect(() => {
		window.localStorage.setItem(
			THEME_FONT_PREFERENCES_STORAGE_KEY,
			JSON.stringify(preferences),
		);
	}, [preferences]);

	const value = useMemo<ThemeFontPreferencesContextValue>(
		() => ({
			preferences,
			resolvedFonts: resolveThemeFonts(preferences),
			updatePreference(key, value) {
				setPreferences((current) => ({
					...current,
					[key]: value,
				}));
			},
			resetPreferences() {
				setPreferences(DEFAULT_THEME_FONT_PREFERENCES);
			},
		}),
		[preferences],
	);

	return (
		<ThemeFontPreferencesContext.Provider value={value}>
			{children}
		</ThemeFontPreferencesContext.Provider>
	);
}

export function useThemeFontPreferences() {
	return useContext(ThemeFontPreferencesContext);
}

export const SITE_THEME_STORAGE_KEY = "codex-themes:site-mode";
export const LIKED_THEMES_STORAGE_KEY = "codex-themes:liked-slugs";
export const LIKES_CHANGED_EVENT = "codex-themes:likes-changed";

function isBrowser() {
	return typeof window !== "undefined";
}

export function getStoredSiteTheme() {
	if (!isBrowser()) {
		return "dark";
	}

	const stored = window.localStorage.getItem(SITE_THEME_STORAGE_KEY);
	return stored === "light" ? "light" : "dark";
}

export function setStoredSiteTheme(mode: "light" | "dark") {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.setItem(SITE_THEME_STORAGE_KEY, mode);
}

export function getLikedThemeSlugs() {
	if (!isBrowser()) {
		return new Set<string>();
	}

	try {
		const stored = window.localStorage.getItem(LIKED_THEMES_STORAGE_KEY);
		if (!stored) {
			return new Set<string>();
		}

		const parsed = JSON.parse(stored);
		if (!Array.isArray(parsed)) {
			return new Set<string>();
		}

		return new Set(
			parsed.filter((value): value is string => typeof value === "string"),
		);
	} catch {
		return new Set<string>();
	}
}

export function writeLikedThemeSlugs(slugs: Iterable<string>) {
	if (!isBrowser()) {
		return;
	}

	window.localStorage.setItem(
		LIKED_THEMES_STORAGE_KEY,
		JSON.stringify([...slugs]),
	);
	window.dispatchEvent(new CustomEvent(LIKES_CHANGED_EVENT));
}

export function toggleLikedTheme(slug: string) {
	const next = getLikedThemeSlugs();
	if (next.has(slug)) {
		next.delete(slug);
	} else {
		next.add(slug);
	}

	writeLikedThemeSlugs(next);
	return next;
}

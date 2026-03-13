export const SITE_THEME_STORAGE_KEY = "codex-themes:site-mode";

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

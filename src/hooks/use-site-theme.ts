import { useEffect, useState } from "react";
import {
	getStoredSiteTheme,
	SITE_THEME_STORAGE_KEY,
	setStoredSiteTheme,
} from "#/lib/theme-storage";

export function applySiteTheme(mode: "light" | "dark") {
	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(mode);
	document.documentElement.style.colorScheme = mode;
	document.documentElement.setAttribute("data-theme", mode);
}

export function useSiteTheme() {
	const [mode, setMode] = useState<"light" | "dark">("dark");

	useEffect(() => {
		const stored = getStoredSiteTheme();
		setMode(stored);
		applySiteTheme(stored);
	}, []);

	useEffect(() => {
		const sync = (event: StorageEvent) => {
			if (event.key !== SITE_THEME_STORAGE_KEY) {
				return;
			}

			const next = getStoredSiteTheme();
			setMode(next);
			applySiteTheme(next);
		};

		window.addEventListener("storage", sync);
		return () => window.removeEventListener("storage", sync);
	}, []);

	return {
		mode,
		toggleMode() {
			const next = mode === "dark" ? "light" : "dark";
			setMode(next);
			applySiteTheme(next);
			setStoredSiteTheme(next);
		},
	};
}

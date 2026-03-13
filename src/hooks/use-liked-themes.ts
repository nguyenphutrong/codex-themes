import { useEffect, useState } from "react";
import {
	getLikedThemeSlugs,
	LIKES_CHANGED_EVENT,
	toggleLikedTheme,
} from "#/lib/theme-storage";

export function useLikedThemes() {
	const [likedSlugs, setLikedSlugs] = useState<Set<string>>(new Set());

	useEffect(() => {
		setLikedSlugs(getLikedThemeSlugs());

		const syncLikes = () => setLikedSlugs(getLikedThemeSlugs());

		window.addEventListener("storage", syncLikes);
		window.addEventListener(LIKES_CHANGED_EVENT, syncLikes);

		return () => {
			window.removeEventListener("storage", syncLikes);
			window.removeEventListener(LIKES_CHANGED_EVENT, syncLikes);
		};
	}, []);

	return {
		likedSlugs,
		toggleLike(slug: string) {
			const next = toggleLikedTheme(slug);
			setLikedSlugs(new Set(next));
		},
	};
}

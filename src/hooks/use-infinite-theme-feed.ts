import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ThemeRecord } from "#/lib/theme-types";

interface UseInfiniteThemeFeedOptions {
	initialCount?: number;
	batchSize?: number;
}

export function useInfiniteThemeFeed(
	themes: ThemeRecord[],
	options: UseInfiniteThemeFeedOptions = {},
) {
	const { initialCount = 16, batchSize = 12 } = options;
	const [visibleCount, setVisibleCount] = useState(
		Math.min(initialCount, themes.length),
	);
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const countRef = useRef(visibleCount);
	const themesLengthRef = useRef(themes.length);

	useEffect(() => {
		countRef.current = visibleCount;
	}, [visibleCount]);

	useEffect(() => {
		themesLengthRef.current = themes.length;
	}, [themes.length]);

	useEffect(() => {
		if (themes.length < initialCount) {
			setVisibleCount(themes.length);
		}
	}, [themes.length, initialCount]);

	const loadMore = useCallback(() => {
		const current = countRef.current;
		const total = themesLengthRef.current;
		if (current < total) {
			setVisibleCount((prev) => Math.min(prev + batchSize, total));
		}
	}, [batchSize]);

	useEffect(() => {
		if (typeof IntersectionObserver === "undefined") {
			setVisibleCount(themes.length);
			return;
		}

		const sentinel = sentinelRef.current;
		if (!sentinel) {
			return;
		}

		if (visibleCount >= themes.length) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting) {
					loadMore();
				}
			},
			{ rootMargin: "400px" },
		);

		observer.observe(sentinel);

		return () => observer.disconnect();
	}, [themes.length, visibleCount, loadMore]);

	const visibleThemes = useMemo(
		() => themes.slice(0, visibleCount),
		[themes, visibleCount],
	);

	return {
		hasMore: visibleCount < themes.length,
		sentinelRef,
		totalCount: themes.length,
		visibleCount: visibleThemes.length,
		visibleThemes,
	};
}

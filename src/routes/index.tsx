import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { ThemeFilters } from "#/components/theme/ThemeFilters";
import { ThemeFontControls } from "#/components/theme/ThemeFontControls";
import { ThemeGalleryGrid } from "#/components/theme/ThemeGalleryGrid";
import { allTags, allThemes, filterThemes } from "#/lib/theme-data";
import type { ThemeFilterOptions } from "#/lib/theme-types";

export const Route = createFileRoute("/")({ component: HomePage });

export function HomePage({
	interactiveCards = true,
}: {
	interactiveCards?: boolean;
}) {
	const [filters, setFilters] = useState<Required<ThemeFilterOptions>>({
		query: "",
		tag: "",
		variant: "all",
	});
	const filteredThemes = filterThemes(allThemes, filters);

	return (
		<HomePageContent
			filters={filters}
			filteredThemes={filteredThemes}
			interactiveCards={interactiveCards}
			fontControls={<ThemeFontControls compact />}
			stickyFontControls
			onFiltersChange={(next) =>
				setFilters((current) => ({ ...current, ...next }))
			}
		/>
	);
}

export function HomePageContent({
	filters,
	filteredThemes,
	interactiveCards = true,
	onFiltersChange,
	galleryContent,
	fontControls,
	stickyFontControls = true,
}: {
	filters: Required<ThemeFilterOptions>;
	filteredThemes: typeof allThemes;
	interactiveCards?: boolean;
	onFiltersChange(next: Partial<Required<ThemeFilterOptions>>): void;
	galleryContent?: ReactNode;
	fontControls?: ReactNode;
	stickyFontControls?: boolean;
}) {
	return (
		<main className="gallery-page-wrap space-y-6 pb-14 pt-8 sm:pt-10">
			<section className="gallery-shell space-y-4">
				<div className="space-y-2">
					<p className="eyebrow">Community themes</p>
					<h1 className="page-title">Pick a theme and copy it.</h1>
					<p className="page-subtitle">Browse and copy themes for Codex App.</p>
				</div>
				<p className="text-sm text-[color:var(--text-dim)]">
					{filteredThemes.length} / {allThemes.length} themes
				</p>
			</section>

			<ThemeFilters
				query={filters.query}
				variant={filters.variant}
				tag={filters.tag}
				tags={allTags}
				onChange={onFiltersChange}
			/>

			{fontControls ? (
				stickyFontControls ? (
					<StickyFontControls>{fontControls}</StickyFontControls>
				) : (
					fontControls
				)
			) : null}

			{galleryContent ?? (
				<ThemeGalleryGrid
					themes={filteredThemes}
					interactiveCards={interactiveCards}
				/>
			)}
		</main>
	);
}

function StickyFontControls({ children }: { children: ReactNode }) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const [isSticky, setIsSticky] = useState(false);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsSticky(!entry.isIntersecting);
			},
			{
				rootMargin: "-76px 0px 0px 0px",
				threshold: 0,
			},
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
			<div className="sticky top-[4.75rem] z-30 -mt-2">
				<div
					className={`transition-[max-width,margin] duration-200 ${
						isSticky ? "ml-auto max-w-[24rem]" : "w-full"
					}`}
				>
					{React.isValidElement(children)
						? React.cloneElement(children, {
								collapseWhenSticky: isSticky,
							} as { collapseWhenSticky: boolean })
						: children}
				</div>
			</div>
		</>
	);
}

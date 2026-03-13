import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { ThemeFilters } from "#/components/theme/ThemeFilters";
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
}: {
	filters: Required<ThemeFilterOptions>;
	filteredThemes: typeof allThemes;
	interactiveCards?: boolean;
	onFiltersChange(next: Partial<Required<ThemeFilterOptions>>): void;
	galleryContent?: ReactNode;
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

			{galleryContent ?? (
				<ThemeGalleryGrid
					themes={filteredThemes}
					interactiveCards={interactiveCards}
				/>
			)}
		</main>
	);
}

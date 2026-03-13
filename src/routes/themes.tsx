import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ThemeCard } from "#/components/theme/ThemeCard";
import { ThemeFilters } from "#/components/theme/ThemeFilters";
import { allTags, allThemes, filterThemes } from "#/lib/theme-data";
import type { ThemeFilterOptions } from "#/lib/theme-types";

interface ThemesSearch {
	q?: string;
	variant?: "light" | "dark" | "all";
	tag?: string;
}

export const Route = createFileRoute("/themes")({
	validateSearch: (search: Record<string, unknown>): ThemesSearch => ({
		q: typeof search.q === "string" ? search.q : "",
		variant:
			search.variant === "light" ||
			search.variant === "dark" ||
			search.variant === "all"
				? search.variant
				: "all",
		tag: typeof search.tag === "string" ? search.tag : "",
	}),
	component: ThemesPage,
});

export function ThemesPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const filteredThemes = filterThemes(allThemes, {
		query: search.q,
		variant: search.variant,
		tag: search.tag,
	});

	function updateSearch(next: Partial<Required<ThemeFilterOptions>>) {
		navigate({
			search: {
				q: next.query ?? search.q ?? "",
				variant: next.variant ?? search.variant ?? "all",
				tag: next.tag ?? search.tag ?? "",
			},
		});
	}

	return (
		<main className="page-wrap space-y-5 px-4 pb-14 pt-8 sm:pt-10">
			<section className="gallery-shell space-y-4">
				<div className="space-y-2">
					<p className="eyebrow">Browse</p>
					<h1 className="page-title">Filter fast, choose fast.</h1>
					<p className="page-subtitle">
						Search by theme name or author, then copy the theme string directly
						from the card.
					</p>
				</div>
				<p className="text-sm text-[color:var(--text-dim)]">
					{filteredThemes.length} / {allThemes.length} themes
				</p>
			</section>

			<ThemeFilters
				query={search.q ?? ""}
				variant={search.variant ?? "all"}
				tag={search.tag ?? ""}
				tags={allTags}
				onChange={updateSearch}
			/>

			<section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{filteredThemes.map((theme) => (
					<ThemeCard key={theme.slug} theme={theme} />
				))}
			</section>
		</main>
	);
}

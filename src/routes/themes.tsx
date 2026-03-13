import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ThemeCard } from "#/components/theme/ThemeCard";
import { ThemeFilters } from "#/components/theme/ThemeFilters";
import { Badge } from "#/components/ui/badge";
import { useLikedThemes } from "#/hooks/use-liked-themes";
import { allTags, allThemes, filterThemes } from "#/lib/theme-data";
import type { ThemeFilterOptions } from "#/lib/theme-types";

interface ThemesSearch {
	q?: string;
	variant?: "light" | "dark" | "all";
	tag?: string;
	sort?: "newest" | "popular";
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
		sort:
			search.sort === "newest" || search.sort === "popular"
				? search.sort
				: "popular",
	}),
	component: ThemesPage,
});

export function ThemesPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { likedSlugs } = useLikedThemes();

	const filteredThemes = filterThemes(allThemes, {
		query: search.q,
		variant: search.variant,
		tag: search.tag,
		sort: search.sort,
		likedSlugs,
	});

	function updateSearch(
		next: Partial<Required<Omit<ThemeFilterOptions, "likedSlugs">>>,
	) {
		navigate({
			search: {
				q: next.query ?? search.q ?? "",
				variant: next.variant ?? search.variant ?? "all",
				tag: next.tag ?? search.tag ?? "",
				sort: next.sort ?? search.sort ?? "popular",
			},
		});
	}

	return (
		<main className="page-wrap space-y-8 px-4 pb-18 pt-10 sm:pt-14">
			<section className="space-y-4">
				<p className="eyebrow">Browse the archive</p>
				<h1 className="hero-title max-w-4xl text-[clamp(2.6rem,6vw,4.6rem)]">
					Filter by signal, not by guesswork.
				</h1>
				<p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
					Search by author or theme name, sort by popularity or freshness, and
					narrow the library by variant or tag without leaving the page.
				</p>
			</section>

			<ThemeFilters
				query={search.q ?? ""}
				variant={search.variant ?? "all"}
				tag={search.tag ?? ""}
				sort={search.sort ?? "popular"}
				tags={allTags}
				onChange={updateSearch}
			/>

			<div className="flex flex-wrap gap-2">
				{allTags.map((tag) => (
					<button
						key={tag}
						type="button"
						onClick={() => updateSearch({ tag })}
						className="border-0 bg-transparent p-0"
					>
						<Badge variant={search.tag === tag ? "accent" : "default"}>
							{tag}
						</Badge>
					</button>
				))}
			</div>

			<section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
				{filteredThemes.map((theme) => (
					<ThemeCard key={theme.slug} theme={theme} />
				))}
			</section>
		</main>
	);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { ThemeFilters } from "#/components/theme/ThemeFilters";
import { ThemeFontControls } from "#/components/theme/ThemeFontControls";
import { ThemeGalleryGrid } from "#/components/theme/ThemeGalleryGrid";
import { COMMUNITY_REPO_URL } from "#/lib/site";
import { allTags, allThemes, filterThemes } from "#/lib/theme-data";
import type { ThemeFilterOptions } from "#/lib/theme-types";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title: "Codex Themes | Community Themes for Codex",
			},
			{
				name: "description",
				content:
					"Browse community themes for Codex, preview each code theme, copy your favorite setup, and contribute new themes to Codex Themes by Nguyen Phu Trong.",
			},
			{
				name: "keywords",
				content:
					"codex themes, code themes, community code themes, editor themes, dark code themes, light code themes, codex app themes",
			},
			{
				property: "og:title",
				content: "Codex Themes | Community Themes for Codex",
			},
			{
				property: "og:description",
				content:
					"Preview, copy, and contribute Codex themes from the community, with clear credit for the project and original theme authors.",
			},
		],
	}),
	component: HomePage,
});

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
					<p className="eyebrow">Codex themes</p>
					<h1 className="page-title">Community themes for Codex.</h1>
					<p className="page-subtitle">
						Browse, preview, and copy clean code themes made for Codex.
					</p>
				</div>
				<div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--text-soft)]">
					<Link
						to="/submit"
						className="font-medium text-[color:var(--text)] underline decoration-[color:var(--line-strong)] underline-offset-4"
					>
						Submit a theme
					</Link>
					<Link
						to="/docs/contributing"
						className="font-medium text-[color:var(--text)] underline decoration-[color:var(--line-strong)] underline-offset-4"
					>
						Contributing guide
					</Link>
					<a
						href={COMMUNITY_REPO_URL}
						target="_blank"
						rel="noreferrer"
						className="font-medium text-[color:var(--text)] underline decoration-[color:var(--line-strong)] underline-offset-4"
					>
						GitHub repository
					</a>
				</div>
				<p className="text-sm leading-7 text-[color:var(--text-dim)]">
					A community gallery by{" "}
					<a
						href="https://github.com/nguyenphutrong"
						target="_blank"
						rel="noreferrer"
						className="font-medium text-[color:var(--text-soft)] underline decoration-[color:var(--line-strong)] underline-offset-4"
					>
						nguyenphutrong
					</a>
					, with original author credits shown on each theme.
				</p>
			</section>

			<section aria-labelledby="theme-gallery-title" className="space-y-4">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-1">
						<h2
							id="theme-gallery-title"
							className="text-lg font-semibold tracking-tight text-[color:var(--text)]"
						>
							Theme gallery
						</h2>
						<p className="max-w-3xl text-sm leading-7 text-[color:var(--text-soft)]">
							Search by name, author, tag, or variant.
						</p>
					</div>
					<p className="text-sm text-[color:var(--text-dim)]">
						{filteredThemes.length} / {allThemes.length} themes
					</p>
				</div>

				<ThemeFilters
					query={filters.query}
					variant={filters.variant}
					tag={filters.tag}
					tags={allTags}
					onChange={onFiltersChange}
				/>
			</section>

			{fontControls ? (
				stickyFontControls ? (
					<StickyFontControls>{fontControls}</StickyFontControls>
				) : (
					fontControls
				)
			) : null}

			<section aria-labelledby="theme-results-title" className="space-y-3">
				<div className="space-y-1">
					<h3
						id="theme-results-title"
						className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--text-dim)]"
					>
						Community themes
					</h3>
					<p className="max-w-3xl text-sm leading-7 text-[color:var(--text-soft)]">
						Preview each theme, then copy the one that fits your setup.
					</p>
				</div>
				{galleryContent ?? (
					<ThemeGalleryGrid
						themes={filteredThemes}
						interactiveCards={interactiveCards}
					/>
				)}
			</section>
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

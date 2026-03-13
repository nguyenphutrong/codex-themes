import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CopyThemeButton } from "#/components/theme/CopyThemeButton";
import { RelatedThemes } from "#/components/theme/RelatedThemes";
import { ThemeMeta } from "#/components/theme/ThemeMeta";
import { ThemePreviewEditor } from "#/components/theme/ThemePreviewEditor";
import { buttonVariants } from "#/components/ui/button";
import {
	buildThemeString,
	getRelatedThemes,
	getThemeBySlug,
} from "#/lib/theme-data";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/themes/$slug")({
	loader: ({ params }) => {
		const theme = getThemeBySlug(params.slug);
		if (!theme) {
			throw notFound();
		}

		return {
			theme,
			relatedThemes: getRelatedThemes(theme),
		};
	},
	component: ThemeDetailPage,
});

export function ThemeDetailPage() {
	const { theme, relatedThemes } = Route.useLoaderData();

	return <ThemeDetailContent theme={theme} relatedThemes={relatedThemes} />;
}

export function ThemeDetailContent({
	theme,
	relatedThemes,
	interactive = true,
}: {
	theme: ReturnType<typeof getThemeBySlug> extends infer T
		? Exclude<T, undefined>
		: never;
	relatedThemes: ReturnType<typeof getRelatedThemes>;
	interactive?: boolean;
}) {
	return (
		<main className="page-wrap space-y-12 px-4 pb-18 pt-10 sm:pt-14">
			<section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="space-y-6">
					<div className="space-y-4">
						<p className="eyebrow">Theme detail</p>
						<h1 className="hero-title max-w-4xl text-[clamp(2.8rem,6vw,5rem)]">
							{theme.name}
						</h1>
						<p className="max-w-3xl text-base leading-8 text-[color:var(--text-soft)]">
							{theme.description}
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						{interactive ? (
							<CopyThemeButton
								value={buildThemeString(theme.codexTheme)}
								variant="default"
							/>
						) : (
							<div className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm text-[color:var(--text-soft)]">
								Static preview
							</div>
						)}
						<Link
							to="/themes"
							className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
						>
							Back to gallery
						</Link>
					</div>

					<ThemePreviewEditor theme={theme} />
				</div>

				<div className="space-y-5">
					<ThemeMeta theme={theme} />
					<div className="rounded-[1.7rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-6">
						<h2 className="mb-3 text-lg font-semibold tracking-tight text-[color:var(--text)]">
							Copy string
						</h2>
						<p className="mb-4 text-sm leading-7 text-[color:var(--text-soft)]">
							Use this full export in Codex or save it into a theme file for
							sharing.
						</p>
						<code className="block overflow-x-auto rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-xs leading-6 text-[color:var(--text-soft)]">
							{buildThemeString(theme.codexTheme)}
						</code>
					</div>
				</div>
			</section>

			<RelatedThemes themes={relatedThemes} interactive={interactive} />
		</main>
	);
}

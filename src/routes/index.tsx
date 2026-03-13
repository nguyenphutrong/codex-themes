import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { ThemeCard } from "#/components/theme/ThemeCard";
import { buttonVariants } from "#/components/ui/button";
import { allThemes, featuredThemes, filterThemes } from "#/lib/theme-data";
import { cn } from "#/lib/utils";

export const Route = createFileRoute("/")({ component: HomePage });

export function HomePage({
	interactiveCards = true,
}: {
	interactiveCards?: boolean;
}) {
	const newestThemes = filterThemes(allThemes, { sort: "newest" }).slice(0, 3);

	return (
		<main className="page-wrap space-y-16 px-4 pb-18 pt-10 sm:pt-14">
			<section className="hero-shell overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
				<div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
					<div className="space-y-8">
						<div className="space-y-4">
							<p className="eyebrow">Specimen library for Codex</p>
							<h1 className="hero-title max-w-4xl">
								Community themes that preview like real editors, not flat color
								chips.
							</h1>
							<p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)] sm:text-lg">
								Codex Themes is a static, shareable gallery for the Codex
								editor. Browse community palettes, inspect editor previews, and
								copy a theme string in one click.
							</p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Link to="/themes" className={buttonVariants({ size: "lg" })}>
								Browse themes
								<ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								to="/submit"
								className={cn(
									buttonVariants({ variant: "outline", size: "lg" }),
								)}
							>
								Submit your palette
							</Link>
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
						{[
							["6", "starter themes seeded"],
							["2 clicks", "to preview and copy"],
							["0 auth", "to heart favorites locally"],
						].map(([value, label]) => (
							<div key={label} className="hero-stat">
								<div className="hero-stat-value">{value}</div>
								<div className="hero-stat-label">{label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="space-y-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
					<div className="space-y-2">
						<p className="eyebrow">Featured</p>
						<h2 className="section-title">A short list worth opening first</h2>
					</div>
					<Link
						to="/themes"
						className={cn(buttonVariants({ variant: "ghost" }))}
					>
						See full library
					</Link>
				</div>
				<div className="grid gap-6 lg:grid-cols-3">
					{featuredThemes.map((theme) => (
						<ThemeCard
							key={theme.slug}
							theme={theme}
							interactive={interactiveCards}
						/>
					))}
				</div>
			</section>

			<section className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
				<div className="space-y-4 rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-6">
					<div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)]">
						<Sparkles className="h-5 w-5 text-[color:var(--accent-strong)]" />
					</div>
					<div className="space-y-2">
						<h2 className="section-title">
							Contribute without waiting on a backend
						</h2>
						<p className="m-0 text-sm leading-7 text-[color:var(--text-soft)]">
							The submit flow validates a Codex theme payload, lets you inspect
							a live preview, and packages the export for a GitHub contribution.
						</p>
					</div>
					<Link
						to="/docs/contributing"
						className={buttonVariants({ variant: "secondary" })}
					>
						Read contributing guide
					</Link>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{newestThemes.map((theme) => (
						<ThemeCard
							key={theme.slug}
							theme={theme}
							interactive={interactiveCards}
						/>
					))}
				</div>
			</section>
		</main>
	);
}

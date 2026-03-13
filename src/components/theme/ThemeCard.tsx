import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CopyThemeButton } from "#/components/theme/CopyThemeButton";
import { HeartButton } from "#/components/theme/HeartButton";
import { ThemePreviewEditor } from "#/components/theme/ThemePreviewEditor";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { buildThemeString } from "#/lib/theme-data";
import type { ThemeRecord } from "#/lib/theme-types";

interface ThemeCardProps {
	theme: ThemeRecord;
	interactive?: boolean;
}

export function ThemeCard({ theme, interactive = true }: ThemeCardProps) {
	return (
		<Card className="theme-card overflow-hidden">
			<CardContent className="space-y-5">
				<ThemePreviewEditor theme={theme} compact />
				<div className="space-y-3">
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-2">
							<div className="flex flex-wrap items-center gap-2">
								<Badge variant="accent">{theme.codexTheme.variant}</Badge>
								{theme.tags.slice(0, 2).map((tag) => (
									<Badge key={tag}>{tag}</Badge>
								))}
							</div>
							<div>
								<h3 className="text-xl font-semibold tracking-tight text-[color:var(--text)]">
									{theme.name}
								</h3>
								<p className="m-0 text-sm text-[color:var(--text-soft)]">
									by {theme.author}
								</p>
							</div>
						</div>
						<Link
							to="/themes/$slug"
							params={{ slug: theme.slug }}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] text-[color:var(--text)] no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]"
							aria-label={`Open ${theme.name}`}
						>
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
					<p className="m-0 text-sm leading-6 text-[color:var(--text-soft)]">
						{theme.description}
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3">
					{interactive ? (
						<>
							<CopyThemeButton value={buildThemeString(theme.codexTheme)} />
							<HeartButton theme={theme} />
						</>
					) : (
						<div className="text-sm text-[color:var(--text-soft)]">
							Static preview
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CopyThemeButton } from "#/components/theme/CopyThemeButton";
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
			<CardContent className="space-y-4">
				<Link
					to="/themes/$slug"
					params={{ slug: theme.slug }}
					className="group block space-y-4 no-underline"
					aria-label={`Open ${theme.name}`}
				>
					<div className="flex items-start justify-between gap-4">
						<div className="min-w-0">
							<h3 className="truncate text-base font-semibold tracking-tight text-[color:var(--text)]">
								{theme.name}
							</h3>
							<p className="m-0 truncate text-sm text-[color:var(--text-soft)]">
								{theme.author}
							</p>
						</div>
						<span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel-strong)] text-[color:var(--text)] transition group-hover:border-[color:var(--line-strong)]">
							<ArrowUpRight className="h-4 w-4" />
						</span>
					</div>
					<ThemePreviewEditor theme={theme} compact />
				</Link>
				<div className="flex flex-wrap items-center gap-2">
					<Badge variant="accent">{theme.codexTheme.variant}</Badge>
					{theme.tags.slice(0, 2).map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3">
					{interactive ? (
						<CopyThemeButton value={buildThemeString(theme.codexTheme)} />
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

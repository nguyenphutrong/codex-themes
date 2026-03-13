import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { ThemePreview } from "#/components/theme/ThemePreview";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { useThemeFontPreferences } from "#/hooks/use-theme-font-preferences";
import { buildThemeString, mergeThemeRecordFonts } from "#/lib/theme-data";
import type { ThemeRecord } from "#/lib/theme-types";

interface ThemeCardProps {
	theme: ThemeRecord;
	interactive?: boolean;
}

export function ThemeCard({ theme, interactive = true }: ThemeCardProps) {
	const [copied, setCopied] = useState(false);
	const { resolvedFonts } = useThemeFontPreferences();
	const resolvedTheme = mergeThemeRecordFonts(theme, resolvedFonts);

	async function handleCopy() {
		await navigator.clipboard.writeText(
			buildThemeString(theme.codexTheme, resolvedFonts),
		);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2000);
	}

	const copyOverlay = interactive ? (
		<button
			type="button"
			onClick={handleCopy}
			className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page)]"
			style={{
				backgroundColor: theme.codexTheme.theme.accent,
				color: theme.codexTheme.theme.surface,
			}}
		>
			{copied ? (
				<>
					<Check className="h-4 w-4" />
					Copied!
				</>
			) : (
				<>
					<Copy className="h-4 w-4" />
					Copy Theme
				</>
			)}
		</button>
	) : null;

	return (
		<Card className="theme-card group overflow-hidden">
			<CardContent className="p-2 sm:p-2">
				<ThemePreview theme={resolvedTheme} mode="card" overlay={copyOverlay} />

				<div className="flex flex-1 flex-col gap-1.5 p-3">
					<div className="flex items-start justify-between">
						<h3 className="truncate text-base font-semibold tracking-tight text-[color:var(--text)]">
							{theme.name}
						</h3>
						<span className="shrink-0 rounded-full bg-[color:var(--page-elevated)] px-2 py-0.5 text-xs text-[color:var(--text-dim)]">
							{theme.codexTheme.variant}
						</span>
					</div>
					<p className="m-0 line-clamp-2 text-sm leading-relaxed text-[color:var(--text-soft)]">
						{theme.description}
					</p>

					<div className="mt-auto flex flex-wrap gap-1 pt-2">
						{theme.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} className="px-2 py-0.5 text-[10px]">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

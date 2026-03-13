import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import type { CSSProperties } from "react";
import { sampleEditorCode } from "#/lib/theme-data";
import type { ThemeRecord } from "#/lib/theme-types";
import { cn } from "#/lib/utils";

hljs.registerLanguage("javascript", javascript);

interface ThemePreviewEditorProps {
	theme: ThemeRecord;
	compact?: boolean;
	className?: string;
}

export function ThemePreviewEditor({
	theme,
	compact = false,
	className,
}: ThemePreviewEditorProps) {
	const previewTheme = theme.codexTheme.theme;
	const highlighted = hljs.highlight(sampleEditorCode, {
		language: "javascript",
	}).value;

	return (
		<div
			className={cn(
				"overflow-hidden rounded-[1.45rem] border border-black/30 bg-black/25 shadow-[0_20px_60px_rgba(4,8,22,0.34)]",
				className,
			)}
			style={
				{
					"--preview-accent": previewTheme.accent,
					"--preview-ink": previewTheme.ink,
					"--preview-surface": previewTheme.surface,
					"--preview-diff-added": previewTheme.semanticColors.diffAdded,
					"--preview-diff-removed": previewTheme.semanticColors.diffRemoved,
					"--preview-skill": previewTheme.semanticColors.skill,
				} as CSSProperties
			}
		>
			<div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3">
				<div className="flex items-center gap-2">
					<span className="preview-dot bg-[#ff6159]" />
					<span className="preview-dot bg-[#ffbd2e]" />
					<span className="preview-dot bg-[#28c840]" />
				</div>
				<div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">
					{theme.codexTheme.variant}
				</div>
			</div>

			<div
				className={cn(
					"grid gap-0 md:grid-cols-[minmax(0,1fr)_8.5rem]",
					compact && "md:grid-cols-[minmax(0,1fr)_6.5rem]",
				)}
				style={{
					background: `linear-gradient(180deg, color-mix(in srgb, ${previewTheme.surface} 88%, #050816 12%), ${previewTheme.surface})`,
				}}
			>
				<div className="relative px-4 py-4">
					<div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
						<span>app/theme.ts</span>
						<span className="text-[color:var(--preview-accent)]">preview</span>
					</div>
					<pre
						className={cn(
							"theme-preview-code m-0 overflow-hidden text-[13px] leading-6",
							compact && "text-[11px] leading-5",
						)}
						style={{
							color: previewTheme.ink,
							fontFamily: previewTheme.fonts.code,
						}}
					>
						{/* biome-ignore lint/security/noDangerouslySetInnerHtml: highlight.js output is generated from a static local sample. */}
						<code dangerouslySetInnerHTML={{ __html: highlighted }} />
					</pre>
				</div>

				<div className="border-l border-white/10 bg-black/16 px-3 py-4">
					<div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/55">
						swatches
					</div>
					<div className="space-y-2.5">
						{[
							["accent", previewTheme.accent],
							["surface", previewTheme.surface],
							["ink", previewTheme.ink],
							["added", previewTheme.semanticColors.diffAdded],
							["removed", previewTheme.semanticColors.diffRemoved],
							["skill", previewTheme.semanticColors.skill],
						].map(([label, value]) => (
							<div key={label} className="flex items-center gap-2">
								<span
									className="h-4 w-4 rounded-full border border-white/20"
									style={{ backgroundColor: value }}
								/>
								<div className="min-w-0">
									<div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
										{label}
									</div>
									<div className="truncate text-[10px] text-white/72">
										{value}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

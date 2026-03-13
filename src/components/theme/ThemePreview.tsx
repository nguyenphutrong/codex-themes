import type { CSSProperties, ReactNode } from "react";
import type { ThemeRecord } from "#/lib/theme-types";
import { cn } from "#/lib/utils";

type ThemePreviewMode = "card" | "detail" | "submit";

interface ThemePreviewProps {
	theme: ThemeRecord;
	mode?: ThemePreviewMode;
	className?: string;
	overlay?: ReactNode;
}

export function ThemePreview({
	theme,
	mode = "detail",
	className,
	overlay,
}: ThemePreviewProps) {
	const t = theme.codexTheme.theme;
	const compact = mode === "card";
	const commentColor = `color-mix(in srgb, ${t.ink} 50%, ${t.surface})`;
	const secondaryBg = `color-mix(in srgb, ${t.surface} 85%, ${t.ink} 8%)`;

	const swatches = compact
		? [
				{ color: t.accent, label: "Accent" },
				{ color: t.semanticColors.diffAdded, label: "Diff added" },
				{ color: t.semanticColors.diffRemoved, label: "Diff removed" },
			]
		: [
				{ color: t.accent, label: "Accent" },
				{ color: t.semanticColors.diffAdded, label: "Diff added" },
				{ color: t.semanticColors.diffRemoved, label: "Diff removed" },
				{ color: t.semanticColors.skill, label: "Skill" },
			];

	return (
		<section
			className={cn("theme-preview", compact && "is-card", className)}
			style={
				{
					"--tp-surface": t.surface,
					"--tp-ink": t.ink,
				} as CSSProperties
			}
		>
			{/* ── Terminal preview ── */}
			<div
				className="theme-preview__terminal"
				style={{ backgroundColor: t.surface }}
			>
				<div
					className="theme-preview__header"
					style={{ backgroundColor: secondaryBg }}
				>
					<div className="theme-preview__dots">
						<div className="theme-preview__dot theme-preview__dot--close" />
						<div className="theme-preview__dot theme-preview__dot--minimize" />
						<div className="theme-preview__dot theme-preview__dot--maximize" />
					</div>
					<span
						className="theme-preview__filename"
						style={{ color: commentColor }}
					>
						main.tsx
					</span>
				</div>

				<div className="theme-preview__code">
					{/* // Theme: {name} */}
					<div className="theme-preview__code-line">
						<span style={{ color: commentColor }}>{"// "}</span>
						<span style={{ color: commentColor }}>
							Theme: {compact ? "preview" : theme.name}
						</span>
					</div>

					{/* const greeting = "Hello, World!"; */}
					<div className="theme-preview__code-line">
						<span style={{ color: t.accent }}>const</span>
						<span style={{ color: t.semanticColors.diffRemoved }}>
							greeting
						</span>
						<span style={{ color: t.ink }}>=</span>
						<span style={{ color: t.semanticColors.diffAdded }}>
							&quot;Hello, World!&quot;
						</span>
						<span style={{ color: t.ink }}>;</span>
					</div>

					{/* function sayHello() { */}
					<div className="theme-preview__code-line">
						<span style={{ color: t.accent }}>function</span>
						<span style={{ color: t.semanticColors.skill }}>sayHello</span>
						<span style={{ color: t.ink }}>{"() {"}</span>
					</div>

					{/*   console.log(greeting); */}
					<div className="theme-preview__code-line is-indented">
						<span style={{ color: t.semanticColors.skill }}>console</span>
						<span style={{ color: t.ink }}>.</span>
						<span style={{ color: t.semanticColors.skill }}>log</span>
						<span style={{ color: t.ink }}>(</span>
						<span style={{ color: t.semanticColors.diffRemoved }}>
							greeting
						</span>
						<span style={{ color: t.ink }}>);</span>
					</div>

					{/* } */}
					<div className="theme-preview__code-line">
						<span style={{ color: t.ink }}>{"}"}</span>
					</div>
				</div>

				{overlay ? (
					<div className="theme-preview__overlay">{overlay}</div>
				) : null}
			</div>

			{/* ── Info section ── */}
			<div className="theme-preview__info">
				<div
					className="theme-preview__swatches"
					role="img"
					aria-label="Theme color swatches"
				>
					{swatches.map((s) => (
						<div
							key={s.label}
							className="theme-preview__swatch"
							style={{ backgroundColor: s.color }}
							title={`${s.label}: ${s.color}`}
							role="presentation"
							aria-hidden="true"
						/>
					))}
				</div>

				{compact ? null : (
					<div className="theme-preview__meta">
						<div className="theme-preview__meta-row">
							<span className="theme-preview__meta-label">UI font</span>
							<span className="theme-preview__meta-value">
								{t.fonts.ui ?? "Default UI"}
							</span>
						</div>
						<div className="theme-preview__meta-row">
							<span className="theme-preview__meta-label">Code font</span>
							<span className="theme-preview__meta-value">
								{t.fonts.code ?? "Default code"}
							</span>
						</div>
						<div className="theme-preview__meta-row">
							<span className="theme-preview__meta-label">Contrast</span>
							<span className="theme-preview__meta-value">{t.contrast}</span>
						</div>
						<div className="theme-preview__meta-row">
							<span className="theme-preview__meta-label">Variant</span>
							<span className="theme-preview__meta-value">
								{theme.codexTheme.variant}
							</span>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

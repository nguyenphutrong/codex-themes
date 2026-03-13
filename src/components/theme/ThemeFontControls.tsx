import { ChevronDown, RotateCcw, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Select } from "#/components/ui/select";
import { useThemeFontPreferences } from "#/hooks/use-theme-font-preferences";
import {
	CUSTOM_FONT_CHOICE,
	POPULAR_DEV_FONTS,
	THEME_DEFAULT_FONT_CHOICE,
} from "#/lib/theme-fonts";
import { cn } from "#/lib/utils";

interface ThemeFontControlsProps {
	compact?: boolean;
	collapseWhenSticky?: boolean;
}

export function ThemeFontControls({
	compact = false,
	collapseWhenSticky = false,
}: ThemeFontControlsProps) {
	const { preferences, resetPreferences, updatePreference } =
		useThemeFontPreferences();
	const [expanded, setExpanded] = useState(false);
	const summary = `${getFontSummary(preferences.uiChoice, preferences.uiCustom)} / ${getFontSummary(preferences.codeChoice, preferences.codeCustom)}`;

	useEffect(() => {
		if (compact && collapseWhenSticky) {
			setExpanded(false);
		}
	}, [collapseWhenSticky, compact]);

	if (compact) {
		return (
			<section className="w-full rounded-[1rem] border border-[color:var(--line)] bg-[color:color-mix(in_srgb,var(--panel)_92%,transparent)] shadow-[0_10px_30px_rgba(2,6,18,0.16)] backdrop-blur-xl">
				<button
					type="button"
					onClick={() => setExpanded((value) => !value)}
					aria-expanded={expanded}
					className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[color:var(--panel-strong)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
				>
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--page-elevated)] text-[color:var(--text)]">
						<Type className="h-4 w-4" />
					</span>
					<span className="min-w-0 flex-1">
						<span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-dim)]">
							Fonts for copy
						</span>
						<span className="block truncate text-sm text-[color:var(--text-soft)]">
							{summary}
						</span>
					</span>
					<span className="inline-flex items-center gap-2 text-xs font-medium text-[color:var(--text-dim)]">
						{expanded ? "Hide" : "Fonts"}
						<ChevronDown
							className={cn(
								"h-4 w-4 transition-transform",
								expanded && "rotate-180",
							)}
						/>
					</span>
				</button>

				{expanded ? (
					<div className="border-t border-[color:var(--line)] px-4 py-4">
						<div className="mb-3 flex items-center justify-between gap-3">
							<p className="m-0 text-xs leading-6 text-[color:var(--text-soft)]">
								These fonts will be merged into copied themes.
							</p>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={resetPreferences}
								title="Reset font preferences"
								aria-label="Reset font preferences"
							>
								<RotateCcw className="h-4 w-4" />
							</Button>
						</div>

						<div className="grid gap-3 md:grid-cols-2">
							<FontField
								compact
								label="UI font"
								selectId="theme-font-ui"
								choice={preferences.uiChoice}
								customValue={preferences.uiCustom}
								onChoiceChange={(value) => updatePreference("uiChoice", value)}
								onCustomChange={(value) => updatePreference("uiCustom", value)}
							/>
							<FontField
								compact
								label="Code font"
								selectId="theme-font-code"
								choice={preferences.codeChoice}
								customValue={preferences.codeCustom}
								onChoiceChange={(value) =>
									updatePreference("codeChoice", value)
								}
								onCustomChange={(value) =>
									updatePreference("codeCustom", value)
								}
							/>
						</div>
					</div>
				) : null}
			</section>
		);
	}

	return (
		<section
			className={cn(
				"rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel)]",
				"p-4",
			)}
		>
			<div className="flex items-start justify-between gap-3">
				<div className="space-y-1">
					<p
						className={cn(
							"eyebrow",
							compact && "text-[10px] tracking-[0.18em]",
						)}
					>
						Fonts for copy
					</p>
					<h2
						className={cn(
							"font-semibold tracking-tight text-[color:var(--text)]",
							compact ? "text-sm" : "text-base",
						)}
					>
						Merge fonts into copied themes
					</h2>
					<p className="m-0 text-sm text-[color:var(--text-soft)]">
						Choose a UI font and a code font once. Every preview and copy action
						will use them.
					</p>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={resetPreferences}
					className="justify-start"
					title="Reset font preferences"
					aria-label="Reset font preferences"
				>
					<RotateCcw className="h-4 w-4" />
					Reset
				</Button>
			</div>

			<div className="mt-3 grid gap-3 md:grid-cols-2">
				<FontField
					label="UI font"
					selectId="theme-font-ui"
					choice={preferences.uiChoice}
					customValue={preferences.uiCustom}
					onChoiceChange={(value) => updatePreference("uiChoice", value)}
					onCustomChange={(value) => updatePreference("uiCustom", value)}
				/>
				<FontField
					label="Code font"
					selectId="theme-font-code"
					choice={preferences.codeChoice}
					customValue={preferences.codeCustom}
					onChoiceChange={(value) => updatePreference("codeChoice", value)}
					onCustomChange={(value) => updatePreference("codeCustom", value)}
				/>
			</div>
		</section>
	);
}

function getFontSummary(choice: string, customValue: string) {
	if (choice === THEME_DEFAULT_FONT_CHOICE) {
		return "Theme default";
	}

	if (choice === CUSTOM_FONT_CHOICE) {
		return customValue.trim() || "Custom font";
	}

	return choice;
}

function FontField({
	compact = false,
	label,
	selectId,
	choice,
	customValue,
	onChoiceChange,
	onCustomChange,
}: {
	compact?: boolean;
	label: string;
	selectId: string;
	choice: string;
	customValue: string;
	onChoiceChange(value: string): void;
	onCustomChange(value: string): void;
}) {
	return (
		<div className="space-y-2">
			<label
				htmlFor={selectId}
				className={cn(
					"font-semibold uppercase text-[color:var(--text-dim)]",
					compact
						? "text-[10px] tracking-[0.14em]"
						: "text-xs tracking-[0.16em]",
				)}
			>
				{label}
			</label>
			<Select
				id={selectId}
				value={choice}
				onChange={(event) => onChoiceChange(event.target.value)}
			>
				<option value={THEME_DEFAULT_FONT_CHOICE}>Theme default</option>
				{POPULAR_DEV_FONTS.map((font) => (
					<option key={font} value={font}>
						{font}
					</option>
				))}
				<option value={CUSTOM_FONT_CHOICE}>Custom font...</option>
			</Select>
			{choice === CUSTOM_FONT_CHOICE ? (
				<Input
					value={customValue}
					onChange={(event) => onCustomChange(event.target.value)}
					placeholder="Enter any installed font name"
				/>
			) : null}
		</div>
	);
}

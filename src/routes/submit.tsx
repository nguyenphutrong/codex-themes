import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CopyThemeButton } from "#/components/theme/CopyThemeButton";
import { ThemePreviewEditor } from "#/components/theme/ThemePreviewEditor";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Select } from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";
import { COMMUNITY_NEW_PR_URL, COMMUNITY_REPO_URL } from "#/lib/site";
import {
	buildDraftThemeRecord,
	buildPayloadFromSubmitForm,
	DEFAULT_SUBMIT_VALUES,
	validateSubmitThemeForm,
} from "#/lib/theme-submit";
import type { SubmitThemeFormValues } from "#/lib/theme-types";

export const Route = createFileRoute("/submit")({
	component: SubmitPage,
});

export function SubmitPage() {
	const [formValues, setFormValues] = useState<SubmitThemeFormValues>(
		DEFAULT_SUBMIT_VALUES,
	);
	const validation = validateSubmitThemeForm(formValues);
	const draftTheme = useMemo(
		() => buildDraftThemeRecord(formValues),
		[formValues],
	);
	const payload = useMemo(
		() => buildPayloadFromSubmitForm(formValues),
		[formValues],
	);
	const payloadJson = JSON.stringify(payload, null, 2);
	const themeString = `codex-theme-v1:${JSON.stringify(payload)}`;

	function updateField<K extends keyof SubmitThemeFormValues>(
		field: K,
		value: SubmitThemeFormValues[K],
	) {
		setFormValues((current) => ({
			...current,
			[field]: value,
		}));
	}

	return (
		<main className="page-wrap grid gap-8 px-4 pb-18 pt-10 sm:pt-14 xl:grid-cols-[0.95fr_1.05fr]">
			<section className="space-y-6">
				<div className="space-y-3">
					<p className="eyebrow">Submit a theme</p>
					<h1 className="hero-title max-w-4xl text-[clamp(2.8rem,6vw,4.7rem)]">
						Shape the payload, inspect the preview, then export for GitHub.
					</h1>
					<p className="max-w-2xl text-base leading-8 text-[color:var(--text-soft)]">
						v1 is intentionally static. This page validates your theme, shows
						exactly how it looks in a faux editor, and gives you the string or
						JSON needed for a contribution.
					</p>
				</div>

				<div className="grid gap-4 rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-5 sm:grid-cols-2">
					<Field label="Theme name" error={validation.fieldErrors.name}>
						<Input
							value={formValues.name}
							onChange={(e) => updateField("name", e.target.value)}
						/>
					</Field>
					<Field label="Author" error={validation.fieldErrors.author}>
						<Input
							value={formValues.author}
							onChange={(e) => updateField("author", e.target.value)}
						/>
					</Field>
					<Field label="Author URL" error={validation.fieldErrors.authorUrl}>
						<Input
							value={formValues.authorUrl}
							onChange={(e) => updateField("authorUrl", e.target.value)}
							placeholder="https://github.com/you"
						/>
					</Field>
					<Field label="Variant">
						<Select
							value={formValues.variant}
							onChange={(e) =>
								updateField(
									"variant",
									e.target.value as SubmitThemeFormValues["variant"],
								)
							}
						>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</Select>
					</Field>
					<div className="sm:col-span-2">
						<Field
							label="Description"
							error={validation.fieldErrors.description}
						>
							<Textarea
								value={formValues.description}
								onChange={(e) => updateField("description", e.target.value)}
							/>
						</Field>
					</div>
					<div className="sm:col-span-2">
						<Field label="Tags" error={validation.fieldErrors.tags}>
							<Input
								value={formValues.tags}
								onChange={(e) => updateField("tags", e.target.value)}
								placeholder="minimal, retro, neon"
							/>
						</Field>
					</div>
				</div>

				<div className="grid gap-4 rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-5 sm:grid-cols-2">
					<Field label="Accent" error={validation.fieldErrors.accent}>
						<ColorInput
							value={formValues.accent}
							onChange={(value) => updateField("accent", value)}
						/>
					</Field>
					<Field label="Surface" error={validation.fieldErrors.surface}>
						<ColorInput
							value={formValues.surface}
							onChange={(value) => updateField("surface", value)}
						/>
					</Field>
					<Field label="Ink" error={validation.fieldErrors.ink}>
						<ColorInput
							value={formValues.ink}
							onChange={(value) => updateField("ink", value)}
						/>
					</Field>
					<Field label="Skill" error={validation.fieldErrors.skill}>
						<ColorInput
							value={formValues.skill}
							onChange={(value) => updateField("skill", value)}
						/>
					</Field>
					<Field label="Diff added" error={validation.fieldErrors.diffAdded}>
						<ColorInput
							value={formValues.diffAdded}
							onChange={(value) => updateField("diffAdded", value)}
						/>
					</Field>
					<Field
						label="Diff removed"
						error={validation.fieldErrors.diffRemoved}
					>
						<ColorInput
							value={formValues.diffRemoved}
							onChange={(value) => updateField("diffRemoved", value)}
						/>
					</Field>
					<Field label="Contrast" error={validation.fieldErrors.contrast}>
						<Input
							value={formValues.contrast}
							onChange={(e) => updateField("contrast", e.target.value)}
							inputMode="numeric"
						/>
					</Field>
					<Field label="Opaque windows">
						<div className="flex h-11 items-center rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel-strong)] px-4 text-sm text-[color:var(--text)]">
							<input
								id="opaqueWindows"
								type="checkbox"
								checked={formValues.opaqueWindows}
								onChange={(e) => updateField("opaqueWindows", e.target.checked)}
								className="mr-3 h-4 w-4 accent-[color:var(--accent-strong)]"
							/>
							<label htmlFor="opaqueWindows">Use opaque Codex windows</label>
						</div>
					</Field>
					<Field label="Code font" error={validation.fieldErrors.codeFont}>
						<Input
							value={formValues.codeFont}
							onChange={(e) => updateField("codeFont", e.target.value)}
						/>
					</Field>
					<Field label="UI font" error={validation.fieldErrors.uiFont}>
						<Input
							value={formValues.uiFont}
							onChange={(e) => updateField("uiFont", e.target.value)}
						/>
					</Field>
				</div>
			</section>

			<section className="space-y-6 xl:sticky xl:top-24 xl:self-start">
				<ThemePreviewEditor theme={draftTheme} />
				<div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
					<div className="mb-4 flex flex-wrap gap-3">
						<CopyThemeButton value={themeString} variant="default" />
						<CopyThemeButton value={payloadJson} label="Copy JSON" />
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() =>
								window.open(
									COMMUNITY_NEW_PR_URL,
									"_blank",
									"noopener,noreferrer",
								)
							}
						>
							Open GitHub
						</Button>
					</div>
					<p className="m-0 text-sm leading-7 text-[color:var(--text-soft)]">
						Export the exact Codex string, paste the JSON into a new file under
						<code>data/themes/</code>, then open a pull request in{" "}
						<a href={COMMUNITY_REPO_URL} target="_blank" rel="noreferrer">
							the repository
						</a>
						.
					</p>
				</div>

				<div className="rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-5">
					<h2 className="mb-3 text-lg font-semibold tracking-tight text-[color:var(--text)]">
						Generated payload
					</h2>
					<pre className="m-0 overflow-x-auto rounded-[1.2rem] border border-[color:var(--line)] bg-[color:var(--panel-strong)] p-4 text-xs leading-6 text-[color:var(--text-soft)]">
						<code>{payloadJson}</code>
					</pre>
					{!validation.isValid ? (
						<p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-300/8 px-4 py-3 text-sm text-amber-100">
							Fix the highlighted fields before opening a contribution.
						</p>
					) : null}
				</div>
			</section>
		</main>
	);
}

function Field({
	children,
	error,
	label,
}: {
	children: ReactNode;
	error?: string;
	label: string;
}) {
	return (
		<div className="grid gap-2">
			<span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-dim)]">
				{label}
			</span>
			{children}
			{error ? (
				<span className="text-xs text-[color:var(--danger)]">{error}</span>
			) : null}
		</div>
	);
}

function ColorInput({
	onChange,
	value,
}: {
	onChange(value: string): void;
	value: string;
}) {
	return (
		<div className="flex h-11 items-center gap-3 rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] px-3">
			<input
				type="color"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="h-7 w-7 rounded-full border-0 bg-transparent p-0"
			/>
			<Input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="h-auto border-0 bg-transparent px-0 shadow-none focus:ring-0"
			/>
		</div>
	);
}

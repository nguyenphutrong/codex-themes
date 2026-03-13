import { slugify, validateHexColor } from "#/lib/theme-data";
import type {
	CodexThemePayload,
	SubmitThemeFormValues,
	SubmitThemeValidationResult,
	ThemeRecord,
} from "#/lib/theme-types";

export const DEFAULT_SUBMIT_VALUES: SubmitThemeFormValues = {
	name: "",
	author: "",
	authorUrl: "",
	description: "",
	tags: "minimal, dark",
	variant: "dark",
	accent: "#7aa2f7",
	contrast: "76",
	codeFont: "Maple Mono NF",
	uiFont: "Maple Mono NF",
	ink: "#d9e1ff",
	surface: "#171b29",
	diffAdded: "#7ee787",
	diffRemoved: "#ff7b72",
	skill: "#d2a8ff",
	opaqueWindows: true,
};

function validateOptionalUrl(value: string) {
	if (!value.trim()) {
		return true;
	}

	try {
		const url = new URL(value);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

export function normalizeTags(tags: string) {
	return [
		...new Set(
			tags
				.split(",")
				.map((tag) => tag.trim().toLowerCase())
				.filter(Boolean),
		),
	];
}

export function validateSubmitThemeForm(
	values: SubmitThemeFormValues,
): SubmitThemeValidationResult {
	const fieldErrors: SubmitThemeValidationResult["fieldErrors"] = {};

	if (!values.name.trim()) {
		fieldErrors.name = "Theme name is required.";
	}

	if (!values.author.trim()) {
		fieldErrors.author = "Author name is required.";
	}

	if (!values.description.trim()) {
		fieldErrors.description = "A short description is required.";
	}

	if (!normalizeTags(values.tags).length) {
		fieldErrors.tags = "Add at least one tag.";
	}

	if (!validateOptionalUrl(values.authorUrl)) {
		fieldErrors.authorUrl = "Use a valid http or https URL.";
	}

	const contrast = Number(values.contrast);
	if (!Number.isFinite(contrast) || contrast < 0 || contrast > 100) {
		fieldErrors.contrast = "Contrast must be between 0 and 100.";
	}

	for (const field of [
		"accent",
		"ink",
		"surface",
		"diffAdded",
		"diffRemoved",
		"skill",
	] as const) {
		if (!validateHexColor(values[field])) {
			fieldErrors[field] = "Use a full hex color like #7aa2f7.";
		}
	}

	if (!values.codeFont.trim()) {
		fieldErrors.codeFont = "Choose a code font.";
	}

	if (!values.uiFont.trim()) {
		fieldErrors.uiFont = "Choose a UI font.";
	}

	return {
		fieldErrors,
		isValid: !Object.keys(fieldErrors).length,
	};
}

export function buildPayloadFromSubmitForm(
	values: SubmitThemeFormValues,
): CodexThemePayload {
	return {
		codeThemeId: "codex",
		theme: {
			accent: values.accent.trim(),
			contrast: Number(values.contrast),
			fonts: {
				code: values.codeFont.trim(),
				ui: values.uiFont.trim(),
			},
			ink: values.ink.trim(),
			opaqueWindows: values.opaqueWindows,
			semanticColors: {
				diffAdded: values.diffAdded.trim(),
				diffRemoved: values.diffRemoved.trim(),
				skill: values.skill.trim(),
			},
			surface: values.surface.trim(),
		},
		variant: values.variant,
	};
}

export function buildDraftThemeRecord(
	values: SubmitThemeFormValues,
): ThemeRecord {
	const payload = buildPayloadFromSubmitForm(values);
	return {
		slug: slugify(values.name || "untitled-theme"),
		name: values.name || "Untitled Theme",
		author: values.author || "Anonymous",
		authorUrl: values.authorUrl.trim() || undefined,
		description:
			values.description ||
			"A draft Codex theme preview generated from the submission form.",
		tags: normalizeTags(values.tags),
		featured: false,
		createdAt: new Date().toISOString().slice(0, 10),
		baseLikes: 0,
		codexTheme: payload,
	};
}

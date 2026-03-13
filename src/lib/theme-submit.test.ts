import { describe, expect, it } from "vitest";
import {
	buildPayloadFromSubmitForm,
	DEFAULT_SUBMIT_VALUES,
	validateSubmitThemeForm,
} from "#/lib/theme-submit";

describe("submit theme form", () => {
	it("accepts a complete valid payload", () => {
		const validation = validateSubmitThemeForm({
			...DEFAULT_SUBMIT_VALUES,
			name: "Night Shift",
			author: "Theme Author",
			description: "A crisp after-hours palette.",
		});

		expect(validation.isValid).toBe(true);
		expect(validation.fieldErrors).toEqual({});
	});

	it("rejects missing fields and invalid hex colors", () => {
		const validation = validateSubmitThemeForm({
			...DEFAULT_SUBMIT_VALUES,
			name: "",
			author: "",
			description: "",
			accent: "#123",
			contrast: "120",
		});

		expect(validation.isValid).toBe(false);
		expect(validation.fieldErrors.name).toBeDefined();
		expect(validation.fieldErrors.author).toBeDefined();
		expect(validation.fieldErrors.description).toBeDefined();
		expect(validation.fieldErrors.accent).toBeDefined();
		expect(validation.fieldErrors.contrast).toBeDefined();
	});

	it("builds the codex payload shape from form values", () => {
		const payload = buildPayloadFromSubmitForm({
			...DEFAULT_SUBMIT_VALUES,
			name: "Paper Drift",
			author: "Theme Author",
			description: "A bright light theme",
			variant: "light",
		});

		expect(payload.codeThemeId).toBe("codex");
		expect(payload.variant).toBe("light");
		expect(payload.theme.semanticColors.skill).toBe(
			DEFAULT_SUBMIT_VALUES.skill,
		);
	});
});

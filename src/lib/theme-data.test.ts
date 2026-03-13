import { describe, expect, it } from "vitest";
import {
	allThemes,
	buildThemeString,
	filterThemes,
	parseThemeRecord,
} from "#/lib/theme-data";

describe("theme data", () => {
	it("parses the seeded gallery data", () => {
		expect(allThemes).toHaveLength(6);
		expect(allThemes[0]?.slug).toBe("midnight-sakura");
	});

	it("rejects invalid theme records", () => {
		expect(() =>
			parseThemeRecord({
				tags: [],
				codexTheme: {
					codeThemeId: "codex",
					theme: {
						accent: "#7aa2f7",
						contrast: 50,
						fonts: { code: "Maple Mono NF", ui: "Maple Mono NF" },
						ink: "#d9e1ff",
						opaqueWindows: true,
						semanticColors: {
							diffAdded: "#7ee787",
							diffRemoved: "#ff7b72",
							skill: "#d2a8ff",
						},
						surface: "#171b29",
					},
					variant: "dark",
				},
				name: "Broken Theme",
				author: "Someone",
				description: "Broken",
				featured: false,
				createdAt: "2026-01-01",
				baseLikes: 0,
			}),
		).toThrow(/slug is required/i);
	});

	it("filters themes by query, tag, and variant while preserving gallery order", () => {
		const filtered = filterThemes(allThemes, {
			query: "tokyo",
			tag: "neon",
			variant: "dark",
		});

		expect(filtered).toHaveLength(1);
		expect(filtered[0]?.slug).toBe("tokyo-night");
	});

	it("serializes a valid codex theme string", () => {
		const themeString = buildThemeString(allThemes[0].codexTheme);

		expect(themeString.startsWith("codex-theme-v1:")).toBe(true);
		expect(themeString).toContain('"variant"');
	});
});

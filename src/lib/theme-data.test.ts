import { describe, expect, it } from "vitest";
import {
	allThemes,
	buildThemeString,
	filterThemes,
	parseThemeRecord,
} from "#/lib/theme-data";

describe("theme data", () => {
	it("parses the seeded gallery data", () => {
		expect(allThemes.length).toBeGreaterThanOrEqual(50);
		expect(new Set(allThemes.map((theme) => theme.slug)).size).toBe(
			allThemes.length,
		);
		expect(allThemes.some((theme) => theme.slug === "dracula-official")).toBe(
			true,
		);
		expect(allThemes.some((theme) => theme.slug === "nightfox")).toBe(true);
		expect(allThemes.some((theme) => theme.slug === "flexoki-dark")).toBe(true);
		expect(allThemes.some((theme) => theme.slug === "tokyo-night-storm")).toBe(
			true,
		);
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
						fonts: { code: null, ui: null },
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

	it("merges selected fonts into the copied theme string", () => {
		const themeString = buildThemeString(allThemes[0].codexTheme, {
			ui: "Maple Mono NF",
			code: "JetBrains Mono",
		});

		expect(themeString).toContain('"ui":"Maple Mono NF"');
		expect(themeString).toContain('"code":"JetBrains Mono"');
	});
});

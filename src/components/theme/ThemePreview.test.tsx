/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemePreview } from "#/components/theme/ThemePreview";
import { allThemes } from "#/lib/theme-data";

const theme = allThemes.find((item) => item.slug === "tokyo-night");

afterEach(() => {
	cleanup();
});

describe("ThemePreview", () => {
	it("renders compact card mode with terminal preview and swatches", () => {
		if (!theme) {
			throw new Error("Expected seeded theme to exist");
		}

		const { container } = render(<ThemePreview theme={theme} mode="card" />);

		// Has window dots
		expect(container.querySelector(".theme-preview__dots")).toBeDefined();
		// Has code lines
		expect(
			container.querySelectorAll(".theme-preview__code-line").length,
		).toBeGreaterThan(0);
		// Has color swatches
		expect(
			container.querySelectorAll(".theme-preview__swatch").length,
		).toBeGreaterThan(0);
		// No meta section in card mode
		expect(container.querySelector(".theme-preview__meta")).toBeNull();
	});

	it("renders expanded submit mode with meta, fonts and swatches", () => {
		if (!theme) {
			throw new Error("Expected seeded theme to exist");
		}

		const { container } = render(<ThemePreview theme={theme} mode="submit" />);

		// Theme name visible in code comment
		expect(screen.getByText(/Tokyo Night/)).toBeDefined();
		// Variant visible in meta
		expect(screen.getAllByText(/dark/i).length).toBeGreaterThan(0);
		// Font info visible
		expect(screen.getByText(/UI font/i)).toBeDefined();
		expect(screen.getByText(/Code font/i)).toBeDefined();
		expect(screen.getByText(/Default UI/i)).toBeDefined();
		expect(screen.getByText(/Default code/i)).toBeDefined();
		// Contrast value visible
		expect(screen.getByText("80")).toBeDefined();
		// Has 4 swatches (accent + diffAdded + diffRemoved + skill)
		expect(container.querySelectorAll(".theme-preview__swatch").length).toBe(4);
		// Has meta section
		expect(container.querySelector(".theme-preview__meta")).toBeDefined();
	});
});

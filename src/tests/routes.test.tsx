/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getRelatedThemes, getThemeBySlug } from "#/lib/theme-data";

vi.mock("@tanstack/react-router", async () => {
	const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
		"@tanstack/react-router",
	);

	return {
		...actual,
		Link: ({
			children,
			to,
			params,
			...props
		}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
			children: React.ReactNode;
			to?: string;
			params?: Record<string, string>;
		}) => {
			const href = to
				? Object.entries(params ?? {}).reduce(
						(path, [key, value]) => path.replace(`$${key}`, value),
						to,
					)
				: undefined;

			return (
				<a href={href} {...props}>
					{children}
				</a>
			);
		},
	};
});

afterEach(() => {
	cleanup();
});

describe("route smoke tests", () => {
	it("renders featured themes on the home page", async () => {
		const { HomePageContent } = await import("#/routes/index");
		const { allThemes } = await import("#/lib/theme-data");
		render(
			<HomePageContent
				filters={{ query: "", tag: "", variant: "all" }}
				filteredThemes={allThemes}
				interactiveCards={false}
				onFiltersChange={() => {}}
			/>,
		);

		expect(screen.getByText(/pick a theme and copy it/i)).toBeDefined();
		expect(screen.getByLabelText(/search themes/i)).toBeDefined();
		expect(screen.getByText("Tokyo Night")).toBeDefined();
	});

	it("renders a theme detail page from the slug route", async () => {
		const { ThemeDetailContent } = await import("#/routes/themes.$slug");
		const theme = getThemeBySlug("tokyo-night");
		if (!theme) {
			throw new Error("Expected seeded theme to exist");
		}
		render(
			<ThemeDetailContent
				theme={theme}
				relatedThemes={getRelatedThemes(theme)}
				interactive={false}
			/>,
		);

		expect(screen.getByText("Tokyo Night")).toBeDefined();
		expect(screen.getByText(/copy string/i)).toBeDefined();
	});

	it("renders the contributing docs from markdown", async () => {
		const { ContributingDocsPage } = await import("#/routes/docs.contributing");
		render(<ContributingDocsPage />);

		expect(screen.getByText(/contributing to codex themes/i)).toBeDefined();
		expect(screen.getByText(/theme wrapper schema/i)).toBeDefined();
	});
});

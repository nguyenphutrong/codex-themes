/* @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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
		const visibleTheme = allThemes[0];
		if (!visibleTheme) {
			throw new Error("Expected seeded themes to exist");
		}
		render(
			<HomePageContent
				filters={{ query: "", tag: "", variant: "all" }}
				filteredThemes={allThemes}
				interactiveCards={false}
				onFiltersChange={() => {}}
				galleryContent={
					<section data-testid="theme-gallery-grid">
						{allThemes.slice(0, 6).map((theme) => (
							<div key={theme.slug}>{theme.name}</div>
						))}
					</section>
				}
			/>,
		);

		expect(screen.getByText(/pick a theme and copy it/i)).toBeDefined();
		expect(screen.getByLabelText(/search themes/i)).toBeDefined();
		expect(screen.getByText(visibleTheme.name)).toBeDefined();
	});

	it("renders the contributing docs from markdown", async () => {
		const { ContributingDocsPage } = await import("#/routes/docs.contributing");
		render(<ContributingDocsPage />);

		expect(screen.getByText(/contributing to codex themes/i)).toBeDefined();
		expect(screen.getByText(/theme wrapper schema/i)).toBeDefined();
	});
});

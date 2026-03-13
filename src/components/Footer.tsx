import { Link } from "@tanstack/react-router";
import { allThemes } from "#/lib/theme-data";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-[color:var(--line)] px-4 py-12 text-[color:var(--text-soft)]">
			<div className="page-wrap grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
				<div className="space-y-3">
					<p className="eyebrow">Codex Themes</p>
					<h2 className="text-2xl font-semibold tracking-tight text-[color:var(--text)]">
						A living gallery for editor palettes worth keeping open all day.
					</h2>
					<p className="m-0 max-w-2xl text-sm leading-7">
						Browse, copy, and remix community themes for Codex. Every preview is
						static and shareable, every heart stays local, and every submission
						is ready for a GitHub contribution flow.
					</p>
				</div>

				<div className="grid gap-6 text-sm sm:grid-cols-2">
					<div className="space-y-2">
						<p className="font-semibold text-[color:var(--text)]">Explore</p>
						<div className="flex flex-col gap-2">
							<Link to="/themes" className="footer-link">
								Browse all {allThemes.length} themes
							</Link>
							<Link to="/submit" className="footer-link">
								Submit a theme
							</Link>
							<Link to="/docs/contributing" className="footer-link">
								Contributing guide
							</Link>
						</div>
					</div>
					<div className="space-y-2">
						<p className="font-semibold text-[color:var(--text)]">Built with</p>
						<p className="m-0">
							TanStack Start, Bun, Tailwind CSS, highlight.js, and shadcn/ui
							primitives.
						</p>
					</div>
				</div>
			</div>
			<div className="page-wrap mt-10 border-t border-[color:var(--line)] pt-5 text-xs uppercase tracking-[0.18em] text-[color:var(--text-dim)]">
				&copy; {year} Codex Themes
			</div>
		</footer>
	);
}

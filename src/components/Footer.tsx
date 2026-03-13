import { Link } from "@tanstack/react-router";
import { allThemes } from "#/lib/theme-data";

export default function Footer() {
	return (
		<footer className="px-4 py-6 text-sm text-[color:var(--text-dim)]">
			<div className="page-wrap flex flex-col gap-2 border-t border-[color:var(--line)] pt-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="m-0">
					{allThemes.length} themes in the community library.
				</p>
				<div className="flex items-center gap-4">
					<Link to="/themes" className="footer-link">
						Browse
					</Link>
					<Link to="/submit" className="footer-link">
						Submit
					</Link>
				</div>
			</div>
		</footer>
	);
}

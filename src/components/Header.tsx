import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import ThemeToggle from "#/components/ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--header)]/92 px-4 backdrop-blur-xl">
			<nav className="page-wrap flex items-center gap-3 py-3">
				<Link
					to="/"
					className="inline-flex items-center gap-2.5 text-sm font-semibold text-[color:var(--text)] no-underline"
				>
					<span className="brand-mark">
						<GalleryVerticalEnd className="h-3.5 w-3.5 text-white" />
					</span>
					<span>Codex Themes</span>
				</Link>

				<div className="ml-auto flex items-center gap-4">
					<Link
						to="/submit"
						className="subtle-link hidden sm:inline-flex"
						activeProps={{ className: "subtle-link is-active" }}
					>
						Submit
					</Link>
					<Link
						to="/docs/contributing"
						className="subtle-link hidden md:inline-flex"
						activeProps={{ className: "subtle-link is-active" }}
					>
						Docs
					</Link>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}

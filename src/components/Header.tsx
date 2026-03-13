import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "#/components/ThemeToggle";
import { COMMUNITY_REPO_URL } from "#/lib/site";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--header)]/92 backdrop-blur-xl">
			<nav className="page-wrap flex items-center gap-3 py-3">
				<Link
					to="/"
					className="inline-flex items-center gap-2.5 text-sm font-semibold text-[color:var(--text)] no-underline"
				>
					<span className="hidden sm:inline">Codex Themes</span>
					<span className="sm:hidden">Codex</span>
				</Link>

				<div className="ml-auto flex items-center gap-4">
					<a
						href={COMMUNITY_REPO_URL}
						target="_blank"
						rel="noreferrer"
						className="subtle-link hidden sm:inline-flex"
					>
						GitHub
					</a>
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
					<button
						type="button"
						className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--text)] hover:border-[color:var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-menu"
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						{mobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div
					id="mobile-menu"
					className="border-t border-[color:var(--line)] bg-[color:var(--page)] px-4 py-4 md:hidden"
				>
					<div className="flex flex-col gap-3">
						<a
							href={COMMUNITY_REPO_URL}
							target="_blank"
							rel="noreferrer"
							className="subtle-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							GitHub
						</a>
						<Link
							to="/submit"
							className="subtle-link"
							activeProps={{ className: "subtle-link is-active" }}
							onClick={() => setMobileMenuOpen(false)}
						>
							Submit
						</Link>
						<Link
							to="/docs/contributing"
							className="subtle-link"
							activeProps={{ className: "subtle-link is-active" }}
							onClick={() => setMobileMenuOpen(false)}
						>
							Docs
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}

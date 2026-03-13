import { Link } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";
import ThemeToggle from "#/components/ThemeToggle";
import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--header)]/84 px-4 backdrop-blur-xl">
			<nav className="page-wrap flex flex-wrap items-center gap-3 py-4">
				<Link
					to="/"
					className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] no-underline shadow-[0_20px_60px_rgba(2,7,20,0.2)]"
				>
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(155,185,255,0.85),rgba(110,67,255,0.28))]">
						<GalleryVerticalEnd className="h-4 w-4 text-white" />
					</span>
					<span>
						<span className="block text-[0.65rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
							Community Library
						</span>
						<span className="block text-sm">Codex Themes</span>
					</span>
				</Link>

				<div className="order-3 flex w-full flex-wrap items-center gap-2 lg:order-2 lg:w-auto lg:ml-6">
					{[
						["/", "Home"],
						["/themes", "Browse"],
						["/submit", "Submit"],
						["/docs/contributing", "Contributing"],
					].map(([to, label]) => (
						<Link
							key={to}
							to={to}
							className="nav-link"
							activeProps={{ className: "nav-link is-active" }}
						>
							{label}
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-2">
					<Link
						to="/themes"
						className={cn(
							buttonVariants({ variant: "outline", size: "sm" }),
							"hidden sm:inline-flex",
						)}
					>
						Open gallery
					</Link>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}

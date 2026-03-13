import { MoonStar, SunMedium } from "lucide-react";
import { useSiteTheme } from "#/hooks/use-site-theme";

export default function ThemeToggle() {
	const { mode, toggleMode } = useSiteTheme();

	return (
		<button
			type="button"
			onClick={toggleMode}
			className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--text)] transition-colors hover:border-[color:var(--line-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--page)]"
			aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
			title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
		>
			{mode === "dark" ? (
				<SunMedium className="h-4 w-4" />
			) : (
				<MoonStar className="h-4 w-4" />
			)}
		</button>
	);
}

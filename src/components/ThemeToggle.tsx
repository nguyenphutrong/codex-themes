import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "#/components/ui/button";
import { useSiteTheme } from "#/hooks/use-site-theme";

export default function ThemeToggle() {
	const { mode, toggleMode } = useSiteTheme();

	return (
		<Button
			type="button"
			variant="secondary"
			size="icon"
			onClick={toggleMode}
			aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
			title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
		>
			{mode === "dark" ? (
				<SunMedium className="h-4 w-4" />
			) : (
				<MoonStar className="h-4 w-4" />
			)}
		</Button>
	);
}

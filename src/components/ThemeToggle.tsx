import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "#/components/ui/button";
import { useSiteTheme } from "#/hooks/use-site-theme";

export default function ThemeToggle() {
	const { mode, toggleMode } = useSiteTheme();

	return (
		<Button
			type="button"
			variant="secondary"
			size="sm"
			onClick={toggleMode}
			aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
			className="min-w-[7.25rem] justify-between"
		>
			<span>{mode === "dark" ? "Night" : "Day"}</span>
			{mode === "dark" ? (
				<MoonStar className="h-4 w-4" />
			) : (
				<SunMedium className="h-4 w-4" />
			)}
		</Button>
	);
}

import { Heart } from "lucide-react";
import { Button } from "#/components/ui/button";
import { useLikedThemes } from "#/hooks/use-liked-themes";
import { getThemePopularity } from "#/lib/theme-data";
import type { ThemeRecord } from "#/lib/theme-types";

interface HeartButtonProps {
	theme: ThemeRecord;
}

export function HeartButton({ theme }: HeartButtonProps) {
	const { likedSlugs, toggleLike } = useLikedThemes();
	const liked = likedSlugs.has(theme.slug);
	const totalLikes = getThemePopularity(theme, likedSlugs);

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			onClick={() => toggleLike(theme.slug)}
			aria-pressed={liked}
			className={liked ? "text-[color:var(--accent-strong)]" : undefined}
		>
			<Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
			{totalLikes}
		</Button>
	);
}

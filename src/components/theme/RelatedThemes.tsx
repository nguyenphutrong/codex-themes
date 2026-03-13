import { ThemeCard } from "#/components/theme/ThemeCard";
import type { ThemeRecord } from "#/lib/theme-types";

interface RelatedThemesProps {
	themes: ThemeRecord[];
	interactive?: boolean;
}

export function RelatedThemes({
	themes,
	interactive = true,
}: RelatedThemesProps) {
	if (!themes.length) {
		return null;
	}

	return (
		<section className="space-y-5">
			<div className="space-y-2">
				<p className="eyebrow">More from the library</p>
				<h2 className="section-title">Related themes</h2>
			</div>
			<div className="grid gap-6 lg:grid-cols-3">
				{themes.map((theme) => (
					<ThemeCard key={theme.slug} theme={theme} interactive={interactive} />
				))}
			</div>
		</section>
	);
}

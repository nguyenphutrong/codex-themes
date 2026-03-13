import { ThemeCard } from "#/components/theme/ThemeCard";
import type { ThemeRecord } from "#/lib/theme-types";

interface ThemeGalleryGridProps {
	themes: ThemeRecord[];
	interactiveCards?: boolean;
}

export function ThemeGalleryGrid({
	themes,
	interactiveCards = true,
}: ThemeGalleryGridProps) {
	if (!themes.length) {
		return (
			<section className="rounded-[1.2rem] border border-dashed border-[color:var(--line)] bg-[color:var(--panel)]/60 px-5 py-10 text-center">
				<p className="m-0 text-sm text-[color:var(--text-soft)]">
					No themes match the current filters.
				</p>
				<p className="mt-2 text-xs text-[color:var(--text-dim)]">
					Try clearing your search or selecting different filters.
				</p>
			</section>
		);
	}

	return (
		<section className="theme-gallery-grid">
			{themes.map((theme) => (
				<ThemeCard
					key={theme.slug}
					theme={theme}
					interactive={interactiveCards}
				/>
			))}
		</section>
	);
}

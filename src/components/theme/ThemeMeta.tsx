import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import type { ThemeRecord } from "#/lib/theme-types";

interface ThemeMetaProps {
	theme: ThemeRecord;
}

export function ThemeMeta({ theme }: ThemeMetaProps) {
	return (
		<Card>
			<CardContent className="space-y-4">
				<div className="flex flex-wrap gap-2">
					<Badge variant="accent">{theme.codexTheme.variant}</Badge>
					{theme.tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
				<Separator />
				<div className="space-y-3 text-sm text-[color:var(--text-soft)]">
					<div className="flex items-center justify-between gap-4">
						<span>Author</span>
						<span className="text-right text-[color:var(--text)]">
							{theme.author}
						</span>
					</div>
					<div className="flex items-center justify-between gap-4">
						<span>Published</span>
						<span className="text-right text-[color:var(--text)]">
							{theme.createdAt}
						</span>
					</div>
					<div className="flex items-center justify-between gap-4">
						<span>Contrast</span>
						<span className="text-right text-[color:var(--text)]">
							{theme.codexTheme.theme.contrast}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

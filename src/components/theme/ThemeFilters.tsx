import { Search } from "lucide-react";
import { Input } from "#/components/ui/input";
import { Select } from "#/components/ui/select";
import type { ThemeFilterOptions } from "#/lib/theme-types";

interface ThemeFiltersProps {
	query: string;
	variant: ThemeFilterOptions["variant"];
	tag: string;
	tags: string[];
	onChange(next: Partial<Required<ThemeFilterOptions>>): void;
}

export function ThemeFilters({
	query,
	variant,
	tag,
	tags,
	onChange,
}: ThemeFiltersProps) {
	return (
		<div className="grid gap-2 rounded-[1.1rem] border border-[color:var(--line)] bg-[color:var(--panel)] p-3 sm:grid-cols-2 xl:grid-cols-[1.6fr_repeat(2,minmax(0,0.8fr))]">
			<div className="relative block">
				<span className="sr-only">Search themes</span>
				<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-dim)]" />
				<Input
					id="theme-search"
					value={query}
					onChange={(event) => onChange({ query: event.target.value })}
					placeholder="Search by theme or author"
					aria-label="Search themes"
					className="pl-11"
				/>
			</div>
			<Select
				value={variant || "all"}
				onChange={(event) =>
					onChange({
						variant: event.target.value as ThemeFilterOptions["variant"],
					})
				}
			>
				<option value="all">All variants</option>
				<option value="dark">Dark</option>
				<option value="light">Light</option>
			</Select>
			<Select
				value={tag}
				onChange={(event) => onChange({ tag: event.target.value })}
			>
				<option value="">All tags</option>
				{tags.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</Select>
		</div>
	);
}

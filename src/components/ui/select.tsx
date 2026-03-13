import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export function Select({
	children,
	className,
	...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
	return (
		<div className="relative">
			<select
				className={cn(
					"h-11 w-full appearance-none rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)] px-4 pr-10 text-sm text-[color:var(--text)] outline-none focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[color:var(--ring)]",
					className,
				)}
				{...props}
			>
				{children}
			</select>
			<ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--text-dim)]" />
		</div>
	);
}

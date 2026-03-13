import type { TextareaHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export function Textarea({
	className,
	...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea
			className={cn(
				"min-h-28 w-full rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-3 text-sm text-[color:var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none placeholder:text-[color:var(--text-dim)] focus:border-[color:var(--line-strong)] focus:ring-2 focus:ring-[color:var(--ring)]",
				className,
			)}
			{...props}
		/>
	);
}

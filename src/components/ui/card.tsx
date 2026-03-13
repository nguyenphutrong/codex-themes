import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"rounded-[1.25rem] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[0_10px_28px_rgba(4,10,24,0.14)] backdrop-blur-xl",
				className,
			)}
			{...props}
		/>
	);
}

export function CardContent({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("p-4 sm:p-5", className)} {...props} />;
}

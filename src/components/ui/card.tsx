import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"rounded-[1.7rem] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[0_24px_80px_rgba(4,10,24,0.28)] backdrop-blur-xl",
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
	return <div className={cn("p-5 sm:p-6", className)} {...props} />;
}

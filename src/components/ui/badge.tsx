import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "#/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
	{
		variants: {
			variant: {
				default:
					"border-[color:var(--line)] bg-[color:var(--panel-strong)] text-[color:var(--text-soft)]",
				accent:
					"border-[color:color-mix(in srgb,var(--accent-strong) 38%,transparent)] bg-[color:color-mix(in srgb,var(--accent-strong) 12%,transparent)] text-[color:var(--text)]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type BadgeProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ className, variant }))} {...props} />
	);
}

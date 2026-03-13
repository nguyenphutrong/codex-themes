import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "#/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-full border text-sm font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page)] disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"border-[color:var(--line-strong)] bg-[color:var(--accent-strong)] px-4 py-2 text-[color:var(--accent-ink)] shadow-[0_18px_45px_rgba(19,26,46,0.32)] hover:-translate-y-0.5 hover:brightness-110",
				secondary:
					"border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-2 text-[color:var(--text)] hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]",
				ghost:
					"border-transparent bg-transparent px-3 py-2 text-[color:var(--text-soft)] hover:bg-[color:var(--panel)] hover:text-[color:var(--text)]",
				outline:
					"border-[color:var(--line)] bg-transparent px-4 py-2 text-[color:var(--text)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--panel)]",
			},
			size: {
				default: "",
				sm: "px-3 py-1.5 text-xs",
				lg: "px-5 py-3 text-sm",
				icon: "h-11 w-11 rounded-full border-[color:var(--line)] bg-[color:var(--panel)] text-[color:var(--text)] hover:border-[color:var(--line-strong)]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

export function Button({ className, size, variant, ...props }: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ className, size, variant }))}
			{...props}
		/>
	);
}

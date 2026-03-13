import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

interface CopyThemeButtonProps {
	value: string;
	label?: string;
	className?: string;
	variant?: "default" | "secondary" | "ghost" | "outline";
}

export function CopyThemeButton({
	value,
	label = "Copy theme",
	className,
	variant = "secondary",
}: CopyThemeButtonProps) {
	const [copied, setCopied] = useState(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	}

	return (
		<Button
			type="button"
			variant={variant}
			size="sm"
			onClick={handleCopy}
			className={cn("shrink-0", className)}
		>
			{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			{copied ? "Copied" : label}
		</Button>
	);
}

export type ThemeVariant = "light" | "dark";

export interface CodexThemePayload {
	codeThemeId: string;
	theme: {
		accent: string;
		contrast: number;
		fonts: {
			code: string;
			ui: string;
		};
		ink: string;
		opaqueWindows: boolean;
		semanticColors: {
			diffAdded: string;
			diffRemoved: string;
			skill: string;
		};
		surface: string;
	};
	variant: ThemeVariant;
}

export interface ThemeRecord {
	slug: string;
	name: string;
	author: string;
	authorUrl?: string;
	description: string;
	tags: string[];
	featured: boolean;
	createdAt: string;
	baseLikes: number;
	codexTheme: CodexThemePayload;
}

export interface ThemeFilterOptions {
	query?: string;
	variant?: ThemeVariant | "all";
	tag?: string;
}

export interface SubmitThemeFormValues {
	name: string;
	author: string;
	authorUrl: string;
	description: string;
	tags: string;
	variant: ThemeVariant;
	accent: string;
	contrast: string;
	codeFont: string;
	uiFont: string;
	ink: string;
	surface: string;
	diffAdded: string;
	diffRemoved: string;
	skill: string;
	opaqueWindows: boolean;
}

export interface SubmitThemeValidationResult {
	fieldErrors: Partial<Record<keyof SubmitThemeFormValues, string>>;
	isValid: boolean;
}

import type { ResolvedThemeFonts } from "#/lib/theme-fonts";
import type {
	CodexThemePayload,
	ThemeFilterOptions,
	ThemeRecord,
	ThemeVariant,
} from "#/lib/theme-types";

const rawThemeModules = import.meta.glob("../../data/themes/*.json", {
	eager: true,
	import: "default",
}) as Record<string, unknown>;

const HEX_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

function assertString(value: unknown, message: string) {
	assert(typeof value === "string" && value.trim().length > 0, message);
	return value;
}

function assertNullableString(value: unknown, message: string) {
	assert(
		value === null || (typeof value === "string" && value.trim().length > 0),
		message,
	);
	return value;
}

function assertBoolean(value: unknown, message: string) {
	assert(typeof value === "boolean", message);
	return value;
}

function assertNumber(value: unknown, message: string) {
	assert(typeof value === "number" && Number.isFinite(value), message);
	return value;
}

export function validateHexColor(value: string) {
	return HEX_COLOR_PATTERN.test(value);
}

export function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function mergeThemePayloadFonts(
	payload: CodexThemePayload,
	fonts: ResolvedThemeFonts,
): CodexThemePayload {
	return {
		...payload,
		theme: {
			...payload.theme,
			fonts: {
				ui: fonts.ui ?? payload.theme.fonts.ui ?? null,
				code: fonts.code ?? payload.theme.fonts.code ?? null,
			},
		},
	};
}

export function mergeThemeRecordFonts(
	theme: ThemeRecord,
	fonts: ResolvedThemeFonts,
): ThemeRecord {
	return {
		...theme,
		codexTheme: mergeThemePayloadFonts(theme.codexTheme, fonts),
	};
}

export function buildThemeString(
	payload: CodexThemePayload,
	fonts?: ResolvedThemeFonts,
) {
	const effectivePayload = fonts
		? mergeThemePayloadFonts(payload, fonts)
		: payload;
	return `codex-theme-v1:${JSON.stringify(effectivePayload)}`;
}

export function parseThemeRecord(raw: unknown, source = "theme"): ThemeRecord {
	assert(isRecord(raw), `${source}: theme file must be an object`);
	assert(Array.isArray(raw.tags), `${source}: tags must be an array`);
	assert(isRecord(raw.codexTheme), `${source}: codexTheme is required`);
	assert(
		isRecord(raw.codexTheme.theme),
		`${source}: codexTheme.theme is required`,
	);
	assert(
		isRecord(raw.codexTheme.theme.fonts),
		`${source}: codexTheme.theme.fonts is required`,
	);
	assert(
		isRecord(raw.codexTheme.theme.semanticColors),
		`${source}: codexTheme.theme.semanticColors is required`,
	);

	const variant = raw.codexTheme.variant;
	assert(
		variant === "light" || variant === "dark",
		`${source}: variant must be light or dark`,
	);

	const accent = assertString(
		raw.codexTheme.theme.accent,
		`${source}: accent is required`,
	);
	const ink = assertString(
		raw.codexTheme.theme.ink,
		`${source}: ink is required`,
	);
	const surface = assertString(
		raw.codexTheme.theme.surface,
		`${source}: surface is required`,
	);
	const diffAdded = assertString(
		raw.codexTheme.theme.semanticColors.diffAdded,
		`${source}: diffAdded is required`,
	);
	const diffRemoved = assertString(
		raw.codexTheme.theme.semanticColors.diffRemoved,
		`${source}: diffRemoved is required`,
	);
	const skill = assertString(
		raw.codexTheme.theme.semanticColors.skill,
		`${source}: skill is required`,
	);

	for (const [label, value] of [
		["accent", accent],
		["ink", ink],
		["surface", surface],
		["diffAdded", diffAdded],
		["diffRemoved", diffRemoved],
		["skill", skill],
	] as const) {
		assert(
			validateHexColor(value),
			`${source}: ${label} must be a full hex color`,
		);
	}

	const contrast = assertNumber(
		raw.codexTheme.theme.contrast,
		`${source}: contrast is required`,
	);
	assert(
		contrast >= 0 && contrast <= 100,
		`${source}: contrast must be between 0 and 100`,
	);

	const createdAt = assertString(
		raw.createdAt,
		`${source}: createdAt is required`,
	);
	assert(
		!/NaN/.test(new Date(createdAt).toString()),
		`${source}: createdAt must be a valid ISO date`,
	);

	return {
		slug: assertString(raw.slug, `${source}: slug is required`),
		name: assertString(raw.name, `${source}: name is required`),
		author: assertString(raw.author, `${source}: author is required`),
		authorUrl:
			typeof raw.authorUrl === "string" && raw.authorUrl.trim().length
				? raw.authorUrl
				: undefined,
		description: assertString(
			raw.description,
			`${source}: description is required`,
		),
		tags: raw.tags.map((tag, index) => {
			assert(
				typeof tag === "string" && tag.trim().length,
				`${source}: tags[${index}] must be a string`,
			);
			return tag.trim().toLowerCase();
		}),
		featured: assertBoolean(raw.featured, `${source}: featured is required`),
		createdAt,
		baseLikes: assertNumber(raw.baseLikes, `${source}: baseLikes is required`),
		codexTheme: {
			codeThemeId: assertString(
				raw.codexTheme.codeThemeId,
				`${source}: codeThemeId is required`,
			),
			theme: {
				accent,
				contrast,
				fonts: {
					code: assertNullableString(
						raw.codexTheme.theme.fonts.code,
						`${source}: fonts.code must be null or a non-empty string`,
					),
					ui: assertNullableString(
						raw.codexTheme.theme.fonts.ui,
						`${source}: fonts.ui must be null or a non-empty string`,
					),
				},
				ink,
				opaqueWindows: assertBoolean(
					raw.codexTheme.theme.opaqueWindows,
					`${source}: opaqueWindows is required`,
				),
				semanticColors: {
					diffAdded,
					diffRemoved,
					skill,
				},
				surface,
			},
			variant: variant as ThemeVariant,
		},
	};
}

export const allThemes = (() => {
	const themes: ThemeRecord[] = [];
	for (const [source, raw] of Object.entries(rawThemeModules)) {
		try {
			themes.push(parseThemeRecord(raw, source));
		} catch (e) {
			console.error(`Failed to parse theme from ${source}:`, e);
		}
	}
	return themes.sort((left, right) =>
		right.createdAt.localeCompare(left.createdAt),
	);
})();

export const featuredThemes = allThemes.filter((theme) => theme.featured);

export const allTags = [
	...new Set(allThemes.flatMap((theme) => theme.tags)),
].sort();

export function filterThemes(
	themes: ThemeRecord[],
	options: ThemeFilterOptions = {},
) {
	const query = options.query?.trim().toLowerCase() || "";
	const tag = options.tag?.trim().toLowerCase() || "";
	const variant = options.variant || "all";

	const filtered = themes.filter((theme) => {
		const matchesQuery =
			!query ||
			theme.name.toLowerCase().includes(query) ||
			theme.author.toLowerCase().includes(query);
		const matchesVariant =
			variant === "all" || theme.codexTheme.variant === variant;
		const matchesTag = !tag || theme.tags.includes(tag);
		return matchesQuery && matchesVariant && matchesTag;
	});

	return filtered;
}

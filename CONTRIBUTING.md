# Contributing to Codex Themes

Codex Themes is a community gallery for Codex editor themes. Every entry in the library is a static JSON file that wraps a valid `codex-theme-v1` payload with a little discovery metadata.

## What to submit

- A theme that feels distinct in actual editing sessions, not just in swatches.
- A complete Codex payload using the `codex-theme-v1:{JSON}` format.
- Short, specific metadata: a clear theme name, author credit, a one-line description, and 2 to 4 tags.

## Theme wrapper schema

Each theme lives in `data/themes/<slug>.json` and uses this shape:

```json
{
  "slug": "midnight-sakura",
  "name": "Midnight Sakura",
  "author": "Codex Garden",
  "authorUrl": "https://github.com/example",
  "description": "Deep plum surfaces with cherry-petal accents.",
  "tags": ["neon", "floral", "night"],
  "featured": false,
  "createdAt": "2026-02-03",
  "baseLikes": 0,
  "codexTheme": {
    "codeThemeId": "codex",
    "theme": {
      "accent": "#f38ba8",
      "contrast": 78,
      "fonts": { "code": null, "ui": null },
      "ink": "#f8e8f0",
      "opaqueWindows": true,
      "semanticColors": {
        "diffAdded": "#89dceb",
        "diffRemoved": "#f28fad",
        "skill": "#cba6f7"
      },
      "surface": "#18111b"
    },
    "variant": "dark"
  }
}
```

## Color and quality guidelines

- Use full 6-digit hex values.
- Keep `contrast` between `0` and `100`.
- Check both dense code blocks and UI chrome. A good accent does not guarantee a usable theme.
- Make sure `diffAdded`, `diffRemoved`, and `skill` remain legible against the theme surface.
- Prefer tags that help people browse intent: `minimal`, `retro`, `light`, `editorial`, `neon`, `terminal`.

## How to contribute

1. Duplicate a nearby theme file in `data/themes/`.
2. Rename it to the final slug.
3. Update the metadata and `codexTheme` payload.
4. Run `bun --bun run build` and `bun --bun run test`.
5. Open a pull request with screenshots or a short screen capture if your theme has a strong visual identity.

## Review checklist

- The JSON validates and loads in the gallery.
- The theme preview looks intentional in both card and detail contexts.
- Tags, author credit, and description are present.
- The copied `codex-theme-v1:` string imports cleanly into Codex.

## Notes for maintainers

- `baseLikes` is seed popularity only. Real visitor likes are browser-local and not persisted server-side.
- The `/submit` page is an export tool for contributors, not a publishing backend.
- Keep this file aligned with the `/docs/contributing` route because the page renders this markdown directly.

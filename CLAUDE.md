# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/ (required before deploying)
npm run preview  # Preview the production build locally
```

Deploy via Cloudflare Pages/Workers using Wrangler. The built output (`dist/`) is configured in [wrangler.jsonc](wrangler.jsonc).

> **Note:** On Windows, run these commands in Git Bash or CMD — not PowerShell (execution policy issues with npm scripts).

## Architecture

This is an **Astro 5 static site** deployed to **Cloudflare Workers** via the `@astrojs/cloudflare` adapter. Styling uses **Tailwind CSS v4** (Vite plugin approach, not PostCSS).

### Data flow

All recipe data lives in [src/data/recipes.json](src/data/recipes.json) — a flat array of recipe objects. Each recipe has a required `id` field (kebab-case slug) that drives routing.

- [src/pages/index.astro](src/pages/index.astro) — imports `recipes.json` directly and renders a grid of links
- [src/pages/recipes/[slug].astro](src/pages/recipes/[slug].astro) — uses `getStaticPaths()` to generate one page per recipe using `recipe.id` as the slug
- [src/components/Recipe.astro](src/components/Recipe.astro) — renders the full recipe card; includes client-side JS for a 0.5x/1x/2x serving multiplier that scales ingredient quantities

**Adding a new recipe:** Add an entry to `recipes.json` with a unique `id`. The page is automatically generated at `/recipes/{id}`. Place the image at `public/images/{id}.png` and reference it as `"image": "/images/{id}.png"`.

### Recipe data shape

```ts
{
  id: string           // kebab-case, used as URL slug
  title: string
  description: string
  image?: string       // path relative to /public, e.g. "/images/chili.png"
  prepTime: string
  cookTime: string
  servings: string     // plain string, e.g. "4" or "7 slices"
  ingredients: string[]
  instructions: string[]
  variations?: string[]
  troubleshooting?: string[]
  tags?: string[]      // not currently displayed in UI
}
```

### Styling

Global CSS is in [src/styles/global.css](src/styles/global.css). Colors use CSS custom properties (e.g. `--color-primary`, `--color-bc-burnt-orange`) applied inline via `style=` attributes in components — not Tailwind classes — for the recipe card's branded palette.

Fonts loaded from Google Fonts: **Montserrat** (body), **Sorts Mill Goudy** (headings), **Caprasimo** (display, unused by default).

### `toprecipes.json`

[src/data/toprecipes.json](src/data/toprecipes.json) is a wishlist of ~100 recipes with tags. It is not currently used in the UI — it serves as a backlog of recipes to add to `recipes.json`.

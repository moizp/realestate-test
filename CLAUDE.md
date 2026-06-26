# realestate-test — Claude Code Guidelines

## Stack
- Svelte 5 (runes only — no legacy patterns)
- Vite 8
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"`, `@theme {}` for tokens)
- TypeScript strict mode

## Svelte MCP — MANDATORY

**Always** use the Svelte MCP tools when writing or editing `.svelte` files:

1. **Before writing a component** — call `mcp__svelte__get-documentation` for any Svelte API you're using (runes, transitions, actions, snippets, etc.)
2. **After writing or editing any `.svelte` file** — call `mcp__svelte__svelte-autofixer` on the file to catch AI-generated Svelte mistakes
3. **When uncertain about an API** — call `mcp__svelte__list-sections` to browse available docs, then `mcp__svelte__get-documentation` to fetch the relevant section

Never skip the autofixer step. It catches rune misuse, lifecycle errors, and legacy pattern usage that are otherwise easy to miss.

## Prettier — MANDATORY

After writing or editing any `.svelte`, `.ts`, or `.css` file, run:
```
npx prettier --write <file-path>
```
Or format the whole src directory:
```
npm run format
```

## Tailwind Usage

- **Use utility classes in markup** — no custom CSS classes in `<style>` blocks for layout, spacing, color, or typography
- `<style>` blocks are permitted ONLY for things Tailwind cannot express: `::before`/`::after` content, scrollbar styles, `::-webkit-scrollbar`, `scrollbar-width: none`
- Custom theme tokens are defined in `src/app.css` under `@theme {}` — these are available as Tailwind utilities (e.g. `--color-accent` → `bg-accent`, `text-accent`)
- Prefer restructuring HTML to avoid pseudo-elements (e.g. explicit `<span>` for bullet markers rather than `::before`)

## Svelte 5 Rune Rules

- `$state()` — reactive local state
- `$derived()` — computed values (never `$:`)
- `$effect()` — side effects (not `onMount` + reactive statements)
- `$props()` — component props (not `export let`)
- `$bindable()` — two-way bindable props

## Color Palette

Most colors map to Tailwind defaults — use those instead of arbitrary values:
- `#0f172a` → `slate-900`
- `#1e293b` → `slate-800`
- `#64748b` → `slate-500`
- `#0d9488` → `teal-600` (also available as `accent` via theme token)
- `#1e1b4b` → `indigo-950`
- `#6d28d9` → `violet-700`

## Component Checklist

- [ ] Svelte MCP autofixer run after writing
- [ ] Prettier run after writing
- [ ] Tailwind utilities only (no custom CSS for structural/visual styles)
- [ ] `$props()` for prop definitions with TypeScript types
- [ ] Semantic HTML elements
- [ ] Responsive (mobile-first, `lg:` breakpoint for sidebar layout)

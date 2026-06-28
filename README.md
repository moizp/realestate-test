# Lead Front-End Engineering Exercise

A response to the realestate.co.nz Lead Front-End Engineer exercise, presented as a single-page document built with the following stack.

## Stack

- **Svelte 5** — component model, no legacy patterns
- **Vite** — dev server and build tool
- **Tailwind CSS** — CSS-first configuration, `@theme {}` for design tokens
- **TypeScript** — strict mode throughout

Svelte 5 + Vite was chosen over SvelteKit intentionally: this is a static document with no routing or SSR needs, and keeping the build simple avoids framework overhead that doesn't apply here.

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/installation) — `npm install -g pnpm`
- [VS Code](https://code.visualstudio.com/) with the [Svelte extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) and [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Getting started

```bash
git clone https://github.com/moizp/realestate-test.git
cd realestate-test
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Other commands

```bash
pnpm lint    # ESLint
pnpm format  # Prettier (formats .svelte, .ts, .css)
pnpm build   # production build → dist/
pnpm preview # serve the production build locally
```

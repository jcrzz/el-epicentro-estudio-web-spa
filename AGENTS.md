# AGENTS.md — el-epicentro-estudio

## Stack
- **Next.js 16** (App Router), **React 19**, **Tailwind CSS 4**, **TypeScript 5.7** (strict)
- **shadcn/ui** with `base-nova` style (not default)
- **pnpm** (lockfile: `pnpm-lock.yaml`)

## Commands
```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm start      # run production build
pnpm typecheck  # tsc --noEmit
```
No lint, test, or format scripts exist.

## Structure
```
app/              # App Router: layout.tsx, page.tsx, globals.css
components/site/  # Page sections (hero, about, projects, contact, etc.)
components/ui/    # shadcn components (generated via `shadcn` CLI)
lib/              # utils.ts, projects.ts, site-config.ts
public/           # static assets (icons, images)
```

## Path Aliases (tsconfig.json + components.json)
- `@/*` → `./*`
- `@/components` → `components/`
- `@/components/ui` → `components/ui`
- `@/lib` → `lib/`
- `@/lib/utils` → `lib/utils.ts`
- `@/hooks` → `hooks/` (not yet created)

## Key Config
- **next.config.mjs**: `images.unoptimized: true`, remote patterns for Vercel blob + Unsplash
- **components.json**: `style: "base-nova"`, `rsc: true`, `cssVariables: true`, CSS at `app/globals.css`
- **tsconfig.json**: `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `strict: true`, `noEmit: true`

## Gotchas
- Tailwind v4 uses `@tailwindcss/postcss` (not `tailwindcss` directly in PostCSS config)
- shadcn components use `base-nova` style — run `shadcn add <component>` with this config
- No test framework configured
- Vercel Analytics auto-enabled via `@vercel/analytics`
- Environment files: `.env*.local` gitignored
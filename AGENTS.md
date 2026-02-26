# AGENTS.md

## Cursor Cloud specific instructions

This is a Next.js 14 (App Router) CRM application using pnpm, Tailwind CSS, Prisma (SQLite), and NextAuth.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `pnpm install` |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Dev server | `pnpm dev` (port 3000) |
| Prisma generate | `npx prisma generate` |
| Prisma push schema | `npx prisma db push` |

### Non-obvious caveats

- The `.eslintrc.json` uses `@typescript-eslint` rules; the `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` packages must be installed as dev dependencies (added to `package.json`) and the plugin listed in `.eslintrc.json` for lint to pass.
- After `pnpm install`, you must run `npx prisma generate` to generate the Prisma client before building or starting the dev server.
- The database is SQLite (`file:./dev.db` relative to `prisma/`). Run `npx prisma db push` to create/sync the DB schema.
- UI components live in `src/components/ui/` and use the `cn` utility from `@/lib/utils` (clsx + tailwind-merge).
- Custom `brand` color palette is defined in `tailwind.config.ts`.
- `pnpm.onlyBuiltDependencies` in `package.json` allowlists Prisma/esbuild build scripts so `pnpm install` triggers `prisma generate` automatically. If this config is missing, you'll see "Ignored build scripts" warnings and must run `npx prisma generate` manually.
- Dashboard routes (`/dashboard/*`) are protected by NextAuth middleware. You must register/login to access them. A test account can be created via `POST /api/register`.

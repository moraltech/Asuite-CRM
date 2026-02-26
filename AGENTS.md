# AGENTS.md

## Cursor Cloud specific instructions

Asuite CRM is a multi-tenant trucking CRM SaaS platform built with Next.js 14 (App Router), Prisma + SQLite, NextAuth, Tailwind CSS, Recharts, and Leaflet.

### Quick Reference

- **Dev server:** `pnpm dev` (port 3000)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **DB push:** `pnpm db:push` (syncs Prisma schema to SQLite)
- **DB seed:** `pnpm db:seed` (populates demo data)
- **Full DB reset:** `pnpm db:setup` (push + seed)

### Demo Credentials

- Email: `admin@asuite.com` / Password: `password123`
- Tenant: "Swift Haul Logistics"

### Caveats

- The SQLite database file lives at `prisma/dev.db`. If schema changes are made, run `pnpm db:push` then `pnpm db:seed` to re-populate.
- Prisma 5 is pinned (not v7) because v7 removed the `url` property from schema datasource blocks and requires a different config approach.
- The `pnpm.onlyBuiltDependencies` array in `package.json` must include `@prisma/client`, `@prisma/engines`, `prisma`, `esbuild`, and `unrs-resolver` to allow build scripts.
- The Fleet Tracking page uses `react-leaflet@4` (not v5) for React 18 compatibility. The map component uses `dynamic(() => import(...), { ssr: false })` since Leaflet requires the browser DOM.
- NextAuth uses JWT strategy with CredentialsProvider. The `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are in `.env`.

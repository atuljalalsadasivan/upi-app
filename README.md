# GlobalPay

GlobalPay is a PayPal-like web payment orchestration platform foundation built as a TypeScript monorepo.

This initial setup intentionally does not implement real payments and does not integrate Stripe or any payment provider.

## Stack

- Frontend: Next.js, React, TypeScript
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Package manager: npm workspaces

## Folder Structure

```text
apps/
  web/      Next.js frontend routes and UI placeholders
  api/      NestJS backend, health endpoint, config, filters, Prisma schema
packages/
  shared/   Shared constants and TypeScript API/domain types
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment files:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

3. Start PostgreSQL locally and update `apps/api/.env` with your `DATABASE_URL`.

4. Generate the Prisma client:

```bash
npm run prisma:generate
```

5. Create the first local migration:

```bash
npm run prisma:migrate:dev -- --name init
```

6. Run the full development stack:

```bash
npm run dev
```

Default local URLs:

- Web: http://localhost:3000
- API health: http://localhost:3001/health

## Scripts

- `npm install` - install workspace dependencies
- `npm run dev` - start web and API development servers
- `npm run build` - build shared package, API, and web app
- `npm run lint` - run ESLint across workspaces
- `npm run typecheck` - run TypeScript checks across workspaces
- `npm run prisma:generate` - generate Prisma client from `apps/api/prisma/schema.prisma`
- `npm run prisma:migrate:dev` - run a local Prisma migration
- `npm run format` - format the repository with Prettier

## Notes

- Secrets must stay out of source control. Use `.env` files locally and a secret manager in deployed environments.
- The Prisma schema includes placeholder financial domain models only. Payment capture, settlement, provider routing, reconciliation, risk, and ledger posting workflows are intentionally left for future modules.

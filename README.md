# GlobalPay

GlobalPay is a PayPal-like web payment orchestration platform foundation built as a TypeScript monorepo.

This setup intentionally does not implement real payments and does not integrate Stripe or any payment provider.

## Stack

- Frontend: Next.js, React, TypeScript
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Package manager: npm workspaces

## Folder Structure

```text
apps/
  web/      Next.js frontend routes, merchant dashboard, hosted checkout UI
  api/      NestJS backend, auth, checkout sessions, health, config, filters, Prisma schema
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

4. Set a local JWT secret in `apps/api/.env`:

```bash
JWT_SECRET=replace-with-a-long-random-local-secret
JWT_ACCESS_TOKEN_TTL=15m
WEB_APP_URL=http://localhost:3000
```

5. Generate the Prisma client:

```bash
npm run prisma:generate
```

6. Create or update the local migration:

```bash
npm run prisma:migrate:dev -- --name checkout_sessions
```

7. Run the full development stack:

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

## Auth API Examples

Register a merchant admin:

```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ada Merchant",
    "email": "ada@example.com",
    "password": "password123",
    "businessName": "Ada Commerce",
    "businessType": "SaaS",
    "country": "US",
    "currency": "USD"
  }'
```

Login:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ada@example.com",
    "password": "password123"
  }'
```

Fetch the current merchant profile:

```bash
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer <access-token>"
```

Frontend auth routes:

- Register: http://localhost:3000/register
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard

## Checkout Session API Examples

Create a checkout session as an authenticated merchant:

```bash
curl -X POST http://localhost:3001/checkout/sessions \
  -H "Authorization: Bearer <access-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 129.00,
    "currency": "USD",
    "customerEmail": "customer@example.com",
    "customerName": "Casey Customer",
    "description": "Premium plan invoice",
    "successUrl": "http://localhost:3000/checkout/success",
    "cancelUrl": "http://localhost:3000/checkout/cancel"
  }'
```

List merchant checkout sessions:

```bash
curl http://localhost:3001/checkout/sessions \
  -H "Authorization: Bearer <access-token>"
```

Fetch one merchant-owned checkout session:

```bash
curl http://localhost:3001/checkout/sessions/<session-id> \
  -H "Authorization: Bearer <access-token>"
```

Cancel a pending checkout session:

```bash
curl -X PATCH http://localhost:3001/checkout/sessions/<session-id>/cancel \
  -H "Authorization: Bearer <access-token>"
```

Fetch safe public checkout details without auth:

```bash
curl http://localhost:3001/public/checkout/sessions/<session-id>
```

The authenticated create response includes `publicCheckoutUrl`, for example:

```text
http://localhost:3000/checkout/<session-id>
```

## Testing Checkout From The Dashboard

1. Start PostgreSQL and run `npm run prisma:migrate:dev -- --name checkout_sessions`.
2. Start the app with `npm run dev`.
3. Register or login at http://localhost:3000/login.
4. Open http://localhost:3000/dashboard.
5. Use the "Create checkout session" form.
6. Copy the generated checkout URL from the recent sessions table.
7. Open the copied URL in the browser to view the public hosted checkout page.
8. Use "Cancel" on a pending session and refresh the public checkout page to see the cancelled status.

Checkout sessions expire after 30 minutes. Expired sessions are treated as `EXPIRED` when fetched by the merchant API or public checkout API.

## Notes

- Secrets must stay out of source control. Use `.env` files locally and a secret manager in deployed environments.
- The Prisma schema includes placeholder financial domain models only. Payment capture, settlement, provider routing, reconciliation, risk, and ledger posting workflows are intentionally left for future modules.
- Auth uses bcrypt password hashing and JWT access tokens for the local MVP. Browser token storage uses `sessionStorage`; move to secure HTTP-only cookie handling before production payment workflows.
- Module 3 creates checkout sessions and hosted checkout URLs only. The hosted page deliberately shows "Payment provider integration coming in next module" and does not process real payments.

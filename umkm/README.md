# UMKM Bulk Order

Production-ready, scalable, and reusable Next.js app for UMKM bulk-order with a
**WhatsApp-first checkout flow**. No login, no payment gateway — just fast
catalog → calculator → invoice → WhatsApp.

## Highlights

- **WhatsApp-first checkout** via `wa.me` redirect (with optional WA Business
  API layer; always falls back to `wa.me`).
- **Tier-based pricing** with smart "tambah X pcs untuk hemat" suggestion.
- **Region-based shipping** + admin manual override. Falls back to a default
  rate when the region is unknown.
- **Order tracking without login** — search by invoice ID *or* WhatsApp number.
- **Modular courier tracking** (`trackJNE` / `trackJNT` / `trackAnterAja`)
  behind server-side API routes, with a documented fallback when the upstream
  is unavailable.
- **Admin dashboard** — manage products, orders, status updates, plus price &
  shipping calculators.
- **Adapter pattern** — swap between `localAdapter` (file-based JSON) and
  `supabaseAdapter` (Supabase) via a single config flag. Cloud failures
  silently fall back to local data.
- **Light/dark mode** without reload, persisted in `localStorage`, fallback to
  light if storage fails.
- **Edge-to-edge full-width** UI, business-style. No glassmorphism, no random
  gradients.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Plain CSS with CSS variables (no Tailwind needed — easy to customize)
- File-system data layer for local mode; pluggable cloud adapter

## Getting started

```bash
cd umkm
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

Build & run:

```bash
npm run build
npm run start
```

Lint & typecheck:

```bash
npm run lint
npm run typecheck
```

## Configuration

All knobs live in `src/config/app.config.ts`. Override at runtime via
`NEXT_PUBLIC_*` env vars. See `.env.example`.

```ts
export const config = {
  mode: "local",                          // "local" | "cloud"
  whatsappNumber: "6281234567890",
  enableLiveChat: true,
  enableTracking: true
}
```

## Project layout

```
/src
  /app                    — App Router pages + API routes
    /api/orders/...
    /api/products/...
    /api/tracking/[courier]
    /admin/...
    /products/[slug]
    /track
  /components
    /ui      — Button, ThemeToggle, ...
    /product — ProductCard, QuantityCalculator, TierTable, LiveChatButton
    /order   — InvoiceSummary, WhatsAppCheckoutButton, OrderTrackingForm
    /admin   — AdminProductForm, AdminOrderList, AdminPriceCalculator, AdminShippingCalculator
    /layout  — Container, SiteHeader, SiteFooter
  /modules
    /product   — types, helpers, tier resolution, suggestions
    /pricing   — order totals, recommend selling price
    /shipping  — region table + calculator with override + fallback
    /tracking  — modular trackJNE / trackJNT / trackAnterAja with fallbacks
    /whatsapp  — number normalization, message formatting, send (wa.me + optional API)
    /order     — invoice id generator, currency formatter
  /services
    data.ts    — resolves the active DataAdapter from config
  /adapters
    types.ts
    localAdapter.ts     — JSON file-based, file-system backed
    supabaseAdapter.ts  — optional, falls back to local on any failure
  /config
    app.config.ts
  /data
    products.json (seed)
```

## Data adapter contract

```ts
interface DataAdapter {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  upsertProduct(product: Product): Promise<Product>;
  deleteProduct(id: string): Promise<void>;

  createOrder(order: Order): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | null>;
  findOrder(query: string): Promise<Order | null>; // by id or WA number
  updateOrder(id: string, patch: UpdateOrderInput): Promise<Order | null>;
}
```

Cloud mode requires `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, and
`@supabase/supabase-js` installed (`npm i @supabase/supabase-js`). Without
these, the cloud adapter transparently falls back to the local adapter.

## Tracking

`/api/tracking/{courier}?resi=...` calls modular `trackJNE`, `trackJNT`,
`trackAnterAja` functions in `src/modules/tracking/`. Configure provider URLs
& tokens via env (`JNE_API_URL`, `JNE_API_TOKEN`, etc.). When unconfigured or
upstream fails, the response includes `fallback: true` and the UI shows
*"Status tidak tersedia, hubungi admin"* with a WhatsApp button.

## Edge cases handled

- Invalid / negative quantity → clamped to zero, button disabled
- Quantity below `minOrder` → warning shown, checkout disabled
- Missing product / unknown slug → dedicated 404 page
- Unknown shipping region → falls back to `config.shipping.defaultCost`
- Tracking failure → human-readable fallback + WhatsApp escape hatch
- WhatsApp popup blocked → falls back to same-tab navigation, then UI message

## Admin

Visit `/admin`. Default access code is `admin123` (override via
`NEXT_PUBLIC_ADMIN_CODE`). Note this is a lightweight gate — front with a
reverse proxy / SSO for production.

## Deploy to Vercel

1. Push repo to GitHub
2. Import in Vercel
3. Set env vars (see `.env.example`)
4. Deploy

In Vercel, the local adapter's filesystem writes are ephemeral. For persistent
data on Vercel, switch `NEXT_PUBLIC_APP_MODE` to `cloud` and configure
Supabase.

## License

MIT — sell, fork, customize.

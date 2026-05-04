# BulkOrder. — UMKM bulk-order Next.js app

Production-ready, scalable Next.js (App Router) app for UMKM grosir/bulk-order
with **WhatsApp-first checkout**. No customer login, no payment gateway — just
fast catalog → calculator → invoice → WhatsApp.

## Highlights

- **WhatsApp-first checkout** via `wa.me` redirect (popup-blocker fallback to
  direct navigation).
- **Tier-based pricing** with smart "tambah X pcs untuk hemat" suggestion.
- **Region-based shipping** + admin override + default fallback.
- **Order tracking without login** — search by invoice ID *or* WhatsApp number.
- **Modular courier tracking** (`trackJNE` / `trackJNT` / `trackAnterAja`).
- **Admin dashboard**: products CRUD with image upload + auto-compress,
  orders with resi/courier modal, price & shipping calculators, WhatsApp-style
  chat UI for demo.
- **Adapter pattern** — `localAdapter` (file-based JSON) ↔ `supabaseAdapter`
  (Supabase). Cloud failures fall back silently to local.
- **Image compression** — browser-side compression to ≤250KB WebP before upload
  to Supabase Storage (huge savings, retains quality).
- **Light/dark mode** without reload, persisted in `localStorage`, fallback to
  light if storage fails.
- **Edge-to-edge full-width** business UI. No glassmorphism, no random
  gradients, no AI-style design.
- **Lucide icons** + real Unsplash photos (not just inline SVGs).

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Plain CSS with CSS variables (no Tailwind)
- `lucide-react` icons
- `@supabase/supabase-js` + `browser-image-compression` (cloud mode only)

## Quick start (local mode)

```bash
cd umkm
cp .env.example .env.local
# (edit .env.local — local mode works with defaults)
npm install
npm run dev    # http://localhost:3000
```

Admin gate code (default): `admin123` — see `NEXT_PUBLIC_ADMIN_CODE`.

## Cloud mode (Supabase)

1. Create a Supabase project.
2. Open Supabase Dashboard → **SQL Editor → New query**, paste the entire
   contents of `schema.sql` (in this repo's root), and run.
3. In `.env.local`:
   ```
   NEXT_PUBLIC_APP_MODE=cloud
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGc...                # server-only, full DB access
   NEXT_PUBLIC_SUPABASE_BUCKET=products
   ```
4. Restart dev server: `npm run dev`.

When Supabase is reachable, products/orders are persisted there. When it
isn't, the app silently falls back to the local JSON adapter so you never
see broken UI.

> ⚠️ **Rotate the service role key** after sharing it. It bypasses all RLS
> policies and is meant for server-side trusted use only.

## Build / lint / typecheck

```bash
npm run build       # production build
npm run start       # serve production build
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

## Project structure

```
src/
  app/                        # Next App Router pages + API routes
    page.tsx                  # Storefront homepage
    cara-order/               # How-to-order page
    products/[slug]/          # Product detail
    track/                    # Standalone tracking page
    admin/                    # Admin shell + sub-pages
    api/                      # /api/products, /api/orders, /api/upload, /api/tracking/[courier]
  components/
    layout/                   # Hero, FeatureRow, Header, Footer, Container
    product/                  # ProductCard, ProductGallery, QuantityCalculator, TierTable, LiveChatButton
    order/                    # PublicShippingCalculator, PublicOrderTracker, WhatsAppCheckoutButton, OrderTrackingForm
    admin/                    # AdminSidebar, AdminProductForm, ImageUploader, AdminChatUI, AdminAuthGate
    chat/                     # FloatingChatButton ("Tanya Admin")
    ui/                       # ThemeToggle
  modules/
    product/                  # Pricing helpers (tier resolution, suggest upgrade)
    order/                    # Invoice ID, currency formatting
    shipping/                 # Region table + calculator
    tracking/                 # JNE/JNT/AnterAja modular trackers
    whatsapp/                 # wa.me link builder + message formatters
    image/                    # Browser-side compress utility
  adapters/
    localAdapter.ts           # JSON-on-disk adapter
    supabaseAdapter.ts        # Supabase adapter w/ local fallback
    types.ts
  services/
    data.ts                   # Adapter resolver
    supabaseClient.ts         # Server Supabase client
  config/
    app.config.ts             # Single source of runtime config
  data/
    products.json             # Seed catalog (Unsplash URLs)
    categories.json           # Category list with Unsplash thumbs
schema.sql                    # Supabase tables + RLS + storage bucket
```

## Image compression

When admin uploads a product image:
1. **Browser-side**: `browser-image-compression` reduces it to ≤250KB and
   converts to WebP at quality 0.82, max 1600px on the longer edge.
2. **API route** (`/api/upload`): forwards to Supabase Storage (`products`
   bucket) and returns the public URL. If Supabase is unavailable, returns
   a `data:` URL so the demo keeps working.

This typically shrinks 3–5MB phone photos to 50–150KB with no visible
quality loss — saving Supabase Storage quota dramatically.

## Customization

Most knobs live in `src/config/app.config.ts` and are populated from env vars
at build/runtime — see `.env.example` for the full list.

For style overrides edit `src/app/globals.css` (uses CSS variables defined
at `:root`; dark mode overrides at `[data-theme="dark"]`).

---

**Tip:** sell as reusable source by giving the buyer the ZIP and the
`schema.sql`. They paste it into their own Supabase project, fill in the
env vars, and they're live.

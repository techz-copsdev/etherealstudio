# Ethereal Studio

Premium showroom & service platform untuk preview template landing page, jasa pembuatan website custom, dan IT automation.

Bukan marketplace self-service — fokus pada konsultasi, preview, lalu closing via WhatsApp / direct chat.

---

## Architecture

Frontend dan backend **dipisah secara eksplisit** sehingga UI/UX dapat di-redesign tanpa menyentuh sistem backend.

```
etherealstudio/
├── frontend/   # Next.js 14 (App Router) + TypeScript + Tailwind
└── backend/    # Express + TypeScript + Prisma + SQLite/PostgreSQL
```

| Layer        | Stack                                                                |
| ------------ | -------------------------------------------------------------------- |
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, lucide-react         |
| **Backend**  | Node.js 20+, Express, TypeScript, Prisma, Zod, SQLite (dev) / Postgres (prod) |

### Frontend responsibilities

- UI rendering, routing, SEO
- Template preview gallery & detail pages
- Portfolio showcase
- Marketing pages (Home, About, Pricing, Services)
- Contact form UI (POST ke backend)
- CTA system (WhatsApp deep links)

### Backend responsibilities

- REST API untuk inquiry / lead intake
- Template & portfolio content management
- Admin endpoints (auth-protected)
- WhatsApp trigger / notification hooks
- Analytics events
- Future: CRM integration, payment integration

---

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run seed
npm run dev   # http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev   # http://localhost:3000
```

### Environment variables

Frontend (`frontend/.env.local`):

```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WHATSAPP_NUMBER=628123456789
NEXT_PUBLIC_BRAND_NAME=Ethereal Studio
NEXT_PUBLIC_CONTACT_EMAIL=hello@etherealstudio.id
```

Backend (`backend/.env`):

```
PORT=4000
DATABASE_URL="file:./dev.db"
ADMIN_TOKEN=replace-with-strong-token
WHATSAPP_NUMBER=628123456789
CORS_ORIGIN=http://localhost:3000
```

---

## Pages (Frontend)

| Route               | Purpose                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `/`                 | Hero, value proposition, services overview, CTA                        |
| `/templates`        | Gallery template landing page, filter per niche, preview desktop/mobile |
| `/templates/[slug]` | Detail & live demo template                                            |
| `/services/website` | Custom website service                                                 |
| `/services/automation` | IT automation service                                               |
| `/pricing`          | Basic / Pro / Premium / Custom quotation                               |
| `/portfolio`        | Project sebelumnya, before/after, conversion improvement               |
| `/about`            | Positioning sebagai high-value digital service provider                |
| `/contact`          | Form + WhatsApp owner CTA                                              |

Semua CTA mengarah ke **chat customer service** atau **diskusi kebutuhan**, bukan checkout otomatis.

---

## API (Backend)

| Method | Endpoint                  | Auth   | Description                          |
| ------ | ------------------------- | ------ | ------------------------------------ |
| GET    | `/api/health`             | -      | Health check                         |
| GET    | `/api/templates`          | -      | List templates (filter `?niche=`)    |
| GET    | `/api/templates/:slug`    | -      | Template detail                      |
| GET    | `/api/portfolio`          | -      | List case studies                    |
| POST   | `/api/inquiries`          | -      | Submit consultation / lead form      |
| GET    | `/api/admin/inquiries`    | Bearer | List all inquiries                   |
| PATCH  | `/api/admin/inquiries/:id`| Bearer | Update inquiry status                |
| POST   | `/api/admin/templates`    | Bearer | Create template                      |
| PATCH  | `/api/admin/templates/:id`| Bearer | Update template                      |

Admin auth: header `Authorization: Bearer <ADMIN_TOKEN>`.

---

## Design principles

- Premium, elegant, corporate — **bukan AI startup vibes**
- SVG icons (lucide-react), zero dekoratif emoji
- Typography-first hierarchy (Inter / system stack)
- Whitespace generous, sharp grid composition
- Monochrome base + 1 accent (deep navy / emerald)
- Conversion-focused: setiap section punya 1 clear CTA

---

## License

Proprietary. © Ethereal Studio.

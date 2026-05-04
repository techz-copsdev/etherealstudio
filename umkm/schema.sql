-- =============================================================
-- UMKM BulkOrder. — Supabase schema
-- =============================================================
-- How to use:
--   1. Open Supabase Dashboard → SQL Editor → New query
--   2. Paste the entire file
--   3. Run
--
-- This is idempotent (safe to re-run). It creates tables, indexes,
-- RLS policies, and a public Storage bucket for product images.
-- =============================================================

-- ----- Tables -----
create table if not exists public.products (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  created_at timestamptz not null default now(),
  payload jsonb not null
);

create index if not exists products_payload_active_idx
  on public.products ((payload->>'active'));

create index if not exists products_payload_slug_idx
  on public.products ((payload->>'slug'));

create index if not exists orders_payload_wa_idx
  on public.orders ((payload->>'customerWa'));

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

-- ----- updated_at trigger -----
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated on public.products;
create trigger set_products_updated
  before update on public.products
  for each row execute function public.tg_set_updated_at();

-- ----- Row Level Security -----
alter table public.products enable row level security;
alter table public.orders   enable row level security;

-- Public read access (anon role) for products & orders (lookup by id/wa).
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (true);

drop policy if exists "orders_public_read" on public.orders;
create policy "orders_public_read"
  on public.orders for select
  using (true);

-- Public insert for orders (so guests can submit checkout).
drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert"
  on public.orders for insert
  with check (true);

-- Service-role bypass for products writes & orders updates (admin via service key).
drop policy if exists "products_service_all" on public.products;
create policy "products_service_all"
  on public.products for all
  to service_role
  using (true) with check (true);

drop policy if exists "orders_service_all" on public.orders;
create policy "orders_service_all"
  on public.orders for all
  to service_role
  using (true) with check (true);

-- ----- Storage bucket for product images -----
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Public read on object data (anyone can view product images).
drop policy if exists "products_public_read" on storage.objects;
create policy "products_public_read"
  on storage.objects for select
  using (bucket_id = 'products');

-- Service-role write (admin uploads via service key from Next.js API).
drop policy if exists "products_service_write" on storage.objects;
create policy "products_service_write"
  on storage.objects for all
  to service_role
  using (bucket_id = 'products')
  with check (bucket_id = 'products');

-- =============================================================
-- DONE. After running:
--   • Set NEXT_PUBLIC_APP_MODE=cloud in your .env.local
--   • Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
--   • Set SUPABASE_URL and SUPABASE_SERVICE_KEY (server-only)
--   • Restart the dev server (npm run dev)
--
-- ⚠️  Rotate SUPABASE_SERVICE_KEY in Supabase → Project Settings → API
-- after sharing/storing it, since it bypasses all RLS policies.
-- =============================================================

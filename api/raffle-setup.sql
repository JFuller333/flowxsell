-- Run once in Supabase: SQL Editor (new query) → paste → Run.
-- Then: Storage → New bucket → Name: raffle-cards → Public bucket ✓

create table if not exists public.raffle_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_path text not null unique
);

alter table public.raffle_entries enable row level security;

-- Lock browser keys; API uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
drop policy if exists "raffle_entries_no_public_access" on public.raffle_entries;
create policy "raffle_entries_no_public_access"
  on public.raffle_entries
  for all
  to anon, authenticated
  using (false)
  with check (false);

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  headline text not null default '',
  location text not null default '',
  bio text not null default '',
  skills text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default '',
  level text not null default 'Beginner',
  description text not null default '',
  concepts text[] not null default '{}',
  resources jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  organization text not null,
  type text not null,
  location text not null default '',
  description text not null,
  required_skills text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'active', 'closed', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  learner_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted', 'reviewing', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  unique (opportunity_id, learner_id)
);

create index if not exists opportunities_status_created_idx on public.opportunities(status, created_at desc);
create index if not exists opportunities_provider_idx on public.opportunities(provider_id);
create index if not exists applications_learner_idx on public.applications(learner_id);

alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.opportunities enable row level security;
alter table public.applications enable row level security;

create policy "Users can read their own profile" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Users can insert their own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Skills are readable by everyone" on public.skills for select using (true);
create policy "Admins manage skills" on public.skills for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Active opportunities are public; owners and admins can read all" on public.opportunities for select using (status = 'active' or auth.uid() = provider_id or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Approved providers can post opportunities" on public.opportunities for insert to authenticated with check (auth.uid() = provider_id and (auth.jwt() -> 'app_metadata' ->> 'role') in ('provider', 'admin'));
create policy "Owners and admins can update opportunities" on public.opportunities for update to authenticated using (auth.uid() = provider_id or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check (auth.uid() = provider_id or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Owners and admins can delete opportunities" on public.opportunities for delete to authenticated using (auth.uid() = provider_id or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Learners can create their own applications" on public.applications for insert to authenticated with check (auth.uid() = learner_id and (auth.jwt() -> 'app_metadata' ->> 'role' is null or auth.jwt() -> 'app_metadata' ->> 'role' = 'learner'));
create policy "Learners and opportunity owners can read applications" on public.applications for select to authenticated using (auth.uid() = learner_id or exists (select 1 from public.opportunities o where o.id = opportunity_id and o.provider_id = auth.uid()) or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Admins and opportunity owners can review applications" on public.applications for update to authenticated using (exists (select 1 from public.opportunities o where o.id = opportunity_id and o.provider_id = auth.uid()) or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check (exists (select 1 from public.opportunities o where o.id = opportunity_id and o.provider_id = auth.uid()) or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant select, insert, update on public.profiles to authenticated;
grant select on public.skills to anon, authenticated;
grant insert, update, delete on public.skills to authenticated;
grant select, insert, update, delete on public.opportunities to authenticated;
grant select, insert, update on public.applications to authenticated;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger opportunities_set_updated_at before update on public.opportunities for each row execute function public.set_updated_at();

-- Assign privileged roles only from a trusted server or the Supabase Dashboard, for example:
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"provider"}'::jsonb where email = 'provider@example.com';
-- Never expose the Supabase service-role key to browser code.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('athlete', 'coach', 'scout')),
  name text not null,
  age int,
  position text,
  city text,
  level text,
  guardian text,
  public_slug text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.athlete_videos (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create table if not exists public.evaluations (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  evaluator_id uuid references public.profiles(id) on delete set null,
  evaluator_role text not null check (evaluator_role in ('coach', 'scout', 'athlete')),
  score int not null check (score between 0 and 100),
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, athlete_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.athlete_videos enable row level security;
alter table public.evaluations enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Videos are publicly readable"
  on public.athlete_videos for select
  using (true);

create policy "Athletes can manage their videos"
  on public.athlete_videos for all
  using (auth.uid() = athlete_id)
  with check (auth.uid() = athlete_id);

create policy "Evaluations are readable"
  on public.evaluations for select
  using (true);

create policy "Authenticated users can create evaluations"
  on public.evaluations for insert
  with check (auth.uid() is not null);

create policy "Users manage their favorites"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users read their notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users update their notifications"
  on public.notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

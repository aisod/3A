-- Create users table
create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  surname text not null,
  email text,
  location text,
  phone text,
  age integer,
  created_at timestamp with time zone default now()
);

-- Create conversations table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade,
  summary text,
  messages jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.conversations enable row level security;

-- Policies for server-side access (using service role key bypasses RLS)
-- For admin portal, we'll use service role key on server side

-- Create indexes for faster queries
create index if not exists idx_users_email on public.users(email);
create index if not exists idx_conversations_user_id on public.conversations(user_id);
create index if not exists idx_conversations_created_at on public.conversations(created_at desc);

-- ==========================================
-- 1. BUILD THE TABLES
-- ==========================================

-- Create the 'users' table
create table public.users (
  serial_no serial primary key,
  uid uuid references auth.users(id) on delete cascade not null unique,
  name text,
  email text,
  mobile text,
  address text
);

-- Create the 'items' table
create table public.items (
  serial_no serial primary key,
  hoster_uid uuid references auth.users(id) on delete cascade not null,
  item_name text not null,
  transaction_type text not null, -- e.g., 'rent', 'sell', 'borrow'
  price numeric,
  image_path text, 
  condition text,
  item_type text,
  is_occupied boolean default false 
);

-- ==========================================
-- 2. AUTOMATE PROFILE CREATION (TRIGGER)
-- ==========================================

-- Function to insert dummy data on new signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (uid, name, email, mobile, address)
  values (
    new.id, 
    new.raw_user_meta_data->>'name', 
    new.email, 
    '0000000000', -- Dummy mobile
    'TBD' -- Dummy address
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it already exists so we don't get errors
drop trigger if exists on_auth_user_created on auth.users;

-- Attach the trigger to listen for new auth signups
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ==========================================
-- 3. LOCK IT DOWN (ROW LEVEL SECURITY)
-- ==========================================

-- Turn on the RLS forcefield
alter table public.users enable row level security;
alter table public.items enable row level security;

-- Policies for 'users' table
create policy "Anyone can view user profiles" 
on public.users for select using (true);

create policy "Users can update own profile" 
on public.users for update using (auth.uid() = uid);

-- Policies for 'items' table
create policy "Anyone can view items" 
on public.items for select using (true);

create policy "Logged-in users can post items" 
on public.items for insert with check (auth.uid() = hoster_uid);

create policy "Users can update own items" 
on public.items for update using (auth.uid() = hoster_uid);

create policy "Users can delete own items" 
on public.items for delete using (auth.uid() = hoster_uid);
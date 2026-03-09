-- ═══════════════════════════════════════
-- THE HUNT · PITTSBURGH
-- Database Schema v1.0
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════

-- ─── LISTINGS ───
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null check (type in ('estate_sale', 'garage_sale', 'flea_market', 'auction')),
  status text not null default 'upcoming' check (status in ('live', 'upcoming', 'ending_soon', 'ended')),
  featured_tier text check (featured_tier in ('premium', 'featured', 'starter')),
  address text,
  neighborhood text,
  city text default 'Pittsburgh',
  state text default 'PA',
  zip text,
  address_hidden boolean default false,
  address_release_time timestamptz,
  start_date date not null,
  end_date date not null,
  start_time text,
  end_time text,
  company text,
  description text,
  source text not null,
  source_url text,
  source_id text, -- external ID for deduplication
  payment_methods text,
  entry_info text,
  pricing_notes text,
  parking_info text,
  lat numeric,
  lng numeric,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── VENUES ───
create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  address text not null,
  neighborhood text,
  city text default 'Pittsburgh',
  schedule_pattern text, -- e.g. "1st Saturday of each month"
  website text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

-- ─── SHOPS ───
create table if not exists shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('thrift', 'vintage', 'antique', 'consignment')),
  address text not null,
  neighborhood text,
  city text default 'Pittsburgh',
  state text default 'PA',
  zip text,
  description text,
  hours text,
  website text,
  phone text,
  lat numeric,
  lng numeric,
  featured boolean default false,
  claimed boolean default false,
  featured_tier text check (featured_tier in ('featured', 'starter')),
  source text default 'manual', -- 'manual', 'google_places'
  source_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── NEWSLETTER ───
create table if not exists newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'homepage',
  created_at timestamptz default now()
);

-- ─── INDEXES ───
create index if not exists listings_type_idx on listings(type);
create index if not exists listings_status_idx on listings(status);
create index if not exists listings_start_date_idx on listings(start_date);
create index if not exists listings_neighborhood_idx on listings(neighborhood);
create index if not exists listings_featured_tier_idx on listings(featured_tier);
create index if not exists shops_type_idx on shops(type);
create index if not exists shops_neighborhood_idx on shops(neighborhood);

-- ─── ROW LEVEL SECURITY ───
alter table listings enable row level security;
alter table venues enable row level security;
alter table shops enable row level security;
alter table newsletter enable row level security;

-- Public read access on listings, venues, shops
create policy "Public read listings" on listings for select using (true);
create policy "Public read venues" on venues for select using (true);
create policy "Public read shops" on shops for select using (true);

-- Newsletter: anyone can insert their own email
create policy "Anyone can subscribe" on newsletter for insert with check (true);

-- ─── SEED: VENUES ───
insert into venues (name, description, address, neighborhood, schedule_pattern, website) values
('South Side Flea', 'Indoor flea market with vintage, handmade, and local vendors.', '2700 E Carson St', 'South Side', 'Second Saturday of each month', 'https://southsideflea.com'),
('Trader Jack''s Flea Market', 'Outdoor flea market on the North Shore, rain or shine.', '1 Allegheny Ave', 'North Shore', 'Saturdays and Sundays, April–November', null),
('Hartwood Acres Antique Market', 'Large outdoor antique and flea market on Allegheny County park grounds.', '200 Hartwood Acres Park Rd', 'Hampton Township', 'Select Sundays, May–October', null),
('Pittsburgh Antique & Flea Market', 'Weekly indoor/outdoor antique and collectibles market.', '3700 Perrysville Ave', 'Perrysville', 'Saturdays year-round', null)
on conflict do nothing;

-- ─── SEED: SHOPS ───
insert into shops (name, type, address, neighborhood, hours, source) values
('Goodwill of Southwestern PA', 'thrift', '2000 Smallman St', 'Strip District', 'Mon–Sat 9am–8pm, Sun 10am–6pm', 'manual'),
('St. Vincent de Paul', 'thrift', '1600 Penn Ave', 'Garfield', 'Mon–Sat 9am–5pm', 'manual'),
('Avalon Exchange', 'vintage', '323 Atwood St', 'Oakland', 'Mon–Sat 11am–7pm, Sun 12pm–6pm', 'manual'),
('Zebra Lounge', 'vintage', '4524 Liberty Ave', 'Bloomfield', 'Thu–Sun 12pm–6pm', 'manual'),
('Pittsburgh Antique Mall', 'antique', '6415 Penn Ave', 'East Liberty', 'Wed–Sun 11am–5pm', 'manual'),
('Retro Den', 'vintage', '3608 Butler St', 'Lawrenceville', 'Wed–Sun 11am–6pm', 'manual')
on conflict do nothing;

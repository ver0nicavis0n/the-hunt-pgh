export type SaleType = 'estate_sale' | 'garage_sale' | 'flea_market' | 'auction'
export type ShopType = 'thrift' | 'vintage' | 'antique' | 'consignment'
export type ListingStatus = 'live' | 'upcoming' | 'ending_soon' | 'ended'
export type FeaturedTier = 'premium' | 'featured' | 'starter' | null

export interface Listing {
  id: string
  title: string
  type: SaleType
  status: ListingStatus
  featured_tier: FeaturedTier
  address: string
  neighborhood: string
  city: string
  state: string
  zip: string
  address_hidden: boolean
  address_release_time: string | null
  start_date: string
  end_date: string
  start_time: string
  end_time: string
  company: string | null
  description: string | null
  source: string
  source_url: string | null
  payment_methods: string | null
  entry_info: string | null
  pricing_notes: string | null
  parking_info: string | null
  lat: number | null
  lng: number | null
  created_at: string
  updated_at: string
}

export interface Venue {
  id: string
  name: string
  description: string | null
  address: string
  neighborhood: string
  schedule_pattern: string
  website: string | null
  image_url: string | null
  created_at: string
}

export interface Shop {
  id: string
  name: string
  type: ShopType
  address: string
  neighborhood: string
  description: string | null
  hours: string | null
  website: string | null
  phone: string | null
  featured: boolean
  source: string
  created_at: string
}

export interface Newsletter {
  id: string
  email: string
  created_at: string
}

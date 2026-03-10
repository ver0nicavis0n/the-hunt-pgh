import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { CATEGORY_LABELS, formatDateRange } from '@/lib/utils'
import SalePageClient from './SalePageClient'

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await supabase
    .from('listings')
    .select('title, type, neighborhood, city, start_date, end_date, company, description')
    .eq('id', params.id)
    .single()

  if (!data) return { title: 'Sale | The Hunt Pittsburgh' }

  const category = CATEGORY_LABELS[data.type as keyof typeof CATEGORY_LABELS] ?? 'Sale'
  const dates = formatDateRange(data.start_date, data.end_date)
  const title = `${data.title} — ${data.neighborhood}, Pittsburgh | The Hunt`
  const description = [
    `${category} in ${data.neighborhood}, Pittsburgh.`,
    `${dates}.`,
    data.company ? `By ${data.company}.` : null,
    'Find estate sales, garage sales and more on The Hunt Pittsburgh.',
  ].filter(Boolean).join(' ')

  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  }
}

export default function SalePage({ params }: Props) {
  return <SalePageClient id={params.id} />
}

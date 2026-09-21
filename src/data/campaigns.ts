import type { Campaign } from '@/types/product'

export const campaigns: Campaign[] = [
  {
    id: 'camp-1',
    title: 'AFTER DARK',
    subtitle: 'THE CITY NEVER STOPS.',
    description:
      'A nocturnal capsule built for movement after midnight. Technical fabrics, muted tones, zero compromise.',
    image: '/images/campaigns/after-dark.jpg',
    cta: 'EXPLORE COLLECTION',
    href: '/shop/new-drops',
  },
  {
    id: 'camp-2',
    title: 'NEXT GENERATION',
    subtitle: 'THE FUTURE IS WORN.',
    description:
      'The next wave of NOIRSOLE silhouettes. Designed in the studio, tested on the street.',
    image: '/images/campaigns/next-generation.jpg',
    cta: 'SHOP THE DROP',
    href: '/shop/new-drops',
  },
]
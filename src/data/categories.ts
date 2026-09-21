import type { CategoryCard } from '@/types/product'

export const categoryCards: CategoryCard[] = [
  {
    id: 'c-1',
    title: 'CLOTHING',
    subtitle: 'BUILT FOR EVERY DAY.',
    image: '/images/collections/clothing.jpg',
    href: '/shop/clothing',
    size: 'large',
  },
  {
    id: 'c-2',
    title: 'SNEAKERS',
    subtitle: 'STEP OUT DIFFERENT.',
    image: '/images/collections/sneakers.jpg',
    href: '/shop/sneakers',
    size: 'large',
  },
  {
    id: 'c-3',
    title: 'MEN',
    subtitle: 'THE EVERYDAY UNIFORM.',
    image: '/images/collections/men.jpg',
    href: '/shop/men',
    size: 'small',
  },
  {
    id: 'c-4',
    title: 'WOMEN',
    subtitle: 'YOUR OWN FREQUENCY.',
    image: '/images/collections/women.jpg',
    href: '/shop/women',
    size: 'small',
  },
]
import { useMemo } from 'react'
import type { Product, FilterState, SortOption } from '@/types/product'

export function useProductFilter(
  products: Product[],
  filters: FilterState,
  sort: SortOption,
  search = ''
) {
  return useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (filters.category.length) result = result.filter((p) => filters.category.includes(p.category))
    if (filters.gender.length) result = result.filter((p) => filters.gender.includes(p.gender))
    if (filters.size.length) result = result.filter((p) => p.sizes.some((s) => filters.size.includes(s)))
    if (filters.color.length)
      result = result.filter((p) =>
        p.colors.some((c) => filters.color.includes(c.name.toLowerCase()))
      )
    if (filters.priceMin !== null) result = result.filter((p) => p.price >= filters.priceMin!)
    if (filters.priceMax !== null) result = result.filter((p) => p.price <= filters.priceMax!)
    if (filters.availability.length) {
      result = result.filter((p) => {
        return filters.availability.some((a) => {
          if (a === 'in-stock') return p.stock > 0
          if (a === 'new') return p.isNew
          if (a === 'limited') return p.isLimited
          return false
        })
      })
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        break
      case 'best-selling':
        result.sort((a, b) => (a.bestSellerRank ?? 999) - (b.bestSellerRank ?? 999))
        break
      case 'featured':
      default:
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
        break
    }

    return result
  }, [products, filters, sort, search])
}
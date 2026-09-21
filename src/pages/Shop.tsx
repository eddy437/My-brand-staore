import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '@/data/products'
import type { FilterState, SortOption } from '@/types/product'
import ProductGrid from '@/components/shop/ProductGrid'
import FilterSidebar from '@/components/shop/FilterSidebar'
import FilterDrawer from '@/components/shop/FilterDrawer'
import SortDropdown from '@/components/shop/SortDropdown'
import CategoryTabs from '@/components/shop/CategoryTabs'
import PageTransition from '@/components/common/PageTransition'
import { useProductFilter } from '@/hooks/useProductFilter'
import { useSeo } from '@/lib/seo'

const emptyFilters: FilterState = {
  category: [],
  gender: [],
  size: [],
  color: [],
  priceMin: null,
  priceMax: null,
  availability: [],
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const { category: routeCategory } = useParams()
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [sort, setSort] = useState<SortOption>('featured')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useSeo({
    title: 'Shop All — NOIRSOLE',
    description: 'Shop the full NOIRSOLE collection of clothing, sneakers and accessories.',
  })

  useEffect(() => {
    const c = params.get('category')
    const g = params.get('gender')
    const newFilters: FilterState = { ...emptyFilters }
    if (c) newFilters.category = [c as FilterState['category'][number]]
    if (g) newFilters.gender = [g as FilterState['gender'][number]]
    setFilters(newFilters)
  }, [params])

  useEffect(() => {
    if (routeCategory === 'clothing' || routeCategory === 'sneakers' || routeCategory === 'accessories') {
      setFilters((f) => ({ ...f, category: [routeCategory] }))
    }
    if (routeCategory === 'men' || routeCategory === 'women') {
      setFilters((f) => ({ ...f, gender: [routeCategory] }))
    }
    if (routeCategory === 'new-drops') {
      setFilters((f) => ({ ...f, availability: ['new'] }))
    }
  }, [routeCategory])

  const availableSizes = useMemo(() => {
    const s = new Set<string>()
    products.forEach((p) => p.sizes.forEach((size) => s.add(size)))
    return Array.from(s)
  }, [])

  const availableColors = useMemo(() => {
    const s = new Set<string>()
    products.forEach((p) => p.colors.forEach((c) => s.add(c.name)))
    return Array.from(s)
  }, [])

  const filtered = useProductFilter(products, filters, sort)

  const updateFilters = (f: FilterState) => {
    setFilters(f)
    const p = new URLSearchParams()
    if (f.category.length === 1) p.set('category', f.category[0])
    if (f.gender.length === 1) p.set('gender', f.gender[0])
    setParams(p, { replace: true })
  }

  const handleTab = (v: string) => {
    if (v === 'all') updateFilters({ ...emptyFilters })
    else updateFilters({ ...emptyFilters, category: [v as FilterState['category'][number]] })
  }

  const activeCategory = filters.category.length === 1 ? filters.category[0] : 'all'

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-12 lg:px-10 lg:pt-16">
        <div className="border-b border-noir-800 pb-8">
          <h1 className="font-display text-5xl font-bold uppercase tracking-tightest text-bone lg:text-7xl">
            SHOP ALL
          </h1>
          <p className="mt-3 font-display text-[11px] uppercase tracking-[0.25em] text-concrete-500">
            {filtered.length} PRODUCTS
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <CategoryTabs value={activeCategory} onChange={handleTab} />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 border border-noir-700 px-4 py-3 font-display text-[11px] uppercase tracking-[0.2em] text-bone lg:hidden"
            >
              <SlidersHorizontal size={14} /> FILTERS
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          <FilterSidebar
            filters={filters}
            onChange={updateFilters}
            availableSizes={availableSizes}
            availableColors={availableColors}
          />
          <div>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        availableSizes={availableSizes}
        availableColors={availableColors}
      />
    </PageTransition>
  )
}
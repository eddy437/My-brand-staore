import { useState, useMemo } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { products } from '@/data/products'
import ProductGrid from '@/components/shop/ProductGrid'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function Search() {
  const [q, setQ] = useState('')

  useSeo({ title: 'Search — NOIRSOLE' })

  const results = useMemo(() => {
    if (!q.trim()) return []
    const s = q.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.gender.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
    )
  }, [q])

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="font-display text-5xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
          SEARCH
        </h1>
        <div className="mt-8 flex items-center gap-4 border-b border-noir-700 pb-4">
          <SearchIcon size={22} className="text-concrete-500" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search NOIRSOLE"
            className="w-full bg-transparent font-display text-xl text-bone placeholder:text-concrete-600 focus:outline-none lg:text-3xl"
          />
        </div>
        {q && (
          <p className="mt-6 font-display text-[11px] uppercase tracking-[0.25em] text-concrete-500">
            {results.length} RESULTS
          </p>
        )}
        {q && (
          <div className="mt-10">
            <ProductGrid products={results} />
          </div>
        )}
      </div>
    </PageTransition>
  )
}
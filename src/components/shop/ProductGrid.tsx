import type { Product } from '@/types/product'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-3xl font-bold uppercase tracking-tightest text-bone">
          NO RESULTS
        </p>
        <p className="mt-3 max-w-sm font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
          Try adjusting your filters or search.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((p) => (
        <ProductCard key={`${p.id}-${p.slug}`} product={p} />
      ))}
    </div>
  )
}
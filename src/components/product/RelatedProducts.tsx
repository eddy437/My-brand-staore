import type { Product } from '@/types/product'
import ProductCard from '@/components/shop/ProductCard'

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null
  return (
    <section className="border-t border-noir-800 bg-noir-950">
      <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
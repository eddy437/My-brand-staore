import { getFeaturedProducts } from '@/data/products'
import ProductCard from '@/components/shop/ProductCard'
import { Link } from 'react-router-dom'

export default function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 6)
  return (
    <section className="bg-noir-950">
      <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
            THE CURRENT ROTATION
          </h2>
          <Link
            to="/shop"
            className="font-display text-[11px] uppercase tracking-[0.25em] text-concrete-400 underline-offset-4 hover:text-bone hover:underline"
          >
            VIEW ALL →
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
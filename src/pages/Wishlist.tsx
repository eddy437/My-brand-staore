import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { products } from '@/data/products'
import ProductGrid from '@/components/shop/ProductGrid'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function Wishlist() {
  const { ids } = useWishlistStore()
  const items = products.filter((p) => ids.includes(p.id))

  useSeo({ title: 'Wishlist — NOIRSOLE' })

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <Heart size={48} className="text-concrete-600" />
          <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
            YOUR WISHLIST IS EMPTY
          </h1>
          <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
            Save the pieces you're feeling.
          </p>
          <Link
            to="/shop"
            className="mt-8 border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone hover:bg-bone hover:text-noir-950"
          >
            SHOP NOW
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="font-display text-5xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
          WISHLIST
        </h1>
        <p className="mt-3 font-display text-[11px] uppercase tracking-[0.25em] text-concrete-500">
          {items.length} SAVED
        </p>
        <div className="mt-12">
          <ProductGrid products={items} />
        </div>
      </div>
    </PageTransition>
  )
}
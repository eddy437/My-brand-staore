import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Plus } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/types/product'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import Badge from '@/components/common/Badge'
import { cn, formatPrice } from '@/lib/utils'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import QuickAddModal from '@/components/shop/QuickAddModal'

interface Props {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const [quickAdd, setQuickAdd] = useState(false)
  const { isWishlisted, toggle } = useWishlist()
  const { add } = useCart()
  const wishlisted = isWishlisted(product.id)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative"
      >
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-noir-850">
            <ImageWithFallback
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 h-full w-full"
              imgClassName={cn(
                'transition-all duration-700',
                hovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
              )}
            />
            <ImageWithFallback
              src={product.images[1] ?? product.images[0]}
              alt={`${product.name} alternate`}
              className="absolute inset-0 h-full w-full"
              imgClassName={cn(
                'transition-all duration-700',
                hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
              )}
            />

            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.isLimited && <Badge variant="limited">LIMITED</Badge>}
              {product.compareAtPrice && (
                <Badge variant="sale">
                  -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                </Badge>
              )}
            </div>

            <button
              type="button"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggle(product.id)
              }}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-noir-950/70 backdrop-blur-sm transition-colors hover:bg-noir-950"
            >
              <motion.span
                animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={16}
                  className={cn(wishlisted ? 'fill-bone text-bone' : 'text-bone')}
                />
              </motion.span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setQuickAdd(true)
              }}
              className={cn(
                'absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-bone py-3 font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-transform duration-300',
                hovered ? 'translate-y-0' : 'translate-y-full'
              )}
            >
              <Plus size={14} /> QUICK ADD
            </button>
          </div>
        </Link>

        <div className="mt-4">
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-bone transition-opacity hover:opacity-70">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-concrete-500">
            {product.category} / {product.subcategory}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-[13px] font-medium text-bone">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-display text-[12px] text-concrete-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full border border-concrete-600"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </motion.article>

      <QuickAddModal
        product={product}
        open={quickAdd}
        onClose={() => setQuickAdd(false)}
        onAdd={(color, size, qty) => {
          add(product, color, size, qty)
          setQuickAdd(false)
        }}
      />
    </>
  )
}
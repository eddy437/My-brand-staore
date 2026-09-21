import { Star } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import SizeSelector from './SizeSelector'
import ColorSelector from './ColorSelector'
import QuantitySelector from './QuantitySelector'
import ProductAccordion from './ProductAccordion'
import Button from '@/components/common/Button'
import WishlistButton from '@/components/wishlist/WishlistButton'
import { useCart } from '@/hooks/useCart'
import { useNavigate } from 'react-router-dom'

export default function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)
  const { add } = useCart()
  const navigate = useNavigate()

  const isSneaker = product.category === 'sneakers'

  const handleAdd = (buyNow = false) => {
    if (!size) return
    add(product, color, size, qty, !buyNow)
    if (buyNow) navigate('/checkout')
  }

  const accordionItems = [
    {
      title: 'DETAILS',
      content: product.description,
    },
    {
      title: 'SIZE & FIT',
      content: isSneaker
        ? 'Fits true to size. If you are between sizes, we recommend sizing up for a more relaxed fit.'
        : 'Relaxed, oversized fit. Model is 6\'1" and wears a size M. For a closer fit, size down.',
    },
    {
      title: 'SHIPPING & RETURNS',
      content:
        'Free standard shipping on orders over $150. Express shipping available at checkout for $25. Returns accepted within 30 days of delivery.',
    },
    {
      title: 'CARE',
      content: isSneaker
        ? 'Wipe clean with a soft damp cloth. Air dry. Do not machine wash.'
        : 'Machine wash cold, inside out, with like colors. Do not bleach. Tumble dry low. Cool iron if needed.',
    },
  ]

  return (
    <div className="lg:sticky lg:top-24">
      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-concrete-500">
        {product.category} / {product.subcategory}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tightest text-bone lg:text-4xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.round(product.rating) ? 'fill-bone text-bone' : 'text-concrete-600'}
            />
          ))}
        </div>
        <span className="font-display text-[11px] text-concrete-500">
          {product.rating.toFixed(1)} ({product.reviewCount})
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="font-display text-2xl font-medium text-bone">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <>
            <span className="font-display text-lg text-concrete-500 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-bone">
              SAVE {formatPrice(product.compareAtPrice - product.price)}
            </span>
          </>
        )}
      </div>

      <p className="mt-6 font-display text-[13px] leading-relaxed tracking-[0.02em] text-concrete-400">
        {product.description}
      </p>

      <div className="mt-8 space-y-6">
        <ColorSelector colors={product.colors} value={color} onChange={setColor} />
        <SizeSelector
          sizes={product.sizes}
          value={size}
          onChange={setSize}
          isSneaker={isSneaker}
        />
        <QuantitySelector value={qty} onChange={setQty} />
      </div>

      <div className="mt-4">
        <p className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-500">
          {product.stock > 10
            ? 'IN STOCK'
            : product.stock > 0
            ? `ONLY ${product.stock} LEFT`
            : 'OUT OF STOCK'}
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          fullWidth
          size="lg"
          disabled={!size}
          onClick={() => handleAdd(false)}
        >
          {size ? 'ADD TO BAG' : 'SELECT A SIZE'}
        </Button>
        <Button
          fullWidth
          size="lg"
          variant="outline"
          disabled={!size}
          onClick={() => handleAdd(true)}
        >
          BUY IT NOW
        </Button>
        <div className="flex items-center justify-center gap-2 pt-2">
          <WishlistButton productId={product.id} />
          <span className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-500">
            ADD TO WISHLIST
          </span>
        </div>
      </div>

      <div className="mt-10">
        <ProductAccordion items={accordionItems} />
      </div>
    </div>
  )
}
import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/types/product'
import { formatPrice } from '@/lib/utils'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import { Link } from 'react-router-dom'

interface Props {
  item: CartItem
  onRemove: () => void
  onUpdate: (qty: number) => void
}

export default function CartItemRow({ item, onRemove, onUpdate }: Props) {
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/product/${item.slug}`} className="shrink-0">
        <ImageWithFallback src={item.image} alt={item.name} className="h-24 w-20" />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <Link
            to={`/product/${item.slug}`}
            className="font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-bone hover:opacity-70"
          >
            {item.name}
          </Link>
          <button
            onClick={onRemove}
            aria-label="Remove item"
            className="text-concrete-500 transition-colors hover:text-bone"
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p className="mt-1 font-display text-[10px] uppercase tracking-[0.2em] text-concrete-500">
          {item.color} / {item.size}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-noir-700">
            <button
              onClick={() => onUpdate(item.quantity - 1)}
              className="px-3 py-1 text-bone"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 text-center font-display text-[11px] text-bone">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.quantity + 1)}
              className="px-3 py-1 text-bone"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="font-display text-[12px] font-medium text-bone">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  )
}
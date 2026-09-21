import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import type { Product } from '@/types/product'
import { formatPrice } from '@/lib/utils'

interface Props {
  product: Product
  open: boolean
  onClose: () => void
  onAdd: (color: string, size: string, qty: number) => void
}

export default function QuickAddModal({ product, open, onClose, onAdd }: Props) {
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState('')
  const [qty, setQty] = useState(1)

  return (
    <Modal open={open} onClose={onClose} ariaLabel={`Quick add ${product.name}`} className="max-w-md">
      <div className="p-6">
        <div className="flex gap-4">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="h-28 w-24 shrink-0"
          />
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-bone">
              {product.name}
            </h3>
            <p className="mt-1 font-display text-[12px] text-concrete-400">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
            Color — {color}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={`h-7 w-7 rounded-full border-2 ${
                  color === c.name ? 'border-bone' : 'border-concrete-600'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
            Size
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`border px-3 py-2 font-display text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  size === s
                    ? 'border-bone bg-bone text-noir-950'
                    : 'border-noir-700 text-bone hover:border-bone'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
            Qty
          </p>
          <div className="flex items-center border border-noir-700">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-bone"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-display text-[12px] text-bone">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-2 text-bone"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-8"
          disabled={!size}
          onClick={() => {
            if (!size) return
            onAdd(color, size, qty)
            setSize('')
            setQty(1)
          }}
        >
          {size ? 'ADD TO BAG' : 'SELECT A SIZE'}
        </Button>
      </div>
    </Modal>
  )
}
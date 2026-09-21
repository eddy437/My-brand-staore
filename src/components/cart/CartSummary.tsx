import { formatPrice } from '@/lib/utils'

interface Props {
  subtotal: number
  shipping: number
  total: number
}

export default function CartSummary({ subtotal, shipping, total }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-display text-[11px] uppercase tracking-[0.2em] text-concrete-400">
        <span>Subtotal</span>
        <span className="text-bone">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between font-display text-[11px] uppercase tracking-[0.2em] text-concrete-400">
        <span>Shipping</span>
        <span className="text-bone">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
      </div>
      <div className="flex justify-between border-t border-noir-800 pt-3 font-display text-[13px] font-semibold uppercase tracking-[0.2em] text-bone">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      {subtotal < 150 && subtotal > 0 && (
        <p className="pt-2 font-display text-[10px] uppercase tracking-[0.15em] text-concrete-500">
          Add {formatPrice(150 - subtotal)} more for free shipping
        </p>
      )}
    </div>
  )
}
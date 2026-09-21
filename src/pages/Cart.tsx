import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import CartItemRow from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/common/Button'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function Cart() {
  const { items, remove, updateQuantity, getSubtotal, getShipping, getTotal } = useCart()
  const subtotal = getSubtotal()
  const shipping = getShipping('standard')

  useSeo({ title: 'Your Bag — NOIRSOLE' })

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <ShoppingBag size={48} className="text-concrete-600" />
          <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
            YOUR BAG IS EMPTY
          </h1>
          <p className="mt-3 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
            Start with the current rotation.
          </p>
          <Link to="/shop" className="mt-8">
            <Button size="lg">SHOP NOW</Button>
          </Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
        <h1 className="font-display text-5xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
          YOUR BAG
        </h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <ul className="divide-y divide-noir-850 border-y border-noir-850">
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.color}-${item.size}`}
                item={item}
                onRemove={() => remove(item.productId, item.color, item.size)}
                onUpdate={(q) => updateQuantity(item.productId, item.color, item.size, q)}
              />
            ))}
          </ul>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
              ORDER SUMMARY
            </h2>
            <div className="mt-6">
              <CartSummary subtotal={subtotal} shipping={shipping} total={getTotal('standard')} />
            </div>
            <Link to="/checkout" className="mt-8 block">
              <Button fullWidth size="lg">
                CHECKOUT
              </Button>
            </Link>
            <Link to="/shop" className="mt-3 block">
              <Button fullWidth variant="outline" size="lg">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
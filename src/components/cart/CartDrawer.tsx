import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import CartItemRow from './CartItem'
import CartSummary from './CartSummary'
import Button from '@/components/common/Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, remove, updateQuantity, getSubtotal, getShipping, getTotal } =
    useCart()
  const subtotal = getSubtotal()
  const shipping = getShipping('standard')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-noir-950/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[105] flex w-full max-w-md flex-col bg-noir-950"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-noir-800 px-6 py-5">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-bone">
                YOUR BAG ({items.length})
              </span>
              <button onClick={closeCart} aria-label="Close bag" className="text-bone">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={40} className="text-concrete-600" />
                <p className="mt-6 font-display text-lg font-bold uppercase tracking-tightest text-bone">
                  YOUR BAG IS EMPTY
                </p>
                <p className="mt-2 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
                  Start with the current rotation.
                </p>
                <Link to="/shop" onClick={closeCart} className="mt-8">
                  <Button>SHOP NOW</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  <ul className="divide-y divide-noir-850">
                    {items.map((item) => (
                      <CartItemRow
                        key={`${item.productId}-${item.color}-${item.size}`}
                        item={item}
                        onRemove={() => remove(item.productId, item.color, item.size)}
                        onUpdate={(q) => updateQuantity(item.productId, item.color, item.size, q)}
                      />
                    ))}
                  </ul>
                </div>
                <div className="border-t border-noir-800 px-6 py-6">
                  <CartSummary subtotal={subtotal} shipping={shipping} total={getTotal('standard')} />
                  <div className="mt-6 space-y-3">
                    <Link to="/checkout" onClick={closeCart}>
                      <Button fullWidth size="lg">
                        CHECKOUT
                      </Button>
                    </Link>
                    <Link to="/cart" onClick={closeCart}>
                      <Button fullWidth variant="outline" size="lg">
                        VIEW BAG
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
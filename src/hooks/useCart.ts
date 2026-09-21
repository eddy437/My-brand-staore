import { useCartStore } from '@/store/cartStore'
import { useToastStore } from '@/store/toastStore'
import type { Product } from '@/types/product'

export function useCart() {
  const store = useCartStore()
  const addToast = useToastStore((s) => s.addToast)

  const add = (product: Product, color: string, size: string, quantity = 1, open = true) => {
    store.addItem(product, color, size, quantity)
    addToast('ADDED TO BAG', 'success')
    if (open) store.openCart()
  }

  const remove = (productId: string, color: string, size: string) => {
    store.removeItem(productId, color, size)
    addToast('REMOVED FROM BAG', 'info')
  }

  return { ...store, add, remove }
}
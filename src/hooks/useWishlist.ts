import { useWishlistStore } from '@/store/wishlistStore'
import { useToastStore } from '@/store/toastStore'

export function useWishlist() {
  const store = useWishlistStore()
  const addToast = useToastStore((s) => s.addToast)

  const toggle = (id: string) => {
    const wasIn = store.isWishlisted(id)
    store.toggleWishlist(id)
    addToast(wasIn ? 'REMOVED FROM WISHLIST' : 'ADDED TO WISHLIST', wasIn ? 'info' : 'success')
  }

  return { ...store, toggle }
}
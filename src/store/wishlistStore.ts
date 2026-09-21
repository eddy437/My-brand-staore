import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: string[]
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      addToWishlist: (id) => set((s) => (s.ids.includes(id) ? s : { ids: [...s.ids, id] })),
      removeFromWishlist: (id) => set((s) => ({ ids: s.ids.filter((i) => i !== id) })),
      toggleWishlist: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
        })),
      isWishlisted: (id) => get().ids.includes(id),
      clearWishlist: () => set({ ids: [] }),
    }),
    { name: 'noirsole-wishlist' }
  )
)
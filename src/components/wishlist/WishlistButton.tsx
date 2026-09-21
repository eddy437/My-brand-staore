import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWishlist } from '@/hooks/useWishlist'
import { cn } from '@/lib/utils'

interface Props {
  productId: string
  size?: number
  className?: string
}

export default function WishlistButton({ productId, size = 16, className }: Props) {
  const { isWishlisted, toggle } = useWishlist()
  const active = isWishlisted(productId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(productId)
      }}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={cn('text-bone transition-opacity hover:opacity-60', className)}
    >
      <motion.span animate={active ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
        <Heart size={size} className={active ? 'fill-bone' : ''} />
      </motion.span>
    </button>
  )
}
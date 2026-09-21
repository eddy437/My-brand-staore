import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'
import SearchOverlay from '@/components/search/SearchOverlay'

const links = [
  { to: '/shop', label: 'SHOP' },
  { to: '/shop/clothing', label: 'CLOTHING' },
  { to: '/shop/sneakers', label: 'SNEAKERS' },
  { to: '/shop/men', label: 'MEN' },
  { to: '/shop/women', label: 'WOMEN' },
  { to: '/shop/new-drops', label: 'NEW DROPS' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cartCount = useCartStore((s) => s.getItemCount())
  const openCart = useCartStore((s) => s.openCart)
  const wishCount = useWishlistStore((s) => s.ids.length)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 border-b',
          scrolled
            ? 'bg-noir-950/95 backdrop-blur-md border-noir-800'
            : 'bg-noir-950 border-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 lg:px-10">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden text-bone"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-[0.25em] text-bone"
              aria-label="NOIRSOLE home"
            >
              NOIRSOLE
            </Link>
          </div>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn(
                      'font-display text-[11px] font-medium uppercase tracking-[0.22em] transition-colors',
                      isActive ? 'text-bone' : 'text-concrete-400 hover:text-bone'
                    )
                  }
                  end={l.to === '/shop'}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 lg:gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-bone transition-opacity hover:opacity-60"
            >
              <Search size={19} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative text-bone transition-opacity hover:opacity-60"
            >
              <Heart size={19} />
              {wishCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-bone px-1 font-display text-[9px] font-bold text-noir-950">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              aria-label="Account"
              className="hidden text-bone transition-opacity hover:opacity-60 sm:block"
            >
              <User size={19} />
            </Link>
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative text-bone transition-opacity hover:opacity-60"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-bone px-1 font-display text-[9px] font-bold text-noir-950"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
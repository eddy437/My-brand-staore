import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { products } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import ImageWithFallback from '@/components/common/ImageWithFallback'

const trending = ['Sneakers', 'Hoodies', 'Black', 'New Drops']

interface Props {
  open: boolean
  onClose: () => void
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [q, setQ] = useState('')

  useEffect(() => {
    if (open) setQ('')
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    if (!q.trim()) return []
    const s = q.toLowerCase()
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.gender.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s))
      )
      .slice(0, 6)
  }, [q])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-noir-950"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-auto max-w-4xl px-5 pt-8 lg:pt-16">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-bone">
                SEARCH NOIRSOLE
              </span>
              <button onClick={onClose} aria-label="Close search" className="text-bone">
                <X size={22} />
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 border-b border-noir-700 pb-4">
              <Search size={22} className="text-concrete-500" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent font-display text-2xl font-medium text-bone placeholder:text-concrete-600 focus:outline-none lg:text-4xl"
              />
            </div>

            {!q && (
              <div className="mt-10">
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-concrete-500">
                  TRENDING SEARCHES
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQ(t)}
                      className="border border-noir-700 px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-300 transition-colors hover:border-bone hover:text-bone"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {q && (
              <div className="mt-8 max-h-[60vh] overflow-y-auto">
                {results.length === 0 ? (
                  <p className="font-display text-[12px] uppercase tracking-[0.2em] text-concrete-500">
                    NO RESULTS FOR "{q.toUpperCase()}"
                  </p>
                ) : (
                  <ul className="divide-y divide-noir-850">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/product/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-5 py-4 transition-opacity hover:opacity-70"
                        >
                          <ImageWithFallback
                            src={p.images[0]}
                            alt={p.name}
                            className="h-16 w-14 shrink-0"
                          />
                          <div className="flex-1">
                            <p className="font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-bone">
                              {p.name}
                            </p>
                            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-500">
                              {p.category} / {p.subcategory}
                            </p>
                          </div>
                          <span className="font-display text-[12px] text-bone">
                            {formatPrice(p.price)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
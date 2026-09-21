import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export default function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-noir-950/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[95] flex w-[88%] max-w-sm flex-col bg-noir-950 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-noir-800 px-6 py-5">
              <span className="font-display text-base font-bold tracking-[0.25em] text-bone">
                NOIRSOLE
              </span>
              <button onClick={onClose} aria-label="Close menu" className="text-bone">
                <X size={22} />
              </button>
            </div>
            <ul className="flex-1 overflow-y-auto px-6 py-8">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="block border-b border-noir-850 py-5 font-display text-3xl font-bold uppercase tracking-tightest text-bone transition-colors hover:text-concrete-300"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="border-t border-noir-800 px-6 py-5">
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-concrete-400">
                WEAR THE CULTURE.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
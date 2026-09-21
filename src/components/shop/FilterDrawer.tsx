import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { FilterState } from '@/types/product'
import FilterSidebar from './FilterSidebar'

interface Props {
  open: boolean
  onClose: () => void
  filters: FilterState
  onChange: (f: FilterState) => void
  availableSizes: string[]
  availableColors: string[]
}

export default function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  availableSizes,
  availableColors,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-noir-950/70 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-[85] w-[88%] max-w-sm overflow-y-auto bg-noir-950 px-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="flex items-center justify-between border-b border-noir-800 py-5">
              <span className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-bone">
                FILTERS
              </span>
              <button onClick={onClose} aria-label="Close filters" className="text-bone">
                <X size={20} />
              </button>
            </div>
            <div className="[&_aside]:block">
              <FilterSidebar
                filters={filters}
                onChange={onChange}
                availableSizes={availableSizes}
                availableColors={availableColors}
              />
            </div>
            <div className="sticky bottom-0 -mx-6 mt-6 border-t border-noir-800 bg-noir-950 px-6 py-4">
              <button
                onClick={onClose}
                className="w-full bg-bone py-3 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950"
              >
                APPLY
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
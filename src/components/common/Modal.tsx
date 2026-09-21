import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  ariaLabel?: string
}

export default function Modal({ open, onClose, children, className, ariaLabel }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto bg-noir-900 border border-noir-800',
              className
            )}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-concrete-400 hover:text-bone"
            >
              <X size={20} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
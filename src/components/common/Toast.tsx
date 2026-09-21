import { AnimatePresence, motion } from 'framer-motion'
import { useToastStore } from '@/store/toastStore'

export default function ToastContainer() {
  const { toasts } = useToastStore()
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[200] flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-bone px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-noir-950"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
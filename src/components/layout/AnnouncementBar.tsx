import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const messages = [
  'FREE SHIPPING ON ORDERS OVER $150',
  'NEW DROP — FRIDAY 10AM',
  'JOIN THE NOIRSOLE COMMUNITY',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative h-9 overflow-hidden bg-noir-950 border-b border-noir-800">
      <div className="flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="font-display text-[10px] font-medium uppercase tracking-[0.3em] text-concrete-300"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
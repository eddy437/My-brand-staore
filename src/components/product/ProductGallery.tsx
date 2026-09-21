import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import { cn } from '@/lib/utils'

interface Props {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, images.length])

  return (
    <>
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        <div className="flex gap-3 lg:flex-col">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'h-20 w-16 shrink-0 overflow-hidden border transition-colors lg:h-24 lg:w-20',
                active === i ? 'border-bone' : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <ImageWithFallback src={img} alt={`${name} view ${i + 1}`} className="h-full w-full" />
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/5] w-full"
            >
              <ImageWithFallback src={images[active]} alt={name} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => setLightbox(true)}
            aria-label="View fullscreen"
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-noir-950/70 text-bone backdrop-blur-sm transition-colors hover:bg-noir-950"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-noir-950"
            role="dialog"
            aria-modal="true"
            aria-label={`${name} fullscreen gallery`}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close"
              className="absolute right-6 top-6 text-bone"
            >
              <X size={24} />
            </button>
            <button
              onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-4 text-bone lg:left-10"
            >
              <ChevronLeft size={32} />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[85vh] max-w-[85vw]"
            >
              <ImageWithFallback src={images[active]} alt={name} className="max-h-[85vh]" />
            </motion.div>
            <button
              onClick={() => setActive((i) => (i + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-4 text-bone lg:right-10"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
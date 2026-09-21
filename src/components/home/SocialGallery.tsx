import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import ImageWithFallback from '@/components/common/ImageWithFallback'

const images = [
  '/images/lifestyle/lifestyle-01.jpg',
  '/images/lifestyle/lifestyle-02.jpg',
  '/images/lifestyle/lifestyle-03.jpg',
  '/images/lifestyle/lifestyle-04.jpg',
  '/images/lifestyle/lifestyle-05.jpg',
  '/images/lifestyle/lifestyle-06.jpg',
]

export default function SocialGallery() {
  return (
    <section className="border-t border-noir-800 bg-noir-950">
      <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
          @NOIRSOLE
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {images.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden"
            >
              <ImageWithFallback
                src={src}
                alt={`NOIRSOLE lifestyle ${i + 1}`}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-noir-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.25em] text-bone">
                  <Instagram size={14} /> VIEW POST
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
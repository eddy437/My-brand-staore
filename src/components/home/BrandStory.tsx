import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageWithFallback from '@/components/common/ImageWithFallback'

export default function BrandStory() {
  return (
    <section className="bg-noir-950">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src="/images/lifestyle/lifestyle-01.jpg"
            alt="NOIRSOLE brand story"
            className="aspect-[4/5] w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tightest text-bone lg:text-6xl">
            BUILT FOR THE NEXT GENERATION.
          </h2>
          <p className="mt-6 max-w-lg font-display text-[14px] leading-relaxed tracking-[0.02em] text-concrete-400">
            NOIRSOLE exists somewhere between street culture, music, movement and everyday life.
          </p>
          <p className="mt-3 max-w-lg font-display text-[14px] leading-relaxed tracking-[0.02em] text-concrete-400">
            We make pieces designed to be worn your way.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone transition-colors hover:bg-bone hover:text-noir-950"
          >
            OUR STORY →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
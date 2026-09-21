import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageWithFallback from '@/components/common/ImageWithFallback'

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-noir-950">
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero/hero-mobile.jpg" />
          <ImageWithFallback
            src="/images/hero/hero-desktop.jpg"
            alt="NOIRSOLE campaign — oversized streetwear and sneakers"
            className="h-full w-full"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-noir-950/30" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 lg:px-10 lg:pb-24">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[14vw] font-bold leading-[0.85] tracking-tightest text-bone sm:text-[10vw] lg:text-[9rem] xl:text-[11rem]"
        >
          WEAR THE
          <br />
          CULTURE.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-md font-display text-sm uppercase tracking-[0.2em] text-concrete-300"
        >
          Streetwear built for the next generation.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Link
            to="/shop/clothing"
            className="inline-flex items-center justify-center border border-bone bg-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-white"
          >
            SHOP CLOTHING
          </Link>
          <Link
            to="/shop/sneakers"
            className="inline-flex items-center justify-center border border-bone bg-transparent px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone transition-colors hover:bg-bone hover:text-noir-950"
          >
            SHOP SNEAKERS
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
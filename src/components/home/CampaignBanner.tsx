import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageWithFallback from '@/components/common/ImageWithFallback'

export default function CampaignBanner() {
  return (
    <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-noir-950">
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src="/images/campaigns/after-dark.jpg"
          alt="After Dark campaign"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-noir-950/50" />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-5 lg:px-10">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tightest text-bone lg:text-9xl"
        >
          AFTER DARK
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 max-w-md font-display text-sm uppercase tracking-[0.25em] text-concrete-200"
        >
          THE CITY NEVER STOPS.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            to="/shop/new-drops"
            className="inline-flex items-center border border-bone bg-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-noir-950 transition-colors hover:bg-white"
          >
            EXPLORE COLLECTION →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
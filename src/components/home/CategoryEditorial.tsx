import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categoryCards } from '@/data/categories'
import ImageWithFallback from '@/components/common/ImageWithFallback'
import { cn } from '@/lib/utils'

export default function CategoryEditorial() {
  return (
    <section className="bg-noir-950">
      <div className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tightest text-bone lg:text-6xl">
          SHOP BY CATEGORY
        </h2>

        <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:gap-6">
          {categoryCards.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={cn(
                c.size === 'large'
                  ? 'lg:col-span-6 lg:row-span-2'
                  : 'lg:col-span-3'
              )}
            >
              <Link to={c.href} className="group block relative overflow-hidden">
                <div className={cn('relative', c.size === 'large' ? 'aspect-[4/5]' : 'aspect-square')}>
                  <ImageWithFallback
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 font-display text-[10px] uppercase tracking-[0.3em] text-concrete-300">
                      {c.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
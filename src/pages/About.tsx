import ImageWithFallback from '@/components/common/ImageWithFallback'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

const sections = [
  {
    title: 'OUR STORY',
    body: 'NOIRSOLE started in a small studio with one idea: make the pieces we actually wanted to wear. No noise. No compromise. Just clothing and sneakers built with intention.',
    image: '/images/lifestyle/lifestyle-02.jpg',
  },
  {
    title: 'OUR PHILOSOPHY',
    body: 'We design for the space between street culture, music, movement and everyday life. Every piece is made to be worn your way — not dictated by a trend cycle.',
    image: '/images/lifestyle/lifestyle-03.jpg',
  },
  {
    title: 'OUR COMMUNITY',
    body: 'NOIRSOLE is built by and for the next generation. We collaborate with artists, musicians and creators who move culture forward, not follow it.',
    image: '/images/lifestyle/lifestyle-04.jpg',
  },
  {
    title: 'OUR APPROACH',
    body: 'We work with a small number of factories we trust. Heavyweight fabrics, considered construction, and silhouettes that hold their shape season after season.',
    image: '/images/lifestyle/lifestyle-05.jpg',
  },
]

export default function About() {
  useSeo({
    title: 'About — NOIRSOLE',
    description: 'This is NOIRSOLE. Our story, philosophy, community and approach.',
  })

  return (
    <PageTransition>
      <section className="border-b border-noir-800 bg-noir-950">
        <div className="mx-auto max-w-[1600px] px-5 py-24 lg:px-10 lg:py-32">
          <h1 className="font-display text-[14vw] font-bold leading-[0.85] tracking-tightest text-bone sm:text-[10vw] lg:text-[9rem]">
            THIS IS
            <br />
            NOIRSOLE.
          </h1>
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={s.title} className="border-b border-noir-800 bg-noir-950">
          <div
            className={`mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-28 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <ImageWithFallback src={s.image} alt={s.title} className="aspect-[4/5] w-full" />
            <div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tightest text-bone lg:text-5xl">
                {s.title}
              </h2>
              <p className="mt-6 max-w-lg font-display text-[14px] leading-relaxed tracking-[0.02em] text-concrete-400">
                {s.body}
              </p>
            </div>
          </div>
        </section>
      ))}
    </PageTransition>
  )
}
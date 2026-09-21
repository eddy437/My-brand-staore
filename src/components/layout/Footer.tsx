import { Link } from 'react-router-dom'
import { Instagram, Music2, Pin } from 'lucide-react'

const columns = [
  {
    title: 'SHOP',
    links: [
      { label: 'Clothing', to: '/shop/clothing' },
      { label: 'Sneakers', to: '/shop/sneakers' },
      { label: 'Men', to: '/shop/men' },
      { label: 'Women', to: '/shop/women' },
      { label: 'New Drops', to: '/shop/new-drops' },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Shipping', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'Size Guide', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Our Story', to: '/about' },
      { label: 'Careers', to: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-noir-800 bg-noir-950">
      <div className="mx-auto max-w-[1600px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)_1fr]">
          <div>
            <p className="font-display text-5xl font-bold tracking-tightest text-bone lg:text-6xl">
              NOIRSOLE
            </p>
            <p className="mt-4 max-w-xs font-display text-[11px] uppercase tracking-[0.25em] text-concrete-400">
              WEAR THE CULTURE.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
                {col.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="font-display text-[12px] uppercase tracking-[0.15em] text-concrete-400 transition-colors hover:text-bone"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-bone">
              FOLLOW
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.15em] text-concrete-400 transition-colors hover:text-bone"
                >
                  <Instagram size={14} /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.15em] text-concrete-400 transition-colors hover:text-bone"
                >
                  <Music2 size={14} /> TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.15em] text-concrete-400 transition-colors hover:text-bone"
                >
                  <Pin size={14} /> Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-noir-800 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <span className="font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
              © 2026 NOIRSOLE
            </span>
            <Link
              to="/contact"
              className="font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500 hover:text-bone"
            >
              Privacy
            </Link>
            <Link
              to="/contact"
              className="font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500 hover:text-bone"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500 hover:text-bone"
            >
              Shipping
            </Link>
          </div>
          <p className="font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
            Designed &amp; Developed by{' '}
            <a
              href="https://adeemhaider.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone underline-offset-4 hover:underline"
            >
              Adeem Haider
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
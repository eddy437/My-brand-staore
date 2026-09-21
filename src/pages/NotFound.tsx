import { Link } from 'react-router-dom'
import PageTransition from '@/components/common/PageTransition'
import { useSeo } from '@/lib/seo'

export default function NotFound() {
  useSeo({ title: '404 — NOIRSOLE' })
  return (
    <PageTransition>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <p className="font-display text-[12vw] font-bold leading-none tracking-tightest text-bone lg:text-[10rem]">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tightest text-bone lg:text-4xl">
          PAGE NOT FOUND
        </h1>
        <p className="mt-4 font-display text-[11px] uppercase tracking-[0.2em] text-concrete-500">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-10 border border-bone px-8 py-4 font-display text-[12px] font-semibold uppercase tracking-[0.25em] text-bone transition-colors hover:bg-bone hover:text-noir-950"
        >
          BACK HOME
        </Link>
      </div>
    </PageTransition>
  )
}
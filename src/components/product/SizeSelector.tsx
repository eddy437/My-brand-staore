import { cn } from '@/lib/utils'
import { useState } from 'react'
import SizeGuide from './SizeGuide'

interface Props {
  sizes: string[]
  unavailable?: string[]
  value: string
  onChange: (s: string) => void
  isSneaker?: boolean
}

export default function SizeSelector({ sizes, unavailable = [], value, onChange, isSneaker }: Props) {
  const [guideOpen, setGuideOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
          SIZE {value && `— ${value}`}
        </p>
        <button
          onClick={() => setGuideOpen(true)}
          className="font-display text-[10px] uppercase tracking-[0.2em] text-concrete-400 underline underline-offset-4 hover:text-bone"
        >
          SIZE GUIDE
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((s) => {
          const disabled = unavailable.includes(s)
          return (
            <button
              key={s}
              disabled={disabled}
              onClick={() => onChange(s)}
              className={cn(
                'border px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.15em] transition-colors',
                disabled && 'cursor-not-allowed border-noir-800 text-concrete-600 line-through',
                !disabled && value === s && 'border-bone bg-bone text-noir-950',
                !disabled && value !== s && 'border-noir-700 text-bone hover:border-bone'
              )}
            >
              {s}
            </button>
          )
        })}
      </div>
      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} isSneaker={isSneaker} />
    </div>
  )
}
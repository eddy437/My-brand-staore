import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { SortOption } from '@/types/product'
import { cn } from '@/lib/utils'

const options: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'best-selling', label: 'Best Selling' },
]

interface Props {
  value: SortOption
  onChange: (v: SortOption) => void
}

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find((o) => o.value === value)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 border border-noir-700 px-4 py-3 font-display text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-concrete-500">SORT:</span> {current?.label}
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1 w-56 border border-noir-700 bg-noir-900 py-1"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                role="option"
                aria-selected={value === o.value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={cn(
                  'block w-full px-4 py-2.5 text-left font-display text-[11px] uppercase tracking-[0.15em] transition-colors',
                  value === o.value ? 'bg-noir-800 text-bone' : 'text-concrete-400 hover:text-bone'
                )}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
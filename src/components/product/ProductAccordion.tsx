import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Item {
  title: string
  content: string
}

export default function ProductAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="border-t border-noir-800">
      {items.map((item, i) => (
        <div key={item.title} className="border-b border-noir-800">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between py-4 text-left"
          >
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-bone">
              {item.title}
            </span>
            <ChevronDown
              size={16}
              className={cn('text-concrete-400 transition-transform', open === i && 'rotate-180')}
            />
          </button>
          {open === i && (
            <div className="pb-5">
              <p className="font-display text-[12px] leading-relaxed tracking-[0.02em] text-concrete-400">
                {item.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
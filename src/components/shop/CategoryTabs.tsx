import { cn } from '@/lib/utils'

const tabs = [
  { value: 'all', label: 'ALL' },
  { value: 'clothing', label: 'CLOTHING' },
  { value: 'sneakers', label: 'SNEAKERS' },
  { value: 'accessories', label: 'ACCESSORIES' },
]

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function CategoryTabs({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={cn(
            'border px-5 py-3 font-display text-[11px] font-medium uppercase tracking-[0.2em] transition-colors',
            value === t.value
              ? 'border-bone bg-bone text-noir-950'
              : 'border-noir-700 text-concrete-300 hover:border-bone hover:text-bone'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
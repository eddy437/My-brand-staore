import type { ProductColor } from '@/types/product'
import { cn } from '@/lib/utils'

interface Props {
  colors: ProductColor[]
  value: string
  onChange: (c: string) => void
}

export default function ColorSelector({ colors, value, onChange }: Props) {
  return (
    <div>
      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
        COLOR — {value}
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onChange(c.name)}
            aria-label={c.name}
            className={cn(
              'h-8 w-8 rounded-full border-2 transition-all',
              value === c.name ? 'border-bone scale-110' : 'border-concrete-600'
            )}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  )
}
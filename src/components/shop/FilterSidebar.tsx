import type { FilterState } from '@/types/product'
import { cn } from '@/lib/utils'

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  availableSizes: string[]
  availableColors: string[]
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-noir-800 py-6">
      <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-bone">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Check({
  label,
  checked,
  onChange,
  count,
}: {
  label: string
  checked: boolean
  onChange: () => void
  count?: number
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5">
      <span
        className={cn(
          'flex h-4 w-4 items-center justify-center border transition-colors',
          checked ? 'border-bone bg-bone' : 'border-concrete-600'
        )}
      >
        {checked && <span className="h-2 w-2 bg-noir-950" />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="font-display text-[11px] uppercase tracking-[0.15em] text-concrete-300">
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto font-display text-[10px] text-concrete-500">{count}</span>
      )}
    </label>
  )
}

export default function FilterSidebar({ filters, onChange, availableSizes, availableColors }: Props) {
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  return (
    <aside className="hidden lg:block">
      <Section title="CATEGORY">
        {(['clothing', 'sneakers', 'accessories'] as const).map((c) => (
          <Check
            key={c}
            label={c}
            checked={filters.category.includes(c)}
            onChange={() => onChange({ ...filters, category: toggle(filters.category, c) })}
          />
        ))}
      </Section>

      <Section title="GENDER">
        {(['men', 'women', 'unisex'] as const).map((g) => (
          <Check
            key={g}
            label={g}
            checked={filters.gender.includes(g)}
            onChange={() => onChange({ ...filters, gender: toggle(filters.gender, g) })}
          />
        ))}
      </Section>

      <Section title="SIZE">
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ ...filters, size: toggle(filters.size, s) })}
              className={cn(
                'border px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.15em] transition-colors',
                filters.size.includes(s)
                  ? 'border-bone bg-bone text-noir-950'
                  : 'border-noir-700 text-concrete-300 hover:border-bone'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="COLOR">
        {availableColors.map((c) => (
          <Check
            key={c}
            label={c}
            checked={filters.color.includes(c.toLowerCase())}
            onChange={() => onChange({ ...filters, color: toggle(filters.color, c.toLowerCase()) })}
          />
        ))}
      </Section>

      <Section title="PRICE">
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin ?? ''}
            onChange={(e) =>
              onChange({ ...filters, priceMin: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-noir-700 bg-transparent px-3 py-2 font-display text-[11px] text-bone placeholder:text-concrete-600 focus:border-bone focus:outline-none"
          />
          <span className="text-concrete-500">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax ?? ''}
            onChange={(e) =>
              onChange({ ...filters, priceMax: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full border border-noir-700 bg-transparent px-3 py-2 font-display text-[11px] text-bone placeholder:text-concrete-600 focus:border-bone focus:outline-none"
          />
        </div>
      </Section>

      <Section title="AVAILABILITY">
        {(
          [
            { v: 'in-stock', l: 'In Stock' },
            { v: 'new', l: 'New' },
            { v: 'limited', l: 'Limited' },
          ] as const
        ).map(({ v, l }) => (
          <Check
            key={v}
            label={l}
            checked={filters.availability.includes(v)}
            onChange={() =>
              onChange({ ...filters, availability: toggle(filters.availability, v) })
            }
          />
        ))}
      </Section>
    </aside>
  )
}
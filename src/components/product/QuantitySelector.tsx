interface Props {
  value: number
  onChange: (v: number) => void
  max?: number
}

export default function QuantitySelector({ value, onChange, max = 10 }: Props) {
  return (
    <div>
      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-concrete-400">
        QUANTITY
      </p>
      <div className="mt-3 inline-flex items-center border border-noir-700">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="px-4 py-2.5 text-bone"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-10 text-center font-display text-[12px] text-bone">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="px-4 py-2.5 text-bone"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  )
}
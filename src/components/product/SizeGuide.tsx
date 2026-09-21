import Modal from '@/components/common/Modal'

interface Props {
  open: boolean
  onClose: () => void
  isSneaker?: boolean
}

const clothingRows = [
  ['XS', '34–36', '28–30'],
  ['S', '36–38', '30–32'],
  ['M', '38–40', '32–34'],
  ['L', '40–42', '34–36'],
  ['XL', '42–44', '36–38'],
  ['XXL', '44–46', '38–40'],
]

const sneakerRows = [
  ['US 7', '40', '25'],
  ['US 8', '41', '26'],
  ['US 9', '42.5', '27'],
  ['US 10', '44', '28'],
  ['US 11', '45', '29'],
  ['US 12', '46', '30'],
]

export default function SizeGuide({ open, onClose, isSneaker }: Props) {
  const rows = isSneaker ? sneakerRows : clothingRows
  const headers = isSneaker
    ? ['US', 'EU', 'CM']
    : ['SIZE', 'CHEST (IN)', 'WAIST (IN)']

  return (
    <Modal open={open} onClose={onClose} ariaLabel="Size guide" className="max-w-lg">
      <div className="p-6">
        <h3 className="font-display text-lg font-bold uppercase tracking-tightest text-bone">
          SIZE GUIDE
        </h3>
        <p className="mt-2 font-display text-[11px] uppercase tracking-[0.15em] text-concrete-500">
          Measurements are approximate. When in doubt, size up.
        </p>
        <table className="mt-6 w-full border-collapse">
          <thead>
            <tr className="border-b border-noir-700">
              {headers.map((h) => (
                <th
                  key={h}
                  className="py-3 text-left font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-concrete-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-noir-850">
                {r.map((c, i) => (
                  <td
                    key={i}
                    className="py-3 font-display text-[12px] uppercase tracking-[0.1em] text-bone"
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
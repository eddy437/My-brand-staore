import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  variant?: 'default' | 'new' | 'limited' | 'sale'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: Props) {
  const variants = {
    default: 'bg-noir-900 text-bone',
    new: 'bg-bone text-noir-950',
    limited: 'bg-noir-950 text-bone border border-bone/40',
    sale: 'bg-bone text-noir-950',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em]',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
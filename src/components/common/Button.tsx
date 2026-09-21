import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-bone text-noir-950 hover:bg-white border border-bone',
  secondary:
    'bg-noir-900 text-bone hover:bg-noir-800 border border-noir-700',
  outline:
    'bg-transparent text-bone hover:bg-bone hover:text-noir-950 border border-bone',
  ghost:
    'bg-transparent text-bone hover:bg-noir-850 border border-transparent',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[11px] tracking-[0.2em]',
  md: 'px-6 py-3 text-[12px] tracking-[0.2em]',
  lg: 'px-8 py-4 text-[13px] tracking-[0.25em]',
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display font-medium uppercase transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'
export default Button
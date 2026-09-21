import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  src: string
  alt: string
  className?: string
  imgClassName?: string
}

export default function ImageWithFallback({ src, alt, className, imgClassName }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored || !src) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-noir-850',
          className
        )}
        aria-label={alt}
        role="img"
      >
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #F5F3EE 0 1px, transparent 1px 12px)',
          }}
        />
        <span className="font-display text-[11px] tracking-[0.3em] uppercase text-concrete-400">
          NOIRSOLE
        </span>
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden bg-noir-850', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}
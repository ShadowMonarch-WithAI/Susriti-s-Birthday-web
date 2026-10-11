import React from 'react'
import { cn } from '@/lib/utils'

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center transition-bg',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--rose-gradient:repeating-linear-gradient(100deg,rgba(246,168,189,0.3)_10%,rgba(255,225,235,0.4)_15%,rgba(251,215,226,0.35)_20%,rgba(253,240,230,0.4)_25%,rgba(246,168,189,0.25)_30%)]
            [background-image:var(--rose-gradient)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[30px] opacity-60
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--rose-gradient)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-multiply
            pointer-events-none
            absolute -inset-[10px] will-change-transform`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  )
}

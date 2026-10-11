import React from 'react'
import { cn } from '@/lib/utils'

export const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.08em',
      shimmerDuration = '2.4s',
      borderRadius = '9999px',
      background = 'radial-gradient(ellipse 80% 50% at 50% 120%, #9f3159, #b5446d)',
      className,
      children,
      onClick,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={{
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        }}
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/25 px-6 py-3.5 text-white [background:var(--bg)] [border-radius:var(--radius)]',
          'transform-gpu transition-all duration-300 ease-in-out',
          'hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(181,68,109,0.35)] active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d] focus-visible:ring-offset-2',
          className
        )}
        ref={ref}
        onClick={onClick}
        type={type}
        {...props}
      >
        {/* spark / border shimmer container */}
        <div
          aria-hidden="true"
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]'
          )}
        >
          {/* animated beam */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* conic gradient spark */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Backdrop overlay for text contrast */}
        <div
          aria-hidden="true"
          className="absolute [border-radius:var(--radius)] -z-20 [inset:var(--cut)] [background:var(--bg)]"
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-xs tracking-wide">
          {children}
        </span>
      </button>
    )
  }
)

ShimmerButton.displayName = 'ShimmerButton'

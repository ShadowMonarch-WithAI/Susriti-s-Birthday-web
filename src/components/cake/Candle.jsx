import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function Candle({
  isLit = true,
  height = 48,
  width = 9,
  color = 'from-rose-200 via-pink-300 to-rose-400',
  stripeColor = 'border-rose-400/40',
  flickerDelay = 0,
  swayDuration = 1.4,
  className,
}) {
  return (
    <div className={cn('relative flex flex-col items-center select-none', className)}>
      {/* 1. FLAME & GLOW */}
      <div className="relative h-9 flex items-end justify-center">
        <AnimatePresence>
          {isLit ? (
            <motion.div
              key="flame"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{
                scale: [1, 1.2, 0],
                opacity: [1, 0.8, 0],
                y: -6,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
              className="relative flex items-center justify-center cursor-pointer"
            >
              {/* Radial warm candlelight ambient halo */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 0.95, 1],
                  opacity: [0.65, 0.85, 0.6, 0.65],
                }}
                transition={{
                  duration: 1.8 + flickerDelay * 0.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-14 h-14 -top-3 rounded-full bg-radial from-amber-300/45 via-rose-400/20 to-transparent blur-[6px] pointer-events-none"
              />

              {/* Outer flickering flame tear */}
              <motion.div
                animate={{
                  scaleY: [1, 1.12, 0.94, 1.05, 1],
                  scaleX: [1, 0.93, 1.08, 0.97, 1],
                  rotate: [-2, 3, -4, 2, -2],
                  skewX: [-1, 2, -2, 1, -1],
                }}
                transition={{
                  duration: swayDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: flickerDelay,
                }}
                className="relative w-3.5 h-6 rounded-t-full rounded-b-md bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.85),0_0_24px_rgba(244,114,182,0.45)] origin-bottom"
              >
                {/* Inner white-hot flame core */}
                <div className="absolute bottom-0.5 inset-x-0.5 h-3.5 rounded-t-full rounded-b-sm bg-gradient-to-t from-blue-400/60 via-amber-100 to-white opacity-95" />
              </motion.div>
            </motion.div>
          ) : (
            /* 2. RISING SMOKE WISPS WHEN EXTINGUISHED */
            <motion.div
              key="smoke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-2 flex flex-col items-center pointer-events-none"
            >
              {[0, 1].map((wisp) => (
                <motion.div
                  key={wisp}
                  initial={{ y: 0, x: 0, scale: 0.5, opacity: 0.7 }}
                  animate={{
                    y: -32 - wisp * 14,
                    x: (wisp === 0 ? -6 : 8) + (Math.sin(wisp) * 4),
                    scale: 2.2,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.6 + wisp * 0.4,
                    ease: 'easeOut',
                    delay: wisp * 0.15,
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300/80 blur-[1px]"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2. WICK */}
      <div className="w-0.5 h-2 bg-neutral-700 rounded-t-xs -mt-0.5 z-10" />

      {/* 3. CANDLE BODY */}
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        className={cn(
          'relative rounded-t-xs rounded-b-sm shadow-md bg-gradient-to-b overflow-hidden',
          color
        )}
      >
        {/* Spiral striped texture */}
        <div
          className={cn(
            'absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.7)_4px,rgba(255,255,255,0.7)_7px)]'
          )}
        />
        {/* Wax highlight shine */}
        <div className="absolute inset-y-0 left-0.5 w-[2px] bg-white/60 rounded-full" />
      </div>
    </div>
  )
}

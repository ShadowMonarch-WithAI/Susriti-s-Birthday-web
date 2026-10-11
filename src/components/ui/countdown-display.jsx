import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CountdownDisplay({ targetDate, className }) {
  const [time, setTime] = useState(() => calculateTimeRemaining(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div
      className={cn(
        'grid grid-cols-4 gap-3 sm:gap-4 max-w-[480px] mx-auto my-8',
        className
      )}
    >
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="relative group bg-white/95 backdrop-blur-md border border-[#f3dce4] rounded-[20px] p-3.5 sm:p-4 text-center shadow-[0_10px_30px_rgba(158,73,96,0.06)] hover:shadow-[0_14px_35px_rgba(158,73,96,0.12)] transition-all duration-300"
        >
          {/* Subtle top glow bar */}
          <div className="absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f6a8bd] to-transparent rounded-full opacity-60" />

          <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-display text-3xl sm:text-4xl font-medium text-[#a8325b] tracking-tight block"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="block mt-1 text-[9px] sm:text-[10px] font-bold text-[#b18a9a] uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function calculateTimeRemaining(targetDate) {
  const diff = targetDate.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  }
}

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FlipCard({
  icon,
  title,
  detail,
  index,
  isFlipped,
  onToggle,
  className,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn('relative h-[190px] w-full perspective-1000', className)}
    >
      <button
        type="button"
        onClick={onToggle}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-pressed={isFlipped}
        aria-label={`${title} - tap to ${isFlipped ? 'hide' : 'read'} note`}
        className="w-full h-full relative cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d] focus-visible:ring-offset-2 rounded-[22px]"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full h-full relative rounded-[22px]"
        >
          {/* FRONT FACE */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className={cn(
              'absolute inset-0 rounded-[22px] p-5 flex flex-col items-center justify-center text-center',
              'bg-gradient-to-b from-white via-[#fff9fb] to-[#fff3f7]',
              'border border-[#f2dce4] shadow-[0_10px_30px_rgba(158,73,96,0.05)] hover:shadow-[0_16px_36px_rgba(158,73,96,0.12)]',
              'transition-all duration-300'
            )}
          >
            {/* Spotlight glow effect */}
            {isHovered && (
              <div
                className="pointer-events-none absolute -inset-px rounded-[22px] opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(180px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(246, 168, 189, 0.25), transparent 80%)`,
                }}
              />
            )}

            <span className="text-3xl mb-2.5 drop-shadow-sm filter transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
            <strong className="font-display text-[18px] font-medium text-[#67384c] tracking-tight">
              {title}
            </strong>
            <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#b5446d] bg-[#ffeef3] px-3 py-1 rounded-full">
              tap to reveal <Heart size={11} fill="currentColor" />
            </span>
          </div>

          {/* BACK FACE */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
            className={cn(
              'absolute inset-0 rounded-[22px] p-5 flex flex-col items-center justify-center text-center',
              'bg-gradient-to-br from-[#fff2f6] via-[#fff7fa] to-[#ffeef4]',
              'border border-[#e8b2c5] shadow-[0_12px_36px_rgba(181,68,109,0.12)]'
            )}
          >
            <span className="text-2xl mb-2">💌</span>
            <span className="text-[10px] font-bold tracking-widest text-[#a44b6a] uppercase">
              FOR MY MONA
            </span>
            <p className="font-sans text-[12px] leading-relaxed text-[#7c445c] mt-1.5 px-1 font-medium">
              {detail}
            </p>
            <span className="mt-2 text-[10px] text-[#b28a9a]">
              tap to flip back ♡
            </span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  )
}

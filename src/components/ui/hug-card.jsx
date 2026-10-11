import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { ShimmerButton } from './shimmer-button'
import { triggerRomanticConfetti } from './confetti'
import { cn } from '@/lib/utils'

export function HugCard({ hugSent, setHugSent, className }) {
  const handleHug = () => {
    const nextState = !hugSent
    setHugSent(nextState)
    if (nextState) {
      triggerRomanticConfetti()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      animate={hugSent ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      className={cn(
        'relative overflow-hidden text-center p-8 sm:p-12 rounded-[28px] border transition-all duration-500',
        hugSent
          ? 'bg-gradient-to-tr from-[#fff0f4] via-white to-[#ffeaf2] border-[#e9b0c4] shadow-[0_20px_60px_rgba(181,68,109,0.14)]'
          : 'bg-gradient-to-tr from-[#fff7f9] via-white to-[#fff2ec] border-[#f2dce4] shadow-[0_12px_40px_rgba(158,73,96,0.06)]',
        className
      )}
    >
      {/* Background Animated Ripples when hug is sent */}
      <AnimatePresence>
        {hugSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0.5, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: ring * 0.7,
                  ease: 'easeOut',
                }}
                className="absolute w-44 h-44 rounded-full border border-[#f6a8bd]/50"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background decorative watermark */}
      <div
        className="absolute top-4 right-8 text-[#e8b2c5]/35 text-7xl select-none pointer-events-none rotate-12"
        aria-hidden="true"
      >
        ♡
      </div>

      {/* Emoji Bobbing */}
      <motion.div
        animate={
          hugSent
            ? { scale: [1, 1.25, 1], rotate: [-4, 4, 0] }
            : { y: [0, -7, 0], rotate: [-2, 2, -2] }
        }
        transition={{
          duration: hugSent ? 0.6 : 3,
          repeat: hugSent ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="text-5xl sm:text-6xl mb-4 select-none drop-shadow-[0_10px_14px_rgba(181,68,109,0.16)]"
      >
        {hugSent ? '🥹💗' : '🧸'}
      </motion.div>

      <div className="flex items-center justify-center gap-2 text-[#a44b6a] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
        <span>A LITTLE HUG THROUGH THE SCREEN</span>
      </div>

      <h2 className="font-display text-2xl sm:text-4xl font-medium text-[#542b3b] tracking-tight mb-2">
        {hugSent ? (
          <>
            Hug delivered, <em>Mona!</em>
          </>
        ) : (
          <>
            Need a hug, <em>birthday girl?</em>
          </>
        )}
      </h2>

      <p className="text-[#987789] text-[13px] sm:text-[14px] leading-relaxed max-w-[500px] mx-auto mb-6">
        {hugSent
          ? 'Imagine the biggest, warmest hug from me. Keeping you close, even from far away.'
          : 'Press the button and imagine me giving you the warmest, tightest hug ever.'}
      </p>

      <div className="flex justify-center">
        <ShimmerButton
          onClick={handleHug}
          shimmerColor="#ffd6e0"
          className="shadow-[0_10px_24px_rgba(181,68,109,0.25)]"
        >
          <span>{hugSent ? 'One more hug?' : 'Send me a virtual hug'}</span>
          <Heart size={16} fill="currentColor" />
        </ShimmerButton>
      </div>

      {hugSent && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-[#c4547c] text-lg tracking-[0.3em] font-light flex items-center justify-center gap-2 select-none"
        >
          <span>♡</span>
          <span>♥</span>
          <span>♡</span>
          <span>♥</span>
          <span>♡</span>
        </motion.div>
      )}
    </motion.div>
  )
}

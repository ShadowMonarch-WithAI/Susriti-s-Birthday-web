import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LockKeyhole, Sparkles, Heart } from 'lucide-react'
import { ShimmerButton } from './shimmer-button'
import { triggerRomanticConfetti } from './confetti'
import { cn } from '@/lib/utils'

export function SecretVault({
  secretUnlocked,
  setSecretUnlocked,
  secretOpen,
  setSecretOpen,
  className,
}) {
  const handleUnlock = () => {
    setSecretUnlocked(true)
    setSecretOpen(true)
    triggerRomanticConfetti()
  }

  const handleToggle = () => {
    setSecretOpen(!secretOpen)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden text-center p-8 sm:p-12 rounded-[28px]',
        'bg-gradient-to-br from-[#fff0f4] via-[#fffaf5] to-[#fae8f0]',
        'border border-[#f5dbe4] shadow-[0_16px_50px_rgba(168,50,91,0.08)]',
        className
      )}
    >
      {/* Decorative ambient sparkles */}
      <div
        className="absolute left-6 top-8 text-[#e5a0b7]/40 text-4xl select-none pointer-events-none"
        aria-hidden="true"
      >
        ✧
      </div>
      <div
        className="absolute right-6 bottom-8 text-[#e5a0b7]/40 text-4xl select-none pointer-events-none"
        aria-hidden="true"
      >
        ✧
      </div>

      {/* Lock Icon */}
      <motion.div
        animate={secretUnlocked ? { rotate: [0, -10, 10, 0] } : {}}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-white border border-[#f0c8d6] rounded-full flex items-center justify-center text-[#a8325b] mx-auto mb-4 shadow-sm"
      >
        <LockKeyhole size={22} />
      </motion.div>

      <div className="text-[#a44b6a] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
        PSSST... ONE LAST THING
      </div>

      <h2 className="font-display text-2xl sm:text-4xl font-medium text-[#542b3b] tracking-tight mb-2">
        A tiny secret, <em>just for you.</em>
      </h2>

      <p className="text-[#987789] text-[13px] sm:text-[14px] leading-relaxed max-w-[480px] mx-auto mb-6">
        There is one more message tucked away in this little corner.
      </p>

      <div className="flex justify-center">
        {!secretUnlocked ? (
          <ShimmerButton
            onClick={handleUnlock}
            shimmerColor="#ffeef3"
            className="shadow-[0_10px_24px_rgba(181,68,109,0.25)]"
          >
            <span>Unlock your secret</span>
            <Sparkles size={16} />
          </ShimmerButton>
        ) : (
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex items-center gap-2 bg-[#b5446d] hover:bg-[#9f3159] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-[0_10px_24px_rgba(181,68,109,0.25)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d]"
          >
            <span>{secretOpen ? 'Hide my secret' : 'Read your secret'}</span>
            <Heart size={15} fill="currentColor" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {secretOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-[620px] mx-auto mt-6 bg-[#fffafc]/95 backdrop-blur-md border border-[#f5dce5] rounded-[22px] p-6 sm:p-8 shadow-[0_12px_36px_rgba(181,68,109,0.08)]"
          >
            <span className="block text-[#d77b9b] text-base mb-2 select-none">✧</span>
            <p className="font-display italic text-[#8c4b65] text-[16px] sm:text-[18px] leading-[1.85]">
              “You're my favourite notification, my safest place, my sweetest distraction, my favourite thought, one of my favourite reasons to smile, favourite memory to replay and my favourite future to imagine and the reason my heart has a favourite name: Mona.”
            </p>
            <p className="font-display italic text-[#b5446d] font-bold text-[17px] sm:text-[19px] mt-3">
              Love you, Love you soooooooooooooooooooo Muchhhhhhhhhhhhhhhhhhhhhhhhh❤️
            </p>
            <span className="block text-[#d77b9b] text-base mt-2 select-none">✧</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

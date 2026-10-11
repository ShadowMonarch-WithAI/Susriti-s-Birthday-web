import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { ShimmerButton } from './shimmer-button'
import { cn } from '@/lib/utils'

export function LetterCard({ letterOpen, setLetterOpen, className }) {
  return (
    <div
      id="letter"
      className={cn('relative w-full max-w-[760px] mx-auto', className)}
    >
      {/* Decorative ambient letters & flowers */}
      <div
        className="absolute -left-7 top-10 font-display text-5xl text-[#e4a6ba]/40 -rotate-12 pointer-events-none select-none hidden sm:block"
        aria-hidden="true"
      >
        ✿
      </div>
      <div
        className="absolute -right-7 bottom-12 font-display text-6xl text-[#e4a6ba]/35 rotate-12 pointer-events-none select-none hidden sm:block"
        aria-hidden="true"
      >
        ♡
      </div>

      <div className="relative text-center bg-white/95 backdrop-blur-sm border border-[#f5dfe6] rounded-[28px] p-6 sm:p-12 shadow-[0_24px_70px_rgba(169,77,104,0.09)]">
        {/* Top date bar */}
        <div className="flex items-center justify-between text-[#c27b95] text-[11px] font-bold tracking-[0.18em]">
          <span>12 · 10 · 2026</span>
          <Heart size={16} fill="currentColor" className="text-[#c45b7f]" />
        </div>

        {/* Envelope Icon */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 bg-[#fff0f4] border border-[#fce0e8] rounded-full flex items-center justify-center text-3xl mx-auto my-5 shadow-sm"
        >
          💌
        </motion.div>

        <div className="text-[#a44b6a] text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
          A NOTE FROM MY HEART
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#542b3b] tracking-tight mb-2">
          To my <em>Mona,</em>
        </h2>

        <p className="font-display italic text-[#9b7788] text-[14px] sm:text-[15px] max-w-[480px] mx-auto mb-4 leading-relaxed">
          Some things are easier to feel than to say. Today, I want to try.
        </p>

        <AnimatePresence initial={false}>
          {letterOpen ? (
            <motion.div
              key="letter-open"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="text-left text-[#754a5c] text-[14px] sm:text-[15.5px] leading-[2.15] pt-6 pb-6 border-t border-[#fbe5ed] mt-4 space-y-5">
                <p className="font-semibold text-[#b5446d] tracking-wide text-base">
                  Happy Birthday, my love! 🎂💋
                </p>

                <p>
                  I wish I could be beside you right now, holding your hands, looking into your eyes, and telling you how much you mean to me. But until I can do that, let these words carry all the love I wish I could give you in person. 🥹❤️
                </p>

                <p>
                  You have become such a beautiful part of my life, and I'm genuinely grateful that I have you. Your smile makes my day better, your happiness matters to me more than you know, and even the simplest moments with you mean so much to me.
                </p>

                <p>
                  I know I'm not perfect, and we may not have perfect days all the time. But I promise to keep trying, keep understanding you, and keep choosing you. I want to be there for your happiest moments, your difficult days, your silly moods, and all the little moments in between. 🫂💗
                </p>

                <p>
                  On your birthday, I wish you endless happiness, success, and all the beautiful things your heart desires. And a little selfishly, I hope I get to celebrate many more birthdays with you, creating memories that we'll smile about for years. 🧿❤️
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#fff0f4] via-[#fff8fb] to-[#fff0f4] border border-[#fcd5e2] text-[#9d174d] font-bold shadow-xs">
                  If I could give you one gift, it would be the chance to see yourself through my eyes. Maybe then you'd understand just how special you are to me.
                </div>

                <p>
                  Happy Birthday, my heart. Never forget that somewhere, there's a boy who's really happy you were born and even happier that you're a part of his life. 🥹💋
                </p>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#ffe8f0] via-[#fff5f9] to-[#ffe8f0] border-2 border-[#f8b4cb] text-[#9d174d] font-bold text-center text-base sm:text-lg shadow-sm">
                  I love you, Mona. Today, tomorrow, and in all the little tomorrows to come. ❤️
                </div>

                <div className="text-right pt-6 text-[#9e6a80]">
                  <p className="font-display italic text-xl sm:text-2xl text-[#b5446d] font-bold">
                    Forever your sona 💌🫶🏻
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-6 flex flex-col items-center gap-3"
            >
              <div className="w-48 sm:w-64 space-y-2.5 opacity-60">
                <div className="h-[2px] bg-[#f3dce4] rounded-full w-full" />
                <div className="h-[2px] bg-[#f3dce4] rounded-full w-4/5 mx-auto" />
                <div className="h-[2px] bg-[#f3dce4] rounded-full w-3/5 mx-auto" />
              </div>
              <p className="text-[12px] text-[#b18a9a] mt-2 font-medium">
                This little letter is waiting just for you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-5">
          <ShimmerButton
            onClick={() => setLetterOpen(!letterOpen)}
            shimmerColor="#ffd6e0"
            className="shadow-[0_10px_24px_rgba(181,68,109,0.22)]"
          >
            <span>{letterOpen ? 'Fold the letter' : 'Read your letter'}</span>
            {letterOpen ? <X size={15} /> : <Heart size={15} fill="currentColor" />}
          </ShimmerButton>
        </div>
      </div>
    </div>
  )
}

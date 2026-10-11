import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Mic, MicOff, RotateCcw, Sparkles, Volume2, VolumeX, Wind } from 'lucide-react'
import { CakeIllustration } from './CakeIllustration'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { useMicrophoneBlower } from '@/hooks/useMicrophoneBlower'
import {
  playBlowingSound,
  playMagicalChime,
  playCelebrationFanfare,
} from '@/lib/audio-effects'
import { triggerRomanticConfetti, triggerHeartBurst } from '@/components/ui/confetti'
import { cn } from '@/lib/utils'

export function BirthdayCakeExperience({ className }) {
  // States: 'lit' -> 'extinguishing' -> 'wish_made' -> 'surprise'
  const [stage, setStage] = useState('lit')
  const [sfxEnabled, setSfxEnabled] = useState(true)

  const handleCandlesBlown = () => {
    if (stage !== 'lit') return

    // 1. Extinguishing phase
    setStage('extinguishing')
    playBlowingSound(sfxEnabled)

    setTimeout(() => {
      setStage('wish_made')
      playMagicalChime(sfxEnabled)
      triggerHeartBurst(0.5, 0.4)

      // 2. Pause briefly, then trigger the dramatic surprise cake reveal!
      setTimeout(() => {
        setStage('surprise')
        playCelebrationFanfare(sfxEnabled)
        triggerRomanticConfetti()
      }, 2200)
    }, 600)
  }

  const {
    isListening,
    volumeLevel,
    permissionStatus,
    errorMessage,
    startListening,
    stopListening,
  } = useMicrophoneBlower({
    onBlowingDetected: handleCandlesBlown,
    threshold: 0.18,
    sustainDurationMs: 250,
  })

  const resetExperience = () => {
    stopListening()
    setStage('lit')
  }

  const toggleSound = () => {
    setSfxEnabled(!sfxEnabled)
  }

  const isLit = stage === 'lit'
  const isSurprise = stage === 'surprise'

  return (
    <section
      id="cake"
      className={cn(
        'relative overflow-hidden py-16 sm:py-24 border-t border-[#f7e7ec] transition-colors duration-1000',
        stage === 'extinguishing' || stage === 'wish_made'
          ? 'bg-gradient-to-b from-[#2b101c] via-[#3d1a29] to-[#260e19] text-white'
          : isSurprise
          ? 'bg-gradient-to-b from-[#fff0f6] via-[#fff8fb] to-[#fff3f8]'
          : 'bg-gradient-to-b from-[#fff9fa] via-white to-[#fff5f8]',
        className
      )}
    >
      {/* Sound effect toggle control */}
      <div className="absolute top-6 right-6 z-30">
        <button
          type="button"
          onClick={toggleSound}
          title={sfxEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={sfxEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          className="p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#f3d7e0] text-[#8e3b59] hover:text-[#b5446d] shadow-xs cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d]"
        >
          {sfxEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      <div className="w-[min(1120px,calc(100%-48px))] mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Kicker badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-3 border',
            stage === 'extinguishing' || stage === 'wish_made'
              ? 'bg-white/10 text-rose-200 border-white/20'
              : 'bg-[#ffedf2] text-[#a44b6a] border-[#fbe0e8]'
          )}
        >
          <Sparkles size={13} />
          <span>A SPECIAL BIRTHDAY CEREMONY</span>
          <Sparkles size={13} />
        </motion.div>

        {/* Dynamic Headings based on stage */}
        <AnimatePresence mode="wait">
          {stage === 'lit' && (
            <motion.div
              key="heading-lit"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-[620px]"
            >
              <h2 className="font-display text-3xl sm:text-5xl font-medium text-[#542b3b] tracking-tight mb-2.5">
                Make a Birthday Wish, <em>Mona! ♡</em>
              </h2>
              <p className="text-[#987789] text-xs sm:text-sm leading-relaxed">
                Close your eyes, think of something you wish for with all your heart,
                and blow out the glowing candles on your cake.
              </p>
            </motion.div>
          )}

          {(stage === 'extinguishing' || stage === 'wish_made') && (
            <motion.div
              key="heading-wish"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[620px]"
            >
              <h2 className="font-display italic text-3xl sm:text-5xl font-medium text-pink-200 tracking-tight mb-2.5">
                Your wish is on its way to the universe, <em>Mona ✨</em>
              </h2>
              <p className="text-pink-100/80 text-xs sm:text-sm leading-relaxed">
                Close your eyes and breathe it in... something magical is unfolding.
              </p>
            </motion.div>
          )}

          {stage === 'surprise' && (
            <motion.div
              key="heading-surprise"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="max-w-[660px]"
            >
              <h2 className="font-display text-3xl sm:text-5xl font-medium text-[#9d174d] tracking-tight mb-2.5">
                Happy Birthday, My Mona! 💗
              </h2>
              <p className="font-display italic text-lg sm:text-xl text-[#b5446d] font-medium leading-relaxed">
                May all your wishes come true. You deserve every beautiful thing in this world.
              </p>
              <p className="text-sm font-semibold text-[#86576c] mt-1">
                Love, Krish ♡
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === THE CAKE ILLUSTRATION === */}
        <div className="my-8 sm:my-10 relative">
          <CakeIllustration
            candlesLit={isLit}
            isSurprise={isSurprise}
          />

          {/* Flash overlay during transition */}
          <AnimatePresence>
            {stage === 'wish_made' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="pointer-events-none fixed inset-0 z-50 bg-radial from-pink-300 via-rose-200 to-transparent"
              />
            )}
          </AnimatePresence>
        </div>

        {/* === INTERACTIVE CONTROLS === */}
        <div className="flex flex-col items-center gap-4">
          {stage === 'lit' && (
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                {/* Option A: Microphone blow button */}
                <ShimmerButton
                  onClick={isListening ? stopListening : startListening}
                  shimmerColor="#ffd6e0"
                  className={cn(
                    'shadow-[0_10px_24px_rgba(181,68,109,0.25)]',
                    isListening && 'ring-2 ring-rose-400 bg-rose-700 animate-pulse'
                  )}
                >
                  {isListening ? (
                    <>
                      <MicOff size={16} />
                      <span>Listening... Blow now! 🎤</span>
                    </>
                  ) : (
                    <>
                      <Mic size={16} />
                      <span>Blow out your candles 🎤</span>
                    </>
                  )}
                </ShimmerButton>

                {/* Option B: Tap to blow button */}
                <button
                  type="button"
                  onClick={handleCandlesBlown}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#f3d7e0] bg-white hover:bg-[#fff0f4] text-[#8e3b59] hover:text-[#b5446d] hover:border-[#e9b0c4] text-xs font-bold shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d]"
                >
                  <Wind size={15} />
                  <span>Blow the candles out ✨</span>
                </button>
              </div>

              {/* Live Microphone Volume / Breath Meter */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-64 bg-white/90 backdrop-blur-sm border border-rose-200 rounded-full p-2 flex flex-col items-center gap-1 shadow-sm mt-1"
                >
                  <div className="w-full bg-rose-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-pink-400 to-rose-600 h-full rounded-full transition-[width] duration-75"
                      style={{ width: `${volumeLevel}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-rose-700 font-medium tracking-wide flex items-center gap-1">
                    <Wind size={11} className="animate-pulse" />
                    Blow softly into your microphone
                  </span>
                </motion.div>
              )}

              {/* Informative notice or error message */}
              {errorMessage && (
                <p className="text-rose-600 text-[11px] max-w-sm mt-1">
                  {errorMessage}
                </p>
              )}

              <p className="text-[#b18a9a] text-[10px] tracking-wide mt-1">
                Tip: Microphone detection requires HTTPS/localhost and stays completely private on your device.
              </p>
            </div>
          )}

          {/* Reset / Celebrate again */}
          {stage === 'surprise' && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-3 mt-2"
            >
              <ShimmerButton
                onClick={resetExperience}
                shimmerColor="#fed7aa"
                className="shadow-[0_12px_28px_rgba(219,39,119,0.3)] bg-gradient-to-r from-[#db2777] to-[#be185d]"
              >
                <RotateCcw size={15} />
                <span>Celebrate Again 🎉</span>
              </ShimmerButton>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

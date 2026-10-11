import React from 'react'
import { motion } from 'framer-motion'
import { Candle } from './Candle'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CakeIllustration({
  candlesLit = true,
  isSurprise = false,
  className,
}) {
  const candles = [
    { id: 1, height: 46, color: 'from-rose-300 via-pink-200 to-rose-400', flickerDelay: 0.1, swayDuration: 1.3 },
    { id: 2, height: 54, color: 'from-amber-200 via-rose-200 to-pink-300', flickerDelay: 0.35, swayDuration: 1.6 },
    { id: 3, height: 48, color: 'from-purple-200 via-pink-200 to-rose-300', flickerDelay: 0.2, swayDuration: 1.4 },
  ]

  return (
    <div className={cn('relative flex flex-col items-center select-none', className)}>
      {/* Ambient background glow behind the cake */}
      <motion.div
        animate={{
          scale: isSurprise ? [1, 1.15, 1.05] : [1, 1.08, 1],
          opacity: isSurprise ? [0.75, 0.95, 0.8] : candlesLit ? [0.45, 0.65, 0.5] : [0.2, 0.25, 0.2],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'absolute -top-12 w-[340px] sm:w-[460px] h-[340px] rounded-full blur-[55px] pointer-events-none transition-colors duration-1000 -z-10',
          isSurprise
            ? 'bg-gradient-to-tr from-[#fbcfe8] via-[#fed7aa] to-[#f472b6]'
            : candlesLit
            ? 'bg-gradient-to-tr from-[#fbcfe8] via-[#fed7e2] to-[#f9a8d4]'
            : 'bg-gradient-to-tr from-[#e9d5ff] via-[#fbcfe8] to-[#fce7f3]'
        )}
      />

      {/* Floating Fairy Lights & Sparkle Specks */}
      <div className="absolute inset-0 pointer-events-none overflow-visible -z-5" aria-hidden="true">
        {[
          { top: '15%', left: '8%', delay: 0.2 },
          { top: '28%', right: '10%', delay: 0.8 },
          { top: '48%', left: '5%', delay: 1.4 },
          { top: '65%', right: '7%', delay: 0.5 },
          { top: '8%', right: '22%', delay: 1.1 },
        ].map((light, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
              y: [-3, 3, -3],
            }}
            transition={{
              duration: 2.4 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: light.delay,
              ease: 'easeInOut',
            }}
            style={{ top: light.top, left: light.left, right: light.right }}
            className="absolute w-2 h-2 rounded-full bg-amber-200/90 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
          />
        ))}
      </div>

      {/* 1. CANDLES ON TOP OF TIER 1 */}
      <div className="relative z-20 flex items-end justify-center gap-6 sm:gap-7 mb-[-12px]">
        {candles.map((candle) => (
          <Candle
            key={candle.id}
            isLit={candlesLit}
            height={candle.height}
            color={candle.color}
            flickerDelay={candle.flickerDelay}
            swayDuration={candle.swayDuration}
          />
        ))}
      </div>

      {/* 2. THE THREE-TIER CAKE */}
      <motion.div
        animate={isSurprise ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex flex-col items-center"
      >
        {/* === TIER 1 (TOP) === */}
        <div className="relative w-36 sm:w-44 z-15">
          {/* Top frosting surface with strawberries */}
          <div className="h-6 rounded-t-[22px] bg-gradient-to-r from-[#ffe5ed] via-[#fff5f8] to-[#ffdce7] border border-[#fbcfe8] shadow-inner relative overflow-hidden flex items-center justify-center">
            {/* Strawberry toppings */}
            <div className="absolute -top-1.5 flex gap-3 z-20">
              <span className="text-sm filter drop-shadow-[0_2px_4px_rgba(181,68,109,0.25)]">🍓</span>
              <span className="text-sm filter drop-shadow-[0_2px_4px_rgba(181,68,109,0.25)]">🍓</span>
            </div>
            {/* Shimmer line */}
            <div className="absolute inset-x-3 top-1 h-[2px] bg-white/70 rounded-full" />
          </div>

          {/* Tier 1 body */}
          <div className="h-16 sm:h-18 bg-gradient-to-b from-[#f9a8d4] via-[#f472b6] to-[#ec4899] rounded-b-[14px] shadow-[0_8px_18px_rgba(190,24,93,0.18)] relative overflow-hidden border-x border-[#f472b6]">
            {/* Creamy dripping frosting icing */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-between z-10 px-1 pointer-events-none">
              {[12, 16, 10, 18, 14, 11, 15].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-3.5 bg-gradient-to-b from-[#fff5f8] to-[#ffe4ec] rounded-b-full shadow-xs -mt-0.5 border-b border-[#fbcfe8]"
                />
              ))}
            </div>

            {/* Pearled trim at middle */}
            <div className="absolute inset-x-2 top-8 flex justify-around opacity-75">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <div key={p} className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
              ))}
            </div>

            {/* Soft vertical shading */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
          </div>
        </div>

        {/* === TIER 2 (MIDDLE) === */}
        <div className="relative w-52 sm:w-64 -mt-3 z-10">
          {/* Tier 2 rim / top edge */}
          <div className="h-7 rounded-t-[26px] bg-gradient-to-r from-[#fed7e2] via-[#fff5f8] to-[#fbcfe8] border border-[#fbcfe8] shadow-inner relative flex items-center justify-between px-3">
            <span className="text-xs">🍓</span>
            <span className="text-xs">🌸</span>
            <span className="text-xs">🍓</span>
          </div>

          {/* Tier 2 body */}
          <div className="h-20 sm:h-22 bg-gradient-to-b from-[#f472b6] via-[#ec4899] to-[#db2777] rounded-b-[18px] shadow-[0_10px_22px_rgba(190,24,93,0.22)] relative overflow-hidden border-x border-[#ec4899]">
            {/* Dripping frosting */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-between z-10 px-1 pointer-events-none">
              {[14, 22, 16, 25, 18, 24, 15, 20, 14].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-4.5 bg-gradient-to-b from-[#fff7f9] to-[#ffe5ee] rounded-b-full shadow-xs -mt-0.5 border-b border-[#fbcfe8]"
                />
              ))}
            </div>

            {/* Decorative gold/cream rosettes and pearls */}
            <div className="absolute inset-x-4 bottom-3 flex justify-between items-center text-rose-100 text-xs opacity-85">
              <span>✿</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              <span>✿</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              <span>✿</span>
            </div>

            {/* Side 3D shading */}
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/12 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/12 to-transparent" />
          </div>
        </div>

        {/* === TIER 3 (BOTTOM BASE) === */}
        <div className="relative w-68 sm:w-84 -mt-3 z-5">
          {/* Tier 3 rim */}
          <div className="h-8 rounded-t-[30px] bg-gradient-to-r from-[#ffe4ec] via-[#fff5f8] to-[#fed7e2] border border-[#fbcfe8] shadow-inner relative flex items-center justify-around px-4">
            <span className="text-xs">🍓</span>
            <span className="text-xs">🌷</span>
            <span className="text-xs">🍓</span>
            <span className="text-xs">🌷</span>
            <span className="text-xs">🍓</span>
          </div>

          {/* Tier 3 body */}
          <div className="h-24 sm:h-28 bg-gradient-to-b from-[#ec4899] via-[#db2777] to-[#be185d] rounded-b-[22px] shadow-[0_14px_28px_rgba(157,23,77,0.28)] relative overflow-hidden border-x border-[#db2777]">
            {/* Dripping frosting layer */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-between z-10 px-1 pointer-events-none">
              {[18, 26, 20, 28, 19, 29, 21, 27, 18, 24, 19].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className="w-5 bg-gradient-to-b from-[#fff8fa] to-[#ffe5ee] rounded-b-full shadow-xs -mt-0.5 border-b border-[#fbcfe8]"
                />
              ))}
            </div>

            {/* Piped cream scallop border at bottom */}
            <div className="absolute inset-x-2 bottom-1 flex justify-around">
              {Array.from({ length: 14 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-4 h-3 bg-gradient-to-b from-[#fff0f5] to-[#fce7f3] rounded-t-full shadow-xs border-t border-white/60"
                />
              ))}
            </div>

            {/* 3D curvature shading */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/15 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/15 to-transparent" />
          </div>
        </div>

        {/* 3. SURPRISE MODE BANNER RIBBON */}
        {isSurprise && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="absolute top-[48%] z-30 w-[min(340px,94%)] -rotate-2"
          >
            <div className="relative py-2.5 px-6 rounded-full bg-gradient-to-r from-[#ffe4ec] via-[#fff9fb] to-[#ffe4ec] border-2 border-[#f472b6] shadow-[0_10px_30px_rgba(219,39,119,0.35)] text-center flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-[#db2777] animate-spin-around" />
              <span className="font-display italic text-[#9d174d] text-lg sm:text-xl font-bold tracking-tight">
                Happy Birthday, Susriti!
              </span>
              <Sparkles size={16} className="text-[#db2777] animate-spin-around" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 4. LUXURY PEDESTAL CAKE STAND */}
      <div className="relative w-80 sm:w-96 flex flex-col items-center -mt-2 z-2">
        {/* Cake platter plate */}
        <div className="w-full h-5 rounded-[28px] bg-gradient-to-b from-white via-[#fdf2f8] to-[#fce7f3] border border-[#fbcfe8] shadow-[0_12px_30px_rgba(190,24,93,0.18)] relative flex items-center justify-center">
          <div className="w-[96%] h-1 bg-gradient-to-r from-transparent via-[#f472b6]/35 to-transparent rounded-full" />
        </div>
        {/* Pedestal stem */}
        <div className="w-14 sm:w-18 h-7 bg-gradient-to-b from-[#fce7f3] via-white to-[#fbcfe8] border-x border-[#fbcfe8] shadow-inner" />
        {/* Pedestal base */}
        <div className="w-48 sm:w-56 h-4 rounded-t-full bg-gradient-to-b from-[#fdf2f8] via-white to-[#fbcfe8] border border-[#fbcfe8] shadow-md" />
      </div>

      {/* 5. DECORATED TABLE WITH PETALS & LIGHTS */}
      <div className="relative w-full max-w-[560px] h-10 mt-1 flex items-center justify-center">
        {/* Table surface reflection */}
        <div className="w-[90%] h-3 rounded-full bg-gradient-to-r from-transparent via-[#fbcfe8]/45 to-transparent blur-[3px]" />

        {/* Scattered rose petals */}
        <div className="absolute inset-x-8 bottom-0 flex justify-between text-base select-none opacity-85">
          <span className="transform -rotate-12">🌸</span>
          <span className="transform rotate-45 text-xs">🌷</span>
          <span className="transform -rotate-45 text-sm">🌸</span>
          <span className="transform rotate-12">🌷</span>
          <span className="transform -rotate-18 text-xs">🌸</span>
        </div>
      </div>
    </div>
  )
}

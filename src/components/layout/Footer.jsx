import React from 'react'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[#f7e7ec] py-10 px-6 text-center relative z-10 bg-gradient-to-b from-transparent to-[#fff5f8]/50">
      <div className="flex justify-center text-[#c4547c] mb-3">
        <Heart size={20} fill="currentColor" className="animate-pulse" />
      </div>
      <p className="font-display italic text-[#86576c] text-[17px] sm:text-[18px] mb-1.5 font-medium">
        Made for Susriti, with a whole lot of love.
      </p>
      <span className="text-[10px] tracking-[0.16em] uppercase text-[#c09baa] font-semibold">
        12 October 2026 · and every day after ♡
      </span>
    </footer>
  )
}

import React, { useEffect, useState } from 'react'
import { Heart, Music2, Pause } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header({ musicOn, toggleMusic }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'bg-[#fff9fa]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(168,50,91,0.04)] border-b border-[#f3d7e0]/60'
          : 'bg-transparent'
      )}
    >
      <div className="w-[min(1240px,calc(100%-48px))] mx-auto h-20 flex items-center justify-between">
        <a
          href="#home"
          aria-label="For Susriti - Home"
          className="group inline-flex items-center gap-2.5 font-bold tracking-tight text-[15px] text-[#542b3b] hover:text-[#b5446d] transition-colors"
        >
          <span className="w-9 h-9 rounded-full bg-[#ffe6ed] border border-[#fbd4df] text-[#a8325b] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
            <Heart size={16} fill="currentColor" />
          </span>
          <span className="font-medium tracking-tight">for my Mona</span>
        </a>

        <button
          onClick={toggleMusic}
          type="button"
          aria-label={musicOn ? 'Pause background music' : 'Play background music'}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f3d7e0] bg-white/80 backdrop-blur-sm text-[#8e3b59] hover:bg-white hover:text-[#b5446d] hover:border-[#e9b0c4] text-xs font-bold shadow-xs hover:shadow-sm transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d]"
        >
          {musicOn ? (
            <Pause size={15} className="animate-pulse" />
          ) : (
            <Music2 size={15} />
          )}
          <span>{musicOn ? 'Pause our song' : 'Play our song'}</span>
        </button>
      </div>
    </header>
  )
}

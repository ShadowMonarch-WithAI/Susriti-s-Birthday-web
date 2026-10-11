import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MemoryDialog({ isOpen, onClose, memory }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent background scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && memory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={memory.title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#542b3b]/65 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] bg-[#fff9fa] rounded-[28px] overflow-hidden border border-white/60 shadow-[0_30px_100px_rgba(33,9,20,0.35)] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close memory modal"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#8c4b65] hover:text-[#542b3b] hover:bg-white flex items-center justify-center shadow-sm cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d]"
            >
              <X size={18} />
            </button>

            {/* Art / Banner */}
            <div
              className={cn(
                'min-h-[220px] flex items-center justify-center bg-gradient-to-br',
                memory.tone
              )}
            >
              <span className="text-8xl select-none filter drop-shadow-[0_12px_20px_rgba(168,50,91,0.22)]">
                {memory.emoji}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-7">
              <span className="text-[#a44b6a] text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">
                MEMORY {memory.number}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#542b3b] tracking-tight mb-2">
                {memory.title}
              </h2>
              <p className="text-[#987789] text-[13px] sm:text-[14px] leading-relaxed">
                {memory.caption}
              </p>
              <div className="flex items-center gap-2 text-[#b5446d] text-[11px] font-semibold mt-5 pt-4 border-t border-[#fce4ec]">
                <Heart size={14} fill="currentColor" />
                <span>saved in my heart forever</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

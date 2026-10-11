import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TiltCard({ memory, index, onOpen, className }) {
  const [imageFailed, setImageFailed] = useState(false)
  const cardRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['9deg', '-9deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-9deg', '9deg'])
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.15, 0, 0.15])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={cn('group relative perspective-1000', className)}
    >
      <button
        type="button"
        onClick={() => onOpen(memory)}
        aria-label={`Open memory: ${memory.title}`}
        className="w-full text-left bg-white/95 rounded-[22px] p-3.5 border border-[#f3d7e0]/80 shadow-[0_12px_36px_rgba(168,50,91,0.06)] hover:shadow-[0_20px_45px_rgba(168,50,91,0.14)] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5446d] focus-visible:ring-offset-2 block cursor-pointer"
      >
        {/* Photo Container */}
        <div
          className={cn(
            'relative aspect-[4/4.2] rounded-[16px] overflow-hidden border-4 border-white shadow-inner bg-gradient-to-br',
            memory.tone
          )}
        >
          {!imageFailed && (
            <img
              src={memory.image}
              alt={memory.title}
              onError={() => setImageFailed(true)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {imageFailed && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-[#b75e7d]">
              <span className="text-6xl drop-shadow-[0_6px_10px_rgba(181,68,109,0.18)] transition-transform duration-300 group-hover:scale-110">
                {memory.emoji}
              </span>
              <span className="bg-white/85 backdrop-blur-sm border border-white px-3 py-1 rounded-full text-[10px] font-medium tracking-wide">
                Add your photo here
              </span>
            </div>
          )}

          {/* Number badge */}
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#a44b6a] text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            {memory.number}
          </span>

          {/* Hover cue */}
          <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#9e4666] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200">
            <Camera size={13} /> View
          </span>

          {/* Dynamic Glare Reflection */}
          <motion.div
            style={{ opacity: glareOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent"
          />
        </div>

        {/* Copy */}
        <div className="pt-3.5 pb-1 px-1.5">
          <h3 className="font-display text-[20px] font-medium text-[#67384c] tracking-tight group-hover:text-[#b5446d] transition-colors">
            {memory.title}
          </h3>
          <p className="text-[12px] leading-relaxed text-[#987789] mt-1 line-clamp-2">
            {memory.caption}
          </p>
        </div>
      </button>
    </motion.div>
  )
}

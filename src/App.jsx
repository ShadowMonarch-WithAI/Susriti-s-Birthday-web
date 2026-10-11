import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, Cake, Camera, Heart, Sparkles
} from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { CountdownDisplay } from '@/components/ui/countdown-display'
import { TiltCard } from '@/components/ui/tilt-card'
import { FlipCard } from '@/components/ui/flip-card'
import { HugCard } from '@/components/ui/hug-card'
import { LetterCard } from '@/components/ui/letter-card'
import { SecretVault } from '@/components/ui/secret-vault'
import { MemoryDialog } from '@/components/ui/dialog'
import { triggerRomanticConfetti, triggerHeartBurst } from '@/components/ui/confetti'
import { BirthdayCakeExperience } from '@/components/cake/BirthdayCakeExperience'

const birthday = new Date('2026-10-12T00:00:00')

const memories = [
  {
    number: '01',
    title: 'Your smile',
    caption: 'The kind of little moment that makes an ordinary day feel golden.',
    image: '/photos/memory-1.jpg',
    tone: 'from-rose-200 via-pink-100 to-orange-100',
    emoji: '🌷',
  },
  {
    number: '02',
    title: 'Our tiny world',
    caption: 'A thousand things to do, and somehow my favourite is just being with you.',
    image: '/photos/memory-2.jpg',
    tone: 'from-fuchsia-100 via-rose-100 to-amber-100',
    emoji: '🫶',
  },
  {
    number: '03',
    title: 'A favourite feeling',
    caption: 'Not every memory needs a camera. Some are kept right here, in my heart.',
    image: '/photos/memory-3.jpg',
    tone: 'from-orange-100 via-pink-100 to-purple-100',
    emoji: '💗',
  },
]

const reasons = [
  { icon: '🌷', title: 'Your kind heart', detail: 'You make softness feel like a superpower.' },
  { icon: '☀️', title: 'Your smile', detail: 'Somehow, even a hard day feels lighter.' },
  { icon: '🫶', title: 'The little things', detail: 'Your tiny habits are some of my favourite things.' },
  { icon: '🌙', title: 'Your presence', detail: 'With you, even silence feels comfortable.' },
  { icon: '✨', title: 'Your dreams', detail: 'I love watching you grow into everything you want to be.' },
  { icon: '💗', title: 'Simply you', detail: 'No big reason needed. I just love you being you.' },
]

function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 8) % 100}%`,
    delay: `${(i % 7) * -1.8}s`,
    duration: `${12 + (i % 6) * 2}s`,
    size: 10 + (i % 4) * 5,
  })), [])

  return (
    <div className="floating-hearts pointer-events-none" aria-hidden="true">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="float-heart text-[#eab6c8]/35"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            width: heart.size,
            height: heart.size,
          }}
          fill="currentColor"
          strokeWidth={1}
        />
      ))}
    </div>
  )
}

function App() {
  const [musicOn, setMusicOn] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [introOpen, setIntroOpen] = useState(true)
  const [countdownPage, setCountdownPage] = useState(true)
  const [countdownNumber, setCountdownNumber] = useState(12)
  const [hugSent, setHugSent] = useState(false)
  const [flippedReasons, setFlippedReasons] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef(null)

  // Cinematic 12-second countdown intro
  useEffect(() => {
    if (!countdownPage) return
    const timer = window.setInterval(() => {
      setCountdownNumber((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          window.setTimeout(() => setCountdownPage(false), 650)
          return 1
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [countdownPage])

  // Scroll reading progress
  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const skipCountdown = () => {
    setCountdownPage(false)
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) {
      audio.pause()
      setMusicOn(false)
      return
    }
    try {
      await audio.play()
      setMusicOn(true)
    } catch {
      alert('Add your music file at public/music.mp3, then tap play again.')
    }
  }

  const openSurprise = () => {
    triggerRomanticConfetti()
    const cakeEl = document.getElementById('cake')
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleReasonToggle = (index) => {
    setFlippedReasons((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    )
  }

  return (
    <main className="site-shell relative min-h-screen bg-[#fff9fa] overflow-x-hidden selection:bg-[#f6a8bd]/30 selection:text-[#542b3b]">
      {/* Scroll Reading Progress Bar */}
      <div
        className="reading-progress fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#f0a1bd] via-[#b5446d] to-[#e9bdcf] shadow-[0_0_12px_rgba(216,121,155,0.55)] z-50 transition-[width] duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <FloatingHearts />
      <div className="ambient-glow glow-pink" aria-hidden="true" />
      <div className="ambient-glow glow-peach" aria-hidden="true" />

      {/* 1. Cinematic 12-to-1 Opening Countdown */}
      <AnimatePresence>
        {countdownPage && (
          <motion.div
            className="countdown-intro-screen fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(circle_at_50%_44%,#fffdfd_0%,#fff0f5_40%,#f5d4e2_100%)] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
            transition={{ duration: 0.65 }}
            aria-live="polite"
          >
            <div className="countdown-intro-orbit countdown-intro-orbit-one pointer-events-none" />
            <div className="countdown-intro-orbit countdown-intro-orbit-two pointer-events-none" />

            <motion.div
              key={countdownNumber}
              className="countdown-big-number font-display text-[clamp(8rem,26vw,14rem)] leading-none text-[#b5446d] font-medium tracking-tighter drop-shadow-[0_12px_35px_rgba(181,68,109,0.25)] select-none"
              initial={{ opacity: 0, scale: 0.55, y: 18, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.35, y: -18 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {countdownNumber}
            </motion.div>

            <div className="countdown-intro-hearts mt-4 text-[#d77b9b] text-2xl tracking-widest animate-heart-beat select-none" aria-hidden="true">
              ♡　✧　♡
            </div>

            <p className="font-display text-[clamp(1.35rem,4vw,2.1rem)] text-[#542b3b] font-medium mt-3 mb-1">
              A surprise is almost here, Mona
            </p>

            <p className="text-[#987789] text-xs sm:text-sm tracking-wide">
              12 little seconds before your birthday universe opens
            </p>

            <div className="countdown-progress-track w-[min(260px,65vw)] h-1 bg-[#eac8d5] rounded-full overflow-hidden mt-6">
              <motion.div
                className="countdown-progress-fill h-full bg-gradient-to-r from-[#f0a1bd] to-[#b5446d]"
                initial={{ width: '0%' }}
                animate={{ width: `${((13 - countdownNumber) / 12) * 100}%` }}
                transition={{ duration: 0.75 }}
              />
            </div>

            {/* Skippable trigger */}
            <button
              onClick={skipCountdown}
              type="button"
              className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#b28a9a] hover:text-[#b5446d] transition-colors py-1.5 px-3 rounded-full hover:bg-white/40 cursor-pointer"
            >
              tap to open now &rarr;
            </button>

            <span className="mt-2 text-[#b28a9a]/70 text-[9px] tracking-[0.16em] uppercase">
              made with love by Krish ♡
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Envelope Intro Splash */}
      <AnimatePresence>
        {introOpen && (
          <motion.div
            className="intro-screen fixed inset-0 z-45 flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(circle_at_50%_42%,#fffdfb_0%,#fff0f5_43%,#f8dce7_100%)] overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="intro-spark intro-spark-one"
              animate={{ rotate: 360, scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              ✧
            </motion.div>
            <motion.div
              className="intro-spark intro-spark-two"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.div>

            <motion.div
              className="intro-envelope"
              initial={{ y: 24, rotate: -5 }}
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="intro-envelope-heart">♡</span>
              <span className="intro-envelope-flap" />
            </motion.div>

            <p className="intro-eyebrow text-[#a44b6a] uppercase tracking-[0.22em] text-[10px] font-bold mb-1.5">
              A little surprise for
            </p>

            <h2 className="intro-title font-display text-[clamp(3.4rem,10vw,5.4rem)] text-[#542b3b] font-medium tracking-tight mb-2">
              Mona <span>♡</span>
            </h2>

            <p className="intro-copy text-[#987789] text-[13px] leading-relaxed max-w-[320px] mb-6">
              Made of memories, little wishes, and a whole lot of love.
            </p>

            <ShimmerButton
              onClick={() => {
                setIntroOpen(false)
                triggerRomanticConfetti()
              }}
              shimmerColor="#ffd6e0"
              className="shadow-[0_12px_30px_rgba(181,68,109,0.28)]"
            >
              <span>Open your birthday surprise</span>
              <Heart size={16} fill="currentColor" />
            </ShimmerButton>

            <span className="intro-bottom-note text-[#b28a9a] text-[9px] tracking-[0.16em] uppercase mt-6 select-none animate-pulse">
              tap to open your little universe
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Header Navigation */}
      <Header musicOn={musicOn} toggleMusic={toggleMusic} />

      {/* 3. Hero Section with Aurora Ambient Glow */}
      <AuroraBackground className="overflow-hidden">
        <section id="home" className="hero section-wrap py-10 sm:py-16">
          <div className="hero-copy">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Sparkles size={14} /> A little universe made for you
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              Happy Birthday,
              <span className="hero-name">
                Susriti<span className="name-heart">♡</span>
              </span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              To my Mona, my favourite hello, my safest place, and the person who makes
              the little things in life feel magical.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ShimmerButton
                onClick={openSurprise}
                shimmerColor="#ffd6e0"
                className="shadow-[0_12px_28px_rgba(181,68,109,0.3)]"
              >
                <span>Open your surprise</span>
                <Heart size={16} fill="currentColor" />
              </ShimmerButton>

              <a href="#memories" className="text-link group inline-flex items-center gap-1.5 font-bold text-xs text-[#8d5a6d] hover:text-[#b5446d] transition-colors">
                <span>Our little memories</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            <div className="hero-footnote mt-8 text-[#b28a9a] text-[11px] tracking-wide">
              <span className="tiny-heart text-[#d87b9b] mr-1.5">♥</span> made with all my love, just for you
            </div>
          </div>

          {/* Hero Art with Floating Orbits and Pulsing Emblem */}
          <motion.div
            className="hero-art relative flex items-center justify-center min-h-[420px] sm:min-h-[490px]"
            initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="sun-glow" />

            <div className="hero-flower flower-one select-none" aria-hidden="true">✿</div>
            <div className="hero-flower flower-two select-none" aria-hidden="true">✿</div>
            <div className="hero-flower flower-three select-none" aria-hidden="true">✿</div>

            <motion.div
              className="hero-heart cursor-pointer"
              onClick={() => triggerHeartBurst(0.7, 0.4)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Click for a burst of love!"
            >
              <Heart size={94} strokeWidth={1.1} fill="currentColor" />
            </motion.div>

            <div className="art-sticker sticker-top shadow-[0_8px_24px_rgba(110,43,66,0.08)] select-none">
              <Sparkles size={14} /> you are magic
            </div>
            <div className="art-sticker sticker-bottom shadow-[0_8px_24px_rgba(110,43,66,0.08)] select-none">
              ♡ always & forever ♡
            </div>

            <div className="tiny-star star-one select-none" aria-hidden="true">✦</div>
            <div className="tiny-star star-two select-none" aria-hidden="true">✧</div>
          </motion.div>

          <a className="scroll-cue" href="#cake">
            <span /> make a wish
          </a>
        </section>
      </AuroraBackground>

      {/* 4. Cinematic Birthday Cake & Candle Experience */}
      <BirthdayCakeExperience />

      {/* 5. Live Countdown Section */}
      <section id="countdown" className="countdown-section section-wrap py-16 sm:py-24 text-center">
        <div className="section-kicker">
          <span /> THE DAY IS ALL YOURS <span />
        </div>
        <h2 className="section-title font-display text-3xl sm:text-5xl font-medium text-[#542b3b] my-3">
          A little countdown to <em>your day</em>
        </h2>
        <p className="section-subtitle text-[#987789] text-xs sm:text-sm max-w-[560px] mx-auto">
          October 12, 2026 · A day the world got a little brighter.
        </p>

        <CountdownDisplay targetDate={birthday} />

        <div className="countdown-note inline-flex items-center justify-center gap-2 text-[#b1778d] text-[11px] sm:text-xs">
          <Cake size={16} /> One more reason to celebrate the wonderful person you are.
        </div>
      </section>

      {/* 5. Scrapbook Memories with 3D Tilt Cards */}
      <section id="memories" className="memories-section section-wrap py-16 sm:py-24 border-t border-[#f7e7ec]">
        <div className="section-heading-row flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="section-kicker left-kicker text-[#a44b6a] text-[10px] font-bold tracking-[0.18em] uppercase">
              OUR LITTLE SCRAPBOOK
            </div>
            <h2 className="section-title font-display text-3xl sm:text-4xl font-medium text-[#542b3b] mt-2 mb-0">
              Tiny moments, <em>big feelings.</em>
            </h2>
          </div>
          <div className="scribble-heart text-5xl sm:text-6xl text-[#d87b9b] -rotate-12 select-none" aria-hidden="true">
            ♡
          </div>
        </div>

        <p className="section-subtitle left-subtitle text-[#987789] text-xs sm:text-sm max-w-[520px] mt-3">
          A few little spaces for the moments I never want to forget. Tap a card to read it.
        </p>

        <div className="memory-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 mt-8">
          {memories.map((memory, index) => (
            <TiltCard
              key={memory.number}
              memory={memory}
              index={index}
              onOpen={setSelectedMemory}
            />
          ))}
        </div>

        <p className="photo-tip text-center mt-8 text-[11px] text-[#b18a9a] flex items-center justify-center gap-2">
          <Camera size={14} /> Add your own photos in <code className="bg-[#ffedf2] text-[#a44b6a] px-1.5 py-0.5 rounded font-mono text-[10px]">public/photos/</code> to make these memories yours.
        </p>
      </section>

      {/* 6. Six Little Reasons with 3D Flip Cards */}
      <section className="reasons-section section-wrap py-16 sm:py-20 border-t border-[#f7e7ec] text-center">
        <div className="section-kicker justify-center">
          <span /> SIX LITTLE REASONS <span />
        </div>
        <h2 className="section-title font-display text-3xl sm:text-4xl font-medium text-[#542b3b] my-3">
          Things I adore <em>about you.</em>
        </h2>
        <p className="section-subtitle text-[#987789] text-xs sm:text-sm max-w-[560px] mx-auto mb-8">
          Tap each little card, Mona. There is a tiny note waiting underneath.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-[960px] mx-auto">
          {reasons.map((reason, index) => (
            <FlipCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              detail={reason.detail}
              index={index}
              isFlipped={flippedReasons.includes(index)}
              onToggle={() => handleReasonToggle(index)}
            />
          ))}
        </div>
      </section>

      {/* 7. Virtual Hug Section */}
      <section className="hug-section section-wrap py-10 sm:py-16">
        <div className="max-w-[760px] mx-auto">
          <HugCard hugSent={hugSent} setHugSent={setHugSent} />
        </div>
      </section>

      {/* 8. Heartfelt Love Letter */}
      <section className="letter-section section-wrap py-10 sm:py-16">
        <LetterCard letterOpen={letterOpen} setLetterOpen={setLetterOpen} />
      </section>

      {/* 9. Secret Vault Section */}
      <section className="secret-section section-wrap py-10 sm:py-16">
        <div className="max-w-[760px] mx-auto">
          <SecretVault
            secretUnlocked={secretUnlocked}
            setSecretUnlocked={setSecretUnlocked}
            secretOpen={secretOpen}
            setSecretOpen={setSecretOpen}
          />
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />

      {/* Memory Details Modal Dialog */}
      <MemoryDialog
        isOpen={Boolean(selectedMemory)}
        onClose={() => setSelectedMemory(null)}
        memory={selectedMemory}
      />
    </main>
  )
}

export default App

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, Cake, Camera, Check, Heart, LockKeyhole, Music2,
  Pause, Play, Sparkles, Volume2, VolumeX, X
} from 'lucide-react'

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

function getCountdown() {
  const now = new Date()
  const diff = birthday.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  }
}

function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 8) % 100}%`,
    delay: `${(i % 7) * -1.8}s`,
    duration: `${12 + (i % 6) * 2}s`,
    size: 10 + (i % 4) * 5,
  })), [])
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="float-heart"
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

function Countdown() {
  const [time, setTime] = useState(getCountdown)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const units = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Minutes', time.minutes],
    ['Seconds', time.seconds],
  ]
  return (
    <div className="countdown-grid">
      {units.map(([label, value]) => (
        <div className="countdown-tile" key={label}>
          <span className="countdown-number">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function PhotoCard({ memory, index, onOpen }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <motion.button
      type="button"
      className="memory-card text-left"
      onClick={() => onOpen(memory)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      whileHover={{ y: -7, rotate: index === 1 ? 1 : -1 }}
      aria-label={`Open memory: ${memory.title}`}
    >
      <div className={`memory-photo bg-gradient-to-br ${memory.tone}`}>
        {!imageFailed && (
          <img
            src={memory.image}
            alt={memory.title}
            onError={() => setImageFailed(true)}
            loading="lazy"
          />
        )}
        {imageFailed && (
          <div className="photo-placeholder">
            <span className="placeholder-emoji">{memory.emoji}</span>
            <span className="placeholder-note">Add your photo here</span>
          </div>
        )}
        <span className="photo-number">{memory.number}</span>
        <span className="photo-open"><Camera size={16} /> View memory</span>
      </div>
      <div className="memory-copy">
        <h3>{memory.title}</h3>
        <p>{memory.caption}</p>
      </div>
    </motion.button>
  )
}

function App() {
  const [musicOn, setMusicOn] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [secretUnlocked, setSecretUnlocked] = useState(false)
  const [secretOpen, setSecretOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [introOpen, setIntroOpen] = useState(true)
  const [hugSent, setHugSent] = useState(false)
  const [flippedReasons, setFlippedReasons] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef(null)

  const reasons = [
    { icon: '🌷', title: 'Your kind heart', detail: 'You make softness feel like a superpower.' },
    { icon: '☀️', title: 'Your smile', detail: 'Somehow, even a hard day feels lighter.' },
    { icon: '🫶', title: 'The little things', detail: 'Your tiny habits are some of my favourite things.' },
    { icon: '🌙', title: 'Your presence', detail: 'With you, even silence feels comfortable.' },
    { icon: '✨', title: 'Your dreams', detail: 'I love watching you grow into everything you want to be.' },
    { icon: '💗', title: 'Simply you', detail: 'No big reason needed. I just love you being you.' },
  ]

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

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
    setShowConfetti(true)
    window.setTimeout(() => setShowConfetti(false), 2800)
    document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })
    setLetterOpen(true)
  }

  const unlockSecret = () => {
    setSecretUnlocked(true)
    setSecretOpen(true)
    setShowConfetti(true)
    window.setTimeout(() => setShowConfetti(false), 2800)
  }

  return (
    <main className="site-shell">
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <FloatingHearts />
      <div className="ambient-glow glow-pink" aria-hidden="true" />
      <div className="ambient-glow glow-peach" aria-hidden="true" />
      <AnimatePresence>
        {introOpen && (
          <motion.div className="intro-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.65 }}>
            <motion.div className="intro-spark intro-spark-one" animate={{ rotate: 360, scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>✧</motion.div>
            <motion.div className="intro-spark intro-spark-two" animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>✦</motion.div>
            <motion.div className="intro-envelope" initial={{ y: 24, rotate: -5 }} animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="intro-envelope-heart">♡</span>
              <span className="intro-envelope-flap" />
            </motion.div>
            <p className="intro-eyebrow">A little surprise for</p>
            <h2 className="intro-title">Mona <span>♡</span></h2>
            <p className="intro-copy">Made of memories, little wishes, and a whole lot of love.</p>
            <button className="primary-button intro-button" onClick={() => { setIntroOpen(false); setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 2500) }} type="button">
              Open your birthday surprise <Heart size={16} fill="currentColor" />
            </button>
            <span className="intro-bottom-note">tap to open your little universe</span>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="For Susriti">
          <span className="brand-mark"><Heart size={17} fill="currentColor" /></span>
          <span>for my Mona</span>
        </a>
        <button className="music-button" onClick={toggleMusic} type="button">
          {musicOn ? <Pause size={16} /> : <Music2 size={16} />}
          <span>{musicOn ? 'Pause our song' : 'Play our song'}</span>
        </button>
      </header>

      <section id="home" className="hero section-wrap">
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
            <span className="hero-name">Susriti<span className="name-heart">♡</span></span>
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
            <button className="primary-button" onClick={openSurprise} type="button">
              Open your surprise <Heart size={17} fill="currentColor" />
            </button>
            <a href="#memories" className="text-link">Our little memories <ArrowDown size={15} /></a>
          </motion.div>
          <div className="hero-footnote"><span className="tiny-heart">♥</span> made with all my love, just for you</div>
        </div>

        <motion.div
          className="hero-art"
          initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="sun-glow" />
          <div className="hero-flower flower-one">✿</div>
          <div className="hero-flower flower-two">✿</div>
          <div className="hero-flower flower-three">✿</div>
          <div className="hero-heart"><Heart size={94} strokeWidth={1.1} fill="currentColor" /></div>
          <div className="art-sticker sticker-top"><Sparkles size={15} /> you are magic</div>
          <div className="art-sticker sticker-bottom">♡ always & forever ♡</div>
          <div className="tiny-star star-one">✦</div>
          <div className="tiny-star star-two">✧</div>
        </motion.div>
        <a className="scroll-cue" href="#countdown"><span /> scroll a little</a>
      </section>

      <section id="countdown" className="countdown-section section-wrap">
        <div className="section-kicker"><span /> THE DAY IS ALL YOURS <span /></div>
        <h2 className="section-title">A little countdown to <em>your day</em></h2>
        <p className="section-subtitle">October 12, 2026 · A day the world got a little brighter.</p>
        <Countdown />
        <div className="countdown-note"><Cake size={16} /> One more reason to celebrate the wonderful person you are.</div>
      </section>

      <section id="memories" className="memories-section section-wrap">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker left-kicker">OUR LITTLE SCRAPBOOK</div>
            <h2 className="section-title">Tiny moments, <em>big feelings.</em></h2>
          </div>
          <div className="scribble-heart">♡</div>
        </div>
        <p className="section-subtitle left-subtitle">
          A few little spaces for the moments I never want to forget. Tap a card to read it.
        </p>
        <div className="memory-grid">
          {memories.map((memory, index) => (
            <PhotoCard key={memory.number} memory={memory} index={index} onOpen={setSelectedMemory} />
          ))}
        </div>
        <p className="photo-tip"><Camera size={14} /> Add your own photos in <code>public/photos/</code> to make these memories yours.</p>
      </section>

      <section className="reasons-section section-wrap">
        <div className="section-kicker"><span /> SIX LITTLE REASONS <span /></div>
        <h2 className="section-title">Things I adore <em>about you.</em></h2>
        <p className="section-subtitle">Tap each little card, Mona. There is a tiny note waiting underneath.</p>
        <div className="reasons-grid">
          {reasons.map((reason, index) => {
            const flipped = flippedReasons.includes(index)
            return (
              <motion.button
                type="button"
                key={reason.title}
                className={`reason-card ${flipped ? 'reason-card-flipped' : ''}`}
                onClick={() => setFlippedReasons((current) => flipped ? current.filter((item) => item !== index) : [...current, index])}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                whileHover={{ y: -5 }}
                aria-pressed={flipped}
              >
                <span className="reason-icon">{flipped ? '💌' : reason.icon}</span>
                <strong>{flipped ? 'A little note for you' : reason.title}</strong>
                <span className="reason-detail">{flipped ? reason.detail : 'tap to reveal ♡'}</span>
              </motion.button>
            )
          })}
        </div>
      </section>

      <section className="hug-section section-wrap">
        <motion.div className={`hug-card ${hugSent ? 'hug-card-sent' : ''}`} animate={hugSent ? { scale: [1, 1.02, 1] } : { scale: 1 }} transition={{ duration: 0.45 }}>
          <div className="hug-orbit" aria-hidden="true">♡</div>
          <div className="hug-emoji">{hugSent ? '🥹💗' : '🧸'}</div>
          <div className="section-kicker">A LITTLE HUG THROUGH THE SCREEN</div>
          <h2 className="section-title">{hugSent ? 'Hug delivered, Mona!' : 'Need a hug, birthday girl?'}</h2>
          <p className="section-subtitle">{hugSent ? 'Imagine the biggest, warmest hug from me. Keeping you close, even from far away.' : 'Press the button and imagine me giving you the warmest hug ever.'}</p>
          <button className="primary-button hug-button" onClick={() => { setHugSent(!hugSent); if (!hugSent) { setShowConfetti(true); window.setTimeout(() => setShowConfetti(false), 2500) } }} type="button">
            {hugSent ? 'One more hug?' : 'Send me a virtual hug'} <Heart size={16} fill="currentColor" />
          </button>
          {hugSent && <motion.div className="hug-floating-hearts" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>♡　♥　♡　♥　♡</motion.div>}
        </motion.div>
      </section>

      <section id="letter" className="letter-section section-wrap">
        <div className="letter-deco deco-left">✿</div>
        <div className="letter-deco deco-right">♡</div>
        <div className="letter-card">
          <div className="letter-topline"><span>12 · 10 · 2026</span><Heart size={16} fill="currentColor" /></div>
          <div className="envelope-icon"><span>💌</span></div>
          <div className="section-kicker">A NOTE FROM MY HEART</div>
          <h2 className="section-title">To my <em>Mona,</em></h2>
          <p className="letter-intro">Some things are easier to feel than to say. Today, I want to try.</p>
          <AnimatePresence initial={false}>
            {letterOpen ? (
              <motion.div
                className="love-letter"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p>Happy birthday, my Susriti. ♡</p>
                <p>
                  I hope this new year of your life brings you the kind of happiness
                  that stays, the kind of peace that feels like home, and a hundred
                  little reasons to smile every day.
                </p>
                <p>
                  Thank you for being you — for your beautiful heart, your little
                  ways, and for making ordinary moments mean so much. I may not
                  always find the perfect words, but I hope you never have to wonder
                  how special you are to me.
                </p>
                <p>
                  I am cheering for every dream you have, every version of you that
                  you are becoming, and every beautiful thing still waiting for you.
                  Today is your day, Mona. I hope you feel loved in every possible way.
                </p>
                <p className="letter-signoff">Always yours, <br /><span>your Krish ♡</span></p>
              </motion.div>
            ) : (
              <motion.div className="letter-closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="letter-lines"><span /><span /><span /></div>
                <p>This little letter is waiting just for you.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button className="primary-button letter-button" onClick={() => setLetterOpen(!letterOpen)} type="button">
            {letterOpen ? 'Fold the letter' : 'Read your letter'}
            {letterOpen ? <X size={16} /> : <Heart size={16} fill="currentColor" />}
          </button>
        </div>
      </section>

      <section className="secret-section section-wrap">
        <div className="secret-card">
          <div className="secret-icon"><LockKeyhole size={22} /></div>
          <div className="section-kicker">PSSST... ONE LAST THING</div>
          <h2 className="section-title">A tiny secret, <em>just for you.</em></h2>
          <p className="section-subtitle">There is one more message tucked away in this little corner.</p>
          {!secretUnlocked ? (
            <button className="secret-button" onClick={unlockSecret} type="button">
              Unlock your secret <Sparkles size={16} />
            </button>
          ) : (
            <button className="secret-button unlocked" onClick={() => setSecretOpen(!secretOpen)} type="button">
              {secretOpen ? 'Hide my secret' : 'Read your secret'} <Heart size={16} fill="currentColor" />
            </button>
          )}
          <AnimatePresence>
            {secretOpen && (
              <motion.div
                className="secret-message"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <span className="secret-sparkle">✧</span>
                If I could make one birthday wish, it would be that you could see yourself
                through my eyes for just a moment — then you would understand why you are
                so easy to love. Happy birthday, Mona. You are my favourite person. ♡
                <span className="secret-sparkle">✧</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-heart"><Heart size={18} fill="currentColor" /></div>
        <p>Made for Susriti, with a whole lot of love.</p>
        <span>12 October 2026 · and every day after ♡</span>
      </footer>

      {showConfetti && <Confetti />}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMemory(null)}>
            <motion.div
              className="memory-modal"
              role="dialog"
              aria-modal="true"
              aria-label={selectedMemory.title}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedMemory(null)} aria-label="Close memory" type="button"><X size={19} /></button>
              <div className={`modal-art bg-gradient-to-br ${selectedMemory.tone}`}>
                <span>{selectedMemory.emoji}</span>
              </div>
              <div className="modal-copy">
                <span className="section-kicker">MEMORY {selectedMemory.number}</span>
                <h2>{selectedMemory.title}</h2>
                <p>{selectedMemory.caption}</p>
                <div className="modal-love"><Heart size={14} fill="currentColor" /> saved in my heart</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 52 }, (_, index) => index)
  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((piece) => (
        <i
          key={piece}
          style={{
            left: `${(piece * 29) % 100}%`,
            animationDelay: `${(piece % 13) * 0.07}s`,
            animationDuration: `${1.7 + (piece % 8) * 0.17}s`,
            transform: `rotate(${piece * 31}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export default App

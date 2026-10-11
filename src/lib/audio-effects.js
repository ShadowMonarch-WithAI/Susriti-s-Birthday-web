// Web Audio API sound synthesizer for romantic birthday effects (100% reliable, no external audio files required)

let audioCtx = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Gentle soft breath / blowing whoosh sound
export function playBlowingSound(enabled = true) {
  if (!enabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const bufferSize = ctx.sampleRate * 0.8
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)

    // Pink/white noise for breath
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25))
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(250, now + 0.6)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, now)
    gain.gain.linearRampToValueAtTime(0.35, now + 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.75)
  } catch (e) {
    console.warn('Audio playback error', e)
  }
}

// Magical crystalline chime sound when candles extinguish and wish is made
export function playMagicalChime(enabled = true) {
  if (!enabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    const frequencies = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98] // C5, E5, G5, C6, E6, G6

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const startTime = now + idx * 0.08

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)

      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 1.3)
    })
  } catch (e) {
    console.warn('Audio playback error', e)
  }
}

// Grand celebratory chime arpeggio for surprise cake reveal
export function playCelebrationFanfare(enabled = true) {
  if (!enabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime
    // Uplifting sweet romantic major chords (Cmaj -> Gmaj -> Fmaj -> Cmaj high)
    const notes = [
      { f: 523.25, t: 0.0 },  // C5
      { f: 659.25, t: 0.1 },  // E5
      { f: 783.99, t: 0.2 },  // G5
      { f: 1046.5, t: 0.35 }, // C6
      { f: 1174.66, t: 0.5 }, // D6
      { f: 1318.51, t: 0.65 },// E6
      { f: 1567.98, t: 0.8 }, // G6
      { f: 2093.00, t: 1.0 }, // C7
    ]

    notes.forEach(({ f, t }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const startTime = now + t

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(f, startTime)

      gain.gain.setValueAtTime(0.001, startTime)
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(startTime)
      osc.stop(startTime + 1.5)
    })
  } catch (e) {
    console.warn('Audio playback error', e)
  }
}

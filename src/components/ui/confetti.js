import confetti from 'canvas-confetti'

export function triggerRomanticConfetti() {
  if (typeof window === 'undefined') return

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const count = 70
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#b5446d', '#f6a8bd', '#df8aa8', '#ffd1dc', '#fbe0e9', '#e07a9c', '#ffffff'],
    })
  }

  // Realistic multi-stage celebratory burst
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}

export function triggerHeartBurst(x = 0.5, y = 0.5) {
  if (typeof window === 'undefined') return
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  confetti({
    particleCount: 35,
    spread: 80,
    origin: { x, y },
    colors: ['#b5446d', '#e26d95', '#f6a8bd', '#ffd6e0'],
    shapes: ['circle'],
    scalar: 1.1,
    zIndex: 9999,
  })
}

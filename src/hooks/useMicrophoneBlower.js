import { useCallback, useEffect, useRef, useState } from 'react'

export function useMicrophoneBlower({ onBlowingDetected, threshold = 0.2, sustainDurationMs = 260 }) {
  const [isListening, setIsListening] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0) // 0 - 100
  const [permissionStatus, setPermissionStatus] = useState('idle') // 'idle' | 'listening' | 'granted' | 'denied' | 'unsupported'
  const [errorMessage, setErrorMessage] = useState('')

  const streamRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const animationFrameRef = useRef(null)
  const sustainedStartRef = useRef(null)
  const detectedRef = useRef(false)

  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }

    setIsListening(false)
    setVolumeLevel(0)
    sustainedStartRef.current = null
  }, [])

  const startListening = useCallback(async () => {
    // Reset state
    setErrorMessage('')
    detectedRef.current = false
    sustainedStartRef.current = null

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionStatus('unsupported')
      setErrorMessage('Microphone access requires a modern browser over HTTPS or localhost.')
      return
    }

    try {
      setPermissionStatus('prompting')
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      })

      streamRef.current = stream
      setPermissionStatus('listening')
      setIsListening(true)

      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioCtx = new AudioContext()
      audioContextRef.current = audioCtx

      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 512
      analyser.smoothingTimeConstant = 0.3
      source.connect(analyser)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)

      const checkAudio = () => {
        if (!analyserRef.current || detectedRef.current) return

        analyserRef.current.getByteTimeDomainData(dataArray)

        // Calculate RMS (Root Mean Square) amplitude
        let sumSquares = 0
        for (let i = 0; i < dataArray.length; i++) {
          const normalized = (dataArray[i] - 128) / 128
          sumSquares += normalized * normalized
        }
        const rms = Math.sqrt(sumSquares / dataArray.length)

        // Map to 0-100 visual level with pleasant clamp
        const normalizedVol = Math.min(100, Math.round(rms * 220))
        setVolumeLevel(normalizedVol)

        // Check if blowing sound exceeds threshold
        if (rms >= threshold) {
          const now = Date.now()
          if (!sustainedStartRef.current) {
            sustainedStartRef.current = now
          } else if (now - sustainedStartRef.current >= sustainDurationMs) {
            // Sustained blowing sound confirmed!
            detectedRef.current = true
            stopListening()
            if (onBlowingDetected) {
              onBlowingDetected()
            }
            return
          }
        } else {
          // Reset sustain tracker if volume drops
          sustainedStartRef.current = null
        }

        animationFrameRef.current = requestAnimationFrame(checkAudio)
      }

      animationFrameRef.current = requestAnimationFrame(checkAudio)
    } catch (err) {
      console.warn('Microphone permission or stream error:', err)
      setPermissionStatus('denied')
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Microphone permission was denied. You can tap "Blow the candles out ✨" instead!')
      } else {
        setErrorMessage('Could not connect to microphone. You can tap "Blow the candles out ✨" instead.')
      }
      stopListening()
    }
  }, [onBlowingDetected, stopListening, sustainDurationMs, threshold])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening()
    }
  }, [stopListening])

  return {
    isListening,
    volumeLevel,
    permissionStatus,
    errorMessage,
    startListening,
    stopListening,
  }
}

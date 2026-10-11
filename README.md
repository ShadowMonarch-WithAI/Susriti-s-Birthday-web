# For Susriti, with love ♡ 🎂💗

A responsive, dreamy-pink luxury birthday surprise website built for **Susriti (Mona)** by **Krish**, crafted with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

---

## Features

- **Cinematic 12-to-1 Opening Countdown**: Dramatic circular orbit countdown with progress track and skippable quick-open.
- **Interactive Floating Envelope**: Wax seal envelope intro opening into her bespoke universe.
- **Atmospheric Aurora Background**: Gentle flowing pastel mesh gradients and 21st.dev Magic UI Shimmer Buttons.
- **Super-Animated 3-Tier Birthday Cake & Candle Experience 🎂**:
  - Layered cream frosting, dripping icing, fresh strawberries, sugar pearls, and glowing candles on a decorated table with rose petals and fairy lights.
  - Realistic flickering and swaying candle flames with ambient light halos and rising smoke wisps when extinguished.
  - **Option A — Microphone Blowing**: Speak or blow gently into the device microphone; Web Audio API measures real-time breath volume and blows out the candles!
  - **Option B — Manual Tap to Blow**: Fallback button labeled *"Blow the candles out ✨"* for seamless instant interaction.
  - **Magical Wish Phase**: Soft candlelight dimming, celestial atmospheric tone, and display of *"Your wish is on its way to the universe, Mona ✨"*.
  - **Surprise Cake Reveal**: Dramatic pink flash, expanding heart burst, celebratory fanfare, full-screen rose/gold confetti shower, and the grand reveal of the second cake draped with the ribbon banner **"Happy Birthday, Susriti!"** and a personal love letter signoff.
  - **Celebrate Again 🎉**: Button to repeat the entire candle-blowing ceremony.
- **Scrapbook Memories**: 3D mouse-tracking tilt polaroid cards with light glare reflection and accessible modal view.
- **Six Little Reasons**: Interactive 3D flip cards revealing heartfelt adoration notes.
- **Virtual Hug Meter**: Tactile interactive hug card with expanding ripple waves and heart bursts.
- **Heartfelt Love Letter**: Expandable love letter with Playfair italic typography and signoff.
- **Secret Vault**: Keyhole padlock with secret message reveal.
- **Background Music**: Built-in sound effects (whoosh, chimes, celebration fanfare) synthesized via the Web Audio API (100% reliable without external audio files), alongside optional background song toggle.

---

## 1. Quick Start (Local Development)

Install **Node.js 20 or newer** (https://nodejs.org/). In your terminal:

```bash
npm install
npm run dev
```

Open the local development URL (usually `http://localhost:5173` or `http://localhost:5174`).

To test the optimized production build:

```bash
npm run build
npm run preview
```

---

## 2. Testing Microphone Candle-Blowing Access

Modern web browsers enforce strict security standards for accessing the microphone via `getUserMedia`:

1. **Localhost is a secure origin**: When running locally via `http://localhost:5173` or `http://localhost:5174`, Chrome, Safari, Firefox, and Edge automatically allow microphone access without HTTPS.
2. **Clicking the button**: Tap **"Blow out your candles 🎤"**.
3. **Grant Permission**: When prompted by your browser, choose **Allow**.
4. **Breath Detection**: A live pink volume meter will appear. Blow gently into your device microphone for about a quarter of a second.
5. **Fallback**: If microphone permission is dismissed or unsupported, Mona can simply tap **"Blow the candles out ✨"** at any time.
6. **Privacy Guarantee**: Audio is analyzed strictly locally in memory using the browser's `AudioContext` and `AnalyserNode` to measure volume amplitude. Audio is **never recorded, uploaded, or transmitted anywhere**.

---

## 3. Deploying over HTTPS (Required for Mobile Microphone)

For mobile browsers (iOS Safari, Android Chrome) to grant microphone access on the live website, the site **must be hosted over HTTPS**. All of the following free platforms automatically provide SSL/HTTPS certificates:

### Option A: Vercel (Recommended)
1. Push the code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import the repository. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your custom `https://*.vercel.app` URL will be live with full HTTPS and microphone support!

### Option B: Render Static Site
1. Go to [render.com](https://render.com) and click **New + → Static Site**.
2. Connect your repository.
3. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site**.

### Option C: Netlify or Cloudflare Pages
- **Build command:** `npm run build`
- **Publish directory:** `dist`

---

## 4. Personalizing Photos & Music

- **Photos**: Place three photos in `public/photos/` named:
  - `memory-1.jpg`
  - `memory-2.jpg`
  - `memory-3.jpg`
  *(If photos are not added, romantic decorative illustrations are displayed automatically).*
- **Music**: Place your couple song in `public/music.mp3`. It will play when she taps the "Play our song" button in the topbar.
- **Text & Notes**: Edit `src/App.jsx` to customize any memory captions or letter paragraphs.

Made with love for Susriti ♡

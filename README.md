# For Susriti, with love ♡

A responsive, dreamy-pink birthday surprise website built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Features

- Romantic animated landing page and floating hearts
- Countdown to **12 October 2026**
- Three photo-memory cards with modal interactions
- Expandable personal letter
- Secret-message unlock and confetti
- Animated envelope intro screen and open-surprise transition
- Animated ambient glow blobs and scroll-reading progress bar
- Six interactive flip cards with personal reasons
- Virtual hug interaction with heart animation and confetti
- Optional background music, only starts after the visitor taps play
- Responsive layout and reduced-motion accessibility support

## 1. Requirements

Install **Node.js 20 or newer** from https://nodejs.org/. Check it in a terminal:

```bash
node -v
npm -v
```

## 2. Run locally

Extract the ZIP, open the `susriti-birthday-website` folder in VS Code, and run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

To test the production build:

```bash
npm run build
npm run preview
```

## 3. Add your photos

Create `public/photos/` and add three images named exactly:

- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`

Use your own photos and make sure you have permission to share them. If an image is missing, the page shows a decorative placeholder instead. You can use `.png` or `.webp` too, but update the paths in `src/App.jsx` accordingly.

## 4. Add background music

Place an audio file you are allowed to use at:

```text
public/music.mp3
```

The player expects that exact path. Music intentionally does not autoplay: browsers generally require a user gesture before audio can start. If you prefer a different file name, update the `src` on the `<audio>` element in `src/App.jsx`.

## 5. Personalize the message

Edit `src/App.jsx`:
- Update the letter inside the `love-letter` section.
- Update the secret message inside the `secret-message` section.
- Update captions and memory titles in the `memories` array.
- Update the birthday date in `const birthday = new Date('2026-10-12T00:00:00')` if needed. It currently counts down to the start of October 12, in the visitor's local timezone.

The starter letter uses the name “Krish” as the sign-off; change it if you want another signature.

## 6. Deploy to Render (Static Site)

1. Push the extracted project to a GitHub repository.
2. In Render, choose **New + → Static Site** and connect the repository.
3. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site** and wait for deployment.
5. Open the generated `onrender.com` URL and test it on a phone.

No environment variables are required. Every file in `public/` is copied into the production build, so keep the photos and `music.mp3` there.

## 7. Deploy with Vercel (alternative)

Import the repository in Vercel. Vercel detects Vite automatically; use `npm run build` as the build command and `dist` as the output directory.

## Before sharing

- Test every button on mobile.
- Add photos and music, then check the hosted site.
- Use an unguessable/private link only if you don't want the surprise easily found; a public static site is not password-protected.
- Avoid adding private information that you would not want anyone with the link to see.

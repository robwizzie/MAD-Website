<p align="center">
  <img src="public/images/mad-circle-icon.png" alt="Mile A Day" width="120" />
</p>

# Mile A Day — Website

The official marketing website for **Mile A Day**, a free iOS app that challenges you to walk or run one mile every single day and build an unbreakable streak.

🔗 **Live site:** [mileaday.run](https://mileaday.run)

---

## About the App

Mile A Day was born from a bet between two competitive friends — Rob Wiscount and David Simmerman — who challenged each other to run a mile every day and never stopped. The app is free, not VC-backed, and built because it changed our lives.

**Core idea:** One mile. Every day. No excuses.

- Track your daily mile streak
- Compete with friends across 5 game modes
- Earn badges and medals
- Apple Watch + HealthKit integration
- 100% free

[![Download on the App Store](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg)](https://apps.apple.com/app/mile-a-day/id6744917105)

---

## Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Radix UI** — Accessible headless components
- **React Hook Form + Zod** — Form handling and validation
- **Vercel Analytics** — Usage tracking

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Other Commands

```bash
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Link Previews (OG Video)

Shared links show an animated preview: `og:video` (`public/og/<slug>.mp4`) with an `og:image` fallback (`public/og/<slug>.png`) for platforms that only show stills. Both are rendered from an animated HTML scene with Playwright + ffmpeg:

```bash
npm i -D playwright && npx playwright install chromium   # one-time
npm run og:render          # render every page in scripts/og/pages.mjs
npm run og:render -- home  # render one slug
```

To give a new page its own preview, add an entry to `scripts/og/pages.mjs`, render it, and spread `ogMedia('<slug>', '<alt>')` from `lib/og.ts` into that page's `openGraph` / `twitter` metadata. Pages without their own entry inherit the home preview from the root layout.

---

## Project Structure

```
app/
  layout.tsx              # Root layout, fonts, metadata
  page.tsx                # Home page

components/
  navbar.tsx              # Navigation bar
  hero-section.tsx        # Landing hero with phone mockup
  features-section.tsx    # App feature highlights
  habit-section.tsx       # 66-day habit science breakdown
  competitions-section.tsx # 5 competition game modes
  how-it-works-section.tsx # 3-step onboarding flow
  story-section.tsx       # Founder origin story
  cta-section.tsx         # Download CTA + Android waitlist
  footer.tsx              # Site footer
  ui/                     # Reusable UI components (Radix-based)

lib/
  og.ts                   # OG video/image metadata helper

scripts/og/
  scene.html              # Animated preview scene (rendered frame by frame)
  pages.mjs               # Per-page preview copy
  render.mjs              # Renders public/og/<slug>.mp4 + .png

public/
  images/                 # App screenshots, logos, avatars
  og/                     # Generated link-preview videos + fallback images
```

---

## License

All rights reserved. This project is proprietary software.

---

## Connect

- [Instagram](https://instagram.com/mileadayapp)
- [TikTok](https://tiktok.com/@mileadayapp)
- [X / Twitter](https://x.com/mileadayapp)

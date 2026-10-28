import type { Metadata } from "next"

// Animated link previews. Each slug maps to public/og/<slug>.mp4 (og:video,
// played inline by iMessage, Discord, Telegram, etc.) and public/og/<slug>.png
// (og:image, the fallback for platforms that only show stills). Both are
// generated from scripts/og/pages.mjs with `npm run og:render`.
export const SITE_URL = "https://mileaday.run"

const SIZE = { width: 1200, height: 630 }

export function ogMedia(slug: string, alt: string) {
  const image = { url: `/og/${slug}.png`, ...SIZE, alt, type: "image/png" }
  // Next resolves og:image against metadataBase but not og:video, and
  // crawlers ignore relative video URLs, so build it absolute here.
  const videoUrl = new URL(`/og/${slug}.mp4`, SITE_URL)
  const video = { url: videoUrl, secureUrl: videoUrl, ...SIZE, type: "video/mp4" }

  return {
    openGraph: { images: [image], videos: [video] },
    twitter: { card: "summary_large_image", images: [image] },
  } satisfies Pick<Metadata, "openGraph" | "twitter">
}

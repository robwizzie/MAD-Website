// One entry per shareable route. `slug` names the output files in public/og/
// (<slug>.mp4 + <slug>.png) and must match the slug passed to ogMedia() in
// that route's metadata. Any field left out falls back to the scene defaults
// in scripts/og/scene.html.
export const pages = [
  {
    slug: 'home',
    path: '',
    eyebrow: 'Available on iOS & Apple Watch',
    line1: 'ONE MILE.',
    line2: 'EVERY DAY.',
    tagline: 'Walk it or run it. <b>Just get it done.</b>',
    streak: 288,
  },
]

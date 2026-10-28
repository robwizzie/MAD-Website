// Renders the animated OG scene for every page in pages.mjs into
// public/og/<slug>.mp4 (og:video) and public/og/<slug>.png (og:image fallback).
//
// Requires ffmpeg on PATH and Playwright with Chromium:
//   npm i -D playwright && npx playwright install chromium
//   npm run og:render            # all pages
//   npm run og:render -- home    # just one slug
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pages } from './pages.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(here, '../../public/og')
const sceneUrl = pathToFileURL(path.join(here, 'scene.html')).href

const WIDTH = 1200
const HEIGHT = 630
const FPS = 30
// Frame used for the static fallback image: mile complete, confetti mid-air.
const POSTER_TIME = 4.55

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

function encode(file) {
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-tune', 'animation',
    '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.0',
    '-movflags', '+faststart', '-an',
    file,
  ], { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = new Promise((resolve, reject) => {
    ff.on('error', reject)
    ff.on('close', code => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))))
  })
  return { ff, done }
}

const only = process.argv.slice(2)
const selected = only.length ? pages.filter(p => only.includes(p.slug)) : pages
if (!selected.length) {
  console.error(`No pages match: ${only.join(', ')}`)
  process.exit(1)
}

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 })

for (const cfg of selected) {
  const { slug, ...params } = cfg
  await page.goto(`${sceneUrl}#${encodeURIComponent(JSON.stringify(params))}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.__ready)
  const duration = await page.evaluate(() => window.__duration)

  await page.evaluate(t => window.__seek(t), POSTER_TIME)
  await page.screenshot({ path: path.join(outDir, `${slug}.png`) })

  const { ff, done } = encode(path.join(outDir, `${slug}.mp4`))
  const frames = Math.round(duration * FPS)
  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.__seek(t), i / FPS)
    const png = await page.screenshot({ type: 'png' })
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r))
  }
  ff.stdin.end()
  await done
  console.log(`✓ ${slug}: public/og/${slug}.mp4 + public/og/${slug}.png (${frames} frames)`)
}

await browser.close()

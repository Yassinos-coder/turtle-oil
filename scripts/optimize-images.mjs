import sharp from 'sharp'
import { readFileSync } from 'fs'
import { mkdirSync } from 'fs'

const SRC = 'C:/Users/castr/Downloads/token_logo.png'

mkdirSync('src/assets', { recursive: true })
mkdirSync('public', { recursive: true })

const input = readFileSync(SRC)

// 1. Web logo used inside React (512x512, compressed PNG)
await sharp(input)
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, quality: 90 })
  .toFile('src/assets/logo.png')
console.log('✅  src/assets/logo.png')

// 2. Favicon 32x32
await sharp(input)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile('public/favicon-32.png')
console.log('✅  public/favicon-32.png')

// 3. Apple touch icon 180x180
await sharp(input)
  .resize(180, 180, { fit: 'contain', background: { r: 5, g: 5, b: 5, alpha: 1 } })
  .png({ compressionLevel: 9 })
  .toFile('public/apple-touch-icon.png')
console.log('✅  public/apple-touch-icon.png')

// 4. OG image 1200x630 — logo centred on dark background
const logo = await sharp(input)
  .resize(500, 500, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer()

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 5, g: 5, b: 5, alpha: 1 },
  },
})
  .composite([
    { input: logo, top: 65, left: 350 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og.png')
console.log('✅  public/og.png')

console.log('\n🐢  All images optimized.')

// Renders every PNG, and favicon.ico, from the SVG masters. The masters are
// the source; never edit a PNG by hand. resvg draws them, so the output is the
// same on every machine.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import { zlibSync } from 'fflate'
import { images, logoMasters, root } from './assets.mjs'

function render(file, width) {
  const svg = readFileSync(join(root, file), 'utf8')
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render()
}

function write(file, bytes) {
  const out = join(root, file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, bytes)
  console.log(file)
}

// resvg always writes RGBA. The Play Console refuses a header with an alpha
// channel, so those images are re-encoded as RGB here.
const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})

function crc32(bytes) {
  let c = 0xffffffff
  for (const b of bytes) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  out.write(type, 4, 'latin1')
  Buffer.from(data).copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}

function rgbPng({ height, pixels, width }) {
  const raw = Buffer.alloc((width * 3 + 1) * height)
  for (let y = 0; y < height; y++) {
    const row = y * (width * 3 + 1)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      // Flatten onto white, though every such master paints its own ground.
      const a = pixels[i + 3] / 255
      for (let c = 0; c < 3; c++) {
        raw[row + 1 + x * 3 + c] = Math.round(pixels[i + c] * a + 255 * (1 - a))
      }
    }
  }
  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8 // bit depth
  header[9] = 2 // truecolour, no alpha
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', zlibSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// An ICO whose entries are PNGs, which every browser and Windows since Vista
// reads.
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ bytes, size }, i) => {
    const e = 6 + 16 * i
    header[e] = size % 256
    header[e + 1] = size % 256
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(bytes.length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += bytes.length
  })
  return Buffer.concat([header, ...pngs.map((p) => p.bytes)])
}

for (const { form, png, svg } of logoMasters()) {
  for (const size of form.sizes) write(png(size), render(svg, size).asPng())
}

for (const image of images) {
  const pngs = []
  for (const { file, size } of image.outputs) {
    if (!size) continue
    const rendered = render(image.svg, size)
    const bytes = image.alpha === false ? rgbPng(rendered) : rendered.asPng()
    write(file, bytes)
    pngs.push({ bytes, size })
  }
  if (image.ico) write(image.ico, ico(pngs))
}

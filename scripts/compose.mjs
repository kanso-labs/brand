// Writes every SVG master in logo/, icons/ and social/ from the two drawings in
// source/: the leaf and the KANSO lettering. Run it after changing a drawing or
// a proportion below, then `npm run render` for the PNGs.
//
// Units are the drawings' own, in which the cap height of KANSO is 360: the
// scale the first mark was traced at, kept so every proportion below still
// holds.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { forms, ink, logoMasters, paper, root } from './assets.mjs'

function drawing(name) {
  const svg = readFileSync(join(root, 'source', `${name}.svg`), 'utf8')
  const [x, y, w, h] = svg
    .match(/viewBox="([^"]+)"/)[1]
    .split(' ')
    .map(Number)
  return { d: svg.match(/ d="([^"]+)"/)[1], h, w, x, y }
}

const leaf = drawing('leaf')
const kanso = drawing('kanso')

// The space between leaf and name: 0.64 of the cap height stacked and 0.72
// side by side, the proportions of the first lockups, kept for this mark.
const stackGap = 230
const rowGap = 260

// The small mark thickens the leaf's line by this many units, about a quarter
// of the drawn line, so it stays dark at 16 and 24 px without closing the
// leaf's inside. 32 and 48 px read without it, but take it too.
const smallStroke = 12

function path(art, fill, { stroke = 0 } = {}) {
  const outline = stroke
    ? ` stroke="${fill}" stroke-linejoin="round" stroke-width="${stroke}"`
    : ''
  return `<path fill="${fill}" fill-rule="evenodd"${outline} d="${art.d}"/>`
}

// Places a drawing with its box's top-left corner at (x, y), scaled by s.
function place(art, x, y, s, inner) {
  const t = [`translate(${round(x)} ${round(y)})`]
  if (s !== 1) t.push(`scale(${round(s, 5)})`)
  t.push(`translate(${-art.x} ${-art.y})`)
  return `<g transform="${t.join(' ')}">${inner}</g>`
}

function round(n, places = 2) {
  return String(+n.toFixed(places))
}

function svg(
  w,
  h,
  body,
  { title = 'Kanso Labs', size = [w / 10, h / 10] } = {},
) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(w)} ${round(h)}" width="${round(size[0])}" height="${round(size[1])}" role="img">
  <title>${title}</title>
  ${body}
</svg>
`
}

// Each lockup as { w, h, body(fill) }, laid out at the drawings' scale.
const layouts = {
  'kanso-horizontal': {
    body: (fill) =>
      place(leaf, 0, 0, 1, path(leaf, fill)) +
      place(
        kanso,
        leaf.w + rowGap,
        (leaf.h - kanso.h) / 2,
        1,
        path(kanso, fill),
      ),
    h: leaf.h,
    w: leaf.w + rowGap + kanso.w,
  },
  'kanso-mark': {
    body: (fill) => place(leaf, 0, 0, 1, path(leaf, fill)),
    h: leaf.h,
    w: leaf.w,
  },
  'kanso-mark-small': {
    body: (fill) =>
      place(
        leaf,
        smallStroke / 2,
        smallStroke / 2,
        1,
        path(leaf, fill, { stroke: smallStroke }),
      ),
    h: leaf.h + smallStroke,
    w: leaf.w + smallStroke,
  },
  'kanso-stacked': {
    body: (fill) =>
      place(leaf, (kanso.w - leaf.w) / 2, 0, 1, path(leaf, fill)) +
      place(kanso, 0, leaf.h + stackGap, 1, path(kanso, fill)),
    h: leaf.h + stackGap + kanso.h,
    w: kanso.w,
  },
  'kanso-wordmark': {
    body: (fill) => place(kanso, 0, 0, 1, path(kanso, fill)),
    h: kanso.h,
    w: kanso.w,
  },
}

// A lockup scaled to `width` and centred on (cx, cy).
function centred(name, fill, cx, cy, width) {
  const l = layouts[name]
  const s = width / l.w
  return `<g transform="translate(${round(cx - width / 2)} ${round(cy - (l.h * s) / 2)}) scale(${round(s, 5)})">${l.body(fill)}</g>`
}

function write(file, text) {
  const out = join(root, file)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, text)
  console.log(file)
}

// Logo masters -------------------------------------------------------------

for (const { form, svg: file, version } of logoMasters()) {
  const l = layouts[form.file]
  write(file, svg(l.w, l.h, l.body(version.fill)))
}

// Icons --------------------------------------------------------------------

// The SVG favicon carries its own dark-scheme colour, which browsers apply
// from the visitor's setting.
{
  const l = layouts['kanso-mark-small']
  const width = 60
  const s = width / l.w
  write(
    'icons/favicon.svg',
    svg(
      64,
      64,
      `<style>path{fill:${ink};stroke:${ink}}@media (prefers-color-scheme:dark){path{fill:#ececec;stroke:#ececec}}</style>
  <g transform="translate(${round(2)} ${round(32 - (l.h * s) / 2)}) scale(${round(s, 5)})">${l.body(ink)}</g>`,
      { size: [64, 64] },
    ),
  )
}

function tile({ ground, inset, mark, radius, size }) {
  const l = layouts[mark]
  const width = size * inset
  const rect = radius
    ? `<rect width="${size}" height="${size}" rx="${round(size * radius)}" fill="${ground}"/>`
    : `<rect width="${size}" height="${size}" fill="${ground}"/>`
  return svg(
    size,
    size,
    `${rect}\n  ${centred(mark, ink, size / 2, size / 2, width)}`,
    {
      size: [size, size],
    },
  )
}

write(
  'icons/favicon-tile.svg',
  tile({
    ground: '#ffffff',
    inset: 0.86,
    mark: 'kanso-mark-small',
    radius: 0.1875,
    size: 64,
  }),
)
write(
  'icons/apple-touch-icon.svg',
  tile({ ground: '#ffffff', inset: 0.64, mark: 'kanso-mark', size: 180 }),
)
write(
  'icons/icon.svg',
  tile({
    ground: '#ffffff',
    inset: 0.7,
    mark: 'kanso-mark',
    radius: 0.22,
    size: 512,
  }),
)
// Maskable: the leaf's corners stay inside the 40% radius safe circle.
write(
  'icons/icon-maskable.svg',
  tile({ ground: '#ffffff', inset: 0.56, mark: 'kanso-mark', size: 512 }),
)

// Social -------------------------------------------------------------------

// The avatar: the stacked lockup on white, the lettering 56% of the width, as
// on the organization's first avatar.
write(
  'social/avatar.svg',
  svg(
    1024,
    1024,
    `<rect width="1024" height="1024" fill="#ffffff"/>\n  ${centred('kanso-stacked', ink, 512, 512, 1024 * (256 / 460))}`,
    { size: [1024, 1024] },
  ),
)
write(
  'social/google-play-header.svg',
  svg(
    4096,
    2304,
    `<rect width="4096" height="2304" fill="${paper}"/>\n  ${centred('kanso-horizontal', ink, 2048, 1152, 1280)}`,
    { size: [4096, 2304] },
  ),
)
write(
  'social/og-card.svg',
  svg(
    1200,
    630,
    `<rect width="1200" height="630" fill="${paper}"/>\n  ${centred('kanso-horizontal', ink, 600, 315, 640)}`,
    { size: [1200, 630] },
  ),
)

// Wide images: the horizontal lockup centred on paper, `width` its share of
// the image's width. Networks crop the edges and lay the avatar over a corner,
// so the lockup stays well inside the centre.
function banner(file, w, h, width) {
  write(
    file,
    svg(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${paper}"/>\n  ${centred('kanso-horizontal', ink, w / 2, h / 2, w * width)}`,
      { size: [w, h] },
    ),
  )
}

// The og-card's proportion, at the size GitHub asks for.
banner('social/github-social-preview.svg', 1280, 640, 640 / 1200)
banner('social/x-banner.svg', 1500, 500, 0.4)
banner('social/bluesky-banner.svg', 3000, 1000, 0.4)
banner('social/linkedin-cover.svg', 1128, 191, 0.36)
banner('social/linkedin-banner.svg', 1584, 396, 0.36)

// Google asks for a square logo of 120 × 120 on the consent screen: the leaf
// on white, with room around it.
write(
  'social/oauth-logo.svg',
  tile({ ground: '#ffffff', inset: 0.6, mark: 'kanso-mark', size: 120 }),
)

// The form list is the manifest's; a layout missing here is a mistake.
for (const form of forms) {
  if (!layouts[form.file]) throw new Error(`No layout for ${form.file}`)
}

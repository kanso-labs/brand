// What this repository holds, in one place: the colours each version of the
// logo is drawn in, every SVG master and the PNGs rendered from it. compose.mjs
// writes the masters, render.mjs the PNGs and icons, and site.mjs lists both on
// the brand page, all from this file.

export const root = new URL('..', import.meta.url).pathname

// The mark has no hue: the full-colour logo is the brand's ink.
export const ink = '#1a1a1a'
export const paper = '#fafafa'

export const versions = [
  {
    fill: ink,
    ground: paper,
    key: '',
    name: 'Full colour',
    use: 'Ink on light grounds. The default everywhere.',
  },
  {
    fill: '#000000',
    ground: '#ffffff',
    key: '-mono',
    name: 'One colour',
    use: 'Pure black, for print, engraving and single-colour processes.',
  },
  {
    fill: '#ffffff',
    ground: '#121212',
    key: '-reversed',
    name: 'Reversed',
    use: 'White, for dark grounds and photographs.',
  },
]

// The four forms of the logo. `sizes` are the PNG widths rendered for each;
// the mark is square-ish, so its sizes are the common icon sizes. The small
// mark is the leaf with its line slightly heavier, for 48 px and under, where
// the drawn line would turn grey.
export const forms = [
  {
    file: 'kanso-mark',
    name: 'Mark',
    sizes: [64, 128, 256, 512, 1024],
    use: 'The leaf alone, where the name is already said or there is no room for it.',
  },
  {
    file: 'kanso-mark-small',
    name: 'Mark, small sizes',
    sizes: [16, 24, 32, 48],
    use: 'The leaf with its line a little heavier, for 48 px and smaller: favicons, tabs, list icons.',
  },
  {
    file: 'kanso-wordmark',
    name: 'Wordmark',
    sizes: [256, 512, 1024, 2048],
    use: 'The name alone, where the leaf is shown nearby or the space is very wide and short.',
  },
  {
    file: 'kanso-horizontal',
    name: 'Horizontal lockup',
    sizes: [256, 512, 1024, 2048],
    use: 'Leaf and name side by side. The default for headers, documents and wide spaces.',
  },
  {
    file: 'kanso-stacked',
    name: 'Stacked lockup',
    sizes: [256, 512, 1024, 2048],
    use: 'Leaf over name, as on the avatar. For square and tall spaces.',
  },
]

export function logoMasters() {
  return forms.flatMap((form) =>
    versions.map((version) => ({
      form,
      png: (size) => `logo/png/${form.file}${version.key}-${size}.png`,
      svg: `logo/svg/${form.file}${version.key}.svg`,
      version,
    })),
  )
}

// Icons and social images: each master and what is rendered from it. `alpha:
// false` writes a PNG without an alpha channel, which the Play Console requires
// of the header image.
export const images = [
  {
    group: 'icons',
    name: 'Favicon',
    outputs: [{ file: 'icons/favicon.svg' }],
    svg: 'icons/favicon.svg',
    use: 'The browser tab icon for modern browsers. Ink, turning light in a dark theme.',
  },
  {
    group: 'icons',
    ico: 'icons/favicon.ico',
    name: 'Favicon, raster',
    outputs: [16, 32, 48].map((size) => ({
      file: `icons/favicon-${size}.png`,
      size,
    })),
    svg: 'icons/favicon-tile.svg',
    use: 'favicon.ico (16, 32 and 48 inside) and PNGs, for everything else. A white tile, so the leaf shows on a dark tab bar.',
  },
  {
    group: 'icons',
    name: 'Apple touch icon',
    outputs: [{ file: 'icons/apple-touch-icon.png', size: 180 }],
    svg: 'icons/apple-touch-icon.svg',
    use: 'Home screen icon on iOS and iPadOS. Full bleed: the system rounds the corners.',
  },
  {
    group: 'icons',
    name: 'App icon',
    outputs: [192, 512].map((size) => ({
      file: `icons/icon-${size}.png`,
      size,
    })),
    svg: 'icons/icon.svg',
    use: 'The web app manifest icon, purpose "any".',
  },
  {
    group: 'icons',
    name: 'Maskable app icon',
    outputs: [192, 512].map((size) => ({
      file: `icons/icon-maskable-${size}.png`,
      size,
    })),
    svg: 'icons/icon-maskable.svg',
    use: 'Manifest icon, purpose "maskable": the leaf sits inside the central 80% circle every mask keeps.',
  },
  {
    group: 'social',
    name: 'Avatar',
    outputs: [
      { file: 'social/github-avatar-1024.png', size: 1024 },
      { file: 'social/google-play-icon-512.png', size: 512 },
    ],
    svg: 'social/avatar.svg',
    use: 'The GitHub organization avatar and the Google Play developer icon (512 × 512): the stacked lockup on white.',
  },
  {
    alpha: false,
    group: 'social',
    name: 'Google Play header',
    outputs: [{ file: 'social/google-play-header-4096x2304.png', size: 4096 }],
    svg: 'social/google-play-header.svg',
    use: 'The developer page header image (4096 × 2304, no alpha). The lockup stays in the centre, which Play keeps on every screen.',
  },
  {
    alpha: false,
    group: 'social',
    name: 'Social card',
    outputs: [{ file: 'social/og-card-1200x630.png', size: 1200 }],
    svg: 'social/og-card.svg',
    use: 'Open Graph and Twitter card image (1200 × 630) for kansolabs.org pages.',
  },
]

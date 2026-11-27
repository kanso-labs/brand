// What the page shows, from the same manifest the asset scripts build from, so
// a new form, version or icon appears here with its downloads.

import palette from '../colors/palette.json'
import { forms, images, logoMasters, versions } from '../scripts/assets.mjs'

export { forms, images, logoMasters, versions }

export const MEASUREMENT_ID = 'G-G5J7LFENG0'
export const SITE = 'https://brand.kansolabs.org/'
export const GITHUB = 'https://github.com/kanso-labs/brand'
export const MEASURE = '1200px'
export const ZIP = 'kanso-labs-brand.zip'

type Token = {
  $description: string
  $extensions?: { 'org.kansolabs.kui'?: Record<string, string[]> }
  $value: string
}
type Group = Record<string, Token>

const colours = palette.color as unknown as { core: Group; support: Group }

// palette.json orders its keys by name, as every kanso-labs JSON file does;
// the page shows them by importance.
const order = {
  core: ['ink', 'paper', 'white', 'inkDark', 'night', 'black'],
  support: [
    'muted',
    'mutedDark',
    'outline',
    'outlineDark',
    'divider',
    'dividerDark',
    'container',
    'containerDark',
  ],
} as const

const names: Record<string, string> = {
  black: 'Black',
  container: 'Container',
  containerDark: 'Container, dark',
  divider: 'Divider',
  dividerDark: 'Divider, dark',
  ink: 'Ink',
  inkDark: 'Ink, dark',
  muted: 'Muted',
  mutedDark: 'Muted, dark',
  night: 'Night',
  outline: 'Outline',
  outlineDark: 'Outline, dark',
  paper: 'Paper',
  white: 'White',
}

export type Swatch = {
  description: string
  hex: string
  id: string
  name: string
  rgb: string
  tokens: { scheme: string; names: string[] }[]
}

function swatch(group: Group, id: string): Swatch {
  const token = group[id]
  const n = parseInt(token.$value.slice(1), 16)
  return {
    description: token.$description,
    hex: token.$value,
    id,
    name: names[id] ?? id,
    rgb: `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`,
    tokens: Object.entries(token.$extensions?.['org.kansolabs.kui'] ?? {}).map(
      ([scheme, list]) => ({ names: list, scheme }),
    ),
  }
}

export const swatches = {
  core: order.core.map((id) => swatch(colours.core, id)),
  support: order.support.map((id) => swatch(colours.support, id)),
}

// WCAG 2.2 relative luminance and contrast ratio.
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const { core, support } = colours
const pairs: [Token, Token, number, string][] = [
  [core.ink, core.paper, 4.5, 'Text and the logo on paper'],
  [core.ink, core.white, 4.5, 'Text on cards and icon tiles'],
  [core.ink, support.container, 4.5, 'Text on a filled container'],
  [support.muted, core.paper, 4.5, 'Secondary text on paper'],
  [support.muted, core.white, 4.5, 'Secondary text on cards'],
  [support.outline, core.paper, 3, 'A control’s border on paper'],
  [core.white, core.ink, 4.5, 'Text and the reversed logo on ink'],
  [core.inkDark, core.night, 4.5, 'Text on night'],
  [core.white, core.night, 3, 'The reversed logo on night'],
  [support.mutedDark, core.night, 4.5, 'Secondary text on night'],
  [support.outlineDark, core.night, 3, 'A control’s border on night'],
  [
    core.inkDark,
    support.containerDark,
    4.5,
    'Text on a filled container, dark',
  ],
  [core.black, core.white, 3, 'The one-colour logo in print'],
]

export const contrast = pairs.map(([fg, bg, needs, use]) => ({
  bg: bg.$value,
  fg: fg.$value,
  needs,
  ratio: ratio(fg.$value, bg.$value),
  use,
}))

// The prerender fails on a pair below its threshold, so a palette change that
// breaks one cannot be published.
for (const c of contrast) {
  if (c.ratio < c.needs) {
    throw new Error(
      `${c.fg} on ${c.bg} is ${c.ratio.toFixed(2)}:1, under ${c.needs}:1`,
    )
  }
}

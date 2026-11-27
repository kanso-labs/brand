import {
  Button,
  Card,
  Code,
  Container,
  Link,
  Stack,
  Tag,
  Text,
} from '@kanso-labs/kanso-ui'

import {
  GITHUB,
  MEASURE,
  SITE,
  ZIP,
  contrast,
  forms,
  images,
  logoMasters,
  swatches,
  type Swatch,
} from '../brand'
import { DailyMark, Logo } from '../components/logo'

const title = 'Kanso Labs brand'
const description =
  'The Kanso Labs mark, its lockups and icons, the palette and type, and the rules for using them.'

export const meta = () => [
  { title },
  { content: description, name: 'description' },
  { href: SITE, rel: 'canonical', tagName: 'link' },
  { content: 'Kanso Labs', property: 'og:site_name' },
  { content: title, property: 'og:title' },
  { content: description, property: 'og:description' },
  { content: SITE, property: 'og:url' },
  { content: `${SITE}social/og-card-1200x630.png`, property: 'og:image' },
  { content: 'website', property: 'og:type' },
  { content: 'summary_large_image', name: 'twitter:card' },
]

const sections = [
  ['logo', 'Logo'],
  ['clear-space', 'Clear space'],
  ['icons', 'Icons'],
  ['colour', 'Colour'],
  ['type', 'Type'],
  ['usage', 'Usage'],
  ['products', 'Products'],
  ['downloads', 'Downloads'],
] as const

const file = (path: string) => path.split('/').pop() ?? path

// A row of downloads for one asset: the master first, then each PNG. Every
// link to a file gets `download` from scripts/site.mjs, which kanso-ui's
// Button has no prop for.
function Downloads({
  label,
  links,
}: {
  label: string
  links: { href: string; text: string }[]
}) {
  return (
    <Stack aria-label={`Download ${label}`} gap="xs" render={<div />}>
      <Text tone="muted" variant="labelMedium">
        Download
      </Text>
      <div className="downloads">
        {links.map((link, i) => (
          <Button
            href={link.href}
            key={link.href}
            size="xs"
            variant={i === 0 ? 'tonal' : 'outlined'}
          >
            {link.text}
          </Button>
        ))}
      </div>
    </Stack>
  )
}

function SectionIntro({
  id,
  lede,
  title,
}: {
  id: string
  lede: React.ReactNode
  title: string
}) {
  return (
    <div className="section__intro">
      <Text id={`${id}-title`} render={<h2 />} variant="headlineLarge">
        {title}
      </Text>
      <Text block className="measure" tone="muted" variant="bodyLarge">
        {lede}
      </Text>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <Container maxInlineSize={MEASURE}>
        <div className="site-header__row">
          <a
            aria-label="Kanso Labs brand, top of the page"
            className="site-header__home"
            href="#top"
          >
            <Logo form="horizontal" label="" />
          </a>
          <nav aria-label="Sections" className="site-nav">
            {sections.map(([id, label]) => (
              <Button href={`#${id}`} key={id} size="xs" variant="text">
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="top">
      <Container maxInlineSize={MEASURE}>
        <div className="hero__grid">
          <Stack className="hero__body" gap="xxl">
            <Text
              className="hero__title"
              id="hero-title"
              render={<h1 />}
              variant="displayLarge"
            >
              The Kanso Labs brand
            </Text>
            <Text
              block
              className="hero__lede"
              tone="muted"
              variant="titleLarge"
            >
              <em>Kanso</em>, <span lang="ja">簡素</span>, is simplicity through
              elimination. The brand keeps to it: one mark, a tea leaf drawn in
              one line, ink on paper, with no colour of its own. Every file is
              here, with the few rules that keep it what it is.
            </Text>
            <Stack direction="row" gap="md" wrap>
              <Button href={ZIP} variant="filled">
                Download everything
              </Button>
              <Button href={GITHUB} variant="outlined">
                View on GitHub
              </Button>
            </Stack>
          </Stack>
          <div className="hero__mark">
            <Logo
              form="stacked"
              label="The Kanso Labs logo: a tea leaf over the name KANSO"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

function LogoSection() {
  const masters = logoMasters()
  return (
    <section aria-labelledby="logo-title" className="section" id="logo">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="logo"
            lede="Each form comes as an SVG master and PNGs with transparent grounds, named by their width in pixels, in full colour, one colour and reversed. Scale the SVG rather than a PNG."
            title="Logo"
          />
          <div>
            {forms.map((form) => (
              <div
                aria-labelledby={`${form.file}-title`}
                className="group split"
                key={form.file}
                role="group"
              >
                <Stack className="split__aside group__aside" gap="sm">
                  <Text
                    id={`${form.file}-title`}
                    render={<h3 />}
                    variant="titleLarge"
                  >
                    {form.name}
                  </Text>
                  <Text block tone="muted" variant="bodyMedium">
                    {form.use}
                  </Text>
                </Stack>
                <div className="split__main asset-grid">
                  {masters
                    .filter((m) => m.form === form)
                    .map(({ png, svg, version }) => (
                      <Card
                        className="asset"
                        key={svg}
                        padding="none"
                        variant="outlined"
                      >
                        <div
                          className={`asset__preview${form.file.startsWith('kanso-mark') ? ' asset__preview--mark' : ''}`}
                          style={{ background: version.ground }}
                        >
                          <img
                            alt={`${form.name}, ${version.name.toLowerCase()}`}
                            src={svg}
                          />
                        </div>
                        <Stack className="asset__body" gap="lg">
                          <Stack gap="xxs">
                            <Text render={<h4 />} variant="titleMedium">
                              {version.name}
                            </Text>
                            <Text block tone="muted" variant="bodyMedium">
                              {version.use}
                            </Text>
                          </Stack>
                          <Downloads
                            label={`${form.name}, ${version.name}`}
                            links={[
                              { href: svg, text: 'SVG' },
                              ...form.sizes.map((size: number) => ({
                                href: png(size),
                                text: `${size}`,
                              })),
                            ]}
                          />
                        </Stack>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  )
}

function ClearSpace() {
  const sizes = [
    ['Horizontal lockup', '120 px wide', '30 mm wide'],
    ['Stacked lockup', '80 px wide', '20 mm wide'],
    ['Wordmark', '80 px wide', '20 mm wide'],
    ['Mark', '49 px wide and up', '12 mm wide'],
    ['Mark, small sizes', '16 to 48 px', 'Not for print'],
  ]
  return (
    <section
      aria-labelledby="clear-space-title"
      className="section section--tinted"
      id="clear-space"
    >
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="clear-space"
            lede={
              <>
                Leave at least <strong>x</strong> clear on every side of a
                lockup or the wordmark, where x is the height of the K. Around
                the mark alone, leave half the leaf’s height. Nothing comes
                inside it: no text, no edge, no other mark.
              </>
            }
            title="Clear space and minimum size"
          />
          <div className="split">
            <div className="split__aside clear">
              <div className="clear__box">
                <span className="clear__label">x</span>
                <img
                  alt="The horizontal lockup inside its clear space"
                  src="logo/svg/kanso-horizontal.svg"
                />
              </div>
            </div>
            <div
              aria-label="Minimum sizes"
              className="split__main table-scroll"
              role="region"
              tabIndex={0}
            >
              <table className="table">
                <caption className="visually-hidden">Minimum sizes</caption>
                <thead>
                  <tr>
                    <th scope="col">Form</th>
                    <th scope="col">On screen</th>
                    <th scope="col">In print</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map(([form, screen, print]) => (
                    <tr key={form}>
                      <th scope="row">{form}</th>
                      <td>{screen}</td>
                      <td>{print}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Text
                block
                className="table-note"
                tone="muted"
                variant="bodyMedium"
              >
                Below these sizes the wordmark’s hairlines and the leaf’s line
                fall under a pixel. Scale every lockup whole.
              </Text>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  )
}

function ImageCards({ group }: { group: 'icons' | 'social' }) {
  return (
    <div className="asset-grid asset-grid--wide">
      {images
        .filter((image) => image.group === group)
        .map((image) => {
          const preview = image.outputs.at(-1)!.file
          const pixel = /favicon-(16|48)\.png$/.test(preview)
          const files = [
            ...(image.svg.endsWith('favicon.svg') ? [] : [image.svg]),
            ...(image.ico ? [image.ico] : []),
            ...image.outputs.map((o: { file: string }) => o.file),
          ]
          return (
            <Card
              className="asset"
              key={image.name}
              padding="none"
              variant="outlined"
            >
              <div className="asset__preview asset__preview--checker">
                <img
                  alt={image.name}
                  className={pixel ? 'asset__pixel' : undefined}
                  src={preview}
                />
              </div>
              <Stack className="asset__body" gap="lg">
                <Stack gap="xxs">
                  <Text render={<h3 />} variant="titleMedium">
                    {image.name}
                  </Text>
                  <Text block tone="muted" variant="bodyMedium">
                    {image.use}
                  </Text>
                </Stack>
                <Downloads
                  label={image.name}
                  links={files.map((f) => ({ href: f, text: file(f) }))}
                />
              </Stack>
            </Card>
          )
        })}
    </div>
  )
}

function Icons() {
  return (
    <section aria-labelledby="icons-title" className="section" id="icons">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="icons"
            lede="The leaf on a white tile, so it reads on any tab bar or launcher, and the avatar, store and link-preview images."
            title="Icons and social images"
          />
          <Stack gap="lg">
            <Text render={<h3 />} variant="titleLarge">
              App and web icons
            </Text>
            <ImageCards group="icons" />
          </Stack>
          <Card className="snippet" variant="filled">
            <Stack gap="sm">
              <Text render={<h3 />} variant="titleMedium">
                In a page’s head
              </Text>
              <pre
                aria-label="Icon links for a page’s head"
                className="code-block"
                tabIndex={0}
              >
                <Code>{`<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</Code>
              </pre>
            </Stack>
          </Card>
          <Stack gap="lg">
            <Text render={<h3 />} variant="titleLarge">
              Avatars, stores and social cards
            </Text>
            <ImageCards group="social" />
          </Stack>
        </Stack>
      </Container>
    </section>
  )
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  return (
    <Card className="swatch" padding="none" variant="outlined">
      <div className="swatch__chip" style={{ background: swatch.hex }} />
      <Stack className="swatch__body" gap="sm">
        <Text render={<h4 />} variant="titleMedium">
          {swatch.name}
        </Text>
        <Text variant="bodyMedium">
          <Code>{swatch.hex}</Code> · <Code>rgb({swatch.rgb})</Code>
        </Text>
        <Text block tone="muted" variant="bodyMedium">
          {swatch.description}
        </Text>
        {swatch.tokens.map((t) => (
          <Stack gap="xxs" key={t.scheme}>
            <Text tone="muted" variant="labelSmall">
              {t.scheme === 'light' ? 'Light scheme' : 'Dark scheme'}
            </Text>
            {t.names.map((n) => (
              <Text block key={n} tone="muted" variant="bodySmall">
                <Code className="token">{n}</Code>
              </Text>
            ))}
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}

function Colour() {
  return (
    <section
      aria-labelledby="colour-title"
      className="section section--tinted"
      id="colour"
    >
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="colour"
            lede={
              <>
                Ink on paper, and the greys between. Colour on a Kanso Labs page
                comes only from what a product brings. Each colour names the
                kanso-ui token kansolabs.org sets it on; the data is{' '}
                <Code>colors/palette.json</Code>.
              </>
            }
            title="Colour"
          />
          <Stack gap="lg">
            <Text render={<h3 />} variant="titleLarge">
              Core
            </Text>
            <div className="swatch-grid">
              {swatches.core.map((s) => (
                <SwatchCard key={s.id} swatch={s} />
              ))}
            </div>
          </Stack>
          <Stack gap="lg">
            <Text render={<h3 />} variant="titleLarge">
              Supporting greys
            </Text>
            <div className="swatch-grid">
              {swatches.support.map((s) => (
                <SwatchCard key={s.id} swatch={s} />
              ))}
            </div>
          </Stack>
          <Stack gap="lg">
            <Stack gap="xs">
              <Text render={<h3 />} variant="titleLarge">
                Contrast
              </Text>
              <Text block className="measure" tone="muted" variant="bodyMedium">
                Every pairing the brand uses, against WCAG 2.2 AA: 4.5:1 for
                text, 3:1 for large text, a control’s border and the logo. The
                build fails if one falls short.
              </Text>
            </Stack>
            <div
              aria-label="Contrast pairs"
              className="table-scroll"
              role="region"
              tabIndex={0}
            >
              <table className="table table--wide">
                <caption className="visually-hidden">Contrast pairs</caption>
                <thead>
                  <tr>
                    <th scope="col">Sample</th>
                    <th scope="col">Pair</th>
                    <th scope="col">Used for</th>
                    <th scope="col">Ratio</th>
                    <th scope="col">AA</th>
                  </tr>
                </thead>
                <tbody>
                  {contrast.map((c) => (
                    <tr key={`${c.fg}${c.bg}`}>
                      <td>
                        {c.needs < 4.5 && !c.use.startsWith('Text') ? (
                          // A 3:1 pair is for borders and the logo, not
                          // text, so its sample is a line, not letters.
                          <span
                            aria-hidden="true"
                            className="pair pair--line"
                            style={{ background: c.bg, color: c.fg }}
                          />
                        ) : (
                          <span
                            className="pair"
                            style={{ background: c.bg, color: c.fg }}
                          >
                            Aa
                          </span>
                        )}
                      </td>
                      <td>
                        <Code>{c.fg}</Code> on <Code>{c.bg}</Code>
                      </td>
                      <td>{c.use}</td>
                      <td>{c.ratio.toFixed(2)}:1</td>
                      <td>
                        <Tag tone="positive" variant="outlined">
                          Passes {c.needs}:1
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </Container>
    </section>
  )
}

const faces = [
  {
    designers: 'Commercial Type, Greg Gazdowicz',
    family: 'brand',
    files: [
      'typography/fonts/roboto-serif/roboto-serif-latin-opsz-normal.woff2',
      'typography/fonts/roboto-serif/OFL.txt',
    ],
    name: 'Roboto Serif',
    role: 'The wordmark, display, headlines and large titles',
    text: 'The wordmark is Roboto Serif 400 at optical size 144, outlined in the logo files. In text it is set light, 300, and 350 for headlines.',
    url: 'https://fonts.google.com/specimen/Roboto+Serif',
  },
  {
    designers: 'Font Bureau, David Berlow and others',
    family: 'plain',
    files: [
      'typography/fonts/roboto-flex/roboto-flex-latin-opsz-normal.woff2',
      'typography/fonts/roboto-flex/OFL.txt',
    ],
    name: 'Roboto Flex',
    role: 'Text, interface and labels',
    text: 'Everything else: body, buttons, captions.',
    url: 'https://fonts.google.com/specimen/Roboto+Flex',
  },
  {
    designers: 'Christian Robertson',
    family: 'mono',
    files: [
      'typography/fonts/roboto-mono/roboto-mono-latin-wght-normal.woff2',
      'typography/fonts/roboto-mono/OFL.txt',
    ],
    name: 'Roboto Mono',
    role: 'Code',
    text: 'Code, tokens and anything to be copied exactly.',
    url: 'https://fonts.google.com/specimen/Roboto+Mono',
  },
]

function Type() {
  return (
    <section aria-labelledby="type-title" className="section" id="type">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="type"
            lede="The three faces kanso-ui’s type roles are drawn for, all under the SIL Open Font License 1.1: free to use, embed and ship."
            title="Type"
          />
          <div className="asset-grid asset-grid--wide">
            {faces.map((face) => (
              <Card className="face" key={face.name} variant="outlined">
                <Stack gap="lg">
                  <Text tone="muted" variant="labelLarge">
                    {face.role}
                  </Text>
                  <span className={`specimen specimen--${face.family}`}>
                    {face.name}
                  </span>
                  <Text block tone="muted" variant="bodyMedium">
                    {face.text} Token:{' '}
                    <Code>{`--kui-typography-font-family-${face.family}`}</Code>
                  </Text>
                  <Text block tone="muted" variant="bodySmall">
                    {face.designers} · SIL Open Font License 1.1
                  </Text>
                  <div className="downloads">
                    <Button href={face.files[0]} size="xs" variant="tonal">
                      WOFF2
                    </Button>
                    <Button href={face.files[1]} size="xs" variant="outlined">
                      OFL.txt
                    </Button>
                    <Button href={face.url} size="xs" variant="text">
                      Google Fonts
                    </Button>
                  </div>
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  )
}

const rules: {
  do: boolean
  ground: 'night' | 'white'
  image: string
  style?: string
  text: string
}[] = [
  {
    do: true,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    text: 'Use full colour on paper or white, with its clear space.',
  },
  {
    do: true,
    ground: 'night',
    image: 'logo/svg/kanso-horizontal-reversed.svg',
    text: 'Use the reversed logo on night or any dark, quiet ground.',
  },
  {
    do: true,
    ground: 'white',
    image: 'logo/svg/kanso-mark.svg',
    text: 'Use the mark alone where the name is already said nearby.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    style: 'stretch',
    text: 'Stretch, squash or skew it.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    style: 'recolour',
    text: 'Recolour it, a product’s colour included. The logo has no hue.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    style: 'shadow',
    text: 'Add shadows, glows, outlines or gradients.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    style: 'rotate',
    text: 'Rotate it or set it at an angle.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-horizontal.svg',
    style: 'busy',
    text: 'Place it on a busy photograph or pattern.',
  },
  {
    do: false,
    ground: 'white',
    image: 'logo/svg/kanso-wordmark.svg',
    style: 'retype',
    text: 'Retype the wordmark, or set it in another weight or spacing. Use the files.',
  },
]

function Usage() {
  return (
    <section
      aria-labelledby="usage-title"
      className="section section--tinted"
      id="usage"
    >
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="usage"
            lede="The logo is only ever ink, black or white, whole, and on a quiet ground."
            title="Using the logo"
          />
          <div className="rule-grid">
            {rules.map((rule) => (
              <Card
                className="rule"
                key={rule.text}
                padding="none"
                variant="outlined"
              >
                <div
                  className={`rule__preview rule__preview--${rule.ground}${rule.style ? ` rule--${rule.style}` : ''}`}
                >
                  {rule.style === 'retype' ? (
                    <span className="rule__retyped" aria-hidden="true">
                      KANSO
                    </span>
                  ) : (
                    <img alt="" src={rule.image} />
                  )}
                </div>
                <Stack className="asset__body" gap="sm">
                  <div>
                    <Tag
                      tone={rule.do ? 'positive' : 'negative'}
                      variant="filled"
                    >
                      {rule.do ? 'Do' : 'Don’t'}
                    </Tag>
                  </div>
                  <Text block variant="bodyMedium">
                    {rule.text}
                  </Text>
                </Stack>
              </Card>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  )
}

function Products() {
  return (
    <section aria-labelledby="products-title" className="section" id="products">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxxl">
          <SectionIntro
            id="products"
            lede="Kanso Labs is the maker. A product keeps its own name and, if it has one, its own mark and colours; the Kanso Labs logo appears beside it only to sign it, never inside it."
            title="Products under the brand"
          />
          <div className="asset-grid asset-grid--two">
            <Card variant="outlined">
              <Stack gap="lg">
                <Stack align="center" direction="row" gap="md">
                  <DailyMark />
                  <Text render={<h3 />} variant="headlineSmall">
                    Daily
                  </Text>
                </Stack>
                <Text block tone="muted" variant="bodyLarge">
                  Daily has an identity of its own: a solid d on an iris
                  squircle and its iris palette, shipped from kanso-labs/daily.
                  It never takes the leaf, and the leaf never takes its iris.
                </Text>
                <Text block tone="muted" variant="bodyLarge">
                  Kanso Labs signs it as the developer: the store developer name
                  and icon, and “by Kanso Labs” in an About screen or a site
                  footer, in Roboto Flex.
                </Text>
              </Stack>
            </Card>
            <Card variant="outlined">
              <Stack gap="lg">
                <Stack align="center" direction="row" gap="md">
                  <Logo className="product__mark" form="mark" label="" />
                  <Text render={<h3 />} variant="headlineSmall">
                    Kanso UI
                  </Text>
                </Stack>
                <Text block tone="muted" variant="bodyLarge">
                  Kanso UI, react-native-kanso-ui and the other libraries are
                  part of Kanso Labs, with no mark of their own. They are named
                  in words beside the Kanso Labs mark or logo, on their
                  Storybooks, docs and package pages.
                </Text>
                <Text block tone="muted" variant="bodyLarge">
                  Their default theme is kanso-ui’s own palette; a library’s
                  demo colours are not Kanso Labs colours.
                </Text>
              </Stack>
            </Card>
          </div>
        </Stack>
      </Container>
    </section>
  )
}

function DownloadsSection() {
  return (
    <section
      aria-labelledby="downloads-title"
      className="section section--tinted"
      id="downloads"
    >
      <Container maxInlineSize={MEASURE}>
        <div className="split">
          <Stack className="split__aside" gap="lg">
            <Text id="downloads-title" render={<h2 />} variant="headlineLarge">
              Downloads
            </Text>
            <div>
              <Button href={ZIP} variant="filled">
                Download everything (ZIP)
              </Button>
            </div>
          </Stack>
          <Stack className="split__main" gap="md">
            <Text block className="measure" variant="bodyLarge">
              Every file on this page in one archive: the logo in every form and
              version, the icons and social images, the palette, the fonts and
              the guidelines.
            </Text>
            <Text block className="measure" tone="muted" variant="bodyLarge">
              The logo and the rest of the brand are Kanso Labs’ own and are not
              open source: use them as they are, to refer to Kanso Labs and its
              projects. The fonts are under the SIL Open Font License, and the
              code that builds this page under MIT.{' '}
              <Link
                href={`${GITHUB}/blob/main/LICENSE.md`}
                tone="primary"
                underline="always"
              >
                LICENSE.md
              </Link>{' '}
              has the terms.
            </Text>
          </Stack>
        </div>
      </Container>
    </section>
  )
}

function Privacy() {
  const p = (children: React.ReactNode) => (
    <Text block className="measure" variant="bodyLarge">
      {children}
    </Text>
  )
  const h = (children: string) => (
    <Text render={<h3 />} variant="titleLarge">
      {children}
    </Text>
  )
  return (
    <section aria-labelledby="privacy-title" className="section" id="privacy">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xl">
          <Text id="privacy-title" render={<h2 />} variant="headlineLarge">
            Privacy
          </Text>
          {p(
            'This site uses Google Analytics for anonymous usage statistics: it counts visits and downloads, so Kanso Labs can see which files are used. There are no accounts here and no ads. Nothing that names you is collected; Google Analytics tells one browser from another by a random ID, not by who is using it.',
          )}
          {h('What is recorded')}
          {p(
            'The pages you open and the page that led you here; reaching the end of a page; clicks on links that leave the site; and files you download. With each, Google Analytics records your browser, device, language and approximate location, which it derives from your IP address without storing the address. No user ID is set, and nothing you type is sent. Google signals and every advertising feature are off, and the site tells Google that consent for ads is denied, for every visitor.',
          )}
          {h('Cookies')}
          {p(
            <>
              While analytics is on, Google Analytics sets two cookies on this
              site alone, <Code>_ga</Code> and one beginning <Code>_ga_</Code>,
              to tell a returning browser from a new one. Each Kanso Labs site
              keeps its own.
            </>,
          )}
          {p(
            <>
              Your choice is shared: it applies to every Kanso Labs site under
              kansolabs.org, so you answer once. It is kept for 13 months in a
              cookie on kansolabs.org, <Code>kl_consent</Code>, which your
              browser sends to Kanso Labs sites alone.
            </>,
          )}
          {h('How long it is kept')}
          {p(
            'Google Analytics deletes the records of each visit after 14 months. The totals in its reports, such as how many times a file was downloaded in a month, are kept.',
          )}
          {h('Your choice')}
          {p(
            'In the European Economic Area, the United Kingdom and Switzerland, the site asks before it loads Google Analytics, and nothing is sent until you allow it. A static site cannot see where you are, so it goes by your browser’s time zone, and asks whenever the zone leaves it unsure. Elsewhere analytics is on until you turn it off.',
          )}
          <Stack align="start" gap="md">
            <div aria-live="polite">
              <Text block id="analytics-status" variant="bodyLarge">
                The setting for this browser appears here once the page has
                loaded. If it never does, something in this browser is blocking
                the analytics, and nothing is sent.
              </Text>
            </div>
            <div hidden id="analytics-choice">
              <Button id="analytics-toggle" variant="outlined">
                Turn it off
              </Button>
            </div>
          </Stack>
          {p(
            <>
              Google also offers a{' '}
              <Link
                href="https://tools.google.com/dlpage/gaoptout"
                tone="primary"
                underline="always"
              >
                browser add-on that turns Google Analytics off
              </Link>{' '}
              on every site, and explains{' '}
              <Link
                href="https://policies.google.com/technologies/partner-sites"
                tone="primary"
                underline="always"
              >
                how it uses information from sites that use its services
              </Link>
              .
            </>,
          )}
          {h('Questions')}
          {p(
            <>
              Write to{' '}
              <Link
                href="mailto:contact@kansolabs.org"
                tone="primary"
                underline="always"
              >
                contact@kansolabs.org
              </Link>
              .
            </>,
          )}
        </Stack>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <Container maxInlineSize={MEASURE}>
        <Stack gap="xxl">
          <div className="site-footer__row">
            <Stack align="center" direction="row" gap="lg">
              <Logo className="site-footer__mark" form="mark" label="" />
              <Stack gap="xxs">
                <Text variant="titleMedium">Kanso Labs</Text>
                <Text tone="muted" variant="bodyMedium">
                  <Link
                    href="mailto:contact@kansolabs.org"
                    tone="inherit"
                    underline="hover"
                  >
                    contact@kansolabs.org
                  </Link>
                </Text>
              </Stack>
            </Stack>
            <Stack
              aria-label="Footer"
              direction="row"
              gap="xl"
              render={<nav />}
              wrap
            >
              <Text variant="labelLarge">
                <Link
                  href="https://kansolabs.org/"
                  tone="inherit"
                  underline="hover"
                >
                  kansolabs.org
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href={GITHUB} tone="inherit" underline="hover">
                  GitHub
                </Link>
              </Text>
              <Text variant="labelLarge">
                <Link href="#privacy" tone="inherit" underline="hover">
                  Privacy
                </Link>
              </Text>
            </Stack>
          </div>
          <Text block tone="muted" variant="bodySmall">
            © 2026 Kanso Labs. The brand is Kanso Labs’ own; the fonts are OFL,
            the code MIT.
          </Text>
        </Stack>
      </Container>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#logo">
        Skip to the logo
      </a>
      <Header />
      <main>
        <Hero />
        <LogoSection />
        <ClearSpace />
        <Icons />
        <Colour />
        <Type />
        <Usage />
        <Products />
        <DownloadsSection />
        <Privacy />
      </main>
      <Footer />
    </>
  )
}

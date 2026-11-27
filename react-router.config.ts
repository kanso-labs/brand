import type { Config } from '@react-router/dev/config'

export default {
  // GitHub Pages serves files and runs nothing, so the page is rendered to HTML
  // at build time, as kansolabs.org is. scripts/site.mjs then takes React
  // Router's client scripts out: the page has nothing to hydrate, and without
  // them it works from any address, the claude.ai preview's included.
  prerender: ['/'],
  ssr: false,
} satisfies Config

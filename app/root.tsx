import { Links, Meta, Outlet, Scripts } from 'react-router'

import '@kanso-labs/kanso-ui/styles.css'
import '@kanso-labs/kanso-ui/tokens.css'
import './styles/theme.css'
import './styles/layout.css'

import { MEASUREMENT_ID } from './brand'

// Every address on the page is relative, so the built page works from any
// folder it is served from: brand.kansolabs.org's root, or the claude.ai
// preview's path.
export const links = () => [
  { href: 'favicon.ico', rel: 'icon', sizes: '48x48' },
  { href: 'favicon.svg', rel: 'icon', type: 'image/svg+xml' },
  { href: 'apple-touch-icon.png', rel: 'apple-touch-icon' },
  { href: 'icons/site.webmanifest', rel: 'manifest' },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="#fafafa"
          media="(prefers-color-scheme: light)"
          name="theme-color"
        />
        <meta
          content="#121212"
          media="(prefers-color-scheme: dark)"
          name="theme-color"
        />
        <Meta />
        <Links />
        {/* Google Analytics behind Consent Mode. analytics.js is the one
            file every Kanso Labs site that loads gtag.js loads from
            kansolabs.org; it loads gtag.js only once the visitor may be
            counted, and here draws its own banner, since the page ships no
            React to draw one. If it fails to load, nothing is counted and
            nothing else breaks. */}
        <script
          async
          data-measurement-id={MEASUREMENT_ID}
          data-privacy-url="#privacy"
          src="https://kansolabs.org/analytics.js"
        />
      </head>
      <body>
        {children}
        <Scripts />
        <script src="privacy.js" />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

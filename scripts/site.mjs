// Turns React Router's prerendered build into the published site, _site/.
//
// The page is prerendered with kanso-ui, as kansolabs.org is, but nothing on it
// needs React in the browser: its two scripts, analytics.js, from
// kansolabs.org, and privacy.js, are plain. React Router's client scripts come out, because its router matches
// the address the page is served at, and would draw nothing it knew on the
// claude.ai preview's path. Every address left is made relative, so the folder
// works wherever it is served from.
//
// With --preview it writes brand-preview.html instead: _site/index.html with
// every stylesheet, font, image, script and download inlined as data: URIs, one
// file to open or share without a server.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { zipSync } from 'fflate'
import { root } from './assets.mjs'

const out = join(root, '_site')
const zip = 'kanso-labs-brand.zip'
// What the archive and _site/ carry, at their paths in this repository.
const published = [
  'colors',
  'guidelines',
  'icons',
  'logo',
  'social',
  'typography',
]

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

function site() {
  const client = join(root, 'build/client')
  rmSync(out, { force: true, recursive: true })
  cpSync(client, out, { recursive: true })

  // React Router's own fallback page is for client routing, which is gone.
  rmSync(join(out, '__spa-fallback.html'), { force: true })

  let html = readFileSync(join(out, 'index.html'), 'utf8')
  // React Router's runtime: module preloads, its context and route scripts.
  html = html
    .replace(/<link rel="modulepreload"[^>]*>/g, '')
    .replace(/<script>window\.__reactRouter[\s\S]*?<\/script>/g, '')
    .replace(/<script type="module"[\s\S]*?<\/script>/g, '')
  // Root-relative addresses become relative to the page.
  html = html.replace(/(href|src)="\/(?!\/)/g, '$1="')
  // A link to one of the files is a download, named as the file is.
  const asset = new RegExp(
    `<a([^>]*?) href="((?:${published.join('|')})/[^"]+|${zip})"`,
    'g',
  )
  html = html.replace(
    asset,
    (_, before, href) =>
      `<a${before} href="${href}" download="${href.split('/').pop()}"`,
  )
  if (/<script type="module"|__reactRouter|modulepreload/.test(html)) {
    throw new Error('React Router scripts are left in index.html')
  }
  writeFileSync(join(out, 'index.html'), html)

  // Stylesheets sit in assets/ beside the fonts they load.
  for (const css of files(join(out, 'assets')).filter((f) =>
    f.endsWith('.css'),
  )) {
    writeFileSync(
      css,
      readFileSync(css, 'utf8').replace(/url\(\/assets\//g, 'url('),
    )
  }
  // Nothing loads the client JavaScript any more.
  for (const js of files(join(out, 'assets')).filter((f) => f.endsWith('.js')))
    rmSync(js)

  for (const dir of published)
    cpSync(join(root, dir), join(out, dir), { recursive: true })
  // Browsers and crawlers look for these at the root.
  for (const icon of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png']) {
    cpSync(join(root, 'icons', icon), join(out, icon))
  }

  const archive = {}
  for (const dir of published) {
    for (const file of files(join(root, dir))) {
      archive[`kanso-labs-brand/${file.slice(root.length)}`] =
        readFileSync(file)
    }
  }
  archive['kanso-labs-brand/LICENSE.md'] = readFileSync(
    join(root, 'LICENSE.md'),
  )
  writeFileSync(join(out, zip), zipSync(archive, { level: 9 }))
  console.log(`_site/ (${files(out).length} files)`)
}

const types = {
  '.css': 'text/css',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.zip': 'application/zip',
}

function dataUri(path, bytes = readFileSync(path)) {
  return `data:${types[extname(path)] ?? 'application/octet-stream'};base64,${bytes.toString('base64')}`
}

function preview() {
  if (!existsSync(join(out, 'index.html')))
    throw new Error('Run npm run build first')
  let html = readFileSync(join(out, 'index.html'), 'utf8')
  // Stylesheets inline, with their fonts.
  html = html.replace(
    /<link rel="stylesheet" href="([^"]+)"[^>]*>/g,
    (_, href) => {
      const path = join(out, href)
      const css = readFileSync(path, 'utf8').replace(
        /url\(([^)'"]+)\)/g,
        (m, url) =>
          url.startsWith('data:')
            ? m
            : `url(${dataUri(join(dirname(path), url))})`,
      )
      return `<style>${css}</style>`
    },
  )
  // Scripts inline, but for analytics.js, which stays kansolabs.org's and
  // reads its own data- attributes there.
  html = html.replace(
    /<script([^>]*) src="(?!https?:)([^"]+)"([^>]*)><\/script>/g,
    (_, a, src, b) =>
      `<script${a} src="${dataUri(join(out, src))}"${b}></script>`,
  )
  // Every image and download.
  html = html.replace(
    / (href|src)="(?!https?:|mailto:|#|data:)([^"]+)"/g,
    (m, attr, url) => {
      const path = join(out, url)
      return existsSync(path) && statSync(path).isFile()
        ? ` ${attr}="${dataUri(path)}"`
        : m
    },
  )
  writeFileSync(join(root, 'brand-preview.html'), html)
  console.log(`brand-preview.html (${(html.length / 1e6).toFixed(1)} MB)`)
}

if (process.argv.includes('--preview')) preview()
else site()

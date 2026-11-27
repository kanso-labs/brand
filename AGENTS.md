# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

Kanso Labs' brand: the mark, its lockups, icons and social images, the palette
and type, and the guidelines, with the scripts that build every file from two
drawings and the page that shows them all at
[brand.kansolabs.org](https://brand.kansolabs.org/).

| Path                         | What it is                                                                         |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `source/leaf.svg`            | The leaf, the mark: a tea leaf in one continuous line                              |
| `source/kanso.svg`           | The wordmark: KANSO in Roboto Serif 400, outlined                                  |
| `scripts/assets.mjs`         | The manifest: every form, version, master and PNG, and what each is for            |
| `scripts/compose.mjs`        | Lays out every SVG master from the two drawings, and holds the proportions         |
| `scripts/render.mjs`         | Renders every PNG and `favicon.ico` from the masters, with resvg                   |
| `scripts/site.mjs`           | Turns React Router's build into `_site/`, or `brand-preview.html` with `--preview` |
| `app/routes/home.tsx`        | The brand page, in kanso-ui                                                        |
| `app/brand.ts`               | What the page shows, from the manifest and the palette, and the contrast check     |
| `app/components/logo.tsx`    | The logo drawn inline in currentColor, and Daily's mark                            |
| `app/styles/theme.css`       | kansolabs.org's palette and type as `--kui-*` tokens, plus `data-theme`            |
| `app/styles/layout.css`      | The page's own layout and the grounds the assets are shown on                      |
| `public/analytics.js`        | The shared Google Analytics loader and banner, a copy kept identical               |
| `public/privacy.js`          | The switch in the page's privacy note                                              |
| `logo/`, `icons/`, `social/` | The SVG masters and their PNGs: built, then committed                              |
| `colors/palette.json`        | The palette, in the Design Tokens Community Group format                           |
| `typography/fonts/`          | The web fonts the page loads, copied unmodified from Fontsource                    |
| `guidelines/README.md`       | The rules: clear space, minimum sizes, do's and don'ts, products                   |

## Commands

Install with the Node version in `.tool-versions`. If `node --version` disagrees
with it, prefix the command:

```shell
mise exec node@"$(awk '/^nodejs/{print $2}' .tool-versions)" -- npm install
```

| Task    | Command           | Notes                                                                            |
| ------- | ----------------- | -------------------------------------------------------------------------------- |
| Compose | `npm run compose` | Rewrites every SVG master from `source/`                                         |
| Render  | `npm run render`  | Rewrites every PNG and `favicon.ico` from the masters                            |
| Dev     | `npm run dev`     | React Router's dev server, http://localhost:5173                                 |
| Build   | `npm run build`   | Prerenders the page and writes `_site/`; fails if a contrast pair drops below AA |
| Preview | `npm run preview` | After a build: `brand-preview.html`, self-contained, about 7 MB                  |
| Format  | `npm run format`  | oxfmt; `npm run format:check` is the check                                       |
| Lint    | `npm run lint`    | The formatting check and the typecheck, which CI runs with the assets check      |

## Conventions

### Shared with the other kanso-labs repositories

The canonical text is
[`CONVENTIONS.md`](https://github.com/kanso-labs/.github/blob/main/CONVENTIONS.md)
in `kanso-labs/.github`; this is a copy, kept in step by hand. Change that file
first, then every copy.

- **Keys in JSON and YAML are ordered by name.** Files whose order carries
  meaning are exempt: workflows, where step order is execution order;
  changelogs, which are chronological; and `package.json`, where the npm
  ecosystem expects `name` and `version` first.
- **A workflow's filename is the kebab-case of its `name:` field.** Reusable
  workflows, meaning those triggered only by `workflow_call`, take a leading
  underscore.
- **Job names and step names are imperative verb phrases.** Job ids, step ids,
  and matrix keys are exempt.
- **Actions are pinned to exact release tags**, `actions/checkout@v7.0.1`, never
  `@main` and never a tag the publisher moves — `@v7` and `@v7.0` both move.
  Renovate opens the bump pull requests, and it has nothing to open when the pin
  never changes: `frenck/action-app-linter@v2.21` sat still through a repository
  rename and a release that fixed something a consumer was working around,
  because the tag it named was moved onto both.
- **Dependency versions are pinned exactly.** Every `dependencies`,
  `devDependencies`, and `optionalDependencies` entry is a bare version,
  `1.2.3`, never `^1.2.3`, `~1.2.3`, `>=1.2.3`, `*`, `1.x`, or an `||` union.
  Renovate opens those bumps too. `peerDependencies` are the deliberate
  exception: they state what the consumer's own installed copy must satisfy, so
  ranges are correct there and stay.
- **`.tool-versions` pins a fully-specified version on every line**,
  `nodejs <major>.<minor>.<patch>`, never `nodejs 24` or `nodejs lts`.

### Specific to this repository

- **oxfmt formats this repository**, so the command is `npm run format`.
  `LICENSE.md` is exempt, and unlike every other kanso-labs repository it is not
  the MIT copy: the brand is not open source. It grants use of the assets to
  refer to Kanso Labs, leaves the fonts under their OFL, and puts the scripts
  under MIT.
- **Folder names are American (`colors/`), prose is British (colour)**, as in
  the rest of the organization's writing.

## The assets

**Everything is built from the two drawings in `source/`**: the leaf, drawn for
this mark, and the wordmark, KANSO set in Roboto Serif 400 at optical size 144
and outlined. `source/README.md` says how the wordmark was set, so a new word or
spacing can be set the same way. Both drawings share units in which the cap
height is 360, and every proportion in `compose.mjs` is written in them.

**This mark replaced the organization's first one in 2026-11**, a hand-drawn
leaf over KANSO in a serif no one could name, which existed only as rasters.
Rodrigo chose the new leaf and the Roboto Serif wordmark from proposals drawn
for the purpose; the proposals were not kept in the repository.

**Never edit a master or a PNG by hand.** Change a drawing or a proportion, then
run `npm run compose` and `npm run render`, and commit what they wrote. `Lint`
runs both again and fails on any difference, so an output that does not match
its source cannot reach `main`. resvg draws without system fonts and the same on
every platform, which is what makes that check stable; a resvg update that
changes its antialiasing shows up as a diff of every PNG, and the fix is to
commit the new renders.

**The proportions are the first lockups'.** Stacked, the leaf sits 230 units
(0.64 cap) over the wordmark, centred on it; side by side, 260 units (0.72 cap)
before the K, centred on the wordmark's height. The leaf is 1.32 cap heights
tall, as the first leaf was.

**The small mark keeps the line dark at 16 and 24 px.** It is the leaf with a
12-unit stroke of its own colour around the fill, a quarter of the line, little
enough that the leaf's inside stays open. It is used at 48 px and under only,
which is why `forms` renders it only at 16 to 48. The favicon and the raster
favicons use it; every larger icon uses the regular mark.

**Full colour is ink, `#1a1a1a`, because the mark has no hue.** One colour is
`#000000` for print, and reversed is `#ffffff`. The page's own dark scheme sets
words in `#ececec`, but the logo stays white.

**The Play header and the social card are RGB without alpha**, because the Play
Console refuses a header with an alpha channel. `render.mjs` re-encodes those
two itself, since resvg writes only RGBA.

**`npm run build` checks every contrast pair the page lists** against WCAG AA
and fails on one that falls short, so a palette change that breaks one cannot be
published.

## The page

**It is built as kansolabs.org is: a React Router page prerendered at build
time, in kanso-ui, themed by `app/styles/theme.css`**, a copy of the home page's
with two additions marked in it: the one colour token the home page leaves to
kanso-ui's default, and an explicit `data-theme="light"` or `"dark"` on
`<html>`, as the claude.ai artifact viewer sets, winning over the OS. Every
colour on the page is a token written as a `light-dark()` pair, so either way of
choosing the scheme reaches all of it. The only literal colours are content: the
grounds each asset is drawn for and the swatches; no text sits on them.

**The page ships no React to the browser.** `scripts/site.mjs` takes React
Router's client scripts out of the prerendered HTML and deletes the chunks.
Nothing on the page needs hydrating, and React Router's router matches the
address it is served at, so on any other path, such as the claude.ai preview's,
it would draw its not-found page over the content. Every address left is made
relative, so `_site/` works from any folder.

**kanso-ui's Button has no `download` prop**, so `scripts/site.mjs` adds
`download` to every link to a file under the asset folders, and to the archive.

**A new form, version or icon in `scripts/assets.mjs` appears on the page with
its downloads**, through `app/brand.ts`, without touching the page.

**The page loads nothing from anywhere else but Google Analytics.** The fonts
are Fontsource's, bundled into the build, the images are the repository's own,
and the only scripts are `analytics.js` and `privacy.js`.

**How the page was checked**: Playwright and axe-core over `_site/` served from
a deep path, at 390, 840 and 1440 px, light and dark by `prefers-color-scheme`
and by `data-theme`: no axe violations, no horizontal overflow, no console
errors, every image, font and download loading. Run the same before a change to
the layout reaches `main`.

## Analytics

**The site counts visits with Google Analytics 4, through gtag.js and no Tag
Manager, behind Google Consent Mode v2**, as kansolabs.org does since
kanso-labs/kanso-labs.github.io#114. The measurement ID, `G-G5J7LFENG0`, is the
property kansolabs.org and docs.kansolabs.org share; it is public by nature, so
it sits in the `<script>` tag in `app/root.tsx`.

**`public/analytics.js` is the same file in every Kanso Labs site that loads
gtag.js itself.** Change one copy and carry the change to the others; never edit
this one alone. Here it draws its own banner, since the page ships no React to
draw kansolabs.org's kanso-ui one, and `data-privacy-url="#privacy"` points it
at the page's privacy note. `public/privacy.js` is the note's switch: it follows
the `kanso-analytics` event and calls `window.kansoAnalytics.grant()` or
`deny()`.

**Ads signals are denied for everyone; analytics storage is denied in the EEA,
the UK and Switzerland, where the banner asks first, and granted elsewhere, with
a notice that offers to opt out.** Whether to ask is decided from the browser's
time zone. GA's cookies stay on this host, and nothing is sent from a host
outside kansolabs.org, so `brand-preview.html` and a local `_site/` draw the
banner but never count.

**Which events are collected is set in GA, not here.** Enhanced measurement
records page views, scrolls, outbound clicks and file downloads, which is what
the privacy note lists; switch on another and the note has to say so too.

## Deploys

`Deploy pages` builds every pull request and publishes every push to `main`,
uploading `_site/` as the Pages artifact. The site is served at
brand.kansolabs.org.

**The custom domain is a repository setting.** A site published by a workflow
ignores a `CNAME` file; `public/CNAME` is copied into the artifact only to say
where it is served. The domain is set under Settings › Pages, or with
`gh api -X PUT repos/kanso-labs/brand/pages -f cname=brand.kansolabs.org`, and
HTTPS is enforced there once GitHub has issued the certificate.

**DNS for kansolabs.org is on Cloudflare**, where `brand` is a CNAME to
`kanso-labs.github.io`, DNS only rather than proxied, so GitHub issues and
renews the certificate itself.

## Commits and pull requests

**Dependabot raises security updates here and nothing else.**
`.github/dependabot.yaml` has an entry for `npm` and one for `github-actions`,
each with `open-pull-requests-limit: 0`, and `commit-message.prefix: deps`, so
its titles pass `Lint`. Renovate owns version updates.

Pull requests are squash-merged, with the pull request title as the commit
subject, so that title is the one line that reaches `main`. It is a Conventional
Commit, and `Lint` runs it through commitlint. `.commitlintrc.json` admits
`deps` beside the standard types, for Renovate's pull requests.

## Traps

**A fresh worktree has no `node_modules`**, so the first `npm run compose` fails
on a missing resvg. Run `npm ci` first.

**`build/`, `_site/` and `brand-preview.html` are build output** and are ignored
by git. Build them again rather than editing them.

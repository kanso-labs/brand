# Kanso Labs brand

The Kanso Labs mark, its lockups, icons and social images, the palette and type,
and the rules for using them. Everything here is shown, with a download beside
each file, at **[brand.kansolabs.org](https://brand.kansolabs.org/)**.

_Kanso_ (簡素) is simplicity through elimination, and the brand keeps to it: one
mark, a tea leaf drawn in one line and the name in spaced capitals, in ink on
paper with no colour of its own.

## What is here

| Folder        | What it holds                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `logo/`       | The mark, the small-size mark, the wordmark, and horizontal and stacked lockups, as SVG and PNG    |
| `icons/`      | Favicons (`.ico`, `.svg`, PNG), the Apple touch icon, app icons, maskable icons and a web manifest |
| `social/`     | The GitHub organization avatar, the Google Play developer icon and header, and the Open Graph card |
| `colors/`     | The palette as Design Tokens (`palette.json`) and CSS (`palette.css`), with contrast pairs         |
| `typography/` | The three typefaces, their roles and licences, and the web fonts the brand page loads              |
| `guidelines/` | Clear space, minimum sizes, do's and don'ts, and how products sit under the brand                  |
| `source/`     | The two drawings everything is built from: the leaf, and the wordmark outlined from Roboto Serif   |
| `scripts/`    | The build: SVG masters from the drawings, PNGs from the masters, and the brand page                |
| `app/`        | The brand page: React Router and kanso-ui, as kansolabs.org is built                               |

Every logo comes in full colour (ink, `#1a1a1a`), one colour (black) and
reversed (white). PNGs are named by their width in pixels:
`logo/png/kanso-horizontal-1024.png` is 1024 pixels wide.

## Using the files

Take the file that fits and use it as it is. The SVGs are the masters; scale
them rather than a PNG. [`guidelines/`](guidelines/README.md) says which form to
use where, how much space to leave around it, and what never to do to it.

The brand is not open source. You may use it unmodified to refer to Kanso Labs
and its projects; see [LICENSE.md](LICENSE.md). The fonts are under the SIL Open
Font License, and the scripts under MIT.

## Building

Install with the Node version in `.tool-versions`, then:

| Task    | Command           | What it does                                                              |
| ------- | ----------------- | ------------------------------------------------------------------------- |
| Compose | `npm run compose` | Writes every SVG master in `logo/`, `icons/` and `social/` from `source/` |
| Render  | `npm run render`  | Renders every PNG and `favicon.ico` from the SVG masters                  |
| Build   | `npm run build`   | Prerenders the page and writes `_site/`, as GitHub Pages publishes it     |
| Preview | `npm run preview` | After a build, `brand-preview.html`: the page as one self-contained file  |
| Format  | `npm run format`  | oxfmt; `npm run lint` is the check                                        |

The SVG masters and PNGs are committed, so the files can be taken straight from
GitHub; CI composes and renders them again and fails if anything changed.

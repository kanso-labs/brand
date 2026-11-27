# Colour

The mark is ink on paper and has no hue, so the palette is ink, paper and the
greys between them. Colour on a Kanso Labs page comes only from what a product
brings. `palette.json` holds the values in the
[Design Tokens Community Group](https://design-tokens.github.io/community-group/format/)
format, and `palette.css` as custom properties.

Each colour is the value kansolabs.org sets on a kanso-ui token, in
[`app/styles/theme.css`](https://github.com/kanso-labs/kanso-labs.github.io/blob/main/app/styles/theme.css).
kanso-ui-core's own default tokens are the library's Material Design baseline,
not the brand: a library's demo colours are not Kanso Labs colours.

## Core

| Name     | Hex       | RGB           | kanso-ui token                                                          |
| -------- | --------- | ------------- | ----------------------------------------------------------------------- |
| Ink      | `#1a1a1a` | 26, 26, 26    | light `--kui-color-primary`, `--kui-color-on-surface`, `-on-background` |
| Paper    | `#fafafa` | 250, 250, 250 | light `--kui-color-background`, `--kui-color-surface`                   |
| White    | `#ffffff` | 255, 255, 255 | light `--kui-color-surface-container-lowest`, `--kui-color-on-primary`  |
| Ink dark | `#ececec` | 236, 236, 236 | dark `--kui-color-primary`, `--kui-color-on-surface`, `-on-background`  |
| Night    | `#121212` | 18, 18, 18    | dark `--kui-color-background`, `--kui-color-surface`                    |
| Black    | `#000000` | 0, 0, 0       | none: the one-colour logo, for print                                    |

## Supporting greys

| Name           | Hex       | RGB           | kanso-ui token                                                   |
| -------------- | --------- | ------------- | ---------------------------------------------------------------- |
| Muted          | `#5c5c5c` | 92, 92, 92    | light `--kui-color-on-surface-variant`                           |
| Muted dark     | `#b3b3b3` | 179, 179, 179 | dark `--kui-color-on-surface-variant`                            |
| Outline        | `#8a8a8a` | 138, 138, 138 | light `--kui-color-outline`                                      |
| Outline dark   | `#8c8c8c` | 140, 140, 140 | dark `--kui-color-outline`                                       |
| Divider        | `#dcdcdc` | 220, 220, 220 | light `--kui-color-outline-variant`                              |
| Divider dark   | `#3a3a3a` | 58, 58, 58    | dark `--kui-color-outline-variant`                               |
| Container      | `#e9e9e9` | 233, 233, 233 | light `--kui-color-primary-container`, `-surface-container-high` |
| Container dark | `#2b2b2b` | 43, 43, 43    | dark `--kui-color-primary-container`, `-surface-variant`         |

## Contrast

Every pairing the brand uses, against WCAG 2.2 AA: 4.5:1 for text, 3:1 for large
text, a control's border and the logo. `npm run build` recomputes these from
`palette.json` and fails if one drops below its threshold.

| Pair                   | Used for                          | Ratio   | Needs |
| ---------------------- | --------------------------------- | ------- | ----- |
| `#1a1a1a` on `#fafafa` | Text and the logo on paper        | 16.67:1 | 4.5:1 |
| `#1a1a1a` on `#ffffff` | Text on cards and icon tiles      | 17.40:1 | 4.5:1 |
| `#1a1a1a` on `#e9e9e9` | Text on a filled container        | 14.34:1 | 4.5:1 |
| `#5c5c5c` on `#fafafa` | Secondary text on paper           | 6.41:1  | 4.5:1 |
| `#5c5c5c` on `#ffffff` | Secondary text on cards           | 6.69:1  | 4.5:1 |
| `#8a8a8a` on `#fafafa` | A control's border on paper       | 3.31:1  | 3:1   |
| `#ffffff` on `#1a1a1a` | Text and the reversed logo on ink | 17.40:1 | 4.5:1 |
| `#ececec` on `#121212` | Text on night                     | 15.86:1 | 4.5:1 |
| `#ffffff` on `#121212` | The reversed logo on night        | 18.73:1 | 3:1   |
| `#b3b3b3` on `#121212` | Secondary text on night           | 8.93:1  | 4.5:1 |
| `#8c8c8c` on `#121212` | A control's border on night       | 5.57:1  | 3:1   |
| `#ececec` on `#2b2b2b` | Text on a filled container, dark  | 11.99:1 | 4.5:1 |
| `#000000` on `#ffffff` | The one-colour logo in print      | 21.00:1 | 3:1   |

Dividers (`#dcdcdc` on paper, 1.31:1) carry no meaning and need no ratio; never
use one as the only border of a control.

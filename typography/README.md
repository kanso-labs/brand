# Type

The brand uses the three faces kanso-ui's type roles are drawn for. All three
are under the SIL Open Font License 1.1: free to use, embed and redistribute,
including in commercial work, as long as the fonts are not sold on their own.

| Face         | Role                                                     | kanso-ui token                       | Designers                            |
| ------------ | -------------------------------------------------------- | ------------------------------------ | ------------------------------------ |
| Roboto Serif | Display, headlines and large titles, set light (300–350) | `--kui-typography-font-family-brand` | Commercial Type, Greg Gazdowicz      |
| Roboto Flex  | Body, interface, labels: everything else                 | `--kui-typography-font-family-plain` | Font Bureau, David Berlow and others |
| Roboto Mono  | Code, tokens, anything to copy exactly                   | `--kui-typography-font-family-mono`  | Christian Robertson                  |

In text, the large serif roles are set lighter than the wordmark's 400, as
kansolabs.org does, so a page's headlines never compete with the logo.

**The wordmark is Roboto Serif 400**, at optical size 144, normal width and
grade 0, with its letters spaced 1.55 cap heights apart by their centres and
outlined in the logo files. Use those files rather than setting KANSO again: the
spacing is part of the logo, and a live font would draw it differently.

## The files

`fonts/` holds each face's Latin variable WOFF2, the files brand.kansolabs.org
loads, copied unmodified from Fontsource 5.3.0 (`@fontsource-variable/*`), with
each face's `OFL.txt`. For desktop use, install the full families from Google
Fonts: [Roboto Serif](https://fonts.google.com/specimen/Roboto+Serif),
[Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex),
[Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono).

| File                                                | Axes                          |
| --------------------------------------------------- | ----------------------------- |
| `roboto-serif/roboto-serif-latin-opsz-normal.woff2` | weight 100–900, optical size  |
| `roboto-flex/roboto-flex-latin-opsz-normal.woff2`   | weight 100–1000, optical size |
| `roboto-mono/roboto-mono-latin-wght-normal.woff2`   | weight 100–700                |

# Source

The two drawings every logo file is built from.

| File        | What it is                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `leaf.svg`  | The mark: a tea leaf drawn in one continuous line, from the stem around the outline and back along the midrib |
| `kanso.svg` | The wordmark: KANSO in Roboto Serif, outlined                                                                 |

**The wordmark is Roboto Serif 400**, at optical size 144, width 100 and grade
0, the face kansolabs.org sets its display type in. Its letters are set at a cap
height of 360 units and spaced by their centres, 1.55 cap heights apart, then
outlined and their overlaps merged into one path. Nothing else is changed: to
set a new word or a new spacing, set it in the same instance and outline it the
same way.

**The leaf** was drawn for this mark in 2026-11, chosen by Rodrigo from the
proposals on the brand page's review. It replaces the hand-drawn leaf of the
organization's first avatar. Its line is drawn heavy enough to stay a whole
pixel at 32 px; the small mark in `logo/` thickens it slightly for 16 to 48 px.

Both drawings are in the same units, in which the cap height is 360, so every
proportion in `scripts/compose.mjs` applies to them as they are.
`npm run compose` lays every lockup, icon and social image out from these two
files; nothing else in the repository draws the mark.

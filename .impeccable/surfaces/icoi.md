# ICOI Case Study — Page Design System

A style guide for designing the ICOI Membership System case study page
(extends "Ivy Jiyou Lee — Portfolio Design System"). Where the portfolio is
light, glassy, and playful, this page shifts one register toward
"engineering notebook, beautifully typeset": same tokens, quieter surfaces,
a mono voice for evidence. The reference implementation is
icoi-case-study-sample.html; treat it as the source for exact values.

> Hard rule: never use em-dashes anywhere, in copy or labels. Use colons,
> commas, or a middot (·) instead.

---

## 1. Color tokens

Base tokens are inherited from the portfolio system. Two updates supersede
the June doc (WCAG pass, Jul 7):

| Token | Hex | Use |
|---|---|---|
| Paper (background) | `#F8FAFE` | Page background. Unchanged. |
| Ink | `#0B0E14` | Headlines, primary text, machine node strokes. |
| Muted | `#5E687A` | UPDATED from #6B7587. Body-secondary, captions, TOC idle. 5.38:1 on paper. |
| Accent | `#0A85FF` | Large accents, fills, the means-arrow. |
| Accent text | `#0A6FE0` | NEW. Any blue text under ~24px. 4.61:1 on paper. |
| Soft panel | `#ECF1FA` | Image placeholder fill, table header row. |
| Stroke | `#E2E9F5` | Card borders, table rules, hairlines. |
| Stroke strong | `#C7D3E8` | Dashed placeholder borders, TOC numerals. |

Case-study-only semantic ramp (status system). Each pairs a text color with
its own tint + border; never mix stops across ramps:

| Status | Text | Border | Fill |
|---|---|---|---|
| Active (good) | `#0A9B5B` | `#BFE7D4` | `#EDFAF3` |
| Voting (info) | `#0A6FE0` | `#BFDFFB` | `#EDF6FF` |
| Suspended (warn) | `#C77400` | `#F2DDBB` | `#FDF6E9` |
| Terminated (bad) | `#C23A3A` | `#F1C9C9` | `#FDF0F0` |
| Honorary | `#7A5AD6` | `#DED2FB` | `#F5F1FE` |

**Highlight:** key phrases inside bylaws quotes get a bottom-half highlight in
portfolio pink `#FFB8EB` (gradient trick, text stays Ink). This is the only
place pink appears on the page.

**Holo blobs:** none on this page, or at most one at 20% opacity behind the
hero. The case study earns seriousness by withholding the toy palette.

---

## 2. Typography

**Primary: Inter** (unchanged roles from the portfolio doc).
**Evidence voice: Spline Sans Mono.** New on this page. Mono is the sound of
citations, data, and machinery. If a string is evidence (a § reference, a
status token, a date rule, a TOC number), it is mono. If it is narrative, it
is Inter. Never blur this line.

- Display / H1: Inter 900, clamp(40 to 64px), -3% tracking, lh 1.02.
- Section H2: Inter 800, 28px, -2% tracking.
- Body: Inter 400, 17px, lh 1.65, color `#2A3140`, max-width 640px.
- Lede: Inter 400, 20px, lh 1.55, Ink.
- Eyebrow: Spline Sans Mono, 12px, +14% tracking, UPPERCASE, Accent text.
- Citation (§): Spline Sans Mono 600, 12px, +6% tracking, Ink.
- Chip / machine node: Spline Sans Mono 600, 11 to 12px, +6 to 8% tracking.
- Bylaws quote body: Inter 400 italic, 15px, `#3A4252`. Legal text is the
  only italic on the page.

---

## 3. Layout

- Shell: 1100px max, two columns: 220px sticky TOC + 720px content, 64 gap.
- TOC: numbered 01 to 06, numerals in Stroke-strong mono, labels in Muted;
  hover flips label to Ink and numeral to Accent. Collapses away under 960px.
- Vertical rhythm: 96 between sections, 32 around figures, 24 inside text
  stacks, 16 paragraph gap. Everything on the 4pt grid.
- Section order is fixed and numbered because it is a reading sequence:
  01 Context · 02 The spreadsheet · 03 Rules → interface · 04 The audit
  trail · 05 What shipped · 06 Reflection.

---

## 4. Components

**Credibility pill.** Mono 12px, white fill, Stroke border, radius 999. The
first pill ("In production · icoi.net") inverts: Accent fill, white text.
Max three pills; they precede the H1.

**Metadata band.** 4-up grid (Role / Team / Timeline / Stack), mono 11px
uppercase labels over Inter 14px values, hairline rules above and below.

**Bylaws excerpt.** White card, Stroke border, 3px Ink left rule, radius
0 12 12 0 (square where the rule is). Mono § citation on top, italic legal
text below, pink highlight on the operative phrase. Always followed by:

**Means-arrow.** An Accent mono → plus one Inter 15px sentence stating the
design consequence. Excerpt then consequence, always as a pair, never one
without the other. This pair is the page's signature; do not decorate it.

**Status chip.** Mono 11px 600, +8% tracking, 3/10 padding, radius 6, colors
from the semantic ramp. Chips may sit inline in prose.

**State machine.** White card, radius 16, 40 padding. Nodes: mono labels,
1.5px Ink border, radius 10; terminal-important nodes invert to Ink fill.
Edges: mono 11px Muted with the triggering rule bolded in Ink. The §3.4.B
vs §3.4.C fork sits below a dashed divider. One red-emphasis line max (the
unanswered "continuous" question).

**Verdict table.** White, Stroke borders, radius 16, Soft-panel header row.
Verdict column vocabulary is fixed: match (good green) · missing (bad red,
600) · undefined (warn amber, 600) · wrong column (warn amber, 600).

**Image placeholder.** Soft-panel fill, 1.5px dashed Stroke-strong border,
radius 16, mono 12px Muted label in brackets describing exactly what drops
in. Placeholders never ship; they are design-time scaffolding.

**Reflection card.** 3-up grid, white, Stroke border, radius 16, 28 padding.
Mono uppercase keyword in Accent text + one Inter 14px paragraph. Card 3 is
always the honest miss.

---

## 5. Motion

Nearly none. This page's confidence is stillness. Permitted: smooth-scroll
on TOC clicks, a subtle hover on TOC items and pills. No blob drift, no
reveals, no parallax. prefers-reduced-motion removes smooth-scroll.

---

## 6. Voice and content rules

- No em-dashes, ever.
- Bylaws quotes are verbatim from the signed PDF; never paraphrase inside
  quote marks. Paraphrase lives in the means-arrow line.
- § citations always name the exact section (§3.4.B, not "the bylaws").
- Numbers only when true and cleared with ICOI (member counts, dates).
- Recreated data must be labeled "data recreated for privacy."
- Honesty over inflation: one section must contain a real miss.
- Headings are claims, not labels ("The 'before' was a dropdown that
  contradicted the law", not "Background").

---

## 7. Do / Don't

| Do | Don't |
|---|---|
| Mono for evidence, Inter for narrative | Mono for whole paragraphs |
| One pink highlight per excerpt | Pink anywhere else |
| Excerpt + means-arrow as a pair | A quote with no consequence |
| Status colors from the semantic ramp | Ad hoc greens and reds |
| Placeholders that name their content | Empty gray boxes |
| Stillness | Blob drift on a compliance story |

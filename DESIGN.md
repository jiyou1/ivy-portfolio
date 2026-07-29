---
name: Ivy Jiyou Lee — Portfolio
description: A holographic desk of glass, polaroids, and keycaps; airy and playful on the surface, precise underneath.
colors:
  sky-signal: "#0A85FF"
  sky-signal-text: "#0A6FE0"
  cool-paper: "#F8FAFE"
  night-ink: "#0B0E14"
  slate-muted: "#5E687A"
  soft-panel: "#ECF1FA"
  holo-cyan: "#8CDEFF"
  holo-violet: "#B89EFF"
  holo-pink: "#FFB8EB"
  keycap-pink: "#FF4FA3"
  keycap-yellow: "#FFCE2E"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 700
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body-card:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.08em"
  eyebrow:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    letterSpacing: "0.14em"
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "1.25rem"
  pixel:
    fontFamily: "Silkscreen, monospace"
    fontSize: "13px"
    letterSpacing: "1px"
  mono:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
  serif-display:
    fontFamily: "DM Serif Display, Georgia, serif"
  pixel-jersey:
    fontFamily: "Jersey 25, Jersey 10, monospace"
rounded:
  focus: "6px"
  chip: "12px"
  media: "16px"
  card: "28px"
  pill: "999px"
components:
  pill-cta:
    backgroundColor: "{colors.sky-signal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  pill-nav-active:
    backgroundColor: "{colors.night-ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  keycap-pink:
    backgroundColor: "{colors.keycap-pink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.chip}"
    height: "42px"
    padding: "0 16px"
  keycap-yellow:
    backgroundColor: "{colors.keycap-yellow}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.chip}"
    height: "42px"
    padding: "0 16px"
  keycap-blue:
    backgroundColor: "{colors.sky-signal}"
    textColor: "#FFFFFF"
    rounded: "{rounded.chip}"
    height: "42px"
    padding: "0 16px"
---

# Design System: Ivy Jiyou Lee — Portfolio

## Overview

**Creative North Star: "The Holographic Desk"**

A sunlit designer's desk under iridescent light: frosted glass panels float over cool blue paper, polaroids fan out and drag, keycaps press with a real bottom edge, and holographic washes of cyan, violet, and pink drift behind everything. It reads personal and collected, like objects someone actually owns, not a template someone bought.

The mood is airy, playful, precise. Every toy has tolerances: drift amplitudes are tuned per shape so clusters never separate, springs have exact stiffness and damping, and every animation carries a reduced-motion fallback. The playfulness is the surface; the engineering rigor underneath is the argument (this portfolio belongs to someone who designs in Figma and ships in React).

Anti-references: dark brutalist developer portfolios, and template-grade Dribbble gloss. The site is never dark, never grid-of-shots generic, and never decorated beyond what a real desk would hold.

**Key Characteristics:**
- Frosted glass surfaces over pale blue paper, lit by holographic blob washes
- One working accent (Sky Signal blue); candy colors reserved for physical toys
- Bricolage Grotesque headings over Inter body text; specialty fonts appear only as physical objects (pixel keycaps, handwritten captions, serif signature)
- Springy, tactile motion with exact values and universal reduced-motion support
- Case-study pages may shift quieter (see `.impeccable/surfaces/icoi.md`), the shell stays playful

## Colors

One bright working blue over cool paper, with a holographic trio that exists only as light, never as ink.

### Primary
- **Sky Signal** (#0A85FF): The single working accent: CTA pills, focus rings, large accents, the caret. If it's interactive or pointing at something, it's this blue.
- **Sky Signal Text** (#0A6FE0): The same voice darkened for small text (eyebrows, tags, links under ~24px); 4.61:1 on paper. Never use #0A85FF for small text.

### Neutral
- **Cool Paper** (#F8FAFE): The page. Everything floats on this barely-blue white.
- **Night Ink** (#0B0E14): Headlines, body, the nav's active pill, the cursor-follow label. The darkest thing on the desk.
- **Slate Muted** (#5E687A): Secondary text, captions, idle labels; 5.38:1 on paper.
- **Soft Panel** (#ECF1FA): Media placeholder fill, quiet panel backgrounds, hairline-adjacent surfaces.

### Tertiary (light, not ink)
- **Holo Cyan / Holo Violet / Holo Pink** (#8CDEFF / #B89EFF / #FFB8EB): The holographic wash. They appear only inside soft background blobs (pre-softened radial gradients fading to transparent, no runtime blur) and, on the ICOI page, one pink text highlight. Never as text, borders, or fills of UI controls.
- **Keycap Pink / Keycap Yellow** (#FF4FA3 / #FFCE2E): Candy solids that exist only on the hero keycap toys, each with its own darker stroke and 3D bottom edge.

### Named Rules
**The Light-Not-Ink Rule.** Holo colors are atmosphere: blurred, background, decorative. The moment a holo hue becomes text, a border, or a control fill, it has broken the system.
**The One Working Blue Rule.** Sky Signal is the only color that means "act here." Candy keycap colors are toys, not affordances.

## Typography

**Display Font:** Instrument Serif (with Georgia fallback), plus specialty voices below
**Heading Font:** Bricolage Grotesque (with system-ui fallback), set on h1-h4 globally; headings with their own font utility override it
**Body Font:** Inter (with system-ui fallback)
**Specialty voices:** Silkscreen (pixel keycaps), Caveat (handwritten polaroid captions), Spline Sans Mono (evidence, case-study pages), DM Serif Display (Playground and Brewing headlines), Jersey 10/25 (LatteLearn focus-screen pixel UI), Poppins + IBM Plex Sans + IBM Plex Mono + DM Mono (ICOI admin-UI replica, exact product type)

**Character:** Bricolage Grotesque gives headings a characterful voice over Inter's roomy body text. The other fonts are physical objects on the desk, not voices in the text: a serif flourish for the name, pixel type molded into keycaps, handwriting under polaroids.

### Hierarchy
- **Display** (Instrument Serif 400): The typed name in the hero headline, rendered with a blinking Sky Signal caret; also case-study H1s. The serif never sets running text.
- **Headline** (Bricolage Grotesque 700, 2rem to 2.75rem, -0.02em): Section headings ("About", "Get in touch").
- **Title** (Bricolage Grotesque 700, 1.5rem, -0.01em): Card titles.
- **Body** (Inter 400, 17px, lh 1.6): Paragraphs; card body drops to 14px/1.55.
- **Label** (Inter 600, 10.5 to 11px, +0.06 to 0.12em, UPPERCASE): Card labels, tags, pill text, nav items.
- **Eyebrow** (Inter 500 to 600, 14px, +0.14em, UPPERCASE): Section markers, in Sky Signal Text or Slate Muted.

### Named Rules
**The Objects-Only Rule.** Silkscreen, Caveat, and Instrument Serif never set running text. Each is bound to its object: keycaps, polaroid captions, the name.

## Layout

A single-column page with generous side padding (20px mobile, 40px small, 64px large) and deep vertical breathing room (sections pad 80 to 112px). Work cards sit in a responsive grid; the hero reserves its right ~40% for the floating toy cluster (hidden below md). The nav is a fixed frosted pill bar, not a full-width band. Spacing rides Tailwind's 4pt grid throughout; blob positions are absolute and bleed off both edges so color enters from outside the frame.

## Elevation & Depth

Depth is light through glass. Surfaces are translucent (55% white) with a 28px backdrop blur; what reads as "depth" is mostly the holographic blobs glowing through frosted panels. Shadows are atmosphere, not structure: soft, blue-tinted, and large-radius.

### Shadow Vocabulary
- **Glass ambient** (`box-shadow: 0 14px 36px rgba(46, 97, 217, 0.10)`): The default float under every glass surface.
- **Ink pop** (`box-shadow: 0 8px 24px rgba(11, 14, 20, 0.35)`): Under the dark cursor-follow label only.
- **Polaroid lift** (`box-shadow: 0 16px 30px rgba(26, 46, 102, 0.22)`): Under draggable polaroids.
- **Keycap edge** (`box-shadow: 0 4px 0 <darker solid>`): A hard 3D bottom edge, collapsing to `0 1px 0` on press. The only hard shadow in the system, and it means "this is a physical key."

### Named Rules
**The Tinted-Shadow Rule.** Soft shadows are always blue- or ink-tinted, never neutral gray. Gray shadows read as stock; blue shadows belong to this desk.

## Shapes

Everything is soft and buoyant: glass cards at 28px radius, media wells at 16px, keycaps at 12px, and pills fully round (999px). Blobs are perfect blurred circles. Borders are near-white on glass (1.5px rgba(255,255,255,0.95)) or hairline Soft Panel on media. Nothing has sharp corners on the home shell; the tightest radius (6px) belongs to the focus ring.

## Components

### Nav (frosted pill bar)
- Fixed top, a single `glass` pill (white bumped to 70%) holding uppercase 11px labels.
- Active item: white text on a Night Ink pill that slides between items via a shared-layout spring (stiffness 400, damping 32). Idle: ink text, hover shifts to Sky Signal Text.

### Buttons / CTA pills
- **Shape:** fully round (999px).
- **Primary:** Sky Signal fill, white 10.5px semibold uppercase label, 8/16 padding ("VIEW ↗", contact actions).
- **Hover:** lifts ~2px via transform; no color change needed.
- **Dark variant:** Night Ink fill (cursor-follow label, active nav pill).

### Work card (signature)
- A `glass` card, 28px radius, 24px padding, holding a 16px-radius media well (592:360) with a solid placeholder color behind the cover.
- Text stack: 10.5px tracked label in Slate Muted, 2xl bold title, 14px body, then tag line in Sky Signal Text against the CTA pill.
- Hover: card springs up 8px (stiffness 260, damping 20), cover scales to 1.04 over 500ms, a white 30% veil brightens the media, and a cursor-following "VIEW" pill in Night Ink trails the pointer (spring 350/30). Non-hovered siblings dim to 35% opacity.

### Keycaps (hero toys)
- Solid candy fill + 1px darker stroke + 4px solid bottom edge, 42px tall, 12px radius, Silkscreen 13px uppercase with an icon.
- Press: travels down 3px and the edge collapses to 1px (spring 600/22). They are decorative `<li>`s, hidden from meaning, but they must feel like real keys.

### Polaroids (About)
- White frame, 12px padding, Caveat caption, Polaroid-lift shadow; hover fans the stack, drag rearranges. Physical behavior over decoration.

### Blobs (atmosphere)
- Absolute soft circles of holo gradient pairs (pre-softened radial gradients, no blur filter), 320 to 480px, bleeding off page edges. Pointer-events none, purely background. Case-study pages swap in their own quieter aurora palettes.

### Section label
- 12px semibold, +0.14em tracking, Sky Signal Text. Marks every section; the smallest reliable wayfinding element.

## Do's and Don'ts

### Do:
- **Do** put every new surface on Cool Paper with glass panels; the material pairing is the identity.
- **Do** give every animation exact spring values and a `useReducedMotion` fallback; motion without a fallback is below the floor here.
- **Do** use Sky Signal Text (#0A6FE0), not Sky Signal (#0A85FF), for any blue text under ~24px.
- **Do** keep specialty fonts bound to their objects (Silkscreen to keycaps, Caveat to polaroids, Instrument Serif to the name).
- **Do** let case-study pages lower the volume (fewer blobs, stiller motion) while keeping the same tokens; `.impeccable/surfaces/icoi.md` is the model.

### Don't:
- **Don't** use em-dashes anywhere, in copy or labels; use colons, commas, or a middot (·).
- **Don't** use holo colors as text, borders, or control fills; they are blurred light only.
- **Don't** introduce neutral gray shadows; every soft shadow is blue- or ink-tinted.
- **Don't** invent new accent colors for affordances; Sky Signal is the only "act here" color.
- **Don't** fabricate content to fill layouts; this portfolio's voice is evidence-first and honestly imperfect (see PRODUCT.md).

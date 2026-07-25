# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening for product design (UI/UX) roles, evaluating new-grad candidates. They skim fast, compare against many portfolios, and dig into one or two case studies before deciding on an interview. Secondary audiences (design engineers, interviewers preparing questions) matter but do not drive decisions.

## Product Purpose

Personal portfolio for Ivy Jiyou Lee (B.S. Informatics, HCI, UC Irvine). Success = new-grad full-time offers in product design: the portfolio must get past recruiter screens and give interviewers concrete work to dig into. Live at https://ivyjiyoulee.com (Vercel).

## Positioning

Design-first, with real engineering as proof of craft: "designs in Figma, ships in React." The pitch is design skill; the React/production work (ICOI shipped to a real client's daily operations) is evidence that the designs are buildable and built, not the headline itself.

## Operating Context

One-page home (hero, works, about, contact) plus per-project case study routes. Four projects: ICOI Membership Portal (client project, in production at icoi.net), LatteLearn (PM + design lead, 9-person team, Electron), RoomieTask (UX research/HCI process), Design-a-thon (currently gated behind a "STILL BREWING" stub until finished; gate is current state, not a permanent commitment). A /playground route exists for experiments.

## Capabilities and Constraints

- React 18 + Vite + Tailwind CSS 4 + Framer Motion, react-router. No backend.
- Case-study content lives in per-project components; project cards in src/data/projects.js.
- Reduced-motion support is an established pattern across animated components.

## Brand Commitments

- Name and identity: Ivy Jiyou Lee. Voice: honest, specific, evidence-driven.
- No em-dashes anywhere on the site, in copy or labels (site-wide, not just ICOI).
- Existing visual system is glassy/playful for the portfolio shell; the ICOI case study intentionally shifts quieter (see DESIGN.md).

## Evidence on Hand

- ICOI: real client, in production at icoi.net. Member counts, dates, and bylaws quotes were cleared with the client; bylaws quotes are verbatim from the signed PDF and must never be altered or paraphrased inside quote marks. Recreated data must be labeled "data recreated for privacy."
- Resume PDF (V8), photos, project covers/videos in /public.
- No testimonials or metrics beyond what is already on the site; do not fabricate any.

## Product Principles

1. Design-first storytelling: lead with design judgment; use the shipped React work as credibility, not the pitch.
2. Honesty over inflation: every case study contains at least one real miss; numbers only when true and cleared.
3. Evidence beats claims: cite the artifact (bylaws section, usability finding, shipped feature) rather than asserting skill.
4. Respect the skimming recruiter: the strongest work (ICOI) must be reachable and legible in seconds.
5. Unfinished work stays gated: publish case studies only when they meet the bar (e.g. Designathon's brewing stub).

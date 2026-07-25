/* Fixed-viewport aurora wash behind case-study content (spec §4.1). One
   composited element with layered pre-softened radial gradients: no runtime
   blur filter, no repaint on scroll, and it covers any page length without
   per-section pixel offsets. Decorative and inert.

   `layers` is parameterized so sibling case studies (LatteLearn, RoomieTask,
   Designathon) pass their own palettes while reusing the same technique; ICOI
   keeps the default violet set. */
const ICOI_LAYERS = [
  "radial-gradient(44rem 44rem at 88% -6%, rgba(184,158,255,.45), rgba(140,222,255,.28) 55%, transparent 72%)",
  "radial-gradient(38rem 38rem at -10% 46%, rgba(184,158,255,.36), rgba(255,184,235,.24) 58%, transparent 74%)",
  "radial-gradient(40rem 40rem at 94% 102%, rgba(140,222,255,.32), rgba(184,158,255,.3) 55%, transparent 72%)",
];

export default function CaseBlobs({ layers = ICOI_LAYERS }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: layers.join(", ") }}
    />
  );
}

/* Warm mesh-gradient field for the LatteLearn page, the café-toned counterpart
   of ICOI's CaseBlobs. Pre-softened radial gradients that fade to transparent,
   so there is NO runtime blur filter to repaint. Distributed down the full
   scroll and alternating sides for a continuous caramel/pink wash. Decorative
   and inert, painted behind the content so it never affects text contrast. */
const CARAMEL = "rgba(232,200,143,";
const PINK = "rgba(255,184,235,";

// [size, position, leadColor, leadAlpha, trailColor, trailAlpha]
const BLOBS = [
  [560, { top: -60, right: -110 }, CARAMEL, 0.5, PINK, 0.3],
  [420, { top: 520, left: -150 }, PINK, 0.42, CARAMEL, 0.28],
  [520, { top: 1400, right: -120 }, CARAMEL, 0.48, PINK, 0.28],
  [440, { top: 2450, left: -150 }, PINK, 0.4, CARAMEL, 0.28],
  [520, { top: 3500, right: -120 }, CARAMEL, 0.46, PINK, 0.26],
  [440, { top: 4600, left: -150 }, PINK, 0.4, CARAMEL, 0.28],
  [500, { top: 5650, right: -110 }, CARAMEL, 0.44, PINK, 0.26],
  [460, { top: 6650, left: -140 }, PINK, 0.4, CARAMEL, 0.28],
  [420, { bottom: 40, left: 400 }, CARAMEL, 0.42, PINK, 0.26],
];

export default function CafeMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {BLOBS.map(([size, pos, lead, la, trail, ta], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            ...pos,
            background: `radial-gradient(circle at 40% 40%, ${lead}${la}), ${trail}${ta}) 58%, transparent 76%)`,
          }}
        />
      ))}
    </div>
  );
}

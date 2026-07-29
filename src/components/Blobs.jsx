/* Holo blob washes. Pre-softened radial gradients that fade to transparent, so
   there is no runtime blur filter to repaint (large blur() values are slow, and
   blurred filled shapes band; a radial gradient reads just as soft). Sizes and
   positions match the old blurred divs. */
const C = {
  cyan: "140,222,255",
  violet: "184,158,255",
  pink: "255,184,235",
};

// [size, position, leadColor, leadAlpha, trailColor, trailAlpha]
const BLOBS = [
  [480, { top: 20, right: -120 }, C.cyan, 0.5, C.violet, 0.24],
  [320, { top: 340, right: 60 }, C.pink, 0.48, C.cyan, 0.24],
  [400, { top: 760, left: -160 }, C.violet, 0.48, C.pink, 0.22],
  [360, { top: 1150, right: -110 }, C.cyan, 0.45, C.pink, 0.22],
  [440, { top: 1900, left: -180 }, C.pink, 0.45, C.violet, 0.22],
  [380, { top: 2700, right: -120 }, C.violet, 0.45, C.cyan, 0.22],
  [360, { bottom: 700, left: -130 }, C.cyan, 0.42, C.violet, 0.22],
  [340, { bottom: 60, left: 420 }, C.pink, 0.42, C.cyan, 0.22],
];

export default function Blobs() {
  return (
    <>
      {BLOBS.map(([size, pos, lead, la, trail, ta], i) => (
        <div
          key={i}
          className="blob"
          style={{
            width: size,
            height: size,
            ...pos,
            background: `radial-gradient(circle at 38% 38%, rgba(${lead},${la}), rgba(${trail},${ta}) 58%, transparent 75%)`,
          }}
        />
      ))}
    </>
  );
}

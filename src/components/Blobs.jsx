import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* Soap-bubble atmosphere (비눗방울). Each bubble is pure CSS: a nearly
   transparent center, an iridescent thin-film rim built from the holo trio,
   and a white specular highlight. Motion has two layers that never fight:
   the OUTER motion.div rises gently with scroll (a motion value, no
   re-renders), the INNER div drifts on a slow CSS wobble (.bubble-drift in
   index.css). Reduced motion stills both. Same sizes/positions as the old
   blob washes so the color still enters from outside the frame. */

const C = { cyan: "140,222,255", violet: "184,158,255", pink: "255,184,235" };
const RIM = {
  cyan: [C.cyan, C.violet, C.pink],
  violet: [C.violet, C.pink, C.cyan],
  pink: [C.pink, C.cyan, C.violet],
};

function bubbleBg(lead) {
  const [a, b, c] = RIM[lead];
  return [
    // specular highlight, upper left
    "radial-gradient(circle at 31% 28%, rgba(255,255,255,0.5), rgba(255,255,255,0) 20%)",
    // thin-film rim: transparent heart, three-hue edge, bright lip
    `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 50%, rgba(${a},0.2) 72%, rgba(${b},0.32) 86%, rgba(${c},0.26) 94%, rgba(255,255,255,0.34) 98%, rgba(255,255,255,0) 100%)`,
  ].join(", ");
}

// [size, position, leadHue, scrollSpeed, driftDuration(s), driftDelay(s)]
const BUBBLES = [
  [480, { top: 20, right: -120 }, "cyan", 0.1, 17, 0],
  [320, { top: 340, right: 60 }, "pink", 0.14, 13, 2],
  [400, { top: 760, left: -160 }, "violet", 0.07, 19, 5],
  [360, { top: 1150, right: -110 }, "cyan", 0.12, 15, 8],
  [440, { top: 1900, left: -180 }, "pink", 0.06, 21, 3],
  [380, { top: 2700, right: -120 }, "violet", 0.1, 16, 11],
  [360, { bottom: 700, left: -130 }, "cyan", 0.08, 18, 6],
  [340, { bottom: 60, left: 420 }, "pink", 0.12, 14, 9],
];

/* the soft mesh wash (the pre-bubble look): stationary gradients sitting
   behind the bubbles like soft shadows, offset down and toward the page */
function washBg(lead) {
  const [a, b] = RIM[lead];
  return `radial-gradient(circle at 42% 40%, rgba(${a},0.46), rgba(${b},0.24) 58%, rgba(${b},0) 76%)`;
}

function washPos(pos, d) {
  const p = {};
  if (pos.top != null) p.top = pos.top + d;
  if (pos.bottom != null) p.bottom = pos.bottom - d;
  if (pos.left != null) p.left = pos.left + d;
  if (pos.right != null) p.right = pos.right + d;
  return p;
}

function Bubble({ size, pos, lead, speed, dur, delay, reduce, scrollY }) {
  // rises slowly as the page scrolls; different speeds keep the field parallax
  const y = useTransform(scrollY, (v) => (reduce ? 0 : -v * speed));
  return (
    <motion.div className="blob" style={{ width: size, height: size, ...pos, y }}>
      <div
        className="bubble-drift h-full w-full rounded-full"
        style={{
          background: bubbleBg(lead),
          animationDuration: `${dur}s`,
          animationDelay: `-${delay}s`,
        }}
      />
    </motion.div>
  );
}

export default function Blobs() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  return (
    <>
      {/* stationary mesh washes behind everything */}
      {BUBBLES.map(([size, pos, lead], i) => (
        <div
          key={`wash-${i}`}
          className="blob"
          style={{
            width: size * 1.15,
            height: size * 1.15,
            ...washPos(pos, Math.round(size * 0.14)),
            background: washBg(lead),
          }}
        />
      ))}
      {/* the bubbles floating in front */}
      {BUBBLES.map(([size, pos, lead, speed, dur, delay], i) => (
        <Bubble
          key={i}
          size={size}
          pos={pos}
          lead={lead}
          speed={speed}
          dur={dur}
          delay={delay}
          reduce={reduce}
          scrollY={scrollY}
        />
      ))}
    </>
  );
}

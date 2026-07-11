// Spark.jsx — the ✳ mark, animated. Framer Motion, matches existing stack.
// Usage:
//   Hero eyebrow:  <Spark size={18} bloom delay={0.1} />  before the TypedLine
//   Footer:        <Spark size={13} twinkleOnHover />     after "ivy jiyou lee"
//
// Two structural rules (both bugs happened, both are fixed here):
// 1. Each arm's rotation lives on a plain <g> wrapper, NOT on the motion.rect.
//    Framer manages transforms via inline style and overrides an SVG transform
//    attribute on the same element (that bug collapses all arms into one line).
// 2. Geometry is in plain viewBox units: arm 14 wide, 88 tall, rx 7, centered.

import { motion, useReducedMotion } from "framer-motion";

const ARMS = [0, 60, 120]; // three capsules = six arms
const ARM = { x: 43, y: 6, width: 14, height: 88, rx: 7 };

function StaticMark({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      {ARMS.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <rect {...ARM} fill={color} />
        </g>
      ))}
    </svg>
  );
}

export default function Spark({
  size = 16,
  color = "var(--grayt, #5E687A)",
  bloom = false,          // play entrance on mount
  delay = 0,              // entrance delay in seconds
  twinkleOnHover = false, // footer mode: twinkle only when hovered
  className = "",
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className} aria-hidden="true" style={{ display: "inline-flex" }}>
        <StaticMark size={size} color={color} />
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      style={{ display: "inline-flex", transformOrigin: "50% 50%" }}
      initial={bloom ? { rotate: -50 } : false}
      animate={bloom ? { rotate: 0, transition: { delay, duration: 0.7, ease: [0.22, 1.6, 0.36, 1] } } : {}}
      whileHover={{ rotate: 60, transition: { type: "spring", stiffness: 300, damping: 18 } }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        animate={twinkleOnHover ? {} : { scale: [1, 1, 1.14, 1], rotate: [0, 0, 8, 0] }}
        transition={
          twinkleOnHover
            ? {}
            : { duration: 0.6, times: [0, 0.9, 0.95, 1], repeat: Infinity, repeatDelay: 6.5, delay: delay + 2 }
        }
        whileHover={twinkleOnHover ? { scale: 1.15 } : {}}
        style={{ transformOrigin: "50% 50%", display: "block" }}
      >
        {ARMS.map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            <motion.rect
              {...ARM}
              fill={color}
              style={{ transformOrigin: "50px 50px", transformBox: "fill-box" }}
              initial={bloom ? { scaleY: 0 } : false}
              animate={
                bloom
                  ? {
                      scaleY: 1,
                      transition: {
                        delay: delay + i * 0.045,
                        type: "spring",
                        stiffness: 420,
                        damping: 16, // slight overshoot = the character
                      },
                    }
                  : { scaleY: 1 }
              }
            />
          </g>
        ))}
      </motion.svg>
    </motion.span>
  );
}

/* ------------------------------------------------------------------
INTEGRATION (two edits in App.jsx):

1. Hero eyebrow — spark LEADS, then the typewriter starts:

   <div className="flex items-center gap-2">
     <Spark size={18} bloom delay={0.1} />
     <TypedLine text="WELCOME TO MY CREATIVE STUDIO" startDelay={800} />
   </div>

   Remove the trailing ✳ from the TypedLine string. TypedLine needs a
   startDelay prop (start typing ~800ms after mount, once the bloom lands).

2. Footer sign-off:

   designed and built by ivy jiyou lee <Spark size={13} twinkleOnHover />

Both usages are aria-hidden: the mark is decorative, the text carries meaning.
------------------------------------------------------------------ */

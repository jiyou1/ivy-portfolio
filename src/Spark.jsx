// Spark.jsx — the ✳ mark, animated. Framer Motion, matches existing stack.
// Usage:
//   Hero eyebrow:  <Spark size={18} bloom delay={0.1} />  before the TypedLine
//   Footer:        <Spark size={13} twinkleOnHover />     after "ivy jiyou lee"
//
// Character notes (the "Claude style" brief):
//   - Entrance: per-arm bloom. Arms scale out from center with a 45ms stagger
//     and a springy overshoot, whole mark counter-rotates 50 degrees into place.
//     Reads as the mark "opening", not just appearing. ~700ms total.
//   - Idle: a twinkle every ~7s. Quick 1 -> 1.14 -> 1 scale with a small
//     8-degree rotation flick. Rare enough to be charming, not a metronome.
//   - Hover: one crisp 60-degree spin (asterisk is 60-degree symmetric, so it
//     lands looking identical: the joke is it moved and nothing changed).
//   - prefers-reduced-motion: static glyph, full color, no motion at all.

import { motion, useReducedMotion } from "framer-motion";

const ARMS = [0, 60, 120]; // three capsules = six arms

export default function Spark({
  size = 16,
  color = "var(--blue, #0A85FF)",
  bloom = false,          // play entrance on mount
  delay = 0,              // entrance delay in seconds
  twinkleOnHover = false, // footer mode: twinkle only when hovered
  className = "",
}) {
  const reduce = useReducedMotion();
  const w = size * 0.16; // arm thickness

  if (reduce) {
    return (
      <span className={className} aria-hidden="true" style={{ display: "inline-flex" }}>
        <StaticSvg size={size} color={color} w={w} />
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      style={{ display: "inline-flex", transformOrigin: "50% 50%" }}
      initial={bloom ? { rotate: -50 } : false}
      animate={
        bloom
          ? { rotate: 0, transition: { delay, duration: 0.7, ease: [0.22, 1.6, 0.36, 1] } }
          : {}
      }
      whileHover={{ rotate: 60, transition: { type: "spring", stiffness: 300, damping: 18 } }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        // idle twinkle: rare, quick, charming
        animate={
          twinkleOnHover
            ? {}
            : { scale: [1, 1, 1.14, 1], rotate: [0, 0, 8, 0] }
        }
        transition={
          twinkleOnHover
            ? {}
            : { duration: 0.6, times: [0, 0.9, 0.95, 1], repeat: Infinity, repeatDelay: 6.5, delay: delay + 2 }
        }
        whileHover={twinkleOnHover ? { scale: 1.15 } : {}}
        style={{ transformOrigin: "50% 50%", display: "block" }}
      >
        {ARMS.map((deg, i) => (
          <motion.rect
            key={deg}
            x={50 - w * 3.1}
            y={6}
            width={w * 6.2}
            height={88}
            rx={w * 3.1}
            fill={color}
            transform={`rotate(${deg} 50 50)`}
            style={{ transformOrigin: "50px 50px" }}
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
                : {}
            }
          />
        ))}
      </motion.svg>
    </motion.span>
  );
}

function StaticSvg({ size, color, w }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block" }}>
      {ARMS.map((deg) => (
        <rect
          key={deg}
          x={50 - w * 3.1}
          y={6}
          width={w * 6.2}
          height={88}
          rx={w * 3.1}
          fill={color}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------
INTEGRATION (two edits in App.jsx):

1. Hero eyebrow — spark LEADS, then the typewriter starts:

   <div className="flex items-center gap-2">
     <Spark size={18} bloom delay={0.1} />
     <TypedLine text="WELCOME TO MY CREATIVE STUDIO" startDelay={800} />
   </div>

   - Remove the trailing ✳ from the TypedLine string.
   - TypedLine needs a startDelay prop (start typing after the bloom lands,
     ~800ms). Sequence: spark blooms -> beat -> typing begins. The spark is
     the pen tapping the page before it writes.

2. Footer sign-off:

   designed and built by ivy jiyou lee <Spark size={13} twinkleOnHover />

   - Sits inline at text size, blue against the muted gray text.
   - No idle motion in the footer (it would nag); it twinkles on hover only.

Both usages are aria-hidden: the mark is decorative, the text carries meaning.
------------------------------------------------------------------ */

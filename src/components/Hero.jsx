import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparks, CursorPointer, Rocket } from "iconoir-react";

/* Floating hero assets (inflatable vol.2 pack) — one overlapping cluster in the
   right ~40% of the hero, vertically centered on the headline. The old iridescent
   bubble.png is removed (spec §2.5).

   Sizing: the play button drives the scale (clamp 200→320px); chain is 0.875x and
   arrow is 0.6x of it, so the whole cluster scales together with the viewport.
   Z-order (back→front): arrow, play, chain. Positions are % of the hero box.
   Drift amplitudes are kept small (y 6–10, x 3–5, rotate ≤2.5°) with different
   durations per shape so the shapes never separate. */
const PLAY_W = "clamp(200px, 22vw, 320px)";
const CHAIN_W = "clamp(175px, 19.25vw, 280px)"; /* 0.875x of play */
const ARROW_W = "clamp(144px, 15.84vw, 230px)"; /* 0.72x of play (0.6 × 1.2) */
const FLOATIES = [
  { src: "/floaties/arrow.png", width: ARROW_W, left: "56%", top: "25%", z: 10, drift: { y: 26, x: -14, rotate: 6, duration: 5,   delay: 0 } },
  { src: "/floaties/play.png",  width: PLAY_W,  left: "74%", top: "25%", z: 20, drift: { y: 22, x: 12,  rotate: 5, duration: 4.4, delay: 0.4 } },
  { src: "/floaties/chain.png", width: CHAIN_W, left: "67%", top: "46%", z: 30, drift: { y: 32, x: 10,  rotate: 8, duration: 4.8, delay: 0.2 } },
];

function Floaties() {
  const reduce = useReducedMotion();
  return (
    <>
      {FLOATIES.map((f, i) => (
        <motion.img
          key={f.src ?? i}
          src={f.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="pointer-events-none absolute hidden select-none drop-shadow-[0_24px_50px_rgba(51,89,204,0.18)] md:block"
          style={{ width: f.width, left: f.left, top: f.top, zIndex: f.z }}
          animate={
            reduce
              ? {}
              : { y: [0, f.drift.y, 0], x: [0, f.drift.x, 0], rotate: [0, f.drift.rotate, 0] }
          }
          transition={{
            duration: f.drift.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: f.drift.delay,
          }}
        />
      ))}
    </>
  );
}

/* Types the headline name, holds, then loops. Caret blinks throughout. Reduced
   motion shows it whole with no caret. */
function TypedName({ text }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (n < text.length) {
      const t = setTimeout(() => setN(n + 1), 110);
      return () => clearTimeout(t);
    }
    // finished a pass: hold the full name, then restart the loop
    const t = setTimeout(() => setN(0), 2600);
    return () => clearTimeout(t);
  }, [n, reduce, text.length]);

  return (
    <span className="font-instrument font-normal">
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {!reduce && (
        <span
          aria-hidden="true"
          className="caret-blink ml-[0.12em] inline-block w-[0.035em] align-baseline"
          style={{ height: "0.72em", background: "var(--color-blue)" }}
        />
      )}
    </span>
  );
}

/* The eyebrow's trailing sparkle — a playful click toy: spins 360° and bounces
   bigger on each click to hint that it's interactive. Decorative (mouse-only),
   hidden from the a11y tree. */
function StarToggle() {
  const reduce = useReducedMotion();
  const [spins, setSpins] = useState(0);
  return (
    <motion.button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={() => setSpins((s) => s + 1)}
      className="inline-flex cursor-pointer leading-none text-grayt"
      whileHover={reduce ? undefined : { scale: 1.15 }}
      animate={reduce ? {} : { rotate: spins * 360, scale: [1, 1.3, 1] }}
      transition={{
        rotate: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut", repeat: Infinity, repeatDelay: 4.5 },
      }}
    >
      ✳
    </motion.button>
  );
}

/* Colored keycap chips (pink / yellow / blue). Decorative — a <ul> of <li>.
   Each has a solid fill, a slightly darker 1px stroke, and a solid 3D bottom edge. */
const CAP_STYLES = {
  pink: { background: "#FF4FA3", border: "1px solid #F02E8A", boxShadow: "0 4px 0 #C21D6B", color: "#fff", press: "0 1px 0 #C21D6B" },
  yellow: { background: "#FFCE2E", border: "1px solid #F5B800", boxShadow: "0 4px 0 #C7900A", color: "var(--color-ink)", press: "0 1px 0 #C7900A" },
  blue: { background: "var(--color-blue)", border: "1px solid #0A6FE0", boxShadow: "0 4px 0 #0554B8", color: "#fff", press: "0 1px 0 #0554B8" },
};
const KEYCAPS = [
  { label: "ICONIC", variant: "pink", Icon: Sparks },
  { label: "INTERACTIVE", variant: "yellow", Icon: CursorPointer },
  { label: "SHIPPED", variant: "blue", Icon: Rocket },
];

function Keycap({ label, variant, Icon }) {
  const reduce = useReducedMotion();
  const s = CAP_STYLES[variant] ?? CAP_STYLES.blue;
  const base = { background: s.background, border: s.border, boxShadow: s.boxShadow, color: s.color };
  const pressShadow = s.press;

  return (
    <motion.li
      style={{
        ...base,
        height: 42,
        borderRadius: 12,
        padding: "0 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "'Silkscreen', monospace",
        fontSize: 13,
        letterSpacing: "1px",
        textTransform: "uppercase",
        userSelect: "none",
      }}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { y: 3, boxShadow: pressShadow }}
      transition={{ type: "spring", stiffness: 600, damping: 22 }}
    >
      {Icon && <Icon width={15} height={15} strokeWidth={2} aria-hidden />}
      {label}
    </motion.li>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <header id="home" className="relative px-5 pb-20 pt-36 sm:px-10 lg:px-16 lg:pt-44">
      <Floaties />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-medium tracking-[0.14em] text-grayt">
            WELCOME TO MY CREATIVE STUDIO
          </p>
          <StarToggle />
        </div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-label="hello, i'm ivy jiyou lee!"
          className="text-[clamp(3rem,9vw,6.5rem)] leading-[1.04] tracking-[-0.015em]"
        >
          <span className="font-instrument font-normal">hello, i&apos;m</span>
          <br />
          <TypedName text="ivy jiyou lee!" />
        </motion.h1>
        <p className="max-w-xl text-xl text-grayt">
          I design in Figma. Then I open VS Code and make it real.
        </p>
        <ul className="flex flex-wrap gap-3">
          {KEYCAPS.map((k) => (
            <Keycap key={k.label} label={k.label} variant={k.variant} Icon={k.Icon} />
          ))}
        </ul>
      </div>
    </header>
  );
}

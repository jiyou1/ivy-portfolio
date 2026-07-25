import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

// Placeholder page behind the "Join my Playground" nav CTA.
export default function Playground() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
      style={{
        background:
          "radial-gradient(1.6px 1.6px at 12% 18%, #fff, transparent), radial-gradient(1.4px 1.4px at 78% 28%, #fff, transparent), radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.85), transparent), radial-gradient(1.2px 1.2px at 64% 82%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 88% 60%, #fff, transparent), linear-gradient(160deg, #060a1f 0%, #140b34 55%, #2a1550 100%)",
      }}
    >
      <p className="text-[12px] font-semibold tracking-[0.22em] text-white/70">
        <motion.span
          aria-hidden="true"
          className="inline-block"
          animate={reduce ? {} : { opacity: [1, 0.5, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>{" "}
        PLAYGROUND
      </p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] italic leading-[1.05]">
        coming soon
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-white/70">
        A corner for experiments, motion studies, and half-built ideas. Check back soon.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-white/10"
      >
        ← Back home
      </Link>
    </div>
  );
}

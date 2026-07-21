import { Link } from "react-router-dom";

/* Placeholder for a case study that isn't ready to show yet. Gated by the
   project's `brewing` flag in data/projects.js; remove the flag to publish.
   Same starfield idiom as Playground. */
export default function Brewing() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
      style={{
        background:
          "radial-gradient(1.6px 1.6px at 12% 18%, #fff, transparent), radial-gradient(1.4px 1.4px at 78% 28%, #fff, transparent), radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.85), transparent), radial-gradient(1.2px 1.2px at 64% 82%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 88% 60%, #fff, transparent), linear-gradient(160deg, #060a1f 0%, #140b34 55%, #2a1550 100%)",
      }}
    >
      <p className="text-[12px] font-semibold tracking-[0.22em] text-white/70">✦ CASE STUDY</p>
      <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] italic leading-[1.05]">
        still brewing
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-white/70">
        I'm still writing this one. Check back soon.
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

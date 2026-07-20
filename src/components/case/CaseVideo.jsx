import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Soft edge-fade so a full-bleed hero clip melts into the page instead of sitting
   in a hard-edged box: a centered radial alpha mask (keeps the subject crisp,
   dissolves every edge) intersected with a vertical linear fade that pulls the
   top harder, since a saturated sky edge reads sharper against near-white paper
   than the pale cloud edge at the bottom. */
const FEATHER_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 24%, #000 84%, transparent 100%), radial-gradient(122% 122% at 50% 50%, #000 58%, rgba(0,0,0,0) 100%)";
const FEATHER_STYLE = {
  maskImage: FEATHER_MASK,
  WebkitMaskImage: FEATHER_MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

/* Case-study video block, generic across pages. WebM source first, MP4 fallback,
   muted + playsInline + loop + poster. prefers-reduced-motion gets the poster
   image only (no motion at all). Below the fold it is lazy: the <video> only
   mounts once it nears the viewport, so its bytes never load on the hero's paint.
   Pass `eager` for an above-the-fold hero video that should play immediately.
   A missing poster and failed sources fall back to the standard dashed
   placeholder so the layout never collapses and nothing empty ships. */
export default function CaseVideo({
  sources = [],
  poster,
  alt = "",
  label,
  eager = false,
  feather = false,
  className = "",
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(eager);
  const [failed, setFailed] = useState(false);
  // an absent poster must degrade to the labelled placeholder, not a broken img
  const [posterFailed, setPosterFailed] = useState(false);
  const hasPoster = poster && !posterFailed;

  useEffect(() => {
    if (eager || inView) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, inView]);

  // feather melts the edges into the page (no box); otherwise the standard
  // hairline-framed card. The mask applies to whichever surface renders (video,
  // or the poster still for reduced-motion / load-failure), so the blend holds.
  const frame = feather
    ? `w-full overflow-hidden ${className}`
    : `w-full overflow-hidden rounded-2xl border border-stroke ${className}`;
  const maskStyle = feather ? FEATHER_STYLE : undefined;

  // reduced motion, or every source failed: show the poster still, or the slot
  if (reduce || failed) {
    if (hasPoster) {
      return <img src={poster} alt={alt} loading="lazy" decoding="async" onError={() => setPosterFailed(true)} style={maskStyle} className={`${frame} object-cover`} />;
    }
    return (
      <div className={`flex min-h-[320px] items-center justify-center border-[1.5px] border-dashed border-stroke-2 bg-imgbg ${className}`}>
        <span className="whitespace-pre-line px-6 text-center font-plex text-[12px] leading-[1.8] text-grayt">{label}</span>
      </div>
    );
  }

  return (
    <div ref={ref} className={frame} style={maskStyle}>
      {inView ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          preload={eager ? "auto" : "none"}
          onError={() => setFailed(true)}
          className="block h-full w-full object-cover"
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      ) : hasPoster ? (
        // placeholder frame before the video mounts: poster if we have one
        <img src={poster} alt={alt} loading="lazy" decoding="async" onError={() => setPosterFailed(true)} className="block h-full w-full object-cover" />
      ) : (
        <div className="flex min-h-[320px] items-center justify-center whitespace-pre-line px-6 text-center font-plex text-[12px] leading-[1.8] text-grayt">{label}</div>
      )}
    </div>
  );
}

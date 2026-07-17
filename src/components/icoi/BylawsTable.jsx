import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Expand, Xmark, NavArrowLeft, NavArrowRight } from "iconoir-react";

/* Section 01 "the source document" figure. The bylaws arrived as a 27-page
   *scanned* PDF — no text layer, tiny type, Arabic cover, a hand-drawn org
   chart. This is the artifact we had to decode.

   Visual language echoes the About-page polaroids (real paper, hand rotation,
   grab-to-lift), but reworked per spec: a straight landscape line of pages laid
   out on a table rather than a stacked pile. On scroll-in each sheet "opens up"
   — unfolds from its edge onto the surface, staggered — like someone laying the
   document out page by page. Click any sheet to read it full-size (decoding
   means reading the fine print). Under reduced-motion the pages simply appear. */

const BASE = "/case/icoi/bylaws/";

const PAGES = [
  { file: "p01.webp", tag: "p. 1", note: "Scanned cover — zero selectable text", rot: -5, lift: 12 },
  { file: "p03.webp", tag: "p. 3", note: "Contents · 60+ subsections to map", rot: 3, lift: 30 },
  { file: "p07.webp", tag: "§ 3.4", note: "Suspension & termination — the clause we traced", rot: -3, lift: 0 },
  { file: "p13.webp", tag: "p. 13", note: "Nominations — one unbroken wall of text", rot: 4, lift: 22 },
  { file: "p27.webp", tag: "att. C", note: "Org-structure chart, hand-drawn boxes", rot: -6, lift: 38 },
];

/* ---------- full-size reader ---------- */
function Lightbox({ index, onClose, onStep }) {
  const p = PAGES[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Bylaws ${p.tag} — ${p.note}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{
        background: "rgba(11, 14, 20, 0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* prev / next */}
      <button
        type="button"
        aria-label="Previous page"
        onClick={(e) => { e.stopPropagation(); onStep(-1); }}
        className="glass absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 sm:left-6"
      >
        <NavArrowLeft width={20} height={20} strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next page"
        onClick={(e) => { e.stopPropagation(); onStep(1); }}
        className="glass absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 sm:right-6"
      >
        <NavArrowRight width={20} height={20} strokeWidth={2} aria-hidden />
      </button>

      <motion.figure
        key={p.file}
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative m-0 max-h-full"
      >
        <img
          src={BASE + p.file}
          alt={`Bylaws ${p.tag}: ${p.note}`}
          className="max-h-[82vh] w-auto rounded-2xl border border-white/70 bg-white shadow-[0_30px_80px_rgba(11,14,20,0.4)]"
        />
        <figcaption className="glass mx-auto mt-4 w-fit rounded-full px-4 py-1.5 font-plex text-[12px] text-ink">
          <span className="font-semibold text-blue-text">{p.tag}</span>
          <span className="mx-2 text-stroke-2">·</span>
          {p.note}
        </figcaption>
      </motion.figure>

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="glass absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 sm:right-6 sm:top-6"
      >
        <Xmark width={20} height={20} strokeWidth={2} aria-hidden />
      </button>
    </motion.div>
  );
}

/* ---------- one sheet on the table ---------- */
function Sheet({ page, i, reduce, hovered, setHovered, onOpen }) {
  const isHover = hovered === i;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(i)}
      onHoverStart={() => setHovered(i)}
      onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
      onFocus={() => setHovered(i)}
      onBlur={() => setHovered((h) => (h === i ? null : h))}
      aria-label={`Open bylaws ${page.tag}: ${page.note}`}
      // start: folded down against the table edge
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 70, rotate: 0, rotateX: 42 }}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: page.lift, rotate: page.rot, rotateX: 0 }
      }
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: reduce ? 0 : i * 0.13, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={reduce ? undefined : { y: page.lift - 20, rotate: 0, scale: 1.045 }}
      style={{
        zIndex: isHover ? 50 : 10 + i,
        transformPerspective: 1200,
        transformOrigin: "50% 100%",
        marginLeft: i === 0 ? 0 : -34,
      }}
      className="relative -mt-2 block flex-none cursor-pointer rounded-[10px] bg-white p-2.5 pb-9 shadow-[0_18px_34px_rgba(26,46,102,0.20)] outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
    >
      <div className="overflow-hidden rounded-[5px] border border-stroke bg-imgbg" style={{ width: 176 }}>
        <img
          src={BASE + page.file}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          className="pointer-events-none block w-full select-none object-cover"
          style={{ aspectRatio: "1286 / 1664" }}
        />
      </div>

      {/* mono tag tab, glass — matches the site's chip language */}
      <span className="glass absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-plex text-[10px] font-semibold tracking-[0.02em] text-ink">
        {page.tag}
      </span>

      {/* expand hint appears on hover/focus */}
      <span
        className={
          "glass absolute bottom-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full text-blue-text transition-opacity duration-200 " +
          (isHover ? "opacity-100" : "opacity-0")
        }
        aria-hidden
      >
        <Expand width={12} height={12} strokeWidth={2.2} />
      </span>
    </motion.button>
  );
}

export default function BylawsTable() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);

  const step = useCallback(
    (d) => setOpen((cur) => (cur == null ? cur : (cur + d + PAGES.length) % PAGES.length)),
    []
  );

  return (
    <figure className="my-8">
      {/* the "table": a soft surface panel, consistent with the media frames
          (rounded-2xl, stroke border) but warmer, with a faint vignette so the
          pages read as paper resting on it */}
      <div
        className="relative overflow-x-auto rounded-2xl border border-stroke"
        style={{
          maxWidth: 1080,
          background:
            "radial-gradient(120% 100% at 50% 0%, #ffffff 0%, var(--color-imgbg) 70%, #e4ebf7 100%)",
        }}
      >
        {/* soft contact-shadow strip under the row, to seat the paper */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-8 h-10 rounded-full"
          style={{ background: "radial-gradient(60% 100% at 50% 50%, rgba(26,46,102,0.14), transparent 70%)" }}
        />
        <div className="flex min-w-max items-start px-8 py-12 pl-10">
          {PAGES.map((page, i) => (
            <Sheet
              key={page.file}
              page={page}
              i={i}
              reduce={reduce}
              hovered={hovered}
              setHovered={setHovered}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>

      <figcaption className="mt-3 max-w-[760px] text-[13px] leading-[1.5] text-grayt">
        The bylaws as we received them — a 27-page scanned PDF with no text layer.
        Five of the pages we spent the most time decoding.{" "}
        <span className="text-ink/70">Tap a page to read it.</span>
      </figcaption>

      <AnimatePresence>
        {open != null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />
        )}
      </AnimatePresence>
    </figure>
  );
}

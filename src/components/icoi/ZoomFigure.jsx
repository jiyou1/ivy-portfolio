import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Xmark } from "iconoir-react";

/* A page figure that opens full resolution in a lightbox: for wide process
   artifacts (annotated boards) whose detail is only readable zoomed. The figure
   keeps its native colors inside a hairline stroke frame at the page radius (it
   is NOT wrapped in the img-token fill). A missing file falls back to the
   standard dashed placeholder with the filename in mono, at the given aspect so
   the layout does not shift. The lightbox uses a dimmed paper backdrop at 90%,
   shows the image at natural resolution with the overlay scrolling on overflow,
   closes on Esc or click outside, and respects reduced motion. */

const fileName = (src) => (src ? src.slice(src.lastIndexOf("/") + 1) : "");

function Lightbox({ src, alt, reduce, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.15 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] overflow-auto"
      style={{ background: "rgba(248,250,254,0.9)" }}
    >
      <div className="flex min-h-full items-center justify-center p-6 sm:p-12">
        <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} className="max-w-none" />
      </div>
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-white text-ink shadow-[0_8px_24px_rgba(11,14,20,0.12)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 sm:right-6 sm:top-6"
      >
        <Xmark width={20} height={20} strokeWidth={2} aria-hidden />
      </button>
    </motion.div>
  );
}

export default function ZoomFigure({ src, alt, caption, aspect = "4 / 3", className = "" }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(!src);
  const [open, setOpen] = useState(false);
  const missing = failed || !src;

  return (
    <figure className={"my-8 " + className}>
      {missing ? (
        <div
          className="flex w-full items-center justify-center rounded-2xl border-[1.5px] border-dashed border-stroke-2 bg-imgbg"
          style={{ aspectRatio: aspect }}
        >
          <span className="px-6 text-center font-plex text-[12px] leading-[1.7] text-grayt">
            {fileName(src)}
          </span>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${alt} at full resolution`}
          className="block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-stroke focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
        >
          <img src={src} alt={alt} onError={() => setFailed(true)} className="block h-auto w-full" />
        </button>
      )}

      {caption && (
        <figcaption className="mt-3 font-plex text-[12px] leading-[1.5] text-grayt">{caption}</figcaption>
      )}

      <AnimatePresence>
        {open && <Lightbox src={src} alt={alt} reduce={reduce} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </figure>
  );
}

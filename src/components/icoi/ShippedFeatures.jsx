import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Xmark, StatsReport, TaskList, Community, QrCode, ClockRotateRight } from "iconoir-react";
import CaseVideo from "../case/CaseVideo";
import Todo from "../case/Todo";

/* Section 05 "What shipped" — an interactive feature walkthrough, stacked so the
   screen reads large. Top to bottom: the screenshot inside a code-built laptop
   (centered, clickable to open the raw screenshot full resolution in a
   lightbox), page dots for features with more than one screen, a horizontal tab
   selector, then the active feature's title and description.

   The images are flat 1440x1024 UI screenshots with no device frame: the laptop
   (bezel, screen, keyboard, trackpad) is drawn in code by LaptopFrame, so new
   screenshots drop straight in with no Figma compositing. The screen area is
   locked to 1440/1024 so the layout never shifts between features, including for
   screenshots that do not exist yet (they render the dashed placeholder inside
   the screen).

   Feature selection is click/tap/keyboard only. Features with multiple screens
   crossfade between them (gentle auto-advance, paused on hover or focus, off
   under reduced motion; dots are always clickable). The image and text block
   crossfade together over 150ms. All screenshots are preloaded on mount. */

const SHIPPED = "/work/icoi/shipped/";

/* Default feature set: the ICOI screens. A sibling case study passes its own
   `features` and `label` and this component reskins for free. A feature may carry
   `frame: "phone"` (rendered in PhoneFrame instead of the laptop), `video`
   ({ poster, sources }) to show a walkthrough clip instead of screenshots, and
   "TODO:"-prefixed title/description strings for copy still owed. */
const ICOI_FEATURES = [
  {
    id: "dashboard",
    number: "01",
    label: "Dashboard",
    icon: StatsReport,
    title: "A dashboard that counts, so nobody has to",
    description:
      "Membership statistics computed live from member records. The totals can't drift from reality because they are never entered by hand.",
    highlight: "computed live",
    images: [SHIPPED + "ICOI-Dashboard.webp"],
    alt: "ICOI admin dashboard showing computed membership statistics",
  },
  {
    id: "applications",
    number: "02",
    label: "Applications",
    icon: TaskList,
    highlight: "recorded event",
    title: "Application review with a built-in decision trail",
    description:
      "Admins approve or decline applications in one queue. Approval is a recorded event that starts the member's status clock, not a cell edit.",
    images: [
      SHIPPED + "ICOI-Applications.webp",
      SHIPPED + "ICOI-Applications-2.webp",
      SHIPPED + "ICOI-Applications-3.webp",
      SHIPPED + "ICOI-Applications-4.webp",
    ],
    alt: "ICOI application review queue with a recorded decision trail",
  },
  {
    id: "member",
    number: "03",
    label: "Member Records",
    icon: Community,
    title: "Member records that know the whole family",
    description:
      "One record shows a member's computed status, its history, and everyone covered under the family membership, mirroring how the bylaws define a household.",
    highlight: "family membership",
    images: [SHIPPED + "ICOI-Member-Detail.webp", SHIPPED + "ICOI-Member-Detail-2.webp"],
    alt: "ICOI member record showing computed status, history, and family membership",
  },
  {
    id: "qr",
    number: "04",
    label: "QR Verification",
    icon: QrCode,
    title: "Status checked at the door, not in a binder",
    description:
      "QR verification at events surfaces each member's computed status the moment they scan in, and logs the check-in automatically.",
    highlight: "the moment they scan in",
    images: [SHIPPED + "ICOI-QR-Scanner.webp"],
    alt: "ICOI QR verification scanner showing a member's computed status at check-in",
  },
  {
    id: "audit",
    number: "05",
    label: "Activity Log",
    icon: ClockRotateRight,
    title: "An audit trail the bylaws demand, kept automatically",
    description:
      "Every admin action is recorded automatically, satisfying §4.19.D without anyone maintaining a log.",
    highlight: "recorded automatically",
    images: [SHIPPED + "ICOI-Activity-Log.webp"],
    alt: "ICOI activity log showing an automatically recorded audit trail",
  },
];

const AUTO_MS = 4200; // multi-screen auto-advance interval
const fileName = (src) => src.slice(src.lastIndexOf("/") + 1);
const isTodo = (s) => typeof s === "string" && s.startsWith("TODO:");

/* Emphasize the one key capability phrase in a description so the important
   feature of each screen stands out. Returns plain text when the phrase is
   absent, so the same call is safe for the invisible height sizer. */
function withHighlight(text, phrase) {
  const i = phrase ? text.indexOf(phrase) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <b className="font-semibold text-blue-text">{phrase}</b>
      {text.slice(i + phrase.length)}
    </>
  );
}

/* Code-built laptop, pure CSS in the site's tokens (ink bezel, paper/stroke
   deck) so the red ICOI UI inside stays the loudest thing. Every dimension is in
   container-query width units (cqw), so the whole device scales fluidly and
   stays crisp at any container width. The screen area is aspect-locked to
   1440/1024; children fill it exactly. */
function LaptopFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-[1150px]" style={{ containerType: "inline-size" }}>
      {/* one soft diffuse shadow following the whole silhouette */}
      <div style={{ filter: "drop-shadow(0 2cqw 2.6cqw rgba(11,14,20,0.16))" }}>
        {/* lid: slim ink bezel around the screen */}
        <div
          className="relative z-10 mx-auto"
          style={{
            width: "88%",
            background: "#0B0E14",
            borderRadius: "1.8cqw",
            padding: "1.15cqw",
          }}
        >
          {/* screen: aspect-locked, hairline inset stroke so light UI edges don't
              bleed into the bezel; position:relative for the crossfade layer */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "1440 / 1024",
              borderRadius: "0.8cqw",
              border: "1px solid #E2E9F5",
              background: "#ECF1FA",
            }}
          >
            {children}
          </div>
        </div>

        {/* slim base: wider than the lid, same ink as the bezel, centered notch */}
        <div
          className="relative mx-auto w-full"
          style={{
            height: "2.1cqw",
            background: "#0B0E14",
            borderRadius: "0 0 1cqw 1cqw",
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: "12cqw",
              height: "0.7cqw",
              background: "#2A2F3A",
              borderRadius: "0 0 0.7cqw 0.7cqw",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* Phone-proportioned sibling of LaptopFrame: the same code-built device idiom in
   the site's tokens, aspect-locked to 390/844 so mobile surfaces sit in a real
   device without a Figma export. Children fill the screen exactly, same as the
   laptop, so the crossfade layer works unchanged. */
function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-[300px]" style={{ containerType: "inline-size" }}>
      <div style={{ filter: "drop-shadow(0 3cqw 4cqw rgba(11,14,20,0.16))" }}>
        <div
          className="relative mx-auto"
          style={{ background: "#0B0E14", borderRadius: "12cqw", padding: "2.4cqw" }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "390 / 844",
              borderRadius: "9.5cqw",
              border: "1px solid #E2E9F5",
              background: "#ECF1FA",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Minimal image lightbox: click outside or Esc to close, dimmed paper backdrop
   at 90% opacity, the raw screenshot at natural resolution with the overlay
   scrolling if it overflows. Fade respects reduced motion (cut instantly). */
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

export default function ShippedFeatures({
  features = ICOI_FEATURES,
  label = "ICOI shipped features",
  tabCols = "lg:grid-cols-5",
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const [failed, setFailed] = useState({});
  const [zoom, setZoom] = useState(null);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef([]);
  const sectionRef = useRef(null);
  const preloadedRef = useRef(false);

  const markFailed = (src) =>
    setFailed((prev) => (prev[src] ? prev : { ...prev, [src]: true }));

  // Preload every screenshot the first time the section nears the viewport
  // (within a 50% margin) so switching never flashes — without paying the cost
  // on initial page load. Also learns which images are missing so their
  // placeholder is ready before the first switch.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || preloadedRef.current) return;
        preloadedRef.current = true;
        features.flatMap((f) => f.images || []).forEach((src) => {
          const img = new Image();
          img.onerror = () => markFailed(src);
          img.src = src;
        });
        observer.disconnect();
      },
      { rootMargin: "50%" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = features[active];
  const Frame = cur.frame === "phone" ? PhoneFrame : LaptopFrame;
  const multi = (cur.images?.length ?? 0) > 1;
  const src = cur.images?.[page];
  const isFailed = !!(src && failed[src]);

  // reset to the first screen whenever the feature changes
  useEffect(() => setPage(0), [active]);

  // gentle auto-advance for multi-screen features, paused on hover/focus and off
  // under reduced motion; dots stay clickable either way
  useEffect(() => {
    if (!multi || paused || reduce) return;
    const t = setTimeout(() => setPage((p) => (p + 1) % cur.images.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [multi, paused, reduce, page, active, cur.images?.length]);

  const onTabKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % features.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + features.length) % features.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = features.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const altFor = multi ? `${cur.alt} (view ${page + 1} of ${cur.images.length})` : cur.alt;
  const titleTodo = isTodo(cur.title);
  const descTodo = isTodo(cur.description);

  return (
    <div className="mt-8" ref={sectionRef}>
      {/* device + page dots share hover/focus so autoplay pauses while inspected */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Frame>
          {cur.video ? (
            <CaseVideo
              sources={cur.video.sources}
              poster={cur.video.poster}
              label={cur.alt}
              className="h-full rounded-none border-0"
            />
          ) : (
          <AnimatePresence initial={false}>
            <motion.div
              key={`${cur.id}-${page}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.15 }}
            >
              {isFailed ? (
                <div className="flex h-full w-full items-center justify-center border-[1.5px] border-dashed border-stroke-2 bg-imgbg">
                  <span className="px-6 text-center font-plex text-[12px] leading-[1.7] text-grayt">
                    {fileName(src)}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setZoom({ src, alt: altFor })}
                  aria-label={`Open ${altFor} at full resolution`}
                  className="block h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-inset"
                >
                  <img
                    src={src}
                    alt={altFor}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${cur.fit === "top" ? "object-top" : ""}`}
                    onError={() => markFailed(src)}
                  />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
          )}
        </Frame>

        {/* page dots — the row height is always reserved (h-2) so single- and
            multi-screen features keep the selector below at the same position;
            the dots themselves only appear when there is more than one screen */}
        <div
          className="mt-6 flex h-2 items-center justify-center gap-2.5"
          role={multi ? "group" : undefined}
          aria-label={multi ? `${cur.label} screens` : undefined}
          aria-hidden={multi ? undefined : true}
        >
          {multi &&
            cur.images.map((imgSrc, i) => {
              const on = i === page;
              return (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Show screen ${i + 1} of ${cur.images.length}`}
                  aria-current={on ? "true" : undefined}
                  className={
                    "h-2 rounded-full transition-all duration-300 " +
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 " +
                    (on ? "w-5 bg-blue" : "w-2 bg-stroke-2 hover:bg-grayt")
                  }
                />
              );
            })}
        </div>
      </div>

      {/* selector — a card grid; the active card colors in and drives the screen
          above. Cards stack two-up on mobile, five across on wide viewports. */}
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onTabKeyDown}
        className={`mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 ${tabCols}`}
      >
        {features.map((f, i) => {
          const on = i === active;
          const Icon = f.icon;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              id={`shipped-tab-${f.id}`}
              aria-selected={on}
              aria-controls="shipped-panel"
              tabIndex={on ? 0 : -1}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActive(i)}
              className={
                "flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 text-center transition-colors " +
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 " +
                (on
                  ? "border-blue bg-blue/[0.06] text-ink"
                  : "border-stroke bg-white text-grayt hover:border-grayt hover:text-ink")
              }
            >
              {Icon && (
                <Icon
                  width={22}
                  height={22}
                  strokeWidth={1.8}
                  aria-hidden
                  className={on ? "text-blue" : "text-grayt"}
                />
              )}
              <span className={"font-plex text-[11px] " + (on ? "text-blue" : "text-stroke-2")}>{f.number}</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.04em]">{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* active title + description, centered; crossfades with the image. A hidden
          sizer of the current content reserves height so the absolute crossfade
          layer never clips or jumps the layout. */}
      <div
        id="shipped-panel"
        role="tabpanel"
        aria-labelledby={`shipped-tab-${cur.id}`}
        tabIndex={0}
        className="relative mx-auto mt-10 max-w-[600px] text-center focus-visible:outline-none"
      >
        <div aria-hidden="true" className="invisible">
          <h3 className="text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink">{cur.title}</h3>
          <p className="mt-3 text-[16px] leading-[1.65] text-grayt">{withHighlight(cur.description, cur.highlight)}</p>
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            key={cur.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
          >
            {titleTodo ? (
              <div className="flex justify-center"><Todo inline text={cur.title} /></div>
            ) : (
              <h3 className="text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink">{cur.title}</h3>
            )}
            {descTodo ? (
              <div className="mt-3 flex justify-center"><Todo inline text={cur.description} /></div>
            ) : (
              <p className="mx-auto mt-3 max-w-[640px] text-[16px] leading-[1.65] text-grayt">
                {withHighlight(cur.description, cur.highlight)}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoom && (
          <Lightbox src={zoom.src} alt={zoom.alt} reduce={reduce} onClose={() => setZoom(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

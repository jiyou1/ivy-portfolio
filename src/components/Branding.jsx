import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Xmark } from "iconoir-react";
import SectionLabel from "./SectionLabel";

/* Branding section: a row of glassy macOS-style folders (2x2 on mobile).
   Hovering a folder lifts it and pops its first few pieces up as polaroids;
   clicking opens the brand's board (its real pieces, each captioned) large in a
   glass overlay. One board open at a time; Esc, backdrop, or the close button
   dismisses it and returns focus to the folder.

   Assets live in /public/branding/ (webp). Each image that is missing at build
   time hides itself via onError, so a board shows only the pieces that exist and
   never renders placeholder art. Folders with no pieces yet render dimmed and
   inert until their assets land.

   Colors: existing tokens only (bright Sky Signal ramp stops); folders are
   interactive, so blue is the right accent. Shadows are blue-ink tinted. Fonts
   stay body (Inter); names and captions are sentence/proper case, never mono. */

const FOLDERS = [
  {
    id: "barun",
    name: "Barun Red Ginseng",
    caption: "Brand identity, client work",
    items: [
      { src: "/branding/barun-1.webp", alt: "The Barun Red Ginseng vertical Hangul logo lockup", caption: "Heritage Hangul lockup, deep red emblem" },
      { src: "/branding/barun-2.webp", alt: "Barun Red Ginseng business cards", caption: "명함 · business cards" },
      { src: "/branding/barun-3.webp", alt: "Barun Red Ginseng storefront sign in Garden Grove", caption: "가게 간판 · the real storefront in Garden Grove" },
      { src: "/branding/barun-4.webp", alt: "Barun Red Ginseng website, a K-wellness storefront", caption: "웹사이트 · K-wellness storefront" },
    ],
  },
  {
    id: "likelion",
    name: "LikeLion UCI Instagram",
    caption: "Org social system, 2 cohorts",
    items: [
      { src: "/branding/likelion-1.webp", alt: "The @likelion.uci Instagram grid", caption: "@likelion.uci, the grid" },
      { src: "/branding/likelion-2.webp", alt: "LikeLion UCI season intro post, dark editorial", caption: "활동 소개 · season intro, dark editorial" },
      { src: "/branding/likelion-3.webp", alt: "LikeLion UCI member recruitment post", caption: "멤버 모집 · recruitment" },
      { src: "/branding/likelion-4.webp", alt: "LikeLion UCI applications-extended post, blue typographic", caption: "Applications extended" },
    ],
  },
  // Prime Academy and 99DIVINE render dimmed until their pieces are exported.
  { id: "prime", name: "Prime Academy", caption: "Multi-channel brand system: web, print, signage", items: [] },
  { id: "99divine", name: "99DIVINE", caption: "Client identity & storefront UI", items: [] },
];

/* three polaroids peeking up behind the folder on hover */
const PEEK = [
  { x: -46, y: -30, rotate: -13 },
  { x: 0, y: -44, rotate: 2 },
  { x: 46, y: -30, rotate: 13 },
];

const SPRING = { type: "spring", stiffness: 240, damping: 20 };

/* Glassy macOS folder, code-drawn: gradient back + tab, a brighter translucent
   front pocket with a specular top edge and a soft inner floor shadow; the front
   tips forward from its bottom mouth when active. All fills are Sky Signal ramp
   stops, front lighter than back like a real Mac folder. */
function FolderArt({ active, reduce }) {
  return (
    <div
      className="relative h-[92px] w-[124px]"
      style={{ perspective: 640, filter: "drop-shadow(0 14px 22px rgba(10,111,224,0.30))" }}
    >
      <svg viewBox="0 0 124 92" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="fld-back" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4DA6FF" />
            <stop offset="1" stopColor="#0A6FE0" />
          </linearGradient>
          <linearGradient id="fld-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8FC7FF" />
            <stop offset="0.55" stopColor="#4DA6FF" />
            <stop offset="1" stopColor="#0A85FF" />
          </linearGradient>
        </defs>
        <path
          d="M4 22 Q4 11 15 11 L42 11 Q47 11 50 16 L55 24 L110 24 Q120 24 120 34 L120 82 Q120 92 110 92 L14 92 Q4 92 4 82 Z"
          fill="url(#fld-back)"
        />
      </svg>
      <motion.svg
        viewBox="0 0 124 92"
        className="absolute inset-0 h-full w-full"
        style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
        initial={false}
        animate={reduce ? { rotateX: 0 } : { rotateX: active ? -26 : 0 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 }}
        aria-hidden
      >
        <path d="M9 36 L115 36 Q120 36 120 44 L120 82 Q120 92 110 92 L14 92 Q4 92 4 82 L4 44 Q4 36 9 36 Z" fill="url(#fld-front)" fillOpacity="0.94" />
        <path d="M9 37.5 L115 37.5 Q118 37.5 118.5 41" fill="none" stroke="#D6EAFF" strokeOpacity="0.85" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4 78 L120 78 L120 82 Q120 92 110 92 L14 92 Q4 92 4 82 Z" fill="#0A6FE0" fillOpacity="0.3" />
      </motion.svg>
    </div>
  );
}

/* one peeking polaroid: About-page frame/tilt language, scaled down; hides
   itself if its image is missing */
function PeekPolaroid({ src, slot, index, reduce }) {
  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ zIndex: 5 + index }}
      variants={{
        rest: { opacity: 0, x: 0, y: 0, scale: 0.8, rotate: 0 },
        peek: { opacity: 1, x: slot.x, y: slot.y, scale: 1, rotate: slot.rotate },
      }}
      transition={reduce ? { duration: 0 } : { ...SPRING, delay: index * 0.03 }}
    >
      <div data-peek-card className="w-[92px] -translate-x-1/2 rounded-md bg-white p-1.5 pb-5 shadow-[0_12px_22px_rgba(26,46,102,0.26)]">
        <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-imgbg">
          <img
            src={src}
            alt=""
            width={92}
            height={92}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={(e) => {
              const card = e.currentTarget.closest("[data-peek-card]");
              if (card) card.style.display = "none";
            }}
            className="pointer-events-none h-full w-full select-none object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Folder({ folder, onOpen, btnRef }) {
  const reduce = useReducedMotion();
  const [peek, setPeek] = useState(false);
  const ready = folder.items.length > 0;
  const active = ready && peek;

  return (
    <div className={"flex w-[44%] flex-col items-center sm:w-auto" + (ready ? "" : " opacity-60")}>
      <motion.div
        className="relative"
        initial="rest"
        animate={reduce ? "rest" : active ? "peek" : "rest"}
        onHoverStart={() => ready && setPeek(true)}
        onHoverEnd={() => setPeek(false)}
      >
        {ready && (
          <div aria-hidden className="pointer-events-none absolute bottom-[64px] left-1/2 z-20 h-0 w-0">
            {folder.items.slice(0, 3).map((it, i) => (
              <PeekPolaroid key={i} src={it.src} slot={PEEK[i]} index={i} reduce={reduce} />
            ))}
          </div>
        )}

        <motion.button
          ref={btnRef}
          type="button"
          disabled={!ready}
          onClick={() => ready && onOpen(folder.id)}
          onFocus={() => ready && setPeek(true)}
          onBlur={() => setPeek(false)}
          aria-haspopup={ready ? "dialog" : undefined}
          aria-label={ready ? `Open ${folder.name} board` : `${folder.name} (pieces coming soon)`}
          whileHover={reduce || !ready ? undefined : { y: -3 }}
          whileTap={reduce || !ready ? undefined : { scale: 0.97 }}
          transition={SPRING}
          className={
            "block rounded-2xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 " +
            (ready ? "cursor-pointer" : "cursor-default")
          }
        >
          <FolderArt active={active} reduce={reduce} />
        </motion.button>
      </motion.div>

      <span className="mt-4 text-center text-[13px] font-medium text-ink/75">{folder.name}</span>
      <span className="mt-0.5 max-w-[190px] text-center text-[12px] leading-[1.4] text-grayt">{folder.caption}</span>
    </div>
  );
}

/* the brand board: a glass-framed masonry of the folder's real pieces, each
   captioned. Pieces that fail to load hide themselves; never fabricated. */
function BoardOverlay({ folder, reduce, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(11,14,20,0.42)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${folder.name}: ${folder.caption}`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
        className="glass relative flex max-h-[88vh] w-full max-w-[760px] flex-col overflow-hidden rounded-[28px] outline-none"
      >
        <div className="flex items-baseline justify-between gap-4 border-b border-white/60 px-6 py-4">
          <p className="text-[15px]">
            <span className="font-semibold text-ink">{folder.name}</span>
            <span className="ml-2 text-[13px] text-grayt">{folder.caption}</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close board"
            className="glass flex h-9 w-9 flex-none items-center justify-center rounded-full text-ink transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
          >
            <Xmark width={18} height={18} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="columns-1 gap-4 sm:columns-2">
            {folder.items.map((it) => (
              <figure key={it.src} data-board-card className="mb-4 break-inside-avoid rounded-lg bg-white p-2 shadow-[0_14px_30px_rgba(26,46,102,0.20)]">
                <img
                  src={it.src}
                  alt={it.alt}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const c = e.currentTarget.closest("[data-board-card]");
                    if (c) c.style.display = "none";
                  }}
                  className="block w-full rounded-[4px]"
                />
                {it.caption && <figcaption className="px-1 pb-1 pt-2 text-[12px] leading-[1.45] text-grayt">{it.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Branding() {
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState(null);
  const btnRefs = useRef({});

  const close = () => {
    const id = openId;
    setOpenId(null);
    btnRefs.current[id]?.focus({ preventScroll: true });
  };

  const openFolder = FOLDERS.find((f) => f.id === openId);

  return (
    <section id="branding" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <SectionLabel>BRANDING</SectionLabel>
      <h2 className="mt-3 text-[2rem] font-bold tracking-[-0.02em] sm:text-[2.75rem]">
        Identity, on and off the grid.
      </h2>
      <p className="mt-4 max-w-2xl text-ink/90">
        Identity systems and social design, from client work to my own grid.
      </p>

      <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-14 sm:gap-x-12">
        {FOLDERS.map((f) => (
          <Folder key={f.id} folder={f} onOpen={setOpenId} btnRef={(el) => (btnRefs.current[f.id] = el)} />
        ))}
      </div>

      <AnimatePresence>
        {openFolder && <BoardOverlay folder={openFolder} reduce={reduce} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}

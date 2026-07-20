import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Page, Eye } from "iconoir-react";
import SectionLabel from "./SectionLabel";
import { HOME_PROJECTS } from "../data/projects";

function Cover({ src, video, alt, position }) {
  // `position` sets object-position for cards whose media needs a nudge away
  // from the default center crop (e.g. a taller-than-card video).
  const style = position ? { objectPosition: position } : undefined;
  if (video) {
    return (
      <video
        src={video}
        poster={src}
        autoPlay
        loop
        muted
        playsInline
        style={style}
        className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={style}
      onError={(e) => (e.currentTarget.style.display = "none")}
      className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

// hover-capable, fine pointer only — skip the cursor label on touch devices
const CAN_HOVER =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function WorkCard({ p, dimmed }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 350, damping: 30, mass: 0.4 });

  const moveTo = (e) => {
    mx.set(e.clientX + 16);
    my.set(e.clientY + 16);
  };
  const handleEnter = (e) => {
    moveTo(e);
    sx.jump(e.clientX + 16);
    sy.jump(e.clientY + 16);
    setHovered(true);
  };

  const isInternal = !p.external && p.href.startsWith("/work");
  const Wrapper = isInternal ? Link : "a";
  const wrapperProps = isInternal
    ? { to: p.href }
    : { href: p.href, target: "_blank", rel: "noreferrer" };

  return (
    <motion.div
      onMouseEnter={CAN_HOVER ? handleEnter : undefined}
      onMouseMove={CAN_HOVER ? moveTo : undefined}
      onMouseLeave={CAN_HOVER ? () => setHovered(false) : undefined}
      animate={{ opacity: dimmed ? 0.35 : 1, scale: dimmed && !reduce ? 0.98 : 1 }}
      whileHover={reduce ? {} : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, opacity: { duration: 0.22 } }}
    >
      <Wrapper
        {...wrapperProps}
        className="glass group block rounded-[28px] p-6"
      >
        <div
          className="relative aspect-[592/360] overflow-hidden rounded-2xl border border-imgbg bg-white"
          style={p.thumb ? { backgroundColor: p.thumb } : undefined}
        >
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.06em] text-white/80 mix-blend-difference">
            COVER — {p.title.toUpperCase()}
          </span>
          <Cover src={p.cover} video={p.video} alt={p.title + " cover"} position={p.coverPosition} />
          <span className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
        </div>
        <p className="mt-5 text-[10.5px] font-medium tracking-[0.12em] text-grayt">{p.label}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-[-0.01em]">{p.title}</h3>
        <p className="mt-3 text-[14px] leading-[1.55] text-ink/90">{p.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.08em] text-blue-text">{p.tags}</span>
          <span className="rounded-full bg-blue px-4 py-2 text-[10.5px] font-semibold tracking-[0.06em] text-white transition-transform group-hover:-translate-y-0.5">
            VIEW ↗
          </span>
        </div>
      </Wrapper>

      {CAN_HOVER &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <motion.div
                style={{ x: reduce ? mx : sx, y: reduce ? my : sy, top: 0, left: 0 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="pointer-events-none fixed z-[60] inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(11,14,20,0.35)]"
              >
                <Eye width={13} height={13} strokeWidth={2.2} aria-hidden />
                View Case Study
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
}

export default function Works({ filter, onClear, headingRef }) {
  return (
    <section id="projects" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <SectionLabel>
        <span className="inline-flex items-center gap-2">
          02 — SELECTED WORKS
          <Page width={14} height={14} strokeWidth={2} aria-hidden />
        </span>
      </SectionLabel>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-[2rem] font-bold tracking-[-0.02em] focus:outline-none sm:text-[2.75rem]"
      >
        Designed, built, and shipped.
      </h2>

      {filter && (
        <div className="mt-6 flex items-center gap-2 text-[12px] font-semibold tracking-[0.06em]">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-grayt">Filtering by:</span>
            <span className="text-blue-text">{filter}</span>
            <span aria-hidden="true" className="text-grayt">·</span>
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer text-ink underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              Clear
            </button>
          </span>
        </div>
      )}

      <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2">
        {HOME_PROJECTS.map((p) => (
          <WorkCard
            key={p.slug}
            p={p}
            dimmed={!!filter && !p.skills.includes(filter)}
          />
        ))}
      </div>
    </section>
  );
}

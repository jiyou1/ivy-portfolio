import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Palette, Component, Frame, Search, Atom, Code, Html5, Wind, GitBranch } from "iconoir-react";
import SectionLabel from "./SectionLabel";
import { SKILLS } from "../data/skills";
import { BIO, LINKS } from "../data/site";

/* Polaroid stack that fans out on hover AND lets you grab and drag each card.
   Two nested layers keep the two gestures from fighting over the same transform:
   the OUTER layer owns the hover-fan (x/y from the `fan` variant), the INNER
   layer owns `drag`. Grabbing a card lifts it to the front. */
const PHOTOS = [
  { src: "/polaroid3.jpg", rotate: -9, x: 0, y: 60, fan: { rotate: -16, x: -56, y: 36 } },
  { src: "/polaroid2.jpg", rotate: 8, x: 120, y: 40, fan: { rotate: 16, x: 186, y: 16 } },
  { src: "/polaroid1.jpg", rotate: -2, x: 60, y: 100, fan: { rotate: 0, x: 64, y: 120 } },
];

function Polaroid({ photo, z, reduce, onLift }) {
  const { src, rotate, x, y, fan } = photo;
  return (
    <motion.div
      // fan layer: spreads on group hover, never dragged
      variants={{
        rest: { rotate, x, y },
        fan: { rotate: fan.rotate, x: fan.x, y: fan.y },
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{ position: "absolute", left: 0, top: 0, zIndex: z }}
    >
      <motion.div
        // drag layer: independent transform, so moving a card doesn't cancel the fan
        drag
        dragMomentum={false}
        dragElastic={0.16}
        dragConstraints={{ left: -160, right: 220, top: -120, bottom: 160 }}
        onPointerDown={onLift}
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileDrag={{ scale: 1.05 }}
        style={{ cursor: "grab" }}
        className="w-[200px] touch-none rounded-md bg-white p-3 pb-14 shadow-[0_16px_30px_rgba(26,46,102,0.22)] active:cursor-grabbing sm:w-[230px]"
      >
        <div className="aspect-square w-full overflow-hidden rounded-[3px] bg-imgbg">
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="pointer-events-none h-full w-full select-none object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Polaroids() {
  const reduce = useReducedMotion();
  const [zOrder, setZOrder] = useState(() => PHOTOS.map((_, i) => i + 1));
  const bringToFront = (i) =>
    setZOrder((prev) => {
      const max = Math.max(...prev);
      if (prev[i] === max) return prev;
      const next = [...prev];
      next[i] = max + 1;
      return next;
    });
  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "fan"}
      whileTap={reduce ? undefined : "fan"}
      className="relative mx-auto h-[420px] w-[340px] shrink-0 sm:w-[420px]"
      aria-label="Photos of Ivy (hover to fan out, drag to rearrange)"
    >
      {PHOTOS.map((p, i) => (
        <Polaroid key={p.src} photo={p} z={zOrder[i]} reduce={reduce} onLift={() => bringToFront(i)} />
      ))}
    </motion.div>
  );
}

// iconoir icon per skill label (used where a sensible match exists)
const SKILL_ICONS = {
  "UI/UX DESIGN": Palette,
  "DESIGN SYSTEMS": Component,
  "PROTOTYPING": Frame,
  "USER RESEARCH": Search,
  "REACT": Atom,
  "TYPESCRIPT": Code,
  "HTML/CSS": Html5,
  "TAILWIND CSS": Wind,
  "GIT": GitBranch,
};

/* Interactive skill chip (spec §4.2). A real <button>: clicking scrolls to the
   works grid and filters it. */
function SkillChip({ label, onSelect }) {
  const Icon = SKILL_ICONS[label];
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className="glass inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.08em] text-ink transition-[color,transform] duration-150 hover:text-blue active:scale-[0.97] focus-visible:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
    >
      {Icon && <Icon width={13} height={13} strokeWidth={2} aria-hidden />}
      {label}
    </button>
  );
}

export default function About({ onSkill }) {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <Polaroids />

        {/* 8pt rhythm: eyebrow hugs the heading (8px); larger gaps break groups */}
        <div className="max-w-2xl">
          <SectionLabel>ABOUT ME <span className="align-middle text-[18px]">☺</span></SectionLabel>
          <h2 className="mt-2 text-[2rem] font-bold tracking-[-0.02em] sm:text-[2.75rem]">
            Designer who ships.
          </h2>
          <div className="mt-6 space-y-4">
            {BIO.map((p) => (
              <p key={p.slice(0, 24)} className="leading-[1.7] text-ink/90">
                {p}
              </p>
            ))}
          </div>

          <p className="mt-8 text-[11px] font-semibold tracking-[0.12em] text-grayt">DESIGN</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {SKILLS.design.map((t) => (
              <SkillChip key={t} label={t} onSelect={onSkill} />
            ))}
          </div>

          <p className="mt-6 text-[11px] font-semibold tracking-[0.12em] text-grayt">ENGINEERING</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {SKILLS.engineering.map((t) => (
              <SkillChip key={t} label={t} onSelect={onSkill} />
            ))}
          </div>

          <p className="mt-8 text-[11px] font-semibold tracking-[0.12em] text-grayt">FIND ME</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><span className="mr-3 font-semibold text-blue-text">LinkedIn</span><a className="hover:text-blue-text" href={LINKS.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/jiyouivylee</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Instagram</span><a className="hover:text-blue-text" href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">instagram.com/ee.jyoo</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Email</span><a className="hover:text-blue-text" href={LINKS.email}>jiyoul@uci.edu</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Resume</span><a className="hover:text-blue-text" href={LINKS.resume} target="_blank" rel="noreferrer">PDF download ↓</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Design Documentation</span><a className="hover:text-blue-text" href={LINKS.notion} target="_blank" rel="noreferrer">Notion ↗</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

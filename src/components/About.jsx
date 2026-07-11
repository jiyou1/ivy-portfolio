import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Figma, Component, Frame, Search, Atom, Code, Html5, Wind, GitBranch } from "iconoir-react";
import SectionLabel from "./SectionLabel";
import { SKILLS } from "../data/skills";
import { BIO, LINKS } from "../data/site";

/* Draggable polaroid stack. Each card can be dragged aside to reveal the ones
   behind; grabbing a card lifts it to the front and it stays there on release. */
const PHOTOS = [
  { src: "/polaroid3.jpg", caption: "irvine, ca", rotate: -9, left: 0, top: 60 },
  { src: "/polaroid2.jpg", caption: "likelion days ☆", rotate: 8, left: 120, top: 40 },
  { src: "/polaroid1.jpg", caption: "ivy ☺ 2026", rotate: -2, left: 60, top: 100 },
];

function Polaroid({ photo, z, reduce, onLift }) {
  const { src, caption, rotate, left, top } = photo;
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.14}
      dragConstraints={{ left: -170, right: 230, top: -110, bottom: 150 }}
      onPointerDown={onLift}
      initial={{ rotate }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileDrag={{ scale: 1.05 }}
      style={{ left, top, zIndex: z, cursor: "grab" }}
      className="absolute w-[200px] touch-none rounded-md bg-white p-3 pb-2 shadow-[0_16px_30px_rgba(26,46,102,0.22)] active:cursor-grabbing sm:w-[230px]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[3px] bg-imgbg">
        <img
          src={src}
          alt=""
          draggable={false}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      </div>
      <p className="select-none py-2 text-center font-hand text-xl text-ink">{caption}</p>
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
    <div
      className="relative mx-auto h-[420px] w-[340px] shrink-0 sm:w-[420px]"
      aria-label="Photos of Ivy (drag to rearrange)"
    >
      {PHOTOS.map((p, i) => (
        <Polaroid key={p.src} photo={p} z={zOrder[i]} reduce={reduce} onLift={() => bringToFront(i)} />
      ))}
    </div>
  );
}

// iconoir icon per skill label (used where a sensible match exists)
const SKILL_ICONS = {
  "FIGMA": Figma,
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
      className="glass inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.08em] text-ink transition-colors duration-150 hover:text-blue focus-visible:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
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
          <SectionLabel>01 — ABOUT ME <span className="align-middle text-[18px]">☺</span></SectionLabel>
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
            <li><span className="mr-3 font-semibold text-blue-text">Email</span><a className="hover:text-blue-text" href={LINKS.email}>jiyoul@uci.edu</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Resume</span><a className="hover:text-blue-text" href={LINKS.resume} target="_blank" rel="noreferrer">PDF download ↓</a></li>
            <li><span className="mr-3 font-semibold text-blue-text">Design Documentation</span><a className="hover:text-blue-text" href={LINKS.notion} target="_blank" rel="noreferrer">Notion ↗</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

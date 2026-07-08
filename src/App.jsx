import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import CaseStudy from "./CaseStudy";
import { Envelope } from "@phosphor-icons/react";
import {
  Sparks,
  CursorPointer,
  Rocket,
  Figma,
  Component,
  Frame,
  Search,
  Atom,
  Code,
  Html5,
  Wind,
  GitBranch,
} from "iconoir-react";

/* ---------- data ---------- */

const PROJECTS = [
  {
    slug: "icoi",
    label: "OPERATIONAL PORTAL · CLIENT PROJECT",
    title: "ICOI Membership Portal",
    desc: "End-to-end design and React build of a membership management system, delivered for a real client's daily operations with full handoff.",
    tags: "FIGMA · REACT · DESIGN SYSTEM",
    cover: "/covers/icoi.jpg",
    href: "/decks/icoi-poster.pdf",
    external: false,
    skills: ["FIGMA", "DESIGN SYSTEMS", "PROTOTYPING", "REACT", "TYPESCRIPT", "HTML/CSS", "TAILWIND CSS", "REST APIS", "GIT"],
  },
  {
    slug: "lattelearn",
    label: "PRODUCTIVITY APP · PM & DESIGN LEAD",
    title: "LatteLearn",
    desc: "A focus companion that brings the café study experience home. Led a 9-person team from concept to a packaged desktop app.",
    tags: "FIGMA · ELECTRON · PM",
    cover: "/covers/lattelearn.jpg",
    href: "/decks/lattelearn.pdf",
    external: false,
    skills: ["FIGMA", "PROTOTYPING", "MOTION DESIGN", "GIT"],
  },
  {
    slug: "roomietask",
    label: "UX RESEARCH · HCI PROCESS",
    title: "RoomieTask",
    desc: "Shared task coordination app designed through surveys, interviews, affinity mapping, prototyping, and moderated usability testing.",
    tags: "RESEARCH · PROTOTYPING · TESTING",
    cover: "/covers/roomietask.jpg",
    href: "/decks/roomietask.pdf",
    external: false,
    skills: ["FIGMA", "USER RESEARCH", "PROTOTYPING", "ACCESSIBILITY"],
  },
  {
    slug: "designathon",
    label: "EVENT PLATFORM · DESIGN AT UCI",
    title: "Design-a-thon",
    desc: "Website and event experience for UCI's largest student design event, serving 200+ participants with a 4-person design team.",
    tags: "FIGMA · WEB DESIGN · BRANDING",
    cover: "/covers/designathon.jpg",
    href: "https://ucidesignathon.devpost.com/",
    external: true,
    skills: ["FIGMA", "DESIGN SYSTEMS", "HTML/CSS"],
  },
  {
    // Prime Academy has its own case-study route but is NOT shown on the home
    // grid (spec §5.1). Kept here so the /work/prime-academy route still resolves.
    slug: "prime-academy",
    label: "BRAND SYSTEM · WEB · PRINT · SIGNAGE",
    title: "Prime Academy",
    desc: "Redesigned the website, unified the print and in-center signage, and shipped one brand across every surface for an Irvine test-prep academy.",
    tags: "WEB · BRANDING · SIGNAGE",
    cover: "/covers/prime-academy.jpg",
    video: "/videos/Prime_New_Website.mp4",
    href: "/work/prime-academy",
    external: false,
    home: false,
    skills: [],
  },
];

const HOME_PROJECTS = PROJECTS.filter((p) => p.home !== false);

const BIO = [
  "I didn't start in the creative space. I started with math: the certainty of it, the way a hard problem clicks open when you find the right structure. That pull led me to computer science, and eventually to Informatics at UC Irvine, where I earned my B.S. with a specialization in Human-Computer Interaction.",
  "Somewhere along the way, I realized the problems I loved most lived at the boundary, where a system meets a person. HCI is where my love for art and my love for science stopped competing and started compounding.",
  "I still write code. I still ship. My capstone isn't a mockup, it's a membership portal a real organization runs on. Math taught me precision. CS taught me to build. Design taught me to play.",
];

const SKILLS = {
  design: ["FIGMA", "DESIGN SYSTEMS", "PROTOTYPING", "USER RESEARCH"],
  engineering: ["REACT", "TYPESCRIPT", "HTML/CSS", "TAILWIND CSS", "GIT"],
};

const LINKS = {
  email: "mailto:jiyoul@uci.edu",
  linkedin: "https://www.linkedin.com/in/jiyouivylee",
  resume: "/resume.pdf",
  notion: "https://app.notion.com/p/18ac7710ed0f81a1880dee4d051d8265?v=18ac7710ed0f813f9a47000cd1a66a75&source=copy_link",
};

/* ---------- shared bits ---------- */

function SectionLabel({ children }) {
  return (
    <p className="text-[12px] font-semibold tracking-[0.14em] text-blue-text">{children}</p>
  );
}

function Blobs() {
  return (
    <>
      <div className="blob h-[480px] w-[480px] bg-gradient-to-br from-holo-cyan/85 to-holo-violet/40 top-[20px] right-[-120px]" />
      <div className="blob h-[320px] w-[320px] bg-gradient-to-br from-holo-pink/80 to-holo-cyan/40 top-[340px] right-[60px]" />
      <div className="blob h-[400px] w-[400px] bg-gradient-to-br from-holo-violet/80 to-holo-pink/35 top-[760px] left-[-160px]" />
      <div className="blob h-[360px] w-[360px] bg-gradient-to-br from-holo-cyan/75 to-holo-pink/35 top-[1150px] right-[-110px]" />
      <div className="blob h-[440px] w-[440px] bg-gradient-to-br from-holo-pink/75 to-holo-violet/35 top-[1900px] left-[-180px]" />
      <div className="blob h-[380px] w-[380px] bg-gradient-to-br from-holo-violet/75 to-holo-cyan/35 top-[2700px] right-[-120px]" />
      <div className="blob h-[360px] w-[360px] bg-gradient-to-br from-holo-cyan/70 to-holo-violet/35 bottom-[700px] left-[-130px]" />
      <div className="blob h-[340px] w-[340px] bg-gradient-to-br from-holo-pink/70 to-holo-cyan/35 bottom-[60px] left-[420px]" />
    </>
  );
}

/* ---------- cover ---------- */

function Cover({ src, video, alt }) {
  if (video) {
    return (
      <video
        src={video}
        poster={src}
        autoPlay
        loop
        muted
        playsInline
        className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => (e.currentTarget.style.display = "none")}
      className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
}

/* ---------- nav ---------- */

function Nav() {
  const items = [
    ["HOME", "#home", "home"],
    ["ABOUT ME", "#about", "about"],
    ["PROJECTS", "#projects", "projects"],
    ["GET IN TOUCH", "#contact", "contact"],
  ];
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items
      .map(([, , id]) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
      <div
        className="glass flex items-center gap-5 rounded-full px-5 py-3 sm:gap-8 sm:px-7"
        style={{ background: "rgba(255, 255, 255, 0.7)" }}
      >
        {items.map(([label, href, id]) => {
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                "relative rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.08em] transition-colors " +
                (isActive ? "text-white" : "text-ink hover:text-blue-text") +
                (id === "home" ? "" : " hidden sm:block")
              }
            >
              {isActive && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 -z-0 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}
      </div>
      <Link
        to="/playground"
        className="group glass relative isolate overflow-hidden rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.06em] text-blue-text transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_10px_28px_rgba(88,28,180,0.45)]"
      >
        {/* smooth indigo -> violet fill, revealed on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 55%, #7c3aed 100%)" }}
        />
        <span className="relative inline-flex items-center gap-1.5">
          Join my Playground
          <Sparks
            width={14}
            height={14}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-500 group-hover:rotate-90"
          />
        </span>
      </Link>
    </nav>
  );
}

/* ---------- hero ---------- */

/* Floating hero assets (inflatable vol.2 pack) — one overlapping cluster in the
   right ~40% of the hero, vertically centered on the headline. The old iridescent
   bubble.png is removed (spec §2.5).

   Sizing: the play button drives the scale (clamp 200→320px); chain is 0.875x and
   arrow is 0.6x of it, so the whole cluster scales together with the viewport.
   Z-order (back→front): arrow, play, chain. Positions are % of the hero box.
   Drift amplitudes are kept small (y 6–10, x 3–5, rotate ≤2.5°) with different
   durations per shape so the shapes never separate. */
const PLAY_W = "clamp(200px, 22vw, 320px)";
const CHAIN_W = "clamp(175px, 19.25vw, 280px)"; /* 0.875x of play */
const ARROW_W = "clamp(144px, 15.84vw, 230px)";  /* 0.72x of play (0.6 × 1.2) */
const FLOATIES = [
  { src: "/floaties/arrow.png", width: ARROW_W, left: "56%", top: "25%", z: 10, drift: { y: 26, x: -14, rotate: 6, duration: 5,   delay: 0 } },
  { src: "/floaties/play.png",  width: PLAY_W,  left: "74%", top: "25%", z: 20, drift: { y: 22, x: 12,  rotate: 5, duration: 4.4, delay: 0.4 } },
  { src: "/floaties/chain.png", width: CHAIN_W, left: "67%", top: "46%", z: 30, drift: { y: 32, x: 10,  rotate: 8, duration: 4.8, delay: 0.2 } },
];

function Floaties() {
  const reduce = useReducedMotion();
  return (
    <>
      {FLOATIES.map((f, i) => (
        <motion.img
          key={f.src ?? i}
          src={f.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="pointer-events-none absolute hidden select-none drop-shadow-[0_24px_50px_rgba(51,89,204,0.18)] md:block"
          style={{ width: f.width, left: f.left, top: f.top, zIndex: f.z }}
          animate={
            reduce
              ? {}
              : { y: [0, f.drift.y, 0], x: [0, f.drift.x, 0], rotate: [0, f.drift.rotate, 0] }
          }
          transition={{
            duration: f.drift.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: f.drift.delay,
          }}
        />
      ))}
    </>
  );
}

/* Types the headline name once on mount (no loop). Caret blinks, then vanishes
   when finished. Reduced motion shows it whole. */
function TypedName({ text }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    if (n < text.length) {
      const t = setTimeout(() => setN(n + 1), 110);
      return () => clearTimeout(t);
    }
    // finished a pass: hold the full name, then restart the loop
    const t = setTimeout(() => setN(0), 2600);
    return () => clearTimeout(t);
  }, [n, reduce, text.length]);

  return (
    <span className="font-display italic">
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {!reduce && (
        <span
          aria-hidden="true"
          className="caret-blink ml-[0.12em] inline-block w-[0.035em] align-baseline"
          style={{ height: "0.72em", background: "var(--color-blue)" }}
        />
      )}
    </span>
  );
}

/* The eyebrow's trailing sparkle — a playful click toy: spins 360° and bounces
   bigger on each click to hint that it's interactive. Decorative (mouse-only),
   hidden from the a11y tree. */
function StarToggle() {
  const reduce = useReducedMotion();
  const [spins, setSpins] = useState(0);
  return (
    <motion.button
      type="button"
      aria-hidden="true"
      tabIndex={-1}
      onClick={() => setSpins((s) => s + 1)}
      className="inline-flex cursor-pointer leading-none text-blue"
      style={{ fontSize: "1.35em" }}
      whileHover={reduce ? undefined : { scale: 1.15 }}
      animate={reduce ? {} : { rotate: spins * 360, scale: [1, 1.3, 1] }}
      transition={{
        rotate: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.5, ease: "easeOut", repeat: Infinity, repeatDelay: 4.5 },
      }}
    >
      ✳
    </motion.button>
  );
}

/* Ice-glass keycap chips (spec §2.3). Decorative — a <ul> of <li>, not buttons. */
const KEYCAPS = [
  { label: "ICONIC", shipped: false, Icon: Sparks },
  { label: "INTERACTIVE", shipped: false, Icon: CursorPointer },
  { label: "SHIPPED", shipped: true, Icon: Rocket },
];

function Keycap({ label, shipped, Icon }) {
  const reduce = useReducedMotion();
  const base = shipped
    ? { background: "var(--color-blue)", border: "1px solid #0A6FE0", boxShadow: "0 4px 0 #0554B8", color: "#fff" }
    : { background: "#FDFEFF", border: "1px solid #E2E9F5", boxShadow: "0 4px 0 #C7D3E8", color: "var(--color-ink)" };
  const pressShadow = shipped ? "0 1px 0 #0554B8" : "0 1px 0 #C7D3E8";

  return (
    <motion.li
      style={{
        ...base,
        height: 42,
        borderRadius: 12,
        padding: "0 16px",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "'Silkscreen', monospace",
        fontSize: 13,
        letterSpacing: "1px",
        textTransform: "uppercase",
        userSelect: "none",
      }}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { y: 3, boxShadow: pressShadow }}
      transition={{ type: "spring", stiffness: 600, damping: 22 }}
    >
      {Icon && <Icon width={15} height={15} strokeWidth={2} aria-hidden />}
      {label}
    </motion.li>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <header id="home" className="relative px-5 pb-20 pt-36 sm:px-10 lg:px-16 lg:pt-44">
      <Floaties />
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-medium tracking-[0.14em] text-grayt">
            WELCOME TO MY CREATIVE STUDIO
          </p>
          <StarToggle />
        </div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          aria-label="hello, i'm ivy jiyou lee!"
          className="text-[clamp(3rem,9vw,6.5rem)] leading-[1.05]"
        >
          <span className="font-sans font-semibold tracking-[-0.02em]">hello, i&apos;m</span>
          <br />
          <TypedName text="ivy jiyou lee!" />
        </motion.h1>
        <p className="max-w-xl text-xl text-grayt">
          I design in Figma. Then I open VS Code and make it real.
        </p>
        <ul className="flex flex-wrap gap-3">
          {KEYCAPS.map((k) => (
            <Keycap key={k.label} label={k.label} shipped={k.shipped} Icon={k.Icon} />
          ))}
        </ul>
      </div>
    </header>
  );
}

/* ---------- about ---------- */

function Polaroid({ src, caption, rotate, x, y, z, fan }) {
  return (
    <motion.div
      variants={{
        rest: { rotate, x, y },
        fan: { rotate: fan.rotate, x: fan.x, y: fan.y },
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{ zIndex: z }}
      className="absolute w-[200px] rounded-md bg-white p-3 pb-2 shadow-[0_16px_30px_rgba(26,46,102,0.22)] sm:w-[230px]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[3px] bg-imgbg">
        <img
          src={src}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="py-2 text-center font-hand text-xl text-ink">{caption}</p>
    </motion.div>
  );
}

/* Interactive skill chip (spec §4.2). A real <button>: clicking scrolls to the
   works grid and filters it. */
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

function About({ onSkill }) {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
        <motion.div
          initial="rest"
          whileHover="fan"
          whileTap="fan"
          className="relative mx-auto h-[420px] w-[340px] shrink-0 sm:w-[420px]"
          aria-label="Photos of Ivy"
        >
          <Polaroid src="/polaroid3.jpg" caption="irvine, ca" rotate={-9} x={0} y={60} z={1} fan={{ rotate: -16, x: -56, y: 36 }} />
          <Polaroid src="/polaroid2.jpg" caption="likelion days ☆" rotate={8} x={120} y={40} z={2} fan={{ rotate: 16, x: 186, y: 16 }} />
          <Polaroid src="/polaroid1.jpg" caption="ivy ☺ 2026" rotate={-2} x={60} y={100} z={3} fan={{ rotate: 0, x: 64, y: 120 }} />
        </motion.div>

        {/* strict 24px (space-y-6) vertical rhythm through the whole bio column */}
        <div className="max-w-2xl space-y-6">
          <SectionLabel>01 — ABOUT ME <span className="align-middle text-[18px]">☺</span></SectionLabel>
          <h2 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            Designer who ships.
          </h2>
          {BIO.map((p) => (
            <p key={p.slice(0, 24)} className="leading-[1.7] text-ink/90">
              {p}
            </p>
          ))}

          <p className="text-[11px] font-semibold tracking-[0.12em] text-grayt">DESIGN</p>
          <div className="flex flex-wrap gap-3">
            {SKILLS.design.map((t) => (
              <SkillChip key={t} label={t} onSelect={onSkill} />
            ))}
          </div>

          <p className="text-[11px] font-semibold tracking-[0.12em] text-grayt">ENGINEERING</p>
          <div className="flex flex-wrap gap-3">
            {SKILLS.engineering.map((t) => (
              <SkillChip key={t} label={t} onSelect={onSkill} />
            ))}
          </div>

          <p className="text-[11px] font-semibold tracking-[0.12em] text-grayt">FIND ME</p>
          <ul className="space-y-2 text-sm">
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

/* ---------- works ---------- */

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
        <div className="relative aspect-[592/360] overflow-hidden rounded-2xl border border-imgbg bg-white">
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tracking-[0.06em] text-blue-text">
            COVER — {p.title.toUpperCase()}
          </span>
          <Cover src={p.cover} video={p.video} alt={p.title + " cover"} />
        </div>
        <p className="mt-5 text-[10.5px] font-medium tracking-[0.12em] text-grayt">{p.label}</p>
        <h3 className="mt-2 text-2xl font-bold tracking-[-0.01em]">{p.title}</h3>
        <p className="mt-3 text-[14px] leading-[1.55] text-ink/90">{p.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[9.5px] font-semibold tracking-[0.08em] text-blue-text">{p.tags}</span>
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
                className="pointer-events-none fixed z-[60] rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white shadow-[0_8px_24px_rgba(11,14,20,0.35)]"
              >
                View Case Study
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  );
}

function Works({ filter, onClear, headingRef }) {
  return (
    <section id="projects" className="relative px-5 py-20 sm:px-10 lg:px-16">
      <SectionLabel>02 — SELECTED WORKS</SectionLabel>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 text-4xl font-bold tracking-[-0.02em] focus:outline-none sm:text-5xl"
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

/* ---------- contact ---------- */

function Contact() {
  const buttons = [
    ["EMAIL", LINKS.email, true],
    ["LINKEDIN", LINKS.linkedin, false],
    ["RESUME ↓", LINKS.resume, false],
  ];
  return (
    <section id="contact" className="relative px-5 py-28 text-center sm:px-10">
      <div className="flex items-center justify-center gap-2.5">
        <SectionLabel>03 — GET IN TOUCH</SectionLabel>
        <Envelope size={20} weight="duotone" className="text-blue" aria-hidden />
      </div>
      <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
        I'm looking for new opportunities.
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-[17px] leading-[1.6] text-grayt">
        I'm always on the lookout for new opportunities to grow and learn. I love
        tackling challenges and adapting to changes as they come.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        {buttons.map(([label, href, primary]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("/") || href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className={
              primary
                ? "rounded-full bg-blue px-6 py-3 text-[11px] font-semibold tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5"
                : "glass rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.08em] text-ink transition-transform hover:-translate-y-0.5"
            }
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-14 text-[13px] text-grayt">designed and built by ivy jiyou lee ☆</p>
    </section>
  );
}

/* ---------- home page ---------- */

function Home() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState(null);
  const worksHeadingRef = useRef(null);

  const handleSkill = (skill) => {
    // clicking the active skill again clears the filter (spec §5.2)
    setFilter((cur) => (cur === skill ? null : skill));
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // move focus to the works heading for screen readers, without a second scroll jump
    requestAnimationFrame(() => worksHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Blobs />
      </div>
      <Nav />
      <main className="relative mx-auto max-w-[1440px]">
        <Hero />
        <About onSkill={handleSkill} />
        <Works filter={filter} onClear={() => setFilter(null)} headingRef={worksHeadingRef} />
        <Contact />
      </main>
    </div>
  );
}

/* ---------- playground (placeholder) ---------- */

function Playground() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
      style={{
        background:
          "radial-gradient(1.6px 1.6px at 12% 18%, #fff, transparent), radial-gradient(1.4px 1.4px at 78% 28%, #fff, transparent), radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.85), transparent), radial-gradient(1.2px 1.2px at 64% 82%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 88% 60%, #fff, transparent), linear-gradient(160deg, #060a1f 0%, #140b34 55%, #2a1550 100%)",
      }}
    >
      <p className="text-[12px] font-semibold tracking-[0.22em] text-white/70">✦ PLAYGROUND</p>
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

/* ---------- app ---------- */

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/prime-academy" element={<CaseStudy slug="prime-academy" />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}

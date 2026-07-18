import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Book, GitFork, Rocket, LightBulb } from "iconoir-react";

import CaseBlobs from "../components/icoi/CaseBlobs";
import Toc from "../components/icoi/Toc";
import Slot from "../components/icoi/Slot";
import ShippedFeatures from "../components/icoi/ShippedFeatures";
import CaseHero from "../components/case/CaseHero";
import StatStrip from "../components/case/StatStrip";
import CaseSection from "../components/case/CaseSection";
import SeeNext from "../components/SeeNext";
import ConstraintPair from "../components/case/ConstraintPair";
import JudgmentBeats from "../components/case/JudgmentBeats";
import ReflectionCards from "../components/case/ReflectionCards";

import {
  HERO,
  STATS,
  SECTIONS,
  CONTEXT,
  WORLD,
  PROCESS,
  SHIPPED_SECTION,
  REFLECTION,
} from "../content/designathon";

/* Pink-dominant mesh fingerprint: #FFB8EB leading, #8CDEFF and #B89EFF
   supporting. Pure radial-gradients that fade to transparent, the same
   pre-blurred blob technique CaseBlobs uses, never a runtime blur filter. */
const MESH = [
  {
    width: 620, height: 620, top: -140, right: -180,
    background: "radial-gradient(circle at 30% 30%, rgba(255,184,235,.60), rgba(184,158,255,.35) 60%, transparent 75%)",
  },
  {
    width: 520, height: 520, top: "34%", left: -240,
    background: "radial-gradient(circle at 60% 40%, rgba(255,184,235,.50), rgba(140,222,255,.32) 65%, transparent 78%)",
  },
  {
    width: 560, height: 560, bottom: -160, right: -140,
    background: "radial-gradient(circle at 40% 60%, rgba(255,184,235,.48), rgba(184,158,255,.38) 60%, transparent 76%)",
  },
];

/* A page figure: the standard dashed placeholder (Slot) with an optional mono
   caption beneath, until the real export lands in public/work/designathon/. */
function Figure({ src, label, caption, className = "" }) {
  return (
    <figure className="m-0">
      <Slot variant="wide" src={src} label={label} className={`m-0 ${className}`} />
      {caption && (
        <figcaption className="mt-2 font-plex text-[11px] leading-[1.5] text-grayt">{caption}</figcaption>
      )}
    </figure>
  );
}

export default function DesignathonCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "Design-a-thon · Ivy Jiyou Lee";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "For Design at UCI's Design-a-thon, the largest collegiate design hackathon in Southern California, I owned the Judges, Prizes, and Meet the Team pages across web and mobile."
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <CaseBlobs blobs={MESH} />
      <Toc sections={SECTIONS} />

      {/* Reserve the fixed TOC rail's column where it shows, so centered content
          never slides under the numerals. */}
      <div className="min-[880px]:pl-[256px]">
        <nav className="mx-auto max-w-[1080px] px-8 pt-8">
          <Link to="/" className="font-plex text-[13px] text-grayt transition-colors hover:text-ink">
            ← ivy jiyou lee
          </Link>
        </nav>

        <main className="mx-auto max-w-[1080px] px-8">
          <CaseHero {...HERO} />

          <StatStrip stats={STATS} className="mt-16" />

          {/* ================= 01 CONTEXT ================= */}
          <CaseSection id="context" n={CONTEXT.n} icon={Globe} eyebrow="Context" heading={CONTEXT.heading} body={CONTEXT.body}>
            <Figure {...CONTEXT.figure} className="mt-6 aspect-[16/9]" />
          </CaseSection>

          {/* ================= 02 THE WORLD WE BUILT ================= */}
          <CaseSection id="world" n={WORLD.n} icon={Book} eyebrow="The world we built" heading={WORLD.heading} body={WORLD.body}>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {WORLD.figures.map((f) => (
                <Figure key={f.src} {...f} className="aspect-[4/3]" />
              ))}
            </div>
            <ConstraintPair {...WORLD.constraint} />
          </CaseSection>

          {/* ================= 03 PROCESS ================= */}
          <CaseSection id="process" n={PROCESS.n} icon={GitFork} eyebrow="Process" heading={PROCESS.heading} body={PROCESS.body}>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {PROCESS.figures.map((f) => (
                <Figure key={f.src} {...f} className="aspect-[4/3]" />
              ))}
            </div>
            {PROCESS.constraints.map((c) => (
              <ConstraintPair key={c.constraint} {...c} />
            ))}
            <JudgmentBeats beats={PROCESS.beats} />
          </CaseSection>

          {/* ================= 04 WHAT SHIPPED ================= */}
          <CaseSection
            id="shipped"
            n={SHIPPED_SECTION.n}
            icon={Rocket}
            eyebrow="What shipped"
            heading={SHIPPED_SECTION.heading}
          >
            <ShippedFeatures
              features={SHIPPED_SECTION.features}
              label="Design-a-thon shipped surfaces"
              tabCols="lg:grid-cols-3"
            />
            <p className="mt-12 font-plex text-[12px] leading-[1.6] text-grayt">
              {SHIPPED_SECTION.credit}{" "}
              <a
                href={SHIPPED_SECTION.link.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-text"
              >
                {SHIPPED_SECTION.link.label}
              </a>
            </p>
          </CaseSection>

          {/* ================= 05 REFLECTION ================= */}
          <CaseSection id="reflect" n={REFLECTION.n} icon={LightBulb} eyebrow="Reflection" heading={REFLECTION.heading}>
            <ReflectionCards cards={REFLECTION.cards} />
          </CaseSection>
        </main>

        <footer className="mx-auto max-w-[1080px] px-8 pb-16 pt-24">
          <div className="h-px bg-stroke" />
          <SeeNext current="designathon" />
          <p className="pt-10 font-plex text-[12px] text-grayt">
            <a href="/#projects" className="text-blue-text">← back to all work</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { Link } from "react-router-dom";
import CaseBlobs from "../components/icoi/CaseBlobs";
import Toc from "../components/icoi/Toc";
import Slot from "../components/icoi/Slot";
import BylawTrace from "../components/icoi/BylawTrace";
import CompetitorMatrix from "../components/lattelearn/CompetitorMatrix";

/* LatteLearn case study — a sibling of the ICOI page: same architecture (TOC
   scrollspy rail, skip button, Slot placeholders, section scaffolding, the
   excerpt+means trace), different skin. The café palette is applied by
   OVERRIDING the shared CSS tokens on this page's root (CAFE_TOKENS below), so
   the reused ICOI components (Toc, Slot, BylawTrace, CaseBlobs) render warm
   without any per-page forks. Accent has two stops: --color-blue is the true
   accent (#8C6D46) for large glyphs / fills; --color-blue-text is a deeper
   accent-ink (#6E5436) for small text, which keeps contrast >= 4.5:1 on the bg. */

const ASSETS = "/case/lattelearn/";

/* café tokens layered over the site's shared token names */
const CAFE_TOKENS = {
  "--color-bg": "#F4EFE6",
  "--color-ink": "#2B2118",
  "--color-prose": "#4A4036", // body
  "--color-legal": "#4A4036", // trace quote text
  "--color-grayt": "#6F6350", // "muted" role, darkened to pass AA on the bg
  "--color-blue": "#8C6D46", // true accent — arrows, fills, marks (large)
  "--color-blue-text": "#6E5436", // accent-ink — small accent text (contrast-safe)
  "--color-imgbg": "#EDE5D6",
  "--color-stroke": "#E5DCCC",
  "--color-stroke-2": "#D9CDB8",
  backgroundColor: "#F4EFE6",
};

/* three warm gradient blobs (caramel #E8C88F leading, blended toward #FFB8EB),
   behind hero / the metaphor section / reflection — same no-blur technique as
   the home page */
const CAFE_BLOBS = [
  {
    width: 620, height: 620, top: -140, right: -170,
    background: "radial-gradient(circle at 32% 32%, rgba(232,200,143,.60), rgba(255,184,235,.26) 60%, transparent 76%)",
  },
  {
    width: 560, height: 560, top: "44%", right: -200,
    background: "radial-gradient(circle at 60% 40%, rgba(232,200,143,.50), rgba(255,184,235,.24) 62%, transparent 78%)",
  },
  {
    width: 520, height: 520, bottom: -150, left: -180,
    background: "radial-gradient(circle at 40% 55%, rgba(255,184,235,.34), rgba(232,200,143,.42) 58%, transparent 76%)",
  },
];

const TOC_SECTIONS = [
  ["01", "context", "Context"],
  ["02", "gap", "The gap"],
  ["03", "flows", "Flows before screens"],
  ["04", "metaphor", "The metaphor ledger"],
  ["05", "shipped", "What shipped"],
  ["06", "pm", "The PM lens"],
  ["07", "reflect", "Reflection"],
];

/* ---------- prose scaffolding (prose caps at 760px; media spans 1080) ---------- */
function Eyebrow({ n, children }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[12px] uppercase tracking-[0.14em] text-blue-text">
      {n && <span>{n}</span>}
      {children}
    </span>
  );
}
const H2 = ({ children, ...rest }) => (
  <h2 className="mb-4 mt-4 max-w-[820px] text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-ink" {...rest}>
    {children}
  </h2>
);
const P = ({ children }) => (
  <p className="mb-4 max-w-[760px] text-[17px] leading-[1.65] text-prose">{children}</p>
);

/* frosted café card — the one material for matrix / stats / reflection */
function Glass({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/70 bg-white/60 backdrop-blur-xl " +
        "shadow-[0_12px_36px_-16px_rgba(139,109,70,0.4)] " +
        className
      }
    >
      {children}
    </div>
  );
}

const BEATS = [
  { t: "Open the café", d: "The room loads with music already playing: arriving, not launching.", img: "beat-1.png", label: "[ SLOT ] Open the café · screenshot or short loop" },
  { t: "Chalk up the board", d: "Add today's tasks under their subjects on the menu board.", img: "beat-2.png", label: "[ SLOT ] Chalk up the board · screenshot or short loop" },
  { t: "Brew a session", d: "Start the pomodoro; the espresso machine brews for 25 minutes while you work.", img: "beat-3.png", label: "[ SLOT ] Brew a session · screenshot or short loop" },
  { t: "Take the break, keep the streak", d: "The cup is ready: break time, then the next brew. Statistics track your day.", img: "beat-4.png", label: "[ SLOT ] Take the break, keep the streak · screenshot or short loop" },
];

const STATS = [
  ["9", "people, mixed experience levels"],
  ["16", "weeks, idea to packaged app"],
  ["4", "user flows mapped before UI"],
  ["1", "pixel-art café, shipped"],
];

const REFLECT = [
  ["AS PM", "Nine people, mixed experience, one academic cycle: shipping meant cutting features early and often. Every scope cut that hurt in week 6 is the reason we had a packaged app in week 16."],
  ["AS DESIGNER", "The café metaphor only worked because we mapped flows before drawing screens. Personality came last, on top of structure, never instead of it."],
  ["NEXT", "Account sync, mobile, and shared study rooms: the café is better with friends at the next table."],
];

const LEDGER = [
  {
    cite: "CAFÉ OBJECT · THE ESPRESSO MACHINE",
    quote: "The centerpiece of the counter. It brews while you work, and stops when the cup is full.",
    means: "The pomodoro timer. Brewing = a focus session running; the finished cup = your break. Time becomes an object you can watch, not a number that nags.",
  },
  {
    cite: "CAFÉ OBJECT · THE MENU BOARD",
    quote: "Chalk letters above the counter: what's available today.",
    means: "The task list (MY TASKS). Subjects are menu sections, tasks are today's items, finishing one crosses it off the board.",
  },
  {
    cite: "CAFÉ OBJECT · THE ROOM ITSELF",
    quote: "Warm light, plants on the counter, lo-fi in the air.",
    means: "The music player and ambience layer. The interface is the atmosphere: the reason to stay is the room, not a streak counter.",
  },
];

export default function LatteLearnCaseStudy() {
  const shippedHeadingRef = useRef(null);

  const onSkip = (e) => {
    e.preventDefault();
    document.getElementById("shipped")?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => shippedHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-prose" style={CAFE_TOKENS}>
      <CaseBlobs blobs={CAFE_BLOBS} />
      <Toc sections={TOC_SECTIONS} />

      {/* content gutter: reserve the fixed TOC rail's column (+32px gap) so the
          centered content never slides under the numerals */}
      <div className="min-[880px]:pl-[256px]">
        <nav className="mx-auto max-w-[1080px] px-8 pt-8">
          <Link to="/" className="font-plex text-[13px] text-grayt transition-colors hover:text-ink">
            ← ivy jiyou lee
          </Link>
        </nav>

        <main className="mx-auto max-w-[1080px] px-8">
          {/* ================= HERO ================= */}
          <header className="pt-16">
            <div className="grid grid-cols-1 items-start gap-16 min-[880px]:[grid-template-columns:1.2fr_1fr]">
              <div>
                <Eyebrow>Case study</Eyebrow>
                <h1 className="mt-4 font-instrument text-[clamp(44px,6.5vw,76px)] font-normal leading-[1.04] tracking-[-0.015em] text-ink">
                  Nine people, sixteen weeks, one pixel-art café.
                </h1>
                <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
                  {[
                    ["Role", "Project Manager & Design Lead"],
                    ["Team", "Team Espresso · 9 (LikeLion US 2024-25)"],
                    ["Duration", "Jan – May 2025 · one academic cycle"],
                    ["Tools", "Figma, React + Electron, Flask"],
                  ].map(([dt, dd]) => (
                    <div key={dt}>
                      <dt className="mb-1.5 font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">{dt}</dt>
                      <dd className="max-w-[240px] text-[14px] leading-[1.5] text-ink">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="pt-2">
                <p className="mb-6 text-[18px] leading-[1.6] text-prose">
                  A focus companion app that brings the café study experience home: pomodoro timer,
                  task list, and lo-fi music inside one pixel-art café. I led nine people of mixed
                  experience through a full academic cycle as PM, and designed every screen as Design
                  Lead.
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-transparent bg-blue px-3.5 py-1.5 font-plex text-[12px] text-white">
                    Packaged Electron app
                  </span>
                  <span className="inline-flex items-center rounded-full border border-stroke bg-white/60 px-3.5 py-1.5 font-plex text-[12px] text-ink backdrop-blur-xl">
                    Team of 9
                  </span>
                  <span className="inline-flex items-center rounded-full border border-stroke bg-white/60 px-3.5 py-1.5 font-plex text-[12px] text-ink backdrop-blur-xl">
                    LikeLion US 2024-25
                  </span>
                </div>
                <a
                  href="#shipped"
                  onClick={onSkip}
                  className="inline-flex items-center gap-3.5 rounded-full border-[1.5px] border-dashed border-stroke-2 bg-white/50 py-2.5 pl-2.5 pr-6 font-plex text-[12px] font-semibold tracking-[0.1em] text-ink transition-colors hover:border-solid hover:border-blue"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue text-[14px] text-white">
                    ↓
                  </span>
                  SKIP TO THE CAFÉ
                </a>
              </div>
            </div>

            <Slot
              variant="wide"
              src={ASSETS + "hero.png"}
              alt="LatteLearn café prototype, pomodoro running"
              className="mt-14 aspect-[1080/420]"
              label={"[ HERO SLOT ]\nthe café prototype full-bleed · pomodoro 24:59 running"}
            />
          </header>

          {/* ================= 01 CONTEXT ================= */}
          <section id="context" className="pt-24">
            <Eyebrow n="01">Context</Eyebrow>
            <H2>Studying alone is a focus problem and a loneliness problem</H2>
            <P>
              Students study better in cafés: gentle noise, other people working, a reason to stay
              seated. LatteLearn asks what happens if the café comes to the desktop: a focus companion
              where the timer, the task list, and the music live inside one warm pixel-art room.
            </P>
            <P>
              Team Espresso was nine people of mixed experience in LikeLion US's 2024-25 cohort, with
              exactly one academic cycle to go from idea to packaged app. I was PM and Design Lead: the
              schedule and the screens were both mine.
            </P>
          </section>

          {/* ================= 02 THE GAP ================= */}
          <section id="gap" className="pt-24">
            <Eyebrow n="02">The gap</Eyebrow>
            <H2>Five focus tools, and none of them is a place</H2>
            <P>
              We mapped the focus-tool landscape across the dimensions our users cared about. Blockers
              block, timers time, ambience apps play noise. No single product combined ambiance,
              pomodoro structure, task management, and analytics. That empty column became LatteLearn.
            </P>
            <CompetitorMatrix />
            <P>
              Cold Turkey and SelfControl started our research as blockers, but blocking is not
              accompanying: the real competitors were the rooms (Virtual Cottage, I Miss The Office,
              LifeAt) and the timers (Pomofocus). LatteLearn had to be both.
            </P>
          </section>

          {/* ================= 03 FLOWS BEFORE SCREENS ================= */}
          <section id="flows" className="pt-24">
            <Eyebrow n="03">Flows before screens</Eyebrow>
            <H2>Four flows mapped before a single screen was drawn</H2>
            <P>
              Tasks, timer, customization, music: each mapped as a full user flow first, so the
              interface followed how studying actually happens instead of how features list nicely. The
              café metaphor only worked because it was laid over this structure, personality on top of
              logic, never instead of it.
            </P>
            <Slot
              variant="wide"
              src={ASSETS + "flows.png"}
              alt="The four LatteLearn user-flow diagrams"
              className="my-8 aspect-[1080/460]"
              label={"[ SLOT ] the four user-flow diagrams\ntasks / timer / customization / music"}
            />
          </section>

          {/* ================= 04 THE METAPHOR LEDGER ================= */}
          <section id="metaphor" className="pt-24">
            <Eyebrow n="04">The metaphor ledger</Eyebrow>
            <H2>Every café object earns its job</H2>
            <P>
              The rule for the metaphor: nothing is decoration. Each object in the room is a control,
              traced the way a requirement traces to UI.
            </P>

            {LEDGER.map((row) => (
              <BylawTrace
                key={row.cite}
                glass
                wide
                excerpts={[{ cite: row.cite, quote: row.quote }]}
                means={row.means}
              />
            ))}

            <Slot
              variant="wide"
              src={ASSETS + "lofi-vs-cafe.png"}
              alt="Lo-fi wireframe beside the café prototype, same layout"
              className="my-8 aspect-[1080/380]"
              label={"[ SLOT ] lo-fi wireframe vs café prototype\nsame layout, before/after personality"}
            />
            <P>
              The lo-fi wireframes prove the discipline: function first, no personality yet. The café
              was applied to a working skeleton, which is why it reads as a place and not as a skin.
            </P>
          </section>

          {/* ================= 05 WHAT SHIPPED ================= */}
          <section id="shipped" className="pt-24">
            <Eyebrow n="05">What shipped</Eyebrow>
            <H2 ref={shippedHeadingRef} tabIndex={-1}>
              One study session, start to finish
            </H2>
            <P>
              Shipped as a packaged Electron app (React frontend, Flask backend). The tour follows a
              session, not a feature list:
            </P>

            <div className="my-10 flex flex-col gap-12">
              {BEATS.map((b, i) => (
                <div key={b.t} className="flex gap-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-stroke-2 bg-white/60 font-plex text-[14px] font-semibold text-blue-text backdrop-blur-xl">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mt-1 text-[18px] font-semibold text-ink">{b.t}</h3>
                    <p className="mb-0 mt-2 max-w-[760px] text-[17px] leading-[1.65] text-prose">{b.d}</p>
                    <Slot
                      variant="beat"
                      src={ASSETS + b.img}
                      alt={b.t}
                      className="mt-4 aspect-[1028/560]"
                      label={b.label}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 06 THE PM LENS ================= */}
          <section id="pm" className="pt-24">
            <Eyebrow n="06">The PM lens</Eyebrow>
            <H2>Nine people, mixed experience, one academic cycle</H2>
            <P>
              Shipping meant cutting features early and often. Every scope cut that hurt in week 6 is
              the reason we had a packaged app in week 16. [ SLOT: one concrete cut and how the team
              took it: what was cut, who argued for keeping it, what the app gained ]
            </P>
            <Glass className="my-8 p-6">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {STATS.map(([big, small]) => (
                  <div key={small}>
                    <b className="block font-instrument text-[40px] font-normal leading-none text-blue">{big}</b>
                    <span className="mt-2 block text-[13px] leading-[1.5] text-prose">{small}</span>
                  </div>
                ))}
              </div>
            </Glass>
          </section>

          {/* ================= 07 REFLECTION ================= */}
          <section id="reflect" className="pt-24">
            <Eyebrow n="07">Reflection</Eyebrow>
            <H2>All the things we learned</H2>
            <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {REFLECT.map(([k, body]) => (
                <Glass key={k} className="p-7">
                  <span className="mb-3 block font-plex text-[11px] uppercase tracking-[0.12em] text-blue-text">
                    {k}
                  </span>
                  <p className="m-0 text-[14px] leading-[1.6] text-prose">{body}</p>
                </Glass>
              ))}
            </div>
          </section>
        </main>

        <footer className="mx-auto max-w-[1080px] px-8 pb-16 pt-24">
          <div className="h-px bg-stroke" />
          <p className="pt-8 font-plex text-[12px] text-grayt">
            <a
              href="https://github.com/Jaeminp2/LatteLearn"
              target="_blank"
              rel="noreferrer"
              className="text-blue-text hover:underline"
            >
              github.com/Jaeminp2/LatteLearn
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/Jaeminp2/LatteLearn"
              target="_blank"
              rel="noreferrer"
              className="text-blue-text hover:underline"
            >
              interactive prototype ↗
            </a>{" "}
            · next case study →{" "}
            <Link to="/work/icoi" className="text-blue-text hover:underline">
              ICOI
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CafeMesh from "../components/lattelearn/CafeMesh";
import Toc from "../components/icoi/Toc";
import Slot from "../components/icoi/Slot";
import BylawTrace from "../components/icoi/BylawTrace";
import CompetitorMatrix from "../components/lattelearn/CompetitorMatrix";
import ZoomFigure from "../components/icoi/ZoomFigure";
import { FocusEmbed } from "../components/lattelearn/FocusScreen";
import Todo from "../components/case/Todo";
import SeeNext from "../components/SeeNext";
import {
  Community,
  Table2Columns,
  GitFork,
  CoffeeCup,
  Rocket,
  StatsReport,
  LightBulb,
  AppWindow,
  Group,
  GraduationCap,
  TaskList,
  DesignPencil,
  ArrowRight,
  GithubCircle,
} from "iconoir-react";

/* LatteLearn case study, a sibling of the ICOI page: same architecture (TOC
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
  "--color-blue": "#8C6D46", // true accent: arrows, fills, marks (large)
  "--color-blue-text": "#6E5436", // accent-ink: small accent text (contrast-safe)
  "--color-imgbg": "#EDE5D6",
  "--color-stroke": "#E5DCCC",
  "--color-stroke-2": "#D9CDB8",
  // NB: no opaque backgroundColor here. The café base is a separate -z-20 layer
  // below the mesh, so the warm blobs (-z-10) aren't painted over.
};

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
function Eyebrow({ n, icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[12px] uppercase tracking-[0.14em] text-blue-text">
      {Icon && <Icon width={14} height={14} strokeWidth={2} aria-hidden />}
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
/* Em: a small caramel bottom-half highlight for the one phrase per paragraph that
   carries the point, the café-warm sibling of ICOI's pink <Hl>. Text darkens to
   ink so the emphasis reads as hierarchy, not just color. */
const Em = ({ children }) => (
  <b
    className="font-medium not-italic text-ink"
    style={{ background: "linear-gradient(transparent 62%, rgba(232,200,143,0.6) 62%)" }}
  >
    {children}
  </b>
);

/* iPad-style bezel for the shipped walkthrough — same ink-bezel language as
   ShippedFeatures' LaptopFrame/PhoneFrame (container-query units so it scales
   with its column). Even bezel all round + camera dot on the landscape edge. */
function TabletFrame({ children }) {
  return (
    <div className="mx-auto w-full" style={{ containerType: "inline-size" }}>
      <div style={{ filter: "drop-shadow(0 2cqw 3cqw rgba(11,14,20,0.18))" }}>
        <div className="relative" style={{ background: "#0B0E14", borderRadius: "3.4cqw", padding: "2.4cqw" }}>
          {/* front camera, centered on the right bezel in landscape */}
          <span
            aria-hidden
            className="absolute right-[1cqw] top-1/2 -translate-y-1/2 rounded-full"
            style={{ width: "0.6cqw", height: "0.6cqw", background: "#2a3140", boxShadow: "inset 0 0 0.2cqw #000" }}
          />
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: "1.4cqw", border: "1px solid #E2E9F5", background: "#ECF1FA" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* frosted café card: the one material for matrix / stats / reflection */
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
  { t: "Open the café", d: "The room loads with music already playing: arriving, not launching." },
  { t: "Chalk up the board", d: "Add today's tasks under their subjects on the menu board." },
  { t: "Brew a session", d: "Start the pomodoro; the espresso machine brews for 25 minutes while you work." },
  { t: "Take the break, keep the streak", d: "The cup is ready: break time, then the next brew. Statistics track your day." },
];

const STATS = [
  ["9", "people, mixed experience levels"],
  ["6", "months, idea to packaged app"],
  ["4", "user flows mapped before UI"],
  ["1", "pixel-art café, shipped"],
];

const REFLECT = [
  ["AS PM", TaskList, "Nine people, mixed experience, one academic cycle: shipping meant cutting features early and often. Every scope cut that hurt in month 2 is the reason we had a packaged app by month 6."],
  ["AS DESIGNER", DesignPencil, "The café metaphor only worked because we mapped flows before drawing screens. Personality came last, on top of structure, never instead of it."],
  ["NEXT", ArrowRight, "Account sync, mobile, and shared study rooms: the café is better with friends at the next table."],
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
    means: "The music player and ambience layer. We curated royalty-free tracks into a café playlist so the room hums naturally, and legally. The interface is the atmosphere: the reason to stay is the room, not a streak counter.",
  },
];

export default function LatteLearnCaseStudy() {
  const shippedHeadingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "LatteLearn · Ivy Jiyou Lee";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "A focus companion app that brings the café study experience home. PM and Design Lead on a 9-person team that shipped a packaged pixel-art desktop app in one academic cycle."
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const onSkip = (e) => {
    e.preventDefault();
    document.getElementById("shipped")?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => shippedHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-prose" style={CAFE_TOKENS}>
      {/* café base color, below the warm mesh */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-bg" />
      <CafeMesh />
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
                <h1 className="mt-4 text-balance font-instrument text-[clamp(44px,6.5vw,76px)] font-normal leading-[1.04] tracking-[-0.015em] text-ink">
                  Nine people, sixteen weeks, one third place on a screen.
                </h1>
                <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
                  {[
                    ["Role", "Project Manager & Design Lead"],
                    ["Team", "Team Espresso · 9 (LikeLion US 2024-25)"],
                    ["Duration", "Jan – Jun 2025 · two quarters, winter to spring"],
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
                <p className="mb-6 text-pretty text-[18px] leading-[1.6] text-prose">
                  Focus lives in third places: not home, not school, not the office. LatteLearn puts
                  one on your screen: you build your drink, the room hums like a café, and the brew
                  times your focus. I led nine people through a full academic cycle as PM, and designed
                  every screen as Design Lead.
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-blue px-3.5 py-1.5 font-plex text-[12px] text-white">
                    <AppWindow width={13} height={13} strokeWidth={2} aria-hidden />
                    Packaged Electron app
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-white/60 px-3.5 py-1.5 font-plex text-[12px] text-ink backdrop-blur-xl">
                    <Group width={13} height={13} strokeWidth={2} aria-hidden />
                    Team of 9
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-white/60 px-3.5 py-1.5 font-plex text-[12px] text-ink backdrop-blur-xl">
                    <GraduationCap width={13} height={13} strokeWidth={2} aria-hidden />
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

            {/* the Focus screen itself, live: real pomodoro, brew bar, machine loop */}
            <FocusEmbed className="mt-14" />
          </header>

          {/* ================= 01 CONTEXT ================= */}
          <section id="context" className="pt-24">
            <Eyebrow n="01" icon={Community}>Context</Eyebrow>
            <H2>Studying alone is a focus problem and a loneliness problem</H2>
            <P>
              Students study better in cafés: gentle noise, other people working, a reason to stay
              seated. Sociology has a name for that kind of room, <Em>the third place</Em>, and
              LatteLearn asks what happens if it comes to the desktop: a focus companion where the
              timer, the task list, and the music live inside one warm pixel-art room.
            </P>
            <P>
              Team Espresso was nine people of mixed experience in LikeLion US's 2024-25 cohort, with
              exactly one academic cycle to go from idea to packaged app. I was{" "}
              <Em>PM and Design Lead</Em>: the schedule and the screens were both mine.
            </P>
          </section>

          {/* ================= 02 THE GAP ================= */}
          <section id="gap" className="pt-24">
            <Eyebrow n="02" icon={Table2Columns}>The gap</Eyebrow>
            <H2>Five focus tools, and none of them is a place</H2>
            <P>
              We mapped the focus-tool landscape across the dimensions our users cared about. Blockers
              block, timers time, ambience apps play noise. No single product combined ambiance,
              pomodoro structure, task management, and analytics. <Em>That empty column became
              LatteLearn.</Em>
            </P>
            <CompetitorMatrix />
            <P>
              Cold Turkey and SelfControl started our research as blockers, but <Em>blocking is not
              accompanying</Em>: the real competitors were the rooms (Virtual Cottage, I Miss The
              Office, LifeAt) and the timers (Pomofocus). LatteLearn had to be both. Our own research
              notes were harsher still: {"“"}simple, cute design: not enough differentiation.{"”"} The moat
              that survived our own critique was not the aesthetic. It was ownership: <Em>your café,
              not a café</Em>.
            </P>
          </section>

          {/* ================= 03 FLOWS BEFORE SCREENS ================= */}
          <section id="flows" className="pt-24">
            <Eyebrow n="03" icon={GitFork}>Flows before screens</Eyebrow>
            <H2>Four flows mapped before a single screen was drawn</H2>
            <P>
              Tasks, timer, customization, music: each mapped as <Em>a full user flow first</Em>, so
              the interface followed how studying actually happens instead of how features list nicely.
              The café metaphor only worked because it was laid over this structure, personality on top
              of logic, never instead of it.
            </P>
            <P>
              The hardest flow call was the timer: per-task timers would have shattered the pomodoro
              rhythm the product is named for. We kept the <Em>25/5 brew sacred</Em> and moved the
              flexibility into subjects instead: tasks live under a subject, starting one attributes the
              brew to it, and the statistics tab tallies focus per subject.
            </P>
            <ZoomFigure
              src={ASSETS + "flows.png"}
              alt="The four LatteLearn user-flow diagrams: tasks, timer, customization, music"
              aspect="2160 / 1168"
              caption="The four flows: tasks, timer, customization, music. Click to read full-size."
            />
          </section>

          {/* ================= 04 THE METAPHOR LEDGER ================= */}
          <section id="metaphor" className="pt-24">
            <Eyebrow n="04" icon={CoffeeCup}>The metaphor ledger</Eyebrow>
            <H2>Every café object earns its job</H2>
            <P>
              The rule for the metaphor: <Em>nothing is decoration</Em>. Each object in the room is a
              control, traced the way a requirement traces to UI.
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
              className="my-8 aspect-[1467/1024]"
              label={"[ SLOT ] lo-fi wireframe vs café prototype\nsame layout, before/after personality"}
            />
            <P>
              The lo-fi wireframes prove the discipline: function first, no personality yet. The café
              was applied to a working skeleton, which is why it reads as <Em>a place and not as a
              skin</Em>.
            </P>
          </section>

          {/* ================= 05 WHAT SHIPPED ================= */}
          <section id="shipped" className="pt-24">
            <Eyebrow n="05" icon={Rocket}>What shipped</Eyebrow>
            <H2 ref={shippedHeadingRef} tabIndex={-1}>
              One study session, start to finish
            </H2>
            {/* uncapped so the intro sits on one line at desktop widths */}
            <p className="mb-4 text-[17px] leading-[1.65] text-prose">
              Shipped as a packaged Electron app (React frontend, Flask backend). The tour follows{" "}
              <Em>a session, not a feature list</Em>:
            </p>

            {/* video centerpiece + the four session beats as a static numbered
                rail (text, not chapter controls): beside the video on desktop,
                stacked below on narrow. Standard figure border, since the
                ShippedFeatures device frame is not exported as a standalone. */}
            <div className="my-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
              <TabletFrame>
                <FocusEmbed bare />
              </TabletFrame>
              <ol className="flex flex-col gap-6">
                {BEATS.map((b, i) => (
                  <li key={b.t} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-stroke-2 bg-white/60 font-plex text-[14px] font-semibold text-blue-text backdrop-blur-xl">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="mt-1 text-[17px] font-semibold text-ink">{b.t}</h3>
                      <p className="mb-0 mt-1.5 text-[15px] leading-[1.55] text-prose">{b.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ================= 06 THE PM LENS ================= */}
          <section id="pm" className="pt-24">
            <Eyebrow n="06" icon={StatsReport}>The PM lens</Eyebrow>
            <H2>Nine people, mixed experience, one academic cycle</H2>
            <P>
              Shipping meant <Em>cutting features early and often</Em>. Every scope cut that hurt in
              week 6 is the reason we had a packaged app in week 16.
            </P>
            <Todo text="TODO: one concrete cut and how the team took it: what was cut, who argued for keeping it, what the app gained." />
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
            <Eyebrow n="07" icon={LightBulb}>Reflection</Eyebrow>
            <H2>All the things we learned</H2>
            <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {REFLECT.map(([k, Icon, body]) => (
                <Glass key={k} className="p-7">
                  <span className="mb-3 flex items-center gap-2 font-plex text-[11px] uppercase tracking-[0.12em] text-blue-text">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-stroke bg-white/70 text-blue-text">
                      <Icon width={15} height={15} strokeWidth={2} aria-hidden />
                    </span>
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
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* GitHub elevated to the primary action, an accent button with the
                logo, since the shipped, packaged code is the headline proof. */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/Jaeminp2/LatteLearn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(139,109,70,0.75)] transition-transform hover:-translate-y-0.5"
              >
                <GithubCircle width={18} height={18} strokeWidth={2} aria-hidden />
                View the code on GitHub
              </a>
              <a
                href="https://github.com/Jaeminp2/LatteLearn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-white/60 px-4 py-2.5 font-plex text-[12px] text-ink backdrop-blur-xl transition-colors hover:border-blue"
              >
                interactive prototype ↗
              </a>
            </div>
            <a href="/#projects" className="m-0 font-plex text-[12px] text-blue-text underline underline-offset-2">
              ← back to all work
            </a>
          </div>
          <SeeNext current="lattelearn" />
        </footer>
      </div>
    </div>
  );
}

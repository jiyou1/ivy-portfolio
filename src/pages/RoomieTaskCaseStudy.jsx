import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { ChatLines, Home, Wallet, Notes, Search, CheckCircle, WarningTriangle } from "iconoir-react";
import SageMesh from "../components/roomietask/SageMesh";
import GroupChat from "../components/roomietask/GroupChat";
import Toc from "../components/icoi/Toc";
import Slot from "../components/icoi/Slot";
import ZoomFigure from "../components/icoi/ZoomFigure";
import SeeNext from "../components/SeeNext";

/* RoomieTask case study — third sibling of the ICOI and LatteLearn pages. Same
   architecture (TOC scrollspy rail, skip button, Slot placeholders, section
   scaffolding, inline footer), reusing the shared ICOI components (Toc, Slot).
   Unlike LatteLearn, this page does NOT override the design tokens: it uses the
   standard site skin verbatim (paper, ink, muted, blue, stroke). The ONLY
   per-page difference is the green mesh (SageMesh). Copy is verbatim from the
   Figma frame "RoomieTask Case Study / Desktop — 1440" (node 167:15); the three
   bracketed flags ([ CONFIRM ROLE ], [ CONFIRM ], [ MISSING: ... ]) are
   intentional and preserved. */

const ASSETS = "/case/roomietask/";

/* Olive/cream skin — grabbed from the RoomieTask style guide's olive set and
   layered over the site's shared token names (same mechanism as LatteLearn's
   café tokens), so every reused component (Toc, Slot) renders warm-olive without
   a per-page fork. --color-blue is the true olive accent for fills/large glyphs;
   --color-blue-text is a deeper olive for small text to keep contrast on cream. */
const OLIVE_TOKENS = {
  "--color-bg": "#EFEDE0", // cream base
  "--color-ink": "#282A1C", // near-black olive
  "--color-prose": "#454636", // body
  "--color-legal": "#454636",
  "--color-grayt": "#6A6B54", // "muted" role, darkened to pass AA on cream
  "--color-blue": "#6B7538", // true olive accent — fills, marks (large)
  "--color-blue-text": "#565E2A", // accent-ink — small olive text (contrast-safe)
  "--color-imgbg": "#E6E3D3",
  "--color-stroke": "#DBD7C4",
  "--color-stroke-2": "#CAC5A9",
  // NB: no opaque backgroundColor here — the cream base is a separate -z-20 layer
  // below the mesh, so the olive blobs (-z-10) aren't painted over.
};

const TOC_SECTIONS = [
  ["01", "context", "Context"],
  ["02", "research", "Listening first"],
  ["03", "tried", "Everyone already tried"],
  ["04", "foundso", "Found → So"],
  ["05", "testing", "Usability testing"],
  ["06", "app", "The app"],
  ["07", "reflect", "Reflection"],
];

/* ---------- prose scaffolding (prose caps at 760px; media spans 1080) ---------- */
function Eyebrow({ n, children }) {
  return (
    <span className="inline-flex items-center gap-2 font-plex text-[12px] uppercase tracking-[0.14em]">
      {n && <span className="text-stroke-2">{n}</span>}
      <span className="font-semibold text-blue-text">{children}</span>
    </span>
  );
}
const H2 = ({ children, ...rest }) => (
  <h2 className="mb-4 mt-4 max-w-[880px] text-balance text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-ink" {...rest}>
    {children}
  </h2>
);
const H3 = ({ children }) => (
  <h3 className="mb-1 mt-4 text-[18px] font-semibold text-ink">{children}</h3>
);
const P = ({ children }) => (
  <p className="mb-4 max-w-[760px] text-pretty text-[16px] leading-[1.65] text-prose">{children}</p>
);

const STATS = [
  ["41", "survey responses, fielded April 2026"],
  ["34", "respondents currently living with roommates"],
  ["30 of 34", "do the undone task themselves rather than bring it up"],
  ["40%+", "rely on reminders that get ignored or forgotten"],
];

/* survey findings, one card each */
const FINDINGS = [
  {
    k: "CONFLICT GETS ABSORBED, NOT RESOLVED",
    body: "30 of 34 respondents said they do the undone task themselves rather than confront anyone. The problem is often invisible to the people creating it.",
  },
  {
    k: "TALKING WORKS, UNTIL IT DOESN'T",
    body: "In-person conversation was the most common resolution method, but effectiveness ratings split hard: some rated it 5 of 5, others said talking does nothing. A tool can't assume face-to-face fixes things.",
  },
  {
    k: "REMINDERS WITHOUT FOLLOW-THROUGH JUST BECOME NAGGING",
    body: "Over 40% rely on reminders, yet respondents reported they're ignored or forgotten. Reminders need confirmation and escalation, not repetition.",
  },
];

const TESTING_STATS = [
  ["5", "moderated sessions, May 2026"],
  ["23", "of 25 task runs completed"],
  ["1 or 2", "of 5, difficulty rating for most tasks"],
];

/* earthy accents on cream — one per stat, all AA at this size on #EFEDE0 */
const STAT_COLORS = ["#565E2A", "#A4512E", "#3E6B5C", "#7A4A6B"];

/* counts 0 → value when scrolled into view; static under reduced motion.
   `delay` staggers the strip left-to-right so the loading reads as a sequence. */
function StatNumber({ value, delay = 0 }) {
  const ref = useRef(null);
  // fire only once the numeral itself is fully on screen, so the count isn't
  // already finished while the strip is still entering the viewport
  const inView = useInView(ref, { once: true, amount: 1 });
  const reduce = useReducedMotion();
  const num = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setDisplay(num);
    const controls = animate(0, num, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, num, reduce, delay]);

  return (
    <span
      ref={ref}
      className="inline-block transition-all duration-500 ease-out"
      style={
        reduce
          ? undefined
          : { opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(10px)", transitionDelay: `${delay}s` }
      }
    >
      {display}
      {suffix}
    </span>
  );
}

const RIVALS = [
  [ChatLines, "GROUP CHATS", `"Whose turn is it?" scrolls away by lunch. Nothing is actually tracked.`],
  [Home, "FLATASTIC", "Household management, but completed chores are not clearly reflected on the main dashboard."],
  [Wallet, "SPLITWISE", "Handles money, but not chores, supplies, or whose turn it is."],
  [Notes, "WHITEBOARDS", "Easy to write, easy to ignore, no reminders when it's missed."],
];

/* usability insights: claim, evidence, and (where participants said it best)
   the verbatim words. Participants are anonymized as P1 to P5. */
const INSIGHTS = [
  {
    k: "SUCCESS NEEDS A RECEIPT",
    body: "4 of 5 participants completed actions correctly, then doubted it. With no confirmation, people assume system failure, not success.",
    quotes: [
      ["Did I do it?", "P4"],
      ["I think I did it.", "P3"],
    ],
  },
  {
    k: "IF IT LOOKS EDITABLE, PEOPLE WILL TRY",
    body: "Every participant attempted to interact with prefilled or inactive fields. Affordances promised interaction the prototype didn't deliver.",
  },
  {
    k: "HIERARCHY BEATS LABELS",
    body: "Users navigated by visual weight: one suggested the expenses balance summary belongs above the transaction list because that's what people open the page for; another paused at an inconsistent add button across screens.",
  },
];

/* insight → design response, one line each */
const CHANGES = [
  ["Confirmation states after every action", "toasts, updated task states, button feedback."],
  ["Explicit affordances", "editable, required, and prefilled fields each look like what they are."],
  ["Balance summary moved above the transaction list", "the page leads with what people open it for."],
  ["Stronger card contrast on the dashboard", "important things look important."],
  ["Consistent add button placement", "one position, every screen."],
  ["Persistent home navigation", "you can always find your way back."],
];

const BEATS = [
  { t: "Join your household", d: "Onboarding into a shared home: fair chores, gentle reminders, shared supplies.", img: "beat-1.png" },
  { t: "See whose turn it is", d: "Chores with rotation and visible contributions, no one keeps score alone.", img: "beat-2.png" },
  { t: "Split without the awkward", d: "Expenses with the balance above transactions, settled transparently.", img: "beat-3.png" },
  { t: "Never run out, never nag", d: "Shared supplies and gentle nudges that flag overdue tasks until done.", img: "beat-4.png" },
];

const REFLECT = [
  [Search, "RESEARCH FIRST", `Research defines the problem worth solving, and that's more valuable than any pixel-perfect interface.`],
  [CheckCircle, "TEST EARLY", "4 of 5 testers doubted a task they had completed correctly. No amount of visual polish fixes a missing confirmation state; only testing finds it."],
  [WarningTriangle, "HONEST MISS", "We designed every screen and forgot the way back. Both failed test tasks were navigation, so home is now one tap from everywhere."],
];

export default function RoomieTaskCaseStudy() {
  const appHeadingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "RoomieTask · Ivy Jiyou Lee";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "A mobile home base for shared living, designed from research into why roommate friction stays invisible. UX research and usability testing across surveys, interviews, affinity mapping, and moderated testing."
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const onSkip = (e) => {
    e.preventDefault();
    document.getElementById("app")?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => appHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-prose" style={OLIVE_TOKENS}>
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-bg" />
      <SageMesh />
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
                <h1 className="mt-4 font-instrument text-[clamp(44px,6.5vw,72px)] font-normal leading-[1.06] tracking-[-0.015em] text-ink">
                  Four tools, 30 silent roommates, one calm home base.
                </h1>
                <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
                  {/* Role spans both columns: it names the actual scope of work */}
                  <div className="sm:col-span-2">
                    <dt className="mb-1.5 font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">Role</dt>
                    <dd className="max-w-[560px] text-[14px] leading-[1.5] text-ink">
                      Chores flow design (list, creation, assignment, completion states), research
                      operations (task plan, session template, milestone structure), and design
                      system alignment across the three designers.
                    </dd>
                  </div>
                  {[
                    ["Team", "Team of six · INF 132 (UCI HCI studio)"],
                    ["Duration", "10 weeks · Spring 2026"],
                    ["Tools", "Figma, surveys & interviews, usability testing"],
                  ].map(([dt, dd]) => (
                    <div key={dt}>
                      <dt className="mb-1.5 font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">{dt}</dt>
                      <dd className="max-w-[260px] text-[14px] leading-[1.5] text-ink">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="pt-2">
                <p className="mb-6 text-pretty text-[17px] leading-[1.55] text-ink">
                  {`Roommates don't fight about chores. They go quiet about them. RoomieTask is a mobile home base for chores, expenses, supplies, and reminders, designed from research into why the frustration stays invisible: 30 of the 34 roommates we surveyed would rather just do the task themselves than bring it up.`}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-blue-text bg-blue px-4 py-2 font-plex text-[12px] text-white">
                    Research-led
                  </span>
                  <span className="inline-flex items-center rounded-full border border-stroke bg-white px-4 py-2 font-plex text-[12px] text-ink">
                    Tested with 5 roommates
                  </span>
                  <span className="inline-flex items-center rounded-full border border-stroke bg-white px-4 py-2 font-plex text-[12px] text-ink">
                    INF 132 · UCI
                  </span>
                </div>
                <a
                  href="#app"
                  onClick={onSkip}
                  className="inline-flex items-center gap-3.5 rounded-full border-[1.5px] border-dashed border-stroke-2 bg-white/50 py-2.5 pl-2.5 pr-6 font-plex text-[12px] font-semibold tracking-[0.1em] text-ink transition-colors hover:border-solid hover:border-blue"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-blue text-[14px] text-white">
                    ↓
                  </span>
                  SKIP TO THE APP
                </a>
              </div>
            </div>

            <Slot
              variant="wide"
              bare
              src={ASSETS + "hero.png"}
              alt="RoomieTask mobile screens: Home with chores due and reminders, Chores with rotation, and Expenses with balances"
              className="mt-14 aspect-[930/537]"
              label={"[ HERO SLOT ] RoomieTask mobile screens · 3-up phone lineup on sage"}
            />
          </header>

          {/* ================= 01 CONTEXT ================= */}
          <section id="context" className="pt-6">
            <Eyebrow n="01">Context</Eyebrow>
            <H2>When household responsibilities pile up, there's no shared place to land them.</H2>
            <P>
              {`RoomieTask is a mobile home base for shared living: chores, expenses, supplies, and reminders in one place. It exists because coordination between roommates keeps failing in the same predictable ways:`}
            </P>
            <ul className="my-4 max-w-[760px] space-y-3 text-[16px] leading-[1.6] text-prose">
              {[
                ["No central place to coordinate.", "Chores, money, and supplies live in scattered texts, so nothing is actually tracked."],
                ["Communication gets lost in the group chat.", "Reminders get buried, tasks get forgotten, and “whose turn is it” scrolls away by lunch."],
                ["Effort is invisible, so it feels unfair.", "Without a shared record of who did what, the work falls on whoever cares most."],
                ["Money is awkward.", "Nobody wants to be the one chasing roommates to pay their share."],
              ].map(([b, d]) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />
                  <span><b className="font-semibold text-ink">{b}</b> {d}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ================= 02 THE RESEARCH ================= */}
          <section id="research" className="pt-24">
            <Eyebrow n="02">The research</Eyebrow>
            <H2>Listening first</H2>
            {/* the problem statement we committed to, verbatim */}
            <blockquote className="my-6 max-w-[760px] rounded-r-xl border border-l-[3px] border-stroke border-l-blue bg-white px-7 py-6">
              <p className="m-0 text-[16px] italic leading-[1.65] text-legal">
                "As a person living with roommates, when household responsibilities pile up, it is
                frustrating to stay on top of chores, expenses, and shared supplies because there is
                no central place to coordinate and communication gets lost in group chats."
              </p>
              <footer className="mt-3 font-plex text-[12px] text-grayt">The problem statement we committed to.</footer>
            </blockquote>
            <P>
              We started by asking, not sketching: a survey fielded in April 2026 drew 41 responses,
              34 of them from people currently living with roommates. Three findings shaped
              everything that came after.
            </P>

            {/* 4-stat strip, hairline rules */}
            <div className="my-6 flex flex-wrap gap-6 border-y border-stroke py-6">
              {STATS.map(([big, small], i) => (
                <div key={small} className="w-[252px]">
                  <b
                    className="block text-[26px] font-extrabold tracking-[-0.02em]"
                    style={{ color: STAT_COLORS[i % STAT_COLORS.length] }}
                  >
                    <StatNumber value={big} delay={i * 0.15} />
                  </b>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-grayt">{small}</span>
                </div>
              ))}
            </div>

            {/* three findings, one card each */}
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {FINDINGS.map((f) => (
                <div key={f.k} className="rounded-2xl border border-stroke bg-white p-6">
                  <p className="font-plex text-[11px] font-semibold tracking-[0.08em] text-blue-text">{f.k}</p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-prose">{f.body}</p>
                </div>
              ))}
            </div>

            {/* affinity-mapping block */}
            <H3>Synthesis: affinity mapping</H3>
            <P>
              To turn raw research into a design direction, I ran an affinity mapping session. Nineteen
              pain points from our surveys and interviews went up as individual notes, then grouped by
              theme into three clusters: Unequal effort (12 of 19), Tracking breakdowns (4 of 19), and
              Awkward communication (3 of 19).
            </P>
            <P>
              Unequal effort dominated by a wide margin, and that set the project's guiding principle:
              fairness. Before a single screen was designed, each cluster was translated into a concrete
              design response, so the interface answered a real, prioritized need rather than a hunch:
              attribute every completion, automate rotation, and keep everything in one shared place.
            </P>
            <ZoomFigure
              src={ASSETS + "affinity-map.png"}
              alt="Affinity map: nineteen research pain points clustered into Unequal effort, Tracking breakdowns, and Awkward communication, each with a written design response"
              aspect="1886 / 1206"
              caption="Nineteen pain points clustered into three walls, sized by count, each answered with a written design response before any UI existed. Click to zoom."
            />

          </section>

          {/* ================= 03 EVERYONE ALREADY TRIED ================= */}
          <section id="tried" className="pt-24">
            <Eyebrow n="03">Everyone already tried</Eyebrow>
            <H2>Four coping tools, four different failures</H2>
            <P>
              Nobody we studied was waiting for a solution; they had all improvised one already. Each
              fails in its own way, and the failures are the requirements.
            </P>
            <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {RIVALS.map(([Icon, k, body]) => (
                <div key={k} className="rounded-2xl border border-stroke bg-white px-5 py-6">
                  <Icon width={22} height={22} strokeWidth={1.8} className="mb-3 text-blue" aria-hidden />
                  <p className="font-plex text-[11px] font-semibold tracking-[0.12em] text-blue-text">{k}</p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-prose">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 04 FOUND → SO ================= */}
          <section id="foundso" className="pt-24">
            <Eyebrow n="04">Found → So</Eyebrow>
            <H2>Roommates don't want a manager. They want things to feel fair.</H2>
            <P>
              Every design decision is a reply to something a roommate actually said. So here it is as
              the conversation it always was:
            </P>
            <GroupChat />
          </section>

          {/* ================= 05 USABILITY TESTING ================= */}
          <section id="testing" className="pt-24">
            <Eyebrow n="05">Usability testing</Eyebrow>
            <H2>Five people, twenty-five tasks</H2>
            <P>
              Five moderated sessions in May 2026, each running scenario-based tasks across
              onboarding, the dashboard, chores, expenses, and shopping. 23 of 25 task runs
              completed. Most tasks rated 1 or 2 of 5 for difficulty, with times ranging from 7
              seconds to 2 minutes.
            </P>

            <div className="my-6 flex flex-wrap gap-6 border-y border-stroke py-6">
              {TESTING_STATS.map(([big, small], i) => (
                <div key={small} className="w-[252px]">
                  <b
                    className="block text-[26px] font-extrabold tracking-[-0.02em]"
                    style={{ color: STAT_COLORS[i % STAT_COLORS.length] }}
                  >
                    <StatNumber value={big} delay={i * 0.15} />
                  </b>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-grayt">{small}</span>
                </div>
              ))}
            </div>

            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {INSIGHTS.map((c) => (
                <div key={c.k} className="rounded-2xl border border-stroke bg-white p-6">
                  <p className="font-plex text-[11px] font-semibold tracking-[0.08em] text-blue-text">{c.k}</p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-prose">{c.body}</p>
                  {c.quotes?.map(([q, who]) => (
                    <blockquote key={who} className="mt-3 border-l-2 border-stroke-2 pl-3">
                      <p className="m-0 text-[13px] italic leading-[1.5] text-legal">"{q}"</p>
                      <footer className="mt-0.5 font-plex text-[11px] text-grayt">
                        <cite className="not-italic">{who}</cite>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>

            {/* the honest failure, given its own weight */}
            <div className="my-6 max-w-[760px] rounded-r-xl border border-l-[3px] border-stroke bg-white px-7 py-6" style={{ borderLeftColor: "#A4512E" }}>
              <p className="m-0 font-plex text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#A4512E" }}>
                The honest failure
              </p>
              <p className="mb-0 mt-3 text-[15px] leading-[1.65] text-prose">
                Both incomplete tasks involved the dashboard. One participant couldn't find her way
                back to it at all and gave up. Navigation back to home was a real gap, not a nitpick.
              </p>
            </div>

            <H3>What changed</H3>
            <ul className="my-4 max-w-[760px] space-y-3 text-[15px] leading-[1.6] text-prose">
              {CHANGES.map(([b, d]) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-blue" />
                  <span><b className="font-semibold text-ink">{b}:</b> {d}</span>
                </li>
              ))}
            </ul>

          </section>

          {/* ================= 06 THE APP ================= */}
          <section id="app" className="pt-24">
            <Eyebrow n="06">The app</Eyebrow>
            <H2 ref={appHeadingRef} tabIndex={-1}>
              One calm place for chores, money, and supplies
            </H2>
            <P>
              A mobile home base with four jobs: Chores, Expenses, Supplies, Reminders. The tone is the
              design: gentle, fair, and never a manager.
            </P>

            {/* hero 3-up stands in until the app recording is exported */}
            <Slot
              variant="wide"
              bare
              src={ASSETS + "hero.png"}
              alt="RoomieTask mobile screens: Home with chores due and reminders, Chores with rotation, and Expenses with balances"
              className="my-8 aspect-[930/537]"
              label={"[ APP RECORDING ] RoomieTask walkthrough · Chores, Expenses, Supplies, Reminders"}
            />

            <div className="my-8 flex flex-col gap-8">
              {BEATS.map((b, i) => (
                <div key={b.t} className="flex gap-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-[1.5px] border-stroke-2 bg-white font-plex text-[14px] font-semibold text-blue-text">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mt-1 text-[18px] font-semibold text-ink">{b.t}</h3>
                    <p className="mb-0 mt-2 max-w-[760px] text-[15px] leading-[1.6] text-prose">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 07 REFLECTION ================= */}
          <section id="reflect" className="pt-24">
            <Eyebrow n="07">Reflection</Eyebrow>
            <H2>What this quarter left with me</H2>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {REFLECT.map(([Icon, k, body]) => (
                <div key={k} className="rounded-2xl border border-stroke bg-white px-6 py-7">
                  <p className="flex items-center gap-2 font-plex text-[11px] font-semibold tracking-[0.12em] text-blue-text">
                    <Icon width={13} height={13} strokeWidth={2} aria-hidden />
                    {k}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-prose">{body}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="mx-auto max-w-[1080px] px-8 pb-16 pt-24">
          <div className="h-px bg-stroke" />
          <SeeNext current="roomietask" />
          <p className="pt-10 font-plex text-[12px] text-grayt">
            <a href="/#projects" className="text-blue-text hover:underline">
              ← back to all work
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

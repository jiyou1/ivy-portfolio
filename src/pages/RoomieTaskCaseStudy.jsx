import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChatLines, Home, Wallet, Notes, Search, CheckCircle, WarningTriangle } from "iconoir-react";
import CaseVideo from "../components/case/CaseVideo";
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
  ["02", "research", "The research"],
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
  ["75%", "would just do the task themselves rather than bring it up"],
  ["64%", "named cleaning & chores as their #1 source of friction"],
  ["5", "roommates in moderated usability tests"],
  ["4", "coping tools already tried, and abandoned"],
];

const RIVALS = [
  [ChatLines, "GROUP CHATS", `"Whose turn is it?" scrolls away by lunch. Nothing is actually tracked.`],
  [Home, "FLATASTIC", "Household management, but completed chores are not clearly reflected on the main dashboard."],
  [Wallet, "SPLITWISE", "Handles money, but not chores, supplies, or whose turn it is."],
  [Notes, "WHITEBOARDS", "Easy to write, easy to ignore, no reminders when it's missed."],
];

const INSIGHTS = [
  {
    k: "INSIGHT 1 · RIGHT ACTION, NO CONFIRMATION",
    body: `4 of 5 completed tasks but doubted themselves: "Did I do it?" One gave up entirely, sure it had failed.`,
    fix: "Fix: success states, updated task states, clear active and submitted field states.",
  },
  {
    k: "INSIGHT 2 · HABITS FROM OTHER APPS",
    body: "Users expected Todoist-style patterns: which fields are required, the ability to edit a chore after creating it.",
    fix: "Fix: mark required fields, add edit for chores and expenses, standardize inputs.",
  },
  {
    k: "INSIGHT 3 · READ BY WEIGHT, NOT LABELS",
    body: "Users went where the screen looked important, missing the balance, overlooking low-contrast cards.",
    fix: "Fix: balance above transactions, stronger card contrast, one consistent + button.",
  },
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
  [WarningTriangle, "[ HONEST MISS ]", "[ SLOT: one thing that went wrong and how it was fixed. Milestone folders will have candidates. ]"],
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
                  Four tools, 75% silence, one calm home base.
                </h1>
                <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
                  {[
                    ["Role", "UI Design & Usability Testing Lead"],
                    ["Team", "6 · INF 132 (UCI HCI studio)"],
                    ["Duration", "One quarter · Spring 2026"],
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
                  {`Roommates don't fight about chores. They go quiet about them. RoomieTask is a mobile home base for chores, expenses, supplies, and reminders, designed from research into why the frustration stays invisible: 75% of the roommates we studied would rather just do the task themselves than bring it up.`}
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
            <H2>The finding we didn't expect: conflict isn't exploding, it's being absorbed</H2>
            <P>
              We surveyed and interviewed roommates about how shared-living friction actually plays
              out [ MISSING: survey N and interview count, in the Milestone 2 folder ]. The frustration
              is real, but it stays invisible to the very people causing it.
            </P>

            {/* 4-stat strip, hairline rules */}
            <div className="my-6 flex flex-wrap gap-6 border-y border-stroke py-6">
              {STATS.map(([big, small]) => (
                <div key={small} className="w-[252px]">
                  <b className="block text-[22px] font-extrabold tracking-[-0.02em] text-ink">{big}</b>
                  <span className="mt-1 block text-[13px] leading-[1.5] text-grayt">{small}</span>
                </div>
              ))}
            </div>

            {/* affinity-mapping block */}
            <H3>How we got there: affinity mapping</H3>
            <P>
              Nineteen pain points from our research went onto stickies and clustered into three walls:
              Unequal effort (12 of 19), Tracking breakdowns (4 of 19), and Awkward communication (3 of
              19). Unequal effort dominated by a wide margin, which is where the fairness principle came
              from. Each cluster got a written design response before any UI existed: attribute every
              completion, automate rotation, show everything in one place.
            </P>
            <ZoomFigure
              src={ASSETS + "affinity-map.png"}
              alt="Affinity map: nineteen research pain points clustered into Unequal effort, Tracking breakdowns, and Awkward communication, each with a written design response"
              aspect="1886 / 1206"
              caption="Nineteen pain points clustered into three walls, sized by count, each answered with a written design response before any UI existed. Click to zoom."
            />

            <P>
              The problem statement we committed to: as a person living with roommates, when household
              responsibilities pile up, it is frustrating to stay on top of chores, expenses, and shared
              supplies, because there is no central place to coordinate and communication gets lost in
              group chats.
            </P>
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
            <H2>We tested with 5 roommates and listened</H2>
            <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {INSIGHTS.map((c) => (
                <div key={c.k} className="rounded-2xl border border-stroke bg-white p-6">
                  <p className="font-plex text-[11px] font-semibold tracking-[0.08em] text-blue-text">{c.k}</p>
                  <p className="mt-3 text-[13px] leading-[1.6] text-prose">{c.body}</p>
                  <p className="mt-3 text-[13px] font-semibold leading-[1.55] text-ink">{c.fix}</p>
                </div>
              ))}
            </div>
            <Slot
              variant="wide"
              src={ASSETS + "testing-before-after.png"}
              alt="Before and after of one tested screen: the confirmation-state fix"
              className="my-4 aspect-[1080/340]"
              label={"[ SLOT ] before/after of one tested screen · the confirmation-state fix"}
            />
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

            <CaseVideo
              sources={[
                { src: ASSETS + "app-demo.webm", type: "video/webm" },
                { src: ASSETS + "app-demo.mp4", type: "video/mp4" },
              ]}
              poster={ASSETS + "app-demo.png"}
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

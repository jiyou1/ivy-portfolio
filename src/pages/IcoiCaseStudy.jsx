import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CaseBlobs from "../components/icoi/CaseBlobs";
import Toc from "../components/icoi/Toc";
import Slot from "../components/icoi/Slot";
import BylawTrace, { Hl, M } from "../components/icoi/BylawTrace";
import VerdictTable from "../components/icoi/VerdictTable";
import StateMachine from "../components/icoi/StateMachine";
import BeforeSheet from "../components/icoi/BeforeSheet";
import BylawsTable from "../components/icoi/BylawsTable";
import { ToolChips, Sponsor } from "../components/icoi/TechStack";
import ShippedFeatures from "../components/icoi/ShippedFeatures";
import ZoomFigure from "../components/icoi/ZoomFigure";
import ActivityLog from "../components/icoi/ActivityLog";
import SeeNext from "../components/SeeNext";
import {
  Book,
  Table,
  GitFork,
  ClockRotateRight,
  Rocket,
  LightBulb,
  Globe,
  Group,
  Presentation,
  WarningTriangle,
  MultiWindow,
} from "iconoir-react";

const ASSETS = "/case/icoi/";

/* ---------- small prose helpers (prose caps at 760px; media spans 1080) ---------- */
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
  <h2 className="mb-4 mt-4 max-w-[760px] text-balance text-[28px] font-extrabold leading-tight tracking-[-0.02em]" {...rest}>
    {children}
  </h2>
);
const H3 = ({ children }) => (
  <h3 className="mb-2 mt-8 max-w-[760px] text-balance text-[18px] font-semibold">{children}</h3>
);
const P = ({ children }) => (
  // body caps at a comfortable reading measure (~68ch) so lines don't run the full
  // media width; text-pretty keeps the last line from dropping a lone orphan word
  <p className="mb-4 max-w-[680px] text-pretty text-[17px] leading-[1.65] text-prose">{children}</p>
);

const REFLECT = [
  { k: "Read the source", p: "Ask for the governing document before the feature list. The client's words had quietly drifted from their own bylaws." },
  { k: "Derive, don't enter", p: "Any status a human types goes stale. If a rule can be computed from events, compute it. Don't ask." },
];

export default function IcoiCaseStudy() {
  const shippedHeadingRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = "ICOI Membership System · Ivy Jiyou Lee";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "A 500+ member nonprofit ran on Google Forms and a spreadsheet that contradicted its own legal bylaws. Frontend lead and sole designer on the React system that now runs ICOI's daily operations."
    );
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const onSkip = () => {
    // let the anchor smooth-scroll; also move focus to the heading for screen readers
    requestAnimationFrame(() => shippedHeadingRef.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="relative overflow-x-hidden">
      <CaseBlobs />
      <Toc />

      {/* Content gutter: reserve the fixed TOC rail's column (+32px gap) at the
          widths where the rail is shown, so the centered content never slides
          under the numerals. Content re-centers within the remaining band. */}
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
              <h1 className="mt-4 text-balance font-instrument text-[clamp(44px,6.5vw,76px)] font-normal leading-[1.04] tracking-[-0.015em]">
                500 members, 17 pages of bylaws, one source of truth.
              </h1>
              <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8">
                {[
                  ["Role", "Frontend Lead & UI Designer"],
                  ["Sponsor", <Sponsor key="sp" />],
                  ["Duration", "Jan – Jun 2026, 2-week sprints"],
                  ["Tools", <ToolChips key="tc" />],
                ].map(([dt, dd]) => (
                  <div key={dt}>
                    <dt className="mb-2 font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">{dt}</dt>
                    <dd className="text-[14px] leading-[1.5]">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-2">
              <p className="mb-6 text-pretty text-[18px] leading-[1.6] text-prose">
                A 500+ member nonprofit ran on Google Forms and a spreadsheet that contradicted its
                own legal bylaws. As frontend lead and sole designer on a team of five, I designed the
                entire system in Figma and led the React frontend that now runs ICOI's daily operations.
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-text bg-blue px-3.5 py-1.5 font-plex text-[12px] text-white">
                  <Globe width={13} height={13} strokeWidth={2} aria-hidden />
                  In production · icoi.net
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-white px-3.5 py-1.5 font-plex text-[12px] text-ink">
                  <Group width={13} height={13} strokeWidth={2} aria-hidden />
                  500+ members
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-stroke bg-white px-3.5 py-1.5 font-plex text-[12px] text-ink">
                  <Presentation width={13} height={13} strokeWidth={2} aria-hidden />
                  UCI ICS Expo '26
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
                SKIP TO WHAT SHIPPED
              </a>
            </div>
          </div>

          <Slot
            variant="wide"
            src={ASSETS + "hero-poster.jpg"}
            video="/videos/icoi-case-study.mp4"
            className="mt-8"
            label={"[ HERO SLOT ]\nlive portal dashboard · screenshot or 8s screen recording\nshow real UI, not a mockup frame"}
          />
        </header>

        {/* ================= 01 CONTEXT ================= */}
        <section id="context" className="pt-24">
          <Eyebrow n="01" icon={Book}>Context</Eyebrow>
          <H2>A nonprofit that runs on rules written for lawyers</H2>
          <P>
            ICOI is a California nonprofit religious corporation. Who can join, who can vote, who gets
            suspended, and who sits on the board is not decided by staff preference: it is written into
            a 17-page amended and restated bylaws document, last signed in 2024.
          </P>
          <P>
            The operational reality was Google Forms feeding a shared Sheet, managed by a handful of
            volunteers. Every status change was a human typing into a cell. My job on the frontend: make
            the interface enforce what the document says, so the humans don't have to remember it.
          </P>
          <P>
            We worked as a five-person capstone team (Data Solutions Architecture Group), meeting with
            ICOI weekly to decode bylaws and member workflows, then shipping working builds every
            two-week sprint for their feedback. The system was built with them, not presented to them.
          </P>
          <BylawsTable />
        </section>

        {/* ================= 02 THE SPREADSHEET ================= */}
        <section id="before" className="pt-24">
          <Eyebrow n="02" icon={Table}>The spreadsheet</Eyebrow>
          <H2>The "before" was a dropdown that contradicted the law</H2>
          <P>
            This is the actual membership tracker template the client handed us (data recreated for
            privacy). Look at the status column's dropdown values, then look at what the bylaws define.
            They don't match.
          </P>
          <BeforeSheet />
          <VerdictTable />
          <P>
            The sheet also tracked outstanding balance as a manually typed YES/NO. In the bylaws,
            balance timing is what changes a member's status automatically. A
            cell someone forgot to update is how a member stays "Voting" a year after they legally
            stopped being one.
          </P>
        </section>

        {/* ================= 03 RULES -> INTERFACE ================= */}
        <section id="rules" className="pt-24">
          <Eyebrow n="03" icon={GitFork}>Rules → interface</Eyebrow>
          <H2>One clause, traced from legal text to shipped UI</H2>
          <P>The hardest translation problem lived in Section 3.4. Here is the trace, exactly as I worked it.</P>

          <BylawTrace
            grid
            excerpts={[
              {
                cite: "BYLAWS §3.4.A · SUSPENSION OF MEMBERSHIP",
                quote: (
                  <>
                    "Voting rights and benefits are suspended after{" "}
                    <Hl>three (3) months of non-payment</Hl>... Payment of all past due membership dues in
                    full <Hl>within six (6) months</Hl> of suspension allows suspended members to be
                    re-instated immediately."
                  </>
                ),
              },
              {
                cite: "BYLAWS §3.4.B · AUTOMATIC TERMINATION",
                quote: (
                  <>
                    "...terminated members may submit an application for reinstatement and, if qualified,
                    may be reinstated <Hl>with original seniority date</Hl> provided he/she pays all past
                    due arrears in full."
                  </>
                ),
              },
              {
                cite: "BYLAWS §3.4.C · TERMINATION BY BOARD",
                quote: (
                  <>
                    "...the terminated member may apply for a separate,{" "}
                    <Hl>new membership (not a reinstatement)</Hl> and, if qualified, may obtain new Active
                    Member status with a <Hl>new seniority date</Hl>."
                  </>
                ),
              },
            ]}
            means={[
              <>
                Suspension is <M>time-triggered, not admin-triggered</M>. The system computes it from
                payment dates. No human types "suspended" into anything.
              </>,
              <>
                Same word, two futures. "Terminated" splits by <M>cause</M>, and the cause changes a
                member's reinstatement rights. So the data model stores <M>termination type</M>, and{" "}
                <M>seniority date is a separate field from join date</M>.
              </>,
            ]}
          />

          <StateMachine />

          <P>
            The design conclusion that everything above forces:{" "}
            <strong className="font-semibold text-ink">status is a computed fact, not a typed opinion.</strong>{" "}
            In the shipped UI, admins never select a status from a dropdown. They record events
            (payments, approvals, board votes), and the interface derives the status, the countdowns, and
            the warnings.
          </P>
        </section>

        {/* ================= 04 ONE RULE, TWO MODALS ================= */}
        <section id="modals" className="pt-24">
          <Eyebrow n="04" icon={MultiWindow}>The family model</Eyebrow>
          <H2>One rule, two different modals</H2>
          <P>
            That family wrinkle hides the hardest design problem in the project.
            Adding a family member sounds like one feature. The bylaws make it two: a spouse holds their
            own membership, so linking an existing member must exist. A child under 18 holds no
            individual membership at all, so there is nothing to link. Below is the working file where
            that rule got untangled, notes included.
          </P>

          <ZoomFigure
            src="/work/icoi/family-modal-exploration.webp"
            alt="Annotated Figma exploration board for the add-family-member modal, showing the spouse and child branches"
            caption="The exploration board: one modal, two branches. Spouse unlocks Link Existing because both people hold memberships. Child locks to Create New, with the constraint noted where it was discovered."
          />

          <P>
            The relation field ended up controlling what the modal is allowed to do. That decision came
            from the bylaws' family model, not from a UI pattern, and the notes on this board are where
            it happened.
          </P>
        </section>

        {/* ================= 05 AUDIT TRAIL ================= */}
        <section id="log" className="pt-24">
          <Eyebrow n="05" icon={ClockRotateRight}>The audit trail</Eyebrow>
          <H2>The activity log the bylaws quietly demand</H2>
          <BylawTrace
            excerpts={[
              {
                cite: "BYLAWS §4.19.D · MEMBERSHIP COMMITTEE",
                quote: (
                  <>
                    "...maintaining a membership book of all members...{" "}
                    <Hl>recording therein the fact and date of termination</Hl>, if any, of the membership
                    of any such member."
                  </>
                ),
              },
            ]}
            means={
              <>
                An audit trail isn't a feature request. It's <M>compliance</M>. And §3.4.D appeals depend
                on evidence of when a status changed and why.
              </>
            }
          />
          <P>
            The frontend problem: one feed has to hold heterogeneous events (payments, status
            transitions, edits, approvals, board actions), attribute each to an admin, and stay scannable
            for a volunteer who checks it monthly.
          </P>
          <P>
            So every recorded action falls into one color-coded type. The color carries the intent, so
            the feed stays readable at a glance. Expand a type to see the actions inside it and what each
            one captures.
          </P>
          <ActivityLog />
        </section>

        {/* ================= 06 WHAT SHIPPED ================= */}
        <section id="shipped" className="pt-24">
          <Eyebrow n="06" icon={Rocket}>What shipped</Eyebrow>
          <H2 ref={shippedHeadingRef} tabIndex={-1}>
            A day in the life of ICOI staff
          </H2>
          <P>
            Five screens, one data model. Every number an admin sees is computed from the same records.
          </P>
          <ShippedFeatures />

          {/* clear break: the expo is a distinct closing beat, not part of the
              interactive walkthrough, so give it a hairline rule + generous space */}
          <div className="mt-16 border-t border-stroke pt-8">
            <H3>Presented at the UCI ICS Expo</H3>
            <P>
              We closed the project presenting the system as the Data Solutions Architecture Group at UCI's
              ICS capstone expo.
            </P>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["expo-booth.jpg", "Our EXPO poster and our booth, presenting."],
              ["expo-team.jpg", "The five of us at team bonding, grabbing coffee :)"],
            ].map(([img, alt]) => (
              <figure key={img} className="m-0">
                <Slot
                  variant="photo"
                  src={ASSETS + img}
                  alt={alt}
                  className="m-0 aspect-[3/2]"
                  label={`[ SLOT ] ${img}`}
                />
                <figcaption className="mt-2 font-plex text-[11px] leading-[1.5] text-grayt">
                  {alt}
                </figcaption>
              </figure>
            ))}
            </div>
          </div>
        </section>

        {/* ================= 07 REFLECTION ================= */}
        <section id="reflect" className="pt-24">
          <Eyebrow n="07" icon={LightBulb}>Reflection</Eyebrow>
          <H2>What this project changed about how I work</H2>
          <div className="my-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {REFLECT.map((c) => (
              <div key={c.k} className="rounded-2xl border border-stroke bg-white p-7">
                <span className="mb-3 block font-plex text-[11px] uppercase tracking-[0.12em] text-blue-text">
                  {c.k}
                </span>
                <p className="m-0 text-pretty text-[14px] text-prose">{c.p}</p>
              </div>
            ))}

            {/* honest miss: the candid third beat — red alert ramp + left rule so it
                reads as deliberate self-critique, not another win card */}
            <div className="rounded-2xl border border-red-200 border-l-[3px] border-l-red-500 bg-red-50 p-7">
              <span className="mb-3 flex items-center gap-2 font-plex text-[11px] uppercase tracking-[0.12em] text-red-600">
                <WarningTriangle width={13} height={13} strokeWidth={2} aria-hidden />
                Honest miss
              </span>
              <p className="m-0 text-pretty text-[14px] text-prose">
                I let admins hand-edit status to catch the system's misses. That was backwards: the
                bylaws were too complex to memorize, so I made status read-only.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-[1080px] px-8 pb-16 pt-24">
        <div className="h-px bg-stroke" />
        <SeeNext current="icoi" />
        <p className="pt-10 font-plex text-[12px] text-grayt">
          <a href="/#projects" className="text-blue-text">← back to all work</a>
        </p>
      </footer>
      </div>
    </div>
  );
}

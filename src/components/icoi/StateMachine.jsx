/* Membership status state machine derived from bylaws §3.2 and §3.4 (spec §4.7).
   Fixed content. Wrapped in <figure role="img"> with a visually-hidden text
   description of every transition. The unresolved "continuous" clock keeps its
   copy SLOT verbatim (Ivy fills it) and its one red-emphasis note. */

function Node({ hot, children }) {
  return (
    <span
      className="shrink-0 rounded-[10px] border-[1.5px] border-ink px-4 py-2.5 font-plex text-[12px] font-semibold tracking-[0.06em]"
      style={hot ? { background: "var(--color-ink)", color: "#fff" } : { background: "#fff" }}
    >
      {children}
    </span>
  );
}

function Edge({ children }) {
  return (
    <span className="shrink-0 font-plex text-[11px] text-grayt [&_b]:font-semibold [&_b]:text-ink">
      {children}
    </span>
  );
}

const DESCRIPTION =
  "Applicants approved under section 3.1 become Active members. After 12 continuous paid months (section 3.2.B) an Active member becomes Voting. Any paid status that goes 3 months unpaid (section 3.4.A) becomes Suspended; paying in full within 6 months reinstates them. From Suspended there are two terminations: 6 more months unpaid (section 3.4.B) auto-terminates, after which a 6-month wait and reapplication restores the original seniority date; a two-thirds board vote (section 3.4.C) board-terminates, after which a 12-month wait leads only to a new membership with a new seniority date.";

export default function StateMachine() {
  return (
    <figure
      role="img"
      aria-label="Membership status state machine derived from bylaws sections 3.2 and 3.4"
      className="my-10 overflow-x-auto rounded-2xl border border-stroke bg-white p-10"
    >
      <p className="sr-only">{DESCRIPTION}</p>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Node>APPLICANT</Node>
        <Edge>→ §3.1 approved →</Edge>
        <Node hot>ACTIVE</Node>
        <Edge>→ <b>12 continuous paid months</b> §3.2.B →</Edge>
        <Node hot>VOTING</Node>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Edge>any paid status →</Edge>
        <Edge><b>3 months unpaid</b> §3.4.A →</Edge>
        <Node>SUSPENDED</Node>
        <Edge>→ pays in full ≤ 6 mo → reinstated</Edge>
      </div>

      <div className="mt-6 border-t border-dashed border-stroke-2 pt-6">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Edge>suspended <b>6 months unpaid</b> §3.4.B →</Edge>
          <Node>AUTO-TERMINATED</Node>
          <Edge>→ 6 mo wait → reapply → <b>original seniority</b></Edge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Edge>2/3 board vote §3.4.C →</Edge>
          <Node>BOARD-TERMINATED</Node>
          <Edge>→ 12 mo wait → new membership → <b>new seniority</b></Edge>
        </div>
      </div>

      <p className="mt-4 font-plex text-[11px] leading-[1.8] text-grayt">
        §3.2.B says "continuous" but never defines whether suspension breaks the
        12-month voting clock.{" "}
        <span className="font-semibold not-italic text-st-bad">The document could not answer this.</span>{" "}
        [ SLOT: 1 short para on how the team/board resolved it ]
      </p>
    </figure>
  );
}

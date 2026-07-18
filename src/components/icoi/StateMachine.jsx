/* Membership status state machine derived from bylaws §3.2 and §3.4 (spec §4.7).
   The geometry carries the argument: the top lane is the ladder (good standing,
   left to right), the bottom lane is the slide (decay, down and to the right).
   State chips wear the product's own status colors — Active green, Voting blue,
   Suspended yellow, terminated red — because the admin interface IS this diagram,
   computed. The one edge the bylaws never define (Active → Voting across a
   suspension) is drawn broken: dashed, red, with the open question on it. The
   repair paragraph below is the SLOT Ivy fills.

   Wrapped in <figure role="img"> with a visually-hidden text description of every
   transition; the SVG itself is aria-hidden since the prose covers it. */

// state-chip palette, pulled straight from the semantic status ramp so the chips
// match the shipped UI exactly (never mix stops across ramps)
const tok = (t) => ({ fill: `var(--color-${t}-fill)`, stroke: `var(--color-${t}-border)`, text: `var(--color-${t})` });
const NEUTRAL = { fill: "#fff", stroke: "var(--color-stroke)", text: "var(--color-ink)" };

function Chip({ cx, cy, w, label, c }) {
  const h = 40;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="10" fill={c.fill} stroke={c.stroke} strokeWidth="1.5" />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="font-plex" fontSize="12.5" fontWeight="600" letterSpacing="0.06em" fill={c.text}>
        {label}
      </text>
    </g>
  );
}

function Lbl({ x, y, anchor = "middle", fill = "var(--color-grayt)", weight = 400, children }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="font-plex" fontSize="11" fontWeight={weight} fill={fill}>
      {children}
    </text>
  );
}

const DESCRIPTION =
  "Applicants approved under section 3.1 become Active members. After 12 continuous paid months (section 3.2.B) an Active member becomes Voting. But the bylaws never define whether a suspension breaks that continuous clock, so this edge is undefined. Any paid status that goes 3 months unpaid (section 3.4.A) drops to Suspended; paying in full reinstates them to Active. From Suspended, 6 more months unpaid (section 3.4.B) auto-terminates the membership. Separately, a two-thirds board vote (section 3.4.C) board-terminates, off the money-and-time axis entirely.";

export default function StateMachine() {
  return (
    <figure
      role="img"
      aria-label="Membership status state machine derived from bylaws sections 3.2 and 3.4"
      className="my-10 overflow-x-auto rounded-2xl border border-stroke bg-white p-6 sm:p-8"
    >
      <p className="sr-only">{DESCRIPTION}</p>

      <svg viewBox="0 0 1000 540" role="presentation" aria-hidden="true" className="block h-auto w-full" style={{ minWidth: 720 }}>
        <defs>
          <marker id="ah-ink" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill="var(--color-ink)" />
          </marker>
          <marker id="ah-good" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill="var(--color-st-good)" />
          </marker>
          <marker id="ah-bad" markerWidth="9" markerHeight="9" refX="6.5" refY="3" orient="auto">
            <path d="M0,0 L6.5,3 L0,6 Z" fill="var(--color-st-bad)" />
          </marker>
        </defs>

        {/* vertical logic cue: up is good standing, down is decay */}
        <Lbl x={30} y={120} anchor="start" fill="var(--color-stroke-2)" weight={600}>↑ GOOD STANDING</Lbl>
        <Lbl x={30} y={470} anchor="start" fill="var(--color-stroke-2)" weight={600}>↓ DECAY</Lbl>

        {/* ---- top lane: the ladder ---- */}
        {/* applicant -> active */}
        <line x1="188" y1="150" x2="414" y2="150" stroke="var(--color-ink)" strokeWidth="1.5" markerEnd="url(#ah-ink)" />
        <Lbl x={301} y={139}>§3.1 approved</Lbl>

        {/* active -> voting : THE BROKEN EDGE */}
        <line x1="524" y1="150" x2="799" y2="150" stroke="var(--color-st-bad)" strokeWidth="2" strokeDasharray="7 6" markerEnd="url(#ah-bad)" />
        <Lbl x={661} y={172} fill="var(--color-st-bad)">12 continuous paid months · §3.2.B</Lbl>

        {/* badge sitting on the broken edge — the loudest thing on the figure */}
        <line x1="690" y1="122" x2="668" y2="150" stroke="var(--color-st-bad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="524" y="24" width="356" height="98" rx="12" fill="var(--color-st-bad-fill)" stroke="var(--color-st-bad-border)" strokeWidth="1.5" />
        <text x="546" y="52" className="font-plex" fontSize="12" fontWeight="700" fill="var(--color-st-bad)">§3.2.B says “continuous.”</text>
        <text x="546" y="76" className="font-plex" fontSize="12" fill="var(--color-grayt)">Continuous across a suspension?</text>
        <text x="546" y="100" className="font-plex" fontSize="12" fontWeight="700" fill="var(--color-st-bad)">The document doesn’t say.</text>

        {/* ---- the drop from the ladder into the slide ---- */}
        <line x1="470" y1="172" x2="528" y2="338" stroke="var(--color-ink)" strokeWidth="1.5" markerEnd="url(#ah-ink)" />
        <Lbl x={452} y={250} anchor="end">3 months unpaid</Lbl>
        <Lbl x={452} y={268} anchor="end">§3.4.A</Lbl>

        {/* recovery: green curve back up, suspended -> active */}
        <path d="M585,341 C 690,300 690,220 505,172" fill="none" stroke="var(--color-st-good)" strokeWidth="2" markerEnd="url(#ah-good)" />
        <Lbl x={702} y={252} anchor="start" fill="var(--color-st-good)" weight={600}>pays in full</Lbl>

        {/* ---- bottom lane: the slide ---- */}
        {/* suspended -> auto-terminated */}
        <line x1="610" y1="360" x2="758" y2="360" stroke="var(--color-ink)" strokeWidth="1.5" markerEnd="url(#ah-ink)" />
        <Lbl x={685} y={348}>6 months unpaid · §3.4.B</Lbl>

        {/* suspended -> board-terminated : off to the side, the non money-or-time exit */}
        <line x1="500" y1="382" x2="414" y2="450" stroke="var(--color-ink)" strokeWidth="1.5" markerEnd="url(#ah-ink)" />
        <Lbl x={512} y={415} anchor="start">2/3 board vote</Lbl>
        <Lbl x={512} y={433} anchor="start">§3.4.C</Lbl>

        {/* ---- chips, in the product's status colors ---- */}
        <Chip cx={120} cy={150} w={132} label="APPLICANT" c={NEUTRAL} />
        <Chip cx={470} cy={150} w={104} label="ACTIVE" c={tok("st-good")} />
        <Chip cx={850} cy={150} w={98} label="VOTING" c={tok("st-info")} />
        <Chip cx={540} cy={360} w={128} label="SUSPENDED" c={tok("st-warn")} />
        <Chip cx={850} cy={360} w={176} label="AUTO-TERMINATED" c={tok("st-bad")} />
        <Chip cx={330} cy={470} w={182} label="BOARD-TERMINATED" c={tok("st-bad")} />
      </svg>

      {/* caption = the repair. The broken edge above states the problem; this is
          where the team had to decide what the document wouldn't. */}
      <figcaption className="mt-6 border-t border-stroke pt-5">
        <p className="font-plex text-[11px] leading-[1.8] text-grayt">
          <span className="font-semibold text-st-bad">One edge the bylaws never define.</span>{" "}
          §3.2.B calls the voting clock "continuous" but never says whether a suspension resets it. The
          document couldn't answer, so the team had to.{" "}
          <span className="italic">[ SLOT: 1 short para on how the team/board resolved the continuous-clock question ]</span>
        </p>
      </figcaption>
    </figure>
  );
}

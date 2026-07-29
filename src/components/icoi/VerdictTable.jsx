import StatusChip from "./StatusChip";

/* Spreadsheet-vs-bylaws vocabulary table (spec §4.6). Semantic <table> with a
   <caption>. Verdict vocabulary and colors are fixed: match (good), missing
   (bad, 600), undefined / wrong column (warn, 600). Below 720px the table scrolls
   horizontally rather than reflowing. */

function Verdict({ kind, children }) {
  const color = { match: "st-good", missing: "st-bad", odd: "st-warn" }[kind];
  return (
    <td
      className="border-b border-stroke px-5 py-3.5 align-top font-mono text-[12px]"
      style={{ color: `var(--color-${color})`, fontWeight: kind === "match" ? 400 : 600 }}
    >
      {children}
    </td>
  );
}

export default function VerdictTable() {
  return (
    <div className="my-8">
      {/* title lives outside the overflow-hidden table so its left edge is never
          clipped by the rounded-corner clip; aria-label keeps the table named */}
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-grayt">
        Spreadsheet vocabulary vs. bylaws vocabulary
      </p>
      <div className="overflow-x-auto">
      <table aria-label="Spreadsheet vocabulary vs. bylaws vocabulary" className="w-full min-w-[680px] border-collapse overflow-hidden rounded-2xl border border-stroke bg-white text-[14px]">
        <thead>
          <tr>
            {["Sheet dropdown says", "Bylaws say", "Verdict"].map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-stroke bg-imgbg px-5 py-3.5 text-left font-mono text-[11px] uppercase tracking-[0.1em] text-grayt"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>tr:last-child>td]:border-b-0">
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top"><StatusChip status="active">ACTIVE</StatusChip></td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">§3.2.A · defined</td>
            <Verdict kind="match">match</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top"><StatusChip status="voting">VOTING</StatusChip></td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">§3.2.B · defined, earned after 12 continuous paid months</td>
            <Verdict kind="match">match</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top"><StatusChip status="honorary">HONORARY</StatusChip></td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">§3.2.D · defined, perpetual, non-voting</td>
            <Verdict kind="match">match</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top text-grayt">·</td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">
              <StatusChip status="suspended">SUSPENDED</StatusChip> defined in §3.4.A, the pivot
              state of the whole system: rights pause after 3 months of non-payment, 6 months to pay
              and reinstate
            </td>
            <Verdict kind="missing">missing</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top text-grayt">·</td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">
              <StatusChip status="terminated">TERMINATED</StatusChip> defined in §3.4.B-C, two
              causes: auto after 6 more unpaid months (reapply in 6), or by 2/3 board vote (reapply
              in 12, seniority reset)
            </td>
            <Verdict kind="missing">missing</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top"><StatusChip status="canceled">CANCELED</StatusChip></td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">
              appears nowhere in the document; the team later defined it as voluntary exit (no
              consequences, seniority preserved, rejoin anytime)
            </td>
            <Verdict kind="odd">undefined</Verdict>
          </tr>
          <tr>
            <td className="border-b border-stroke px-5 py-3.5 align-top"><StatusChip status="nominee">ELIGIBLE NOMINEE</StatusChip></td>
            <td className="border-b border-stroke px-5 py-3.5 align-top">
              an Article IV board-eligibility concept, not a membership status; shipped as a
              board-eligible flag on the member, not a status
            </td>
            <Verdict kind="odd">wrong column</Verdict>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

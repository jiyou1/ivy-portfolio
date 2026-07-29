/* Status chip (DESIGN.md §4). Colors come strictly from the semantic status ramp;
   never mix stops across ramps. Used inline in prose and in the verdict table. */
const RAMP = {
  active: "st-good",
  voting: "st-info",
  suspended: "st-warn",
  terminated: "st-bad",
  honorary: "st-hon",
};

// gray, for sheet entries that aren't real statuses (Canceled, Eligible Nominee)
const GRAY = {
  color: "var(--color-grayt)",
  borderColor: "var(--color-stroke)",
  background: "var(--color-imgbg)",
};

export default function StatusChip({ status, children }) {
  const c = RAMP[status];
  const colors = c
    ? {
        color: `var(--color-${c})`,
        borderColor: `var(--color-${c}-border)`,
        background: `var(--color-${c}-fill)`,
      }
    : GRAY;
  return (
    <span
      className="inline-block rounded-md border font-mono text-[11px] font-semibold uppercase tracking-[0.08em]"
      style={{
        ...colors,
        padding: "3px 10px",
        verticalAlign: "1px",
      }}
    >
      {children}
    </span>
  );
}

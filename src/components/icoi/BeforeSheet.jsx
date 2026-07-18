/* Section 02 "before" spreadsheet (spec §4). A static showcase, not a dataset:
   a small recreated slice of the client's membership tracker (data recreated for
   privacy) with post-it notes down the side calling out each way the sheet made
   members impossible to keep straight by hand. Each note is color-matched to the
   cells it points at, so the eye connects the annotation to the evidence. No
   interactivity — it's here to make one point: this was hard to maintain. */

/* A curated 10-row slice. Not the whole 500+ — picked so every problem a note
   calls out has at least one real example on screen. # keeps each row's original
   position, so the two duplicate rows read as far apart as they really were. */
const MEMBERS = [
  { row: 2,  name: "Ahmed Khan",     type: "Individual", status: "Voting",           join: "03/15/2019", balance: "YES", last: "10/02/2025", notes: "paid cash at Eid? confirm w/ office" },
  { row: 3,  name: "Omar Siddiqui",  type: "Family",     status: "Voting",           join: "2020-06-01", balance: "NO",  last: "06/28/2026", notes: "2 votes (primary + spouse)" },
  { row: 4,  name: "Fatima Rahman",  type: "Individual", status: "Active",           join: "Jan 2025",   balance: "NO",  last: "01/12/2026", notes: "" },
  { row: 6,  name: "Mariam Hassan",  type: "Individual", status: "Eligible Nominee", join: "05/20/2018", balance: "NO",  last: "05/19/2026", notes: "5+ yrs - nominating comm." },
  { row: 8,  name: "Aisha Chaudhry", type: "Individual", status: "Honorary",         join: "2009",       balance: "NO",  last: "",           notes: "founding volunteer - DO NOT DELETE!!" },
  { row: 11, name: "Hamza Sheikh",   type: "Individual", status: "Active",           join: "02/02/2023", balance: "YES", last: "03/01/2026", notes: "" },
  { row: 13, name: "Khalid Mansour", type: "Individual", status: "Active",           join: "15/03/2023", balance: "NO",  last: "03/20/2026", notes: "" },
  { row: 21, name: "Tarek Nasser",   type: "Individual", status: "Canceled",         join: "03/03/2020", balance: "YES", last: "09/15/2023", notes: "??" },
  { row: 23, name: "Hamza Sheikh",   type: "Individual", status: "Voting",           join: "02/02/2023", balance: "NO",  last: "03/01/2026", notes: "dup? see row 11" },
  { row: 24, name: "Farah Osman",    type: "Individual", status: "Active",           join: "?",          balance: "NO",  last: "05/28/2026", notes: "join date in old binder" },
];

const COLS = [
  { k: "row",     label: "#" },
  { k: "name",    label: "Member" },
  { k: "type",    label: "Type" },
  { k: "status",  label: "Status" },
  { k: "join",    label: "Join Date" },
  { k: "balance", label: "Balance" },
  { k: "notes",   label: "Notes", wrap: true },
];

/* ── which cells each problem touches (kept as small predicates so the note copy
   below can quote counts straight from the data instead of hand-typed numbers) ── */

// Statuses the bylaws actually define. "Canceled" is undefined; "Eligible
// Nominee" is a board-eligibility concept, not a membership status.
const BYLAW_STATUSES = new Set(["Active", "Voting", "Honorary", "Terminated"]);
const isBadStatus = (s) => !BYLAW_STATUSES.has(s);

// Classify a Join Date into a format family — six of them appear in this slice.
function dateFormat(v) {
  if (v === "?" || v === "") return "unknown";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return "iso";        // 2020-06-01
  if (/^[A-Za-z]{3} \d{4}$/.test(v)) return "monthyear";  // Jan 2025
  if (/^\d{4}$/.test(v)) return "year";                   // 2009
  const m = v.match(/^(\d{2})\/(\d{2})\/\d{4}$/);
  if (m) return Number(m[1]) > 12 ? "eu" : "us";          // 15/03 → DD/MM, else MM/DD
  return "unknown";
}
const isOddDate = (v) => dateFormat(v) !== "us";

const owes = (m) => m.balance === "YES";
const stillMember = (m) => owes(m) && (m.status === "Active" || m.status === "Voting");

const NAME_COUNTS = MEMBERS.reduce((a, m) => ((a[m.name] = (a[m.name] || 0) + 1), a), {});
const isDup = (m) => NAME_COUNTS[m.name] > 1;
const hasNote = (m) => m.notes.trim() !== "";

const N = {
  formats: new Set(MEMBERS.map((m) => dateFormat(m.join))).size,
  owe: MEMBERS.filter(owes).length,
  stillMember: MEMBERS.filter(stillMember).length,
};

/* One hue per problem, so a post-it and the cells it points at share a color.
   Hues reuse the case study's status ramp. */
const HUE = {
  vocab: ["--color-st-warn", "--color-st-warn-border", "--color-st-warn-fill"],
  dues:  ["--color-st-bad",  "--color-st-bad-border",  "--color-st-bad-fill"],
  dates: ["--color-st-info", "--color-st-info-border", "--color-st-info-fill"],
  dup:   ["--color-st-hon",  "--color-st-hon-border",  "--color-st-hon-fill"],
  notes: ["--color-st-good", "--color-st-good-border", "--color-st-good-fill"],
};

// The single hue (if any) that a given cell belongs to.
function cellHue(m, col) {
  switch (col) {
    case "status":  return isBadStatus(m.status) ? "vocab" : stillMember(m) ? "dues" : null;
    case "join":    return isOddDate(m.join) ? "dates" : null;
    case "balance": return owes(m) ? "dues" : null;
    case "name":    return isDup(m) ? "dup" : null;
    case "notes":   return hasNote(m) ? "notes" : null;
    default:        return null;
  }
}

function hueStyle(hue) {
  if (!hue) return undefined;
  const [text, border, fill] = HUE[hue];
  return {
    color: `var(${text})`,
    background: `var(${fill})`,
    boxShadow: `inset 0 0 0 1.5px var(${border})`,
    fontWeight: 600,
  };
}

/* The post-it notes, top-to-bottom, each keyed to a hue. Counts come from N. */
const NOTES = [
  { hue: "dates", tilt: "-1.6deg", title: "which date is it?",
    body: `One column, ${N.formats} ways to write a date: ISO, US, European, a bare year, even a “?”. Nothing sorts, nothing can compute a renewal.` },
  { hue: "vocab", tilt: "1.4deg", title: "made-up statuses",
    body: "Typed by hand. “Canceled” and “Eligible Nominee” aren’t statuses the bylaws define, and “Suspended,” the one that matters most, is never here." },
  { hue: "dues", tilt: "-1.1deg", title: "owes, still counts",
    body: `${N.owe} owe dues; ${N.stillMember} are still Active or Voting. The bylaws suspend voting after 3 months unpaid, but a YES in a cell enforces nothing.` },
  { hue: "dup", tilt: "1.7deg", title: "same person, twice",
    body: "Hamza Sheikh appears twice: Active + owing here, Voting + paid there. Which record is the real member?" },
  { hue: "notes", tilt: "-1.4deg", title: "rules live in Notes",
    body: "Seniority exceptions, family votes, board decisions: the real logic sits in a freeform Notes column no system can read." },
];

function PostIt({ hue, tilt, title, body }) {
  const [text, border, fill] = HUE[hue];
  return (
    <li
      className="relative rounded-[3px] px-3.5 py-3 text-[12px] leading-[1.5] shadow-[0_6px_16px_-8px_rgba(11,14,20,0.35)]"
      style={{
        background: `var(${fill})`,
        boxShadow: `inset 0 0 0 1px var(${border}), 0 6px 16px -10px rgba(11,14,20,.4)`,
        transform: `rotate(${tilt})`,
      }}
    >
      {/* little arrow tab pointing back toward the sheet, in the note's hue */}
      <span
        aria-hidden="true"
        className="absolute right-full top-4 hidden border-y-[6px] border-r-[7px] border-y-transparent md:block"
        style={{ borderRightColor: `var(${border})` }}
      />
      <span
        className="mb-1 block font-plex text-[10px] font-semibold uppercase tracking-[0.1em]"
        style={{ color: `var(${text})` }}
      >
        {title}
      </span>
      <span className="block text-prose">{body}</span>
    </li>
  );
}

export default function BeforeSheet() {
  return (
    <figure className="my-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
        {/* the sheet */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-stroke bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-stroke bg-imgbg px-4 py-3">
            <span className="font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">
              Membership tracker, as received
            </span>
            <span className="font-plex text-[11px] text-grayt">500+ rows · slice shown</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse font-plex text-[12px]">
              <caption className="sr-only">
                A recreated slice of the ICOI membership tracker, with problem cells tinted to match
                the notes beside it.
              </caption>
              <thead>
                <tr>
                  {COLS.map((c) => (
                    <th
                      key={c.k}
                      scope="col"
                      className={
                        "border-b border-stroke bg-white px-3 py-2.5 text-left text-[10px] uppercase tracking-[0.1em] text-grayt " +
                        (c.k === "row" ? "text-center" : "")
                      }
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEMBERS.map((m) => (
                  <tr key={m.row} className="border-b border-stroke last:border-b-0">
                    {COLS.map((c) => {
                      const hue = cellHue(m, c.k);
                      const val = m[c.k];
                      return (
                        <td
                          key={c.k}
                          style={hueStyle(hue)}
                          className={
                            "px-3 py-2 align-top " +
                            (c.wrap ? "min-w-[190px] whitespace-normal " : "whitespace-nowrap ") +
                            (c.k === "row" ? "text-center text-grayt " : "") +
                            (c.k === "name" && !hue ? "font-medium text-ink " : "") +
                            (!hue ? "text-prose " : "")
                          }
                        >
                          {val === "" ? <span className="opacity-40">–</span> : val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* post-it callouts */}
        <ul className="flex list-none flex-col gap-3 md:w-[260px] md:flex-none">
          {NOTES.map((n) => (
            <PostIt key={n.hue} {...n} />
          ))}
        </ul>
      </div>

      <figcaption className="mt-4 max-w-[760px] text-[13px] leading-[1.5] text-grayt">
        The membership tracker as we received it, data recreated for privacy. The notes mark what a
        person had to catch by eye on every one of 500+ rows. That is the reason status had to become
        a computed fact, not a typed one.
      </figcaption>
    </figure>
  );
}

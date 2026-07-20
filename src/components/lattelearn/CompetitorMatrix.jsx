/* Section 02 competitor matrix, rendered as a real semantic <table> (not an
   image) so it stays readable and scrollable on mobile and legible to screen
   readers. Data is passed in verbatim, never re-derived from the Figma render.

   Accessibility: the ●/– glyphs are decorative (aria-hidden); each cell carries
   an sr-only "Yes"/"No" so the meaning survives without color, and the faint
   miss glyph is excluded from the contrast audit. LatteLearn's column gets an
   accent tint + accent marks; misses are a muted café tan, never a red X. */

const APPS = ["LatteLearn", "Cold Turkey", "Virtual Cottage", "I Miss The Office", "LifeAt", "Pomofocus"];
const MATRIX = [
  ["Ambiance", [1, 0, 1, 1, 1, 0]],
  ["Pomodoro", [1, 0, 1, 0, 1, 1]],
  ["Task management", [1, 0, 0, 0, 1, 1]],
  ["Visual elements", [1, 0, 1, 1, 1, 1]],
  ["Audio elements", [1, 0, 1, 1, 1, 1]],
  ["Analytics", [1, 0, 0, 0, 0, 1]],
  // Cold Turkey's only capability — without this row its column read as all
  // misses with no explanation. LatteLearn skips it on purpose: accompany,
  // don't lock out.
  ["Distraction blocking", [0, 1, 0, 0, 0, 0]],
];
const PLATFORM = ["Web", "Win, Mac", "Win, Mac", "Web", "Win, Mac, Web", "Web"];

const MISS = "#C9BCA4"; // muted café tan, never red
const LATTE_TINT = "rgba(140,109,70,0.08)"; // accent #8C6D46 @ 8%

function Mark({ hit, isLatte }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="font-plex text-[15px]"
        style={{ color: hit ? (isLatte ? "var(--color-blue)" : "var(--color-ink)") : MISS }}
      >
        {hit ? "●" : "–"}
      </span>
      <span className="sr-only">{hit ? "Yes" : "No"}</span>
    </>
  );
}

export default function CompetitorMatrix() {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-2xl border border-white/70 bg-white/60 shadow-[0_12px_36px_-16px_rgba(139,109,70,0.4)] backdrop-blur-xl">
        <table className="w-full min-w-[720px] border-collapse text-[14px]">
          <caption className="px-6 pt-5 text-left font-plex text-[11px] uppercase tracking-[0.12em] text-grayt">
            Competitive research, LikeLion US 2024-25.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[190px] px-5 py-4 text-left font-plex text-[11px] uppercase tracking-[0.08em] text-grayt">
                <span className="sr-only">Capability</span>
              </th>
              {APPS.map((app, i) => {
                const isLatte = i === 0;
                return (
                  <th
                    key={app}
                    scope="col"
                    className={
                      "px-3 py-4 text-center font-plex text-[11px] uppercase tracking-[0.06em] " +
                      (isLatte ? "font-semibold text-blue-text" : "text-grayt")
                    }
                    style={isLatte ? { background: LATTE_TINT } : undefined}
                  >
                    {app}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {MATRIX.map(([label, hits]) => (
              <tr key={label} className="border-t border-stroke">
                <th scope="row" className="px-5 py-3.5 text-left text-[14px] font-semibold text-ink">
                  {label}
                </th>
                {hits.map((hit, i) => {
                  const isLatte = i === 0;
                  return (
                    <td
                      key={i}
                      className="px-3 py-3.5 text-center"
                      style={isLatte ? { background: LATTE_TINT } : undefined}
                    >
                      <Mark hit={hit} isLatte={isLatte} />
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t border-stroke">
              <th scope="row" className="px-5 py-3.5 text-left text-[14px] font-semibold text-ink">
                Platform
              </th>
              {PLATFORM.map((p, i) => (
                <td
                  key={i}
                  className="px-3 py-3.5 text-center text-[13px] text-prose"
                  style={i === 0 ? { background: LATTE_TINT, color: "var(--color-blue-text)" } : undefined}
                >
                  {p}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 max-w-[760px] text-[13px] leading-[1.5] text-grayt">
        Cold Turkey's dot lives on the one row LatteLearn deliberately skips: blocking locks
        distractions out, it doesn't give you a place to be. That difference is the gap.
      </figcaption>
    </figure>
  );
}

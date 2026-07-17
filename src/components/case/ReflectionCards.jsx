import { WarningTriangle } from "iconoir-react";
import Todo from "./Todo";

/* Reflection cards: mono keyword + one Inter paragraph per card. Plain cards sit
   in a 2-up grid; a card marked `variant: "warn"` is the honest miss, given full
   width and the warn ramp + left rule so it reads as deliberate self-critique,
   not another win card. A card may carry `todo` instead of `p` for a reflection
   still owed, which renders as a dev-only slot. Generic; pass cards as an array
   of { k, p | todo, variant? }. */
export default function ReflectionCards({ cards = [] }) {
  const plain = cards.filter((c) => c.variant !== "warn");
  const warns = cards.filter((c) => c.variant === "warn");
  return (
    <div className="my-10">
      {plain.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plain.map((c) => (
            <div key={c.k} className="rounded-2xl border border-stroke bg-white p-7">
              <span className="mb-3 block font-plex text-[11px] uppercase tracking-[0.12em] text-blue-text">
                {c.k}
              </span>
              {c.p ? (
                <p className="m-0 text-[14px] text-prose">{c.p}</p>
              ) : (
                <Todo text={c.todo} />
              )}
            </div>
          ))}
        </div>
      )}
      {warns.map((c) => (
        <div
          key={c.k}
          className="mt-4 rounded-2xl border border-stroke border-l-[3px] border-l-st-warn bg-white p-7"
        >
          <span className="mb-3 flex items-center gap-2 font-plex text-[11px] uppercase tracking-[0.12em] text-st-warn">
            <WarningTriangle width={13} height={13} strokeWidth={2} aria-hidden />
            {c.k}
          </span>
          {c.p ? (
            <p className="m-0 max-w-[720px] text-[15px] leading-[1.65] text-prose">{c.p}</p>
          ) : (
            <Todo text={c.todo} />
          )}
        </div>
      ))}
    </div>
  );
}

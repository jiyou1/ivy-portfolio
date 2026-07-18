import { motion, useReducedMotion } from "framer-motion";

/* Section 04 "Found → So" — the iMessage component. Each roommate pain point
   (verbatim from the affinity map) is answered by RoomieTask, framed as the
   conversation the frustration always was.

   A11y: the whole thread is a <ul>; every bubble is its own <li> carrying its
   sender in a readable span BEFORE the message, so a screen reader hears
   "A roommate, verbatim … <pain point> … RoomieTask … <response>" in order.
   Motion: bubbles fade-slide up 8px, staggered 120ms, once on first scroll into
   view; fully disabled under reduced motion (rendered static). */

const EXCHANGES = [
  ["why is it always me on dish duty 😭 every single time",
   "everyone can see who's actually pitching in now, so it's not just in your head"],
  ["asked whose turn for trash in the gc and got left on read lol",
   "it nudges whoever's up until it's done — you're not the one chasing everyone"],
  ["i cannot make myself venmo request yall it's too awkward",
   "splits get handled quietly. no callouts, no rankings, no awkward text to send"],
];

// flatten to an ordered bubble list so DOM order === reading order
const BUBBLES = EXCHANGES.flatMap(([incoming, outgoing]) => [
  { dir: "in", sender: "A ROOMMATE", text: incoming },
  { dir: "out", sender: "ROOMIETASK", text: outgoing },
]);

export default function GroupChat() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full rounded-2xl border border-stroke bg-white p-6 sm:p-8">
      <ul
        className="flex flex-col gap-4"
        aria-label="Roommate pain points and RoomieTask's responses"
      >
        {BUBBLES.map((b, i) => {
          const isOut = b.dir === "out";
          return (
            <motion.li
              key={i}
              className={"flex flex-col gap-1.5 " + (isOut ? "items-end" : "items-start")}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.32, delay: i * 0.12, ease: "easeOut" }}
            >
              <span
                className={
                  "font-plex text-[10px] tracking-[0.1em] " +
                  (isOut ? "text-blue-text" : "text-grayt")
                }
              >
                {b.sender}
              </span>
              <div
                className={
                  "max-w-[85%] px-4 py-3 text-[15px] leading-[1.45] sm:max-w-[460px] " +
                  (isOut
                    ? "rounded-[18px] rounded-br-[6px] bg-[#0B93F6] text-white"
                    : "rounded-[18px] rounded-bl-[6px] bg-[#E9E9EB] text-[#111]")
                }
              >
                {b.text}
              </div>
            </motion.li>
          );
        })}
      </ul>

      <p className="mt-5 text-right font-plex text-[10px] tracking-[0.06em] text-grayt">
        Delivered
      </p>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";

/* Section 05 "The audit trail" — a collapsible sample of the activity-type
   taxonomy built for ICOI (derived from the audit, sponsor meetings, and the
   bylaws). Every admin action the system logs falls into one color-coded type;
   expanding a type shows the actions inside it and, where relevant, exactly what
   each one records. The color coding is what makes a long feed scannable, so a
   volunteer reads intent at a glance.

   Each type is a disclosure (button + aria-controls panel). Types with recorded
   fields render as rows with a mono "Records" line; simple action sets render as
   tinted pills. Height animates open/closed, cut instantly under reduced motion. */

/* full literal class names per tone so Tailwind's scanner keeps them */
const TONES = {
  info: { dot: "bg-st-info", text: "text-st-info", border: "border-st-info-border", fill: "bg-st-info-fill" },
  good: { dot: "bg-st-good", text: "text-st-good", border: "border-st-good-border", fill: "bg-st-good-fill" },
  warn: { dot: "bg-st-warn", text: "text-st-warn", border: "border-st-warn-border", fill: "bg-st-warn-fill" },
  bad: { dot: "bg-st-bad", text: "text-st-bad", border: "border-st-bad-border", fill: "bg-st-bad-fill" },
  hon: { dot: "bg-st-hon", text: "text-st-hon", border: "border-st-hon-border", fill: "bg-st-hon-fill" },
  gray: { dot: "bg-grayt", text: "text-grayt", border: "border-stroke", fill: "bg-imgbg" },
};

const TYPES = [
  {
    key: "edit",
    tone: "info",
    label: "Edit",
    color: "Blue",
    actions: [
      { name: "Edit personal info", record: "Name, Email, Phone, Address, DOB" },
      { name: "Edit membership details", record: "Membership type, Dates, Payment method" },
      { name: "Add/edit memo", record: "Previous and New Message" },
    ],
  },
  {
    key: "create",
    tone: "good",
    label: "Create",
    color: "Green",
    actions: [
      {
        name: "Approve application",
        detail: "Created Membership for [ name ]",
        record: "New member created or application approved",
      },
    ],
  },
  {
    key: "status",
    tone: "warn",
    label: "Status Change",
    color: "Amber",
    actions: [
      { name: "Promote to Voting" },
      { name: "Suspend" },
      { name: "Terminate (auto)" },
      { name: "Terminate (Board)" },
      { name: "Cancel (voluntary)" },
      { name: "Reinstate" },
      { name: "Override" },
    ],
  },
  {
    key: "delete",
    tone: "bad",
    label: "Delete",
    color: "Rose",
    actions: [{ name: "Delete record" }, { name: "Decline application" }],
  },
  {
    key: "bulk",
    tone: "hon",
    label: "Bulk",
    color: "Purple",
    actions: [{ name: "Bulk email" }, { name: "Bulk export" }, { name: "Bulk status change" }],
  },
  {
    key: "admin",
    tone: "gray",
    label: "Admin",
    color: "Gray",
    badge: "v2",
    actions: [
      { name: "Add admin" },
      { name: "Remove admin" },
      { name: "Add volunteer" },
      { name: "Remove volunteer" },
    ],
  },
];

function TypeRow({ type, open, onToggle, reduce }) {
  const t = TONES[type.tone];
  const panelId = `activity-${type.key}`;
  const detailed = type.actions.some((a) => a.record || a.detail);
  const count = type.actions.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-inset"
      >
        <span className={`h-2.5 w-2.5 flex-none rounded-full ${t.dot}`} aria-hidden />
        <span className="font-semibold text-ink">{type.label}</span>
        {type.badge && (
          <span className="rounded-full border border-stroke bg-imgbg px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-grayt">
            {type.badge}
          </span>
        )}
        <span className="ml-auto font-mono text-[11px] text-grayt">
          {count} {count === 1 ? "action" : "actions"}
        </span>
        <NavArrowDown
          width={16}
          height={16}
          strokeWidth={2}
          aria-hidden
          className={"flex-none text-grayt transition-transform duration-200 " + (open ? "rotate-180" : "")}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {detailed ? (
              <ul>
                {type.actions.map((a) => (
                  <li key={a.name} className="border-t border-stroke px-4 py-3">
                    <p className="text-[14px] font-medium text-ink">
                      {a.name}
                      {a.detail && <span className="font-normal text-grayt"> = {a.detail}</span>}
                    </p>
                    {a.record && (
                      <p className="mt-1 font-mono text-[11px] leading-[1.5] text-grayt">
                        Records: {a.record}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-wrap gap-2 border-t border-stroke px-4 py-4">
                {type.actions.map((a) => (
                  <span
                    key={a.name}
                    className={`inline-flex rounded-full border px-3 py-1 text-[13px] ${t.fill} ${t.border} ${t.text}`}
                  >
                    {a.name}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ActivityLog() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState({ edit: true }); // first type open to show the pattern
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  return (
    <div className="my-8 flex max-w-[760px] flex-col gap-3">
      {TYPES.map((type) => (
        <TypeRow
          key={type.key}
          type={type}
          open={!!open[type.key]}
          onToggle={() => toggle(type.key)}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

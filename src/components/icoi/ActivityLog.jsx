import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";
import { APP, useAppScale, AppSidebar } from "./AppChrome";

/* Section 05 "The audit trail" — a collapsible sample of the activity-type
   taxonomy built for ICOI (derived from the audit, sponsor meetings, and the
   bylaws). Every admin action the system logs falls into one color-coded type;
   expanding a type shows the actions inside it and, where relevant, exactly what
   each one records. The color coding is what makes a long feed scannable, so a
   volunteer reads intent at a glance.

   Each type is a disclosure (button + aria-controls panel). Types with recorded
   fields render as rows with a mono "Records" line; simple action sets render as
   tinted pills. Height animates open/closed, cut instantly under reduced motion.

   This file also exports ActivityLogScreen: a 1:1 interactive build of the
   Figma Activity Log frames, rendered inside the walkthrough's laptop screen
   (ShippedFeatures feature 05). */

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

/* ============================================================================
   ActivityLogScreen — 1:1 build of the Figma "Activity Log-u" frames
   (GQ819Wp7f9BkFJvFvfPJ7f, nodes 1371:7260 / 1427:1948). Laid out at the
   design's native 1440x1024 px with the exact Poppins / IBM Plex / DM Mono
   type, concrete-ramp hexes, and exported icon + logo assets, then scaled to
   fit the walkthrough's aspect-locked laptop screen. Expanding a row animates
   height (instant under reduced motion); content scrolls inside the screen so
   the device dimensions never move. */

/* exact fills from the exported ellipse assets */
const DOT = {
  updated: "#5582DD",
  created: "#4DBF8C",
  terminated: "#F5C22B",
  terminatedOpen: "#D97706",
  deleted: "#BA2930",
  "sent email": "#BB5AD2",
};
const VERB = {
  updated: "#4A6FA5",
  created: "#448865",
  terminated: "#C1840B",
  deleted: "#A7252B",
  "sent email": "#7B2D8F",
};

/* [id, avatarBg, who, verb, connective, target, meta, time, detail] */
const ROWS_TODAY = [
  { id: "e1", avatar: "#1C4966", init: "KB", who: "Karima Berrada", verb: "updated", rest: " membership for ", target: "Ahmad Hassan", meta: "3 fields", time: "2:47 PM",
    detail: { fields: [
      ["Email Address", "ahmad@old.com", "ahmad@new.com"],
      ["Phone Number", "(949)555-0100", "(949)555-0123"],
      ["Memo", "--", "Request address update"],
    ] } },
  { id: "e2", avatar: "#1C4966", init: "KB", who: "Karima Berrada", verb: "created", rest: " membership for ", target: "Hana Karimi", time: "2:31 PM" },
  { id: "e3", avatar: "#C2195B", init: "MB", who: "Mohamed Benomar", verb: "terminated", rest: " membership for ", target: "Layla Rahman", meta: "auto", time: "1:33 PM",
    detail: { reason: "Non payment of dues. Suspended since Jan 22, 2026. Auto-terminated per bylaws 3.4B after 9-month non payment period" } },
  { id: "e4", avatar: "#C2195B", init: "MB", who: "Mohamed Benomar", verb: "deleted", rest: " duplicate record for ", target: "Noor Abbasl", time: "10:15 AM" },
];
const ROWS_YESTERDAY = [
  { id: "e5", avatar: "#C2195B", init: "MB", who: "Mohamed Benomar", verb: "deleted", rest: " duplicate record for ", target: "Noor Abbasl", time: "4:15 PM",
    detail: { fields: [["Phone Number", "(949)555-0133", "(949)555-0155"]] } },
  { id: "e6", avatar: "#C2195B", init: "MB", who: "Mohamed Benomar", verb: "sent email", rest: " ", target: "to 23 voting members", targetColor: "#464A53", time: "1:33 PM" },
  { id: "e7", avatar: "#4A5569", init: "MB", who: "Mohamed Benomar", verb: "deleted", rest: " duplicate record for ", target: "Noor Abbasl", time: "10:15 AM" },
];
const EXPANDABLE = ["e1", "e3", "e5"];

function FieldsTable({ fields }) {
  return (
    <div className="flex flex-col items-start px-[16px] w-full">
      <div className="flex flex-col items-start text-[12px] leading-[1.2] tracking-[0.6px] text-[#4D4A47]">
        <div className="flex gap-[32px] items-start rounded-t-[8px] border border-[#D5D1CA] bg-[#F9F9F8] px-[16px] py-[8px]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
          <p className="w-[320px]">FIELD</p>
          <p className="w-[242px]">BEFORE</p>
          <p className="w-[242px]">AFTER</p>
        </div>
        {fields.map(([f, before, after], i) => (
          <div
            key={f}
            className={"flex gap-[32px] items-start border border-[#D5D1CA] bg-white px-[16px] py-[8px] -mt-px" + (i === fields.length - 1 ? " rounded-b-[8px]" : "")}
            style={{ fontFamily: "Poppins", fontWeight: 500 }}
          >
            <p className="w-[320px]">{f}</p>
            <p className="w-[242px]">{before}</p>
            <p className="w-[242px]">{after}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldsDetail({ fields }) {
  return (
    <div className="flex flex-col gap-[16px] items-start w-full pt-[16px]">
      <FieldsTable fields={fields} />
      <p className="w-full text-[12px] leading-[1.2] tracking-[0.6px] underline text-[#827D78]" style={{ fontFamily: "'IBM Plex Mono'", fontWeight: 500, textUnderlinePosition: "from-font" }}>
        View Member Details→
      </p>
    </div>
  );
}

function ReasonDetail({ reason }) {
  return (
    <div className="flex flex-col gap-[8px] items-start w-full pt-[16px]">
      <div className="flex flex-col gap-[4px] items-start w-full">
        <p className="px-[20px] text-[12px] leading-[1.2] tracking-[0.6px] text-[#4D4A47]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
          REASON
        </p>
        <p className="px-[20px] w-full text-[12px] leading-[1.2] tracking-[0.6px] text-[#B6B1AB]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
          {reason}
        </p>
      </div>
      <div className="flex flex-col items-start px-[20px]">
        <div className="flex gap-[8px] items-center rounded-[8px] bg-white py-[4px]">
          <span className="flex items-center justify-center rounded-[32px] bg-[#EEF6F2] px-[8px] py-[4px] text-[#448865] text-[12px] leading-[1.2] tracking-[0.6px]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
            Active
          </span>
          <img alt="" src={APP + "arrow-right.svg"} className="size-[16px]" />
          <span className="flex items-center justify-center rounded-[32px] bg-[#FAEAEB] px-[8px] py-[4px] text-[#BA2930] text-[12px] leading-[1.2] tracking-[0.6px]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
            Terminated
          </span>
        </div>
      </div>
      <p className="px-[20px] w-full text-[#BA2930] text-[12px] leading-[1.2] tracking-[0.6px]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
        View Member Details→
      </p>
    </div>
  );
}

function LogRow({ e, first, last, open, onToggle, reduce }) {
  const expandable = !!e.detail;
  const Tag = expandable ? "button" : "div";
  const dot = e.verb === "terminated" && open ? DOT.terminatedOpen : DOT[e.verb];
  return (
    <div
      className={
        "w-full border border-[#F3F2F0] bg-white p-[16px]" +
        (first ? " rounded-t-[8px]" : " -mt-px") +
        (last ? " rounded-b-[8px]" : "")
      }
    >
      <Tag
        type={expandable ? "button" : undefined}
        onClick={expandable ? onToggle : undefined}
        aria-expanded={expandable ? open : undefined}
        aria-controls={expandable ? `alog-${e.id}` : undefined}
        className={"flex w-full items-center justify-between text-left" + (expandable ? " cursor-pointer" : "")}
      >
        <div className="flex gap-[8px] items-center">
          <span aria-hidden className="size-[7px] rounded-full" style={{ background: dot }} />
          <span aria-hidden className="flex size-[34px] items-center justify-center rounded-[17px] text-center text-[12px] text-[#F9F9F8]" style={{ background: e.avatar, fontFamily: "Poppins", fontWeight: 600 }}>
            {e.init}
          </span>
          <p className="whitespace-nowrap text-[14px] leading-[1.2] text-[#827D78]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
            <span className="text-[#353230]">{e.who}</span>{" "}
            <span style={{ color: VERB[e.verb] }}>{e.verb}</span>
            {e.rest}
            <span style={{ color: e.targetColor || "#353230" }}>{e.target}</span>
          </p>
          {e.meta && (
            <ul className="block whitespace-nowrap text-[12px] leading-[1.2] text-[#B6B1AB]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
              <li className="list-disc ms-[18px]">{e.meta}</li>
            </ul>
          )}
        </div>
        <div className="flex gap-[16px] items-center">
          <p className="whitespace-nowrap text-[12px] leading-[1.2] tracking-[0.6px] text-[#B6B1AB]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
            {e.time}
          </p>
          <img
            alt=""
            aria-hidden
            src={APP + "caret-down.svg"}
            className="size-[16px] transition-transform duration-200"
            style={{ transform: expandable && open ? "rotate(0deg)" : "rotate(-90deg)" }}
          />
        </div>
      </Tag>
      {expandable && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`alog-${e.id}`}
              key="panel"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {e.detail.fields ? <FieldsDetail fields={e.detail.fields} /> : <ReasonDetail reason={e.detail.reason} />}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

function Group({ date, count, rows, open, toggle, reduce }) {
  return (
    <div className="flex w-full flex-col gap-[16px] items-start">
      <div className="flex w-full items-center justify-between leading-[1.2]">
        <p className="flex-1 text-[12px] tracking-[0.6px] text-[#4D4A47]" style={{ fontFamily: "'IBM Plex Mono'", fontWeight: 600 }}>
          {date}
        </p>
        <p className="whitespace-nowrap text-[10px] tracking-[0.5px] text-[#B6B1AB]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
          {count}
        </p>
      </div>
      <div className="flex w-full flex-col items-start drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        {rows.map((e, i) => (
          <LogRow key={e.id} e={e} first={i === 0} last={i === rows.length - 1} open={!!open[e.id]} onToggle={() => toggle(e.id)} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}

const TABS = ["All Activity", "Edit Detail", "Application Approval", "Status Transition", "Delete", "Bulk Actions"];

export function ActivityLogScreen() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState({ e1: true, e5: true }); // matches the Activity Log-u frame
  const [scale, setScale] = useState(0);
  const boxRef = useRef(null);
  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const setAll = (v) => setOpen(Object.fromEntries(EXPANDABLE.map((id) => [id, v])));

  // scale the fixed 1440x1024 design space to the aspect-locked screen box
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1440));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden">
      <div
        className="flex bg-[#F5F5F6] text-left antialiased"
        style={{ width: 1440, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}
      >
        <AppSidebar active="Dashboard" />
        <div className="h-full min-w-0 flex-1 overflow-y-auto">
          <div className="ml-[45px] mr-[32px] pb-[48px] pt-[37px]">
            {/* header */}
            <div className="flex w-full items-start justify-between">
              <div className="flex h-[51px] flex-col gap-[8px] items-start">
                <p className="text-[18px] leading-[1.2] text-[#252322]" style={{ fontFamily: "Poppins", fontWeight: 600 }}>
                  Activity Log
                </p>
                <p className="text-[16px] leading-[1.2] text-[#635E5B]" style={{ fontFamily: "'IBM Plex Sans'", fontWeight: 400 }}>
                  A record of every admin update across the system to particular member records
                </p>
              </div>
              <div className="flex items-center gap-[16px]">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-white py-[8px] pl-[8px] pr-[16px] drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1),0px_1px_1.5px_rgba(0,0,0,0.06)]"
                >
                  <img alt="" src={APP + "arrows-out.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[14px] leading-[1.2] text-[#4D4A47]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
                    Expand all
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setAll(false)}
                  className="flex cursor-pointer items-center justify-center gap-[8px] rounded-[4px] bg-white py-[8px] pl-[8px] pr-[16px] drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1),0px_1px_1.5px_rgba(0,0,0,0.06)]"
                >
                  <img alt="" src={APP + "arrows-in.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[14px] leading-[1.2] text-[#4D4A47]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
                    Collapse all
                  </span>
                </button>
                <span aria-hidden className="flex items-center justify-center gap-[8px] rounded-[4px] bg-[#BA2930] py-[8px] pl-[8px] pr-[16px] drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1),0px_1px_1.5px_rgba(0,0,0,0.06)]">
                  <img alt="" src={APP + "share-network.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[14px] leading-[1.2] text-[#F9F9F8]" style={{ fontFamily: "Poppins", fontWeight: 500 }}>
                    Export as CSV
                  </span>
                </span>
              </div>
            </div>

            {/* filter tabs (decorative) + hairline */}
            <div aria-hidden className="relative mt-[23px] w-full border-b border-[#E6E4DF] pb-[6px]">
              <div className="flex items-center">
                {TABS.map((t, i) => (
                  <div key={t} className="relative flex items-center justify-center px-[16px]">
                    <p className={"whitespace-nowrap text-[14px] leading-[1.2] " + (i === 0 ? "text-[#7D1C21]" : "text-[#827D78]")} style={{ fontFamily: "Poppins", fontWeight: 500 }}>
                      {t}
                    </p>
                    {i === 0 && <span className="absolute inset-x-0 -bottom-[8px] h-[2px] bg-[#BA2930]" />}
                  </div>
                ))}
              </div>
            </div>

            {/* groups */}
            <div className="mt-[27px] flex w-full flex-col gap-[16px] items-start">
              <Group date="TODAY - APR 24, 2026" count="4 events" rows={ROWS_TODAY} open={open} toggle={toggle} reduce={reduce} />
              <Group date="YESTERDAY - APR 23, 2026" count="3 events" rows={ROWS_YESTERDAY} open={open} toggle={toggle} reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

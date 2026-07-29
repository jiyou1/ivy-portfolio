import { APP, useAppScale, AppSidebar } from "./AppChrome";

/* Member Records screen: a 1:1 HTML build of the Figma frames
   "Member Detail (Family) - 3 / - 4" (GQ819Wp7f9BkFJvFvfPJ7f, nodes 2035:3418
   and 2060:2637). Exact Poppins type, concrete-ramp hexes, and exported icon
   assets; laid out at the design's native 1440x1024 and scaled into the
   walkthrough laptop. Sidebar, back link, and page header stay fixed while the
   record scrolls underneath, exactly like the shipped app. */

const P500 = { fontFamily: "Poppins", fontWeight: 500 };
const P600 = { fontFamily: "Poppins", fontWeight: 600 };
const P400 = { fontFamily: "Poppins", fontWeight: 400 };
const SHADOW = "drop-shadow-[0px_1px_2.5px_rgba(0,0,0,0.1),0px_1px_1.5px_rgba(0,0,0,0.06)]";

function CardLabel({ icon, children, dark = true }) {
  return (
    <div className="flex w-full items-center gap-[5px]">
      <img alt="" src={APP + icon} className="size-[16px]" />
      <p className={"whitespace-nowrap text-[11px] uppercase leading-[normal] tracking-[0.5px] " + (dark ? "text-[#353230]" : "text-[#827D78]")} style={P600}>
        {children}
      </p>
    </div>
  );
}

function InfoRow({ label, value, valueColor = "#827D78" }) {
  return (
    <>
      <div className="h-px w-full flex-none bg-[#F3F2F0]" />
      <div className="flex w-full items-start gap-[8px] px-[8px] text-[12px] leading-[normal]">
        <p className="min-w-px flex-1 text-[#4D4A47]" style={P400}>{label}</p>
        <p className="whitespace-nowrap" style={{ ...P500, color: valueColor }}>{value}</p>
      </div>
    </>
  );
}

const PERSONAL = [
  ["Full Name", "Ahmad Hassan", "#252322"],
  ["Email Address", "ahmad.hassan@gmail.com"],
  ["Phone Number", "(949)555-0432"],
  ["Date of Birth", "June 15, 1992"],
  ["Gender", "Male"],
  ["Address", "1847 Culver Dr"],
  ["City, State", "Irvine, CA"],
  ["ZIP Code", "92604"],
];
const MEMBERSHIP = [
  ["Member ID", "ICOI-10032", "#BA2930"],
  ["Membership Type", "Individual", "#252322"],
  ["Membership Cycle", "Monthly"],
  ["Member Since", "Jan 15, 2025"],
  ["Expiration Date", "Jun 15, 2026", "#252322"],
  ["Status", "Active", "#448865"],
  ["Outstanding Balance", "No", "#252322"],
  ["Voting Eligible", "Yes (Eligible Nominee)", "#448865"],
];

/* recent activity rows: verb colors from the Activity palette */
const ACTIVITY = [
  { init: "MB", bg: "#4A5569", who: "Mohamed Benomar", verb: "deleted", vc: "#E11D48", rest: " duplicate record", dot: "#E11D48", time: "10:15 AM" },
  { init: "KB", bg: "#1C4966", who: "Karima Berrada", verb: "updated", vc: "#3B82F6", rest: " email and phone number · 2 fields", dot: "#3B82F6", time: "2:31 PM" },
  { init: "KB", bg: "#1C4966", who: "Karima Berrada", verb: "changed status", vc: "#D97706", rest: " to Active", dot: "#D97706", time: "Jan 15" },
  { init: "MB", bg: "#4A5569", who: "Mohamed Benomar", verb: "deleted", vc: "#E11D48", rest: " duplicate record", dot: "#E11D48", time: "Jan 10" },
  { init: "KB", bg: "#1C4966", who: "Karima Berrada", verb: "created", vc: "#448865", rest: " membership for ", target: "Hana Karimi", dot: "#4DBF8C", time: "Jan 15, 2025" },
];

/* relation pill palettes: Primary red, Spouse lochmara blue, Child neutral */
const RELATION = {
  Primary: { bg: "#FFF5F5", border: "#F6D5D7", text: "#BA2930" },
  Spouse: { bg: "#F1F9FF", border: "#C8E5FE", text: "#0B76B7" },
  Child: { bg: "#F9F9F8", border: "#E6E4DF", text: "#635E5B" },
};
const FAMILY = [
  { init: "AH", bg: "#8C1A1A", name: "Ahmad Hassan", sub: "nadia.hassan@gmail.com", relation: "Primary", id: "ICOI-00032", active: true, exp: "Mar 30, 2026", removable: false },
  { init: "FH", bg: "#7B2D8F", name: "Fatima Hassan", sub: "fatima.hassan@gmail.com", relation: "Spouse", id: "ICOI-00033", active: true, exp: "Mar 30, 2026", removable: true },
  { init: "YH", bg: "#8C1A1A", name: "Yusuf Hassan", sub: "Age 14", relation: "Child", id: "--", active: null, exp: "Mar 30, 2026", removable: true },
  { init: "LH", bg: "#006A5C", name: "Layla Hassan", sub: "Age 10", relation: "Child", id: "--", active: null, exp: "Mar 30, 2026", removable: true },
];

function ActivePill({ small = false }) {
  return (
    <span className={"flex items-center gap-[4px] rounded-[16px] border border-[#DDEEE5] bg-[#ECFDF5] " + (small ? "h-[25px] pl-[13px] pr-[17px] py-[5px]" : "gap-[5px] rounded-[20px] border-0 px-[10px] pb-[4px] pt-[3px]")}>
      <span className="size-[6px] flex-none rounded-[3px] bg-[#059669]" />
      <span className={"whitespace-nowrap leading-[normal] text-[#065F46] " + (small ? "text-[10px]" : "text-[12px]")} style={P500}>
        Active
      </span>
    </span>
  );
}

export default function MemberRecordsScreen() {
  const [boxRef, scale] = useAppScale();

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden">
      <div
        className="flex bg-[#F9F9F8] text-left antialiased"
        style={{ width: 1440, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}
      >
        <AppSidebar active="Members" />
        <div className="flex h-full min-w-0 flex-1 flex-col">
          {/* fixed page header */}
          <div aria-hidden className="relative h-[115px] w-full flex-none border-b border-[#E6E4DF] bg-white">
            <p className="absolute left-[46px] top-[24px] text-[14px] leading-[1.2] text-[#1092DF]" style={P500}>
              {"< Back to Members"}
            </p>
            <div className="absolute left-[58px] top-[55px] flex w-[1068px] items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center gap-[8px]">
                  <span className="flex size-[32px] items-center justify-center rounded-[16px] bg-[#8C1A1A] text-[12px] font-semibold text-[#F9F9F8]" style={{ fontFamily: "Inter", fontWeight: 600 }}>
                    AH
                  </span>
                  <div className="flex w-[168px] flex-col gap-[2px]">
                    <p className="text-[18px] leading-[1.2] text-[#11100F]" style={P600}>Ahmad Hassan</p>
                    <p className="whitespace-pre text-[12px] leading-[1.2] text-[#827D78]" style={P500}>{"ICOI-10032  ·  Individual"}</p>
                  </div>
                </div>
                <ActivePill />
              </div>
              <div className="flex items-center gap-[8px]">
                <span className={`flex items-center justify-center gap-[8px] rounded-[4px] bg-[#A7252B] py-[8px] pl-[8px] pr-[16px] ${SHADOW}`}>
                  <img alt="" src={APP + "pencil-simple.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[12px] leading-[1.2] text-white" style={P500}>Edit Information</span>
                </span>
                <span className={`flex items-center justify-center gap-[8px] rounded-[4px] bg-white py-[8px] pl-[8px] pr-[16px] ${SHADOW}`}>
                  <img alt="" src={APP + "arrow-clockwise.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[12px] leading-[1.2] text-[#4D4A47]" style={P500}>Change Status</span>
                </span>
                <span className={`flex items-center justify-center gap-[8px] rounded-[4px] bg-white py-[8px] pl-[8px] pr-[16px] ${SHADOW}`}>
                  <img alt="" src={APP + "envelope-simple.svg"} className="size-[16px]" />
                  <span className="whitespace-nowrap text-[12px] leading-[1.2] text-[#4D4A47]" style={P500}>Send Email</span>
                </span>
              </div>
            </div>
          </div>

          {/* the record, scrolling under the fixed chrome */}
          <div className="min-h-0 flex-1 overflow-y-auto" aria-label="Member record for Ahmad Hassan, scrollable">
            <div className="w-[1091px] pb-[48px] pl-[46px]" style={{ boxSizing: "content-box" }}>
              {/* admin memo */}
              <div className={`mt-[18px] flex w-full flex-col items-center gap-[8px] rounded-[16px] bg-white p-[16px] ${SHADOW}`}>
                <CardLabel icon="address-book-gray.svg" dark={false}>ADMIN MEMO</CardLabel>
                <div className="h-px w-full flex-none bg-[#F3F2F0]" />
                <div className="flex h-[76px] w-full flex-col items-start rounded-[8px] border border-[#E6E4DF] bg-[#F3F2F0] px-[16px] py-[12px]">
                  <p className="text-[12px] leading-[normal] text-[#4D4A47]" style={P400}>Add Admin notes...</p>
                </div>
                <div className="flex w-full items-center gap-[8px] pl-[4px]">
                  <p className="min-w-px flex-1 text-[10px] leading-[normal] text-[#4D4A47]" style={P400}>Visible to admins only</p>
                  <span className={`flex items-center rounded-[4px] bg-[#BA2930] px-[24px] py-[8px] ${SHADOW}`}>
                    <span className="whitespace-nowrap text-[10px] leading-[1.2] text-[#F3F2F0]" style={P500}>Submit Note</span>
                  </span>
                </div>
              </div>

              {/* personal info + membership details */}
              <div className="mt-[28px] grid w-full grid-cols-[530px_530px] gap-[31px]">
                <div className={`flex flex-col gap-[8px] rounded-[16px] bg-white p-[16px] ${SHADOW}`}>
                  <CardLabel icon="address-book-dark.svg">Personal information</CardLabel>
                  {PERSONAL.map(([l, v, c]) => <InfoRow key={l} label={l} value={v} valueColor={c} />)}
                </div>
                <div className={`flex flex-col gap-[8px] rounded-[16px] bg-white p-[16px] ${SHADOW}`}>
                  <CardLabel icon="file-text.svg">MEMBERSHIP DETAILS</CardLabel>
                  {MEMBERSHIP.map(([l, v, c]) => <InfoRow key={l} label={l} value={v} valueColor={c} />)}
                </div>
              </div>

              {/* digital card + recent activity */}
              <div className="mt-[16px] grid w-full grid-cols-[530px_530px] items-start gap-[31px]">
                <div className={`flex h-[324px] flex-col items-center gap-[8px] rounded-[16px] bg-white p-[16px] ${SHADOW}`}>
                  <CardLabel icon="barcode-dark.svg">DIGITAL MEMBERSHIP CARD</CardLabel>
                  <div className="h-px w-full flex-none bg-[#F3F2F0]" />
                  <div className="flex flex-col items-start pb-[12px] pt-[32px]">
                    <div className="flex h-[142px] w-[150px] items-center justify-center rounded-[8px] border-2 border-dashed border-[#D5D1CA] bg-[#F9F9F8]">
                      <div className="flex flex-col items-center gap-[4px]">
                        <img alt="" src={APP + "qr-code.svg"} className="size-[49px]" />
                        <p className="text-center text-[12px] leading-[1.2] text-[#B6B1AB]" style={P500}>QR Code</p>
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-[12px] leading-[normal] text-[#252322]" style={P500}>ICOI-10032</p>
                  <span className="flex h-[24px] items-center gap-[7px] rounded-[8px] border border-[#F3F2F0] bg-[#F9F9F8] px-[16px] py-[4px]">
                    <img alt="" src={APP + "download-simple.svg"} className="size-[12px]" />
                    <span className="whitespace-nowrap text-[10px] leading-[1.2] text-[#4D4A47]" style={P500}>Download Card</span>
                  </span>
                </div>
                <div className={`flex flex-col rounded-[16px] ${SHADOW}`}>
                  <div className="flex flex-col gap-[8px] rounded-t-[16px] bg-white px-[16px] pb-[8px] pt-[16px]">
                    <CardLabel icon="clock.svg">RECENT ACTIVITY</CardLabel>
                    <div className="h-px w-full flex-none bg-[#F3F2F0]" />
                    {ACTIVITY.map((a, i) => (
                      <div key={i} className="flex w-full flex-col">
                        {i > 0 && <div className="mb-[8px] h-px w-full bg-[#F3F2F0]" />}
                        <div className="flex w-full items-center justify-between px-[16px]">
                          <div className="flex items-center gap-[8px]">
                            <span className="size-[7px] flex-none rounded-full" style={{ background: a.dot }} />
                            <span className="flex size-[32px] flex-none items-center justify-center rounded-[16px] text-center text-[11px] text-[#F9F9F8]" style={{ ...P600, background: a.bg }}>
                              {a.init}
                            </span>
                            <p className="whitespace-nowrap text-[11px] leading-[1.2] text-[#827D78]" style={P500}>
                              <span className="text-[#353230]">{a.who}</span>{" "}
                              <span style={{ color: a.vc }}>{a.verb}</span>
                              {a.rest}
                              {a.target && <span className="text-[#353230]">{a.target}</span>}
                            </p>
                          </div>
                          <p className="whitespace-nowrap text-[11px] leading-[1.2] tracking-[0.55px] text-[#B6B1AB]" style={P600}>{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-px w-full bg-[#E6E4DF]" />
                  <div className="flex h-[41px] w-full items-center justify-center gap-[8px] rounded-b-[16px] bg-[#F9F9F8] py-[16px]">
                    <p className="whitespace-nowrap text-[11px] leading-[1.2] text-[#827D78]" style={P500}>View Full Activity Log</p>
                    <img alt="" src={APP + "arrow-right.svg"} className="size-[12px]" />
                  </div>
                </div>
              </div>

              {/* family members */}
              <div className={`mt-[16px] flex w-full flex-col ${SHADOW}`}>
                <div className="flex w-full flex-col justify-center rounded-t-[16px] border-b border-[#F3F2F0] bg-white px-[16px] py-[12px]">
                  <div className="flex w-full items-center">
                    <div className="flex min-w-px flex-1 items-center gap-[6px]">
                      <img alt="" src={APP + "users-family.svg"} className="size-[16px]" />
                      <p className="whitespace-nowrap text-[11px] uppercase leading-[normal] tracking-[0.5px] text-[#353230]" style={P600}>FAMILY MEMBERS</p>
                    </div>
                    <span className="flex items-center justify-center gap-[4px] rounded-[4px] border border-[#F3F2F0] bg-white py-[8px] pl-[8px] pr-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                      <img alt="" src={APP + "plus.svg"} className="size-[12px]" />
                      <span className="whitespace-nowrap text-[10px] leading-[1.2] text-[#827D78]" style={P500}>Add Member</span>
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center bg-white py-[4px] text-[11px] uppercase leading-[normal] tracking-[0.5px] text-[#9CA3AF]" style={P600}>
                  <p className="w-[270px] px-[16px] py-[4px]">MEMBER</p>
                  <p className="w-[150px] px-[16px] py-[4px]">RELATION</p>
                  <p className="w-[180px] px-[16px] py-[4px]">MEMBER ID</p>
                  <p className="w-[150px] px-[16px] py-[4px]">STATUS</p>
                  <p className="min-w-px flex-1 px-[16px] py-[4px]">EXPIRATION</p>
                </div>
                <div className="flex w-full flex-col rounded-b-[16px] bg-white">
                  {FAMILY.map((m, i) => {
                    const r = RELATION[m.relation];
                    const last = i === FAMILY.length - 1;
                    return (
                      <div key={m.name} className={"flex w-full items-center border-t border-[#F3F2F0] py-[4px]" + (last ? " rounded-b-[16px] pb-[12px]" : "")}>
                        <div className="flex h-[49px] w-[270px] items-center gap-[10px] px-[16px]">
                          <span className="flex size-[34px] flex-none items-center justify-center rounded-[17px] text-center text-[12px] text-[#F9F9F8]" style={{ ...P600, background: m.bg }}>
                            {m.init}
                          </span>
                          <div className="flex flex-col">
                            <p className="whitespace-nowrap pb-px text-[13px] leading-[normal] text-[#111827]" style={P500}>{m.name}</p>
                            <p className="whitespace-nowrap pb-px text-[11px] leading-[normal] text-[#9CA3AF]" style={P400}>{m.sub}</p>
                          </div>
                        </div>
                        <div className="flex w-[150px] flex-col items-start justify-center px-[16px] py-[12px]">
                          <span className="flex items-center justify-center rounded-[16px] border px-[17px] py-[5px]" style={{ background: r.bg, borderColor: r.border }}>
                            <span className="whitespace-nowrap text-center text-[10px] leading-[normal]" style={{ ...P500, color: r.text }}>{m.relation}</span>
                          </span>
                        </div>
                        <div className="flex h-[49px] w-[180px] items-center px-[16px] py-[8px]">
                          <p className="whitespace-nowrap text-[12px] leading-[normal] text-[#BA2930]" style={P500}>{m.id}</p>
                        </div>
                        <div className="flex h-[49px] w-[150px] flex-col items-start justify-center px-[16px] py-[8px]">
                          {m.active ? (
                            <ActivePill small />
                          ) : (
                            <span className="flex h-[25px] items-center justify-center px-[16px] py-[4px] text-center text-[10px] leading-[normal] text-[#448865]" style={P500}>--</span>
                          )}
                        </div>
                        <div className="flex h-[49px] min-w-px flex-1 items-center px-[16px]">
                          <p className="whitespace-nowrap text-[12px] leading-[normal] text-[#4D4A47]" style={P400}>{m.exp}</p>
                        </div>
                        {m.removable && (
                          <div className="flex items-center justify-center px-[32px]">
                            <p className="whitespace-nowrap text-[12px] leading-[normal] text-[#BA2930]" style={P500}>Remove</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

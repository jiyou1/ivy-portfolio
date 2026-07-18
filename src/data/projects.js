export const PROJECTS = [
  {
    slug: "icoi",
    label: "OPERATIONAL PORTAL · CLIENT PROJECT",
    title: "ICOI Membership Portal",
    desc: "End-to-end design and React build of a membership management system, delivered for a real client's daily operations with full handoff.",
    tags: "UI/UX · REACT · DESIGN SYSTEM",
    // Cover renders `video` as an autoplay/muted/loop/playsInline element; the
    // poster is the video's first frame so there's no flash before it plays.
    cover: "/covers/icoi.png",
    href: "/work/icoi",
    external: false,
    skills: ["UI/UX DESIGN", "DESIGN SYSTEMS", "PROTOTYPING", "REACT", "TYPESCRIPT", "HTML/CSS", "TAILWIND CSS", "REST APIS", "GIT"],
  },
  {
    slug: "lattelearn",
    label: "PRODUCTIVITY APP · PM & DESIGN LEAD",
    title: "LatteLearn",
    desc: "A focus companion that brings the café study experience home. Led a 9-person team from concept to a packaged desktop app.",
    tags: "UI/UX · ELECTRON · PM",
    cover: "/covers/lattelearn.png",
    href: "/work/lattelearn",
    external: false,
    skills: ["UI/UX DESIGN", "PROTOTYPING", "MOTION DESIGN", "GIT"],
  },
  {
    slug: "roomietask",
    label: "UX RESEARCH · HCI PROCESS",
    title: "RoomieTask",
    desc: "Shared task coordination app designed through surveys, interviews, affinity mapping, prototyping, and moderated usability testing.",
    tags: "RESEARCH · PROTOTYPING · TESTING",
    cover: "/covers/roomietask.png",
    href: "/work/roomietask",
    external: false,
    skills: ["UI/UX DESIGN", "USER RESEARCH", "PROTOTYPING", "ACCESSIBILITY"],
  },
  {
    slug: "designathon",
    label: "EVENT PLATFORM · DESIGN AT UCI",
    title: "Design-a-thon",
    desc: "Website and event experience for UCI's largest student design event, serving 200+ participants with a 4-person design team.",
    tags: "UI/UX · WEB DESIGN · BRANDING",
    cover: "/covers/designathon.png",
    coverPosition: "center 30%",
    href: "/work/designathon",
    external: false,
    skills: ["UI/UX DESIGN", "DESIGN SYSTEMS", "HTML/CSS"],
  },
  {
    // Prime Academy has its own case-study route but is NOT shown on the home
    // grid (spec §5.1). Kept here so the /work/prime-academy route still resolves.
    slug: "prime-academy",
    label: "BRAND SYSTEM · WEB · PRINT · SIGNAGE",
    title: "Prime Academy",
    desc: "Redesigned the website, unified the print and in-center signage, and shipped one brand across every surface for an Irvine test-prep academy.",
    tags: "WEB · BRANDING · SIGNAGE",
    cover: "/covers/prime-academy.jpg",
    video: "/videos/Prime_New_Website.mp4",
    href: "/work/prime-academy",
    external: false,
    home: false,
    skills: [],
  },
];

export const HOME_PROJECTS = PROJECTS.filter((p) => p.home !== false);

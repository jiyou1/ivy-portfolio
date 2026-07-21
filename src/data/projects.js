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
    thumb: "#C1352B", // red placeholder before the cover loads
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
    thumb: "#3B2A1E", // dark brown placeholder before the cover loads
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
    thumb: "#F6C6D8", // pastel pink placeholder before the cover loads
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
    thumb: "#0047AB", // cobalt blue placeholder before the cover loads
    coverPosition: "center 30%",
    href: "/work/designathon",
    external: false,
    // Case study still in progress: the route serves the Brewing stub and the
    // cards badge "STILL BREWING". Delete this line to publish.
    brewing: true,
    skills: ["UI/UX DESIGN", "DESIGN SYSTEMS", "HTML/CSS"],
  },
];

export const HOME_PROJECTS = PROJECTS.filter((p) => p.home !== false);

/* Design-a-thon case study: content source of truth.
   Copy authority: the finalized copy was meant to live in a Figma frame
   ("Case Page - skeleton") in file ijgHhVGFRfdS7JOistCMul. That frame does not
   exist in the file (only page "V1 Foundation" is present, holding the portfolio
   home/about and a Prime Academy case template). With no Figma frame to defer to,
   the copy below is authoritative, taken from the build brief. Never use em-dashes.

   TODO-SLOT rule: any string prefixed "TODO:" is an unfinished slot. It renders
   only in dev (behind a dashed amber outline via <Todo>), never as final copy, so
   nothing placeholder can ship looking finished. Fill these before publishing.

   Media: every referenced file exists under public/work/designathon/ (Figma
   webp exports plus event photos and the coaster derivatives). width/height on
   each entry are the file's real pixel dimensions, forwarded to the <img> so
   unconstrained figures reserve their space before the file arrives. */

const BASE = "/work/designathon/";
const SHIPPED = BASE + "shipped/";

export const HERO = {
  logo: BASE + "logo.png", // optional; hides cleanly if the file is absent
  eyebrow: "CASE STUDY ✳ DESIGN AT UCI · DESIGN-A-THON 2025",
  title: "Six surfaces, one hand-drawn universe.",
  lede: "For Design at UCI's Design-a-thon, the largest collegiate design hackathon in Southern California, I owned the Judges, Prizes, and Meet the Team pages across web and mobile, inside a site where every cloud, mascot, and coaster segment was illustrated by hand, to my spec.",
  pills: ["UI/UX COMMITTEE", "DESIGN AT UCI", "APR 18–20, 2025"],
  meta: [
    { label: "Role", value: "UI/UX Designer (web + mobile)" },
    { label: "Team", value: "4 designers" },
    { label: "Timeline", value: "Winter to Apr 2025" },
    { label: "Tools", value: "Figma" },
  ],
  media: {
    // Feathered so the coaster's sky-blue top and cloud-cream bottom melt into
    // the paper + pink mesh instead of sitting in a hard box. Poster is the
    // video's own first frame, so the pre-play / reduced-motion still matches the
    // clip exactly (no text-scene mismatch). mp4 is a 1280w derivative of the
    // source REVISED ROLLERCOASTER3.mp4 (8.3MB down to ~2MB); add a webm here as
    // the first source later to shave more.
    feather: true,
    poster: BASE + "coaster-poster.jpg",
    label: "[ HERO SLOT ]\ncoaster loop over the pink mesh stage",
    sources: [{ src: BASE + "coaster-loop.mp4", type: "video/mp4" }],
  },
};


/* Sticky numbered TOC + section anchors, in reading order. */
export const SECTIONS = [
  ["01", "context", "Context"],
  ["02", "world", "The world we built"],
  ["03", "process", "Process"],
  ["04", "shipped", "What shipped"],
  ["05", "reflect", "Reflection"],
];

export const CONTEXT = {
  n: "01",
  heading: "The largest design hackathon in SoCal needed a front door.",
  body: [
    "Design at UCI's Design-a-thon is the largest collegiate design hackathon in Southern California: 250+ designers, $2,120 in prizes, 48 hours, hybrid across two formats. The 2025 theme was Beyond Our Horizons, and the four-person UI/UX committee's job was the website and companion mobile app that carried the event from first visit to Devpost submission. I owned three of its pages on both platforms.",
  ],
  // event-day photos: the event these surfaces served, and my weekend
  // volunteering as a participant mentor
  figures: [
    {
      src: BASE + "event-courtyard.jpg",
      alt: "Participants working at tables across the UCI courtyard on event day",
      caption: "Event day: 200+ participants working across the courtyard.",
    },
    {
      src: BASE + "event-mentoring.jpg",
      alt: "Ivy mentoring a participant team during the event weekend",
      caption: "Between sprints I volunteered as a participant mentor through the weekend.",
    },
    {
      src: BASE + "event-team.jpg",
      alt: "Ivy in the event tee alongside a fellow mentor",
      caption: "On shift in the event tee, with a fellow mentor.",
    },
  ],
};

export const WORLD = {
  n: "02",
  heading: "A theme park past the edge of the map.",
  body: [
    "Radey for display type, Satoshi Variable for body. A candy palette with gradient ramps, hand-drawn stars and clouds, coaster track segments, and five illustrated mascots. In hi-fi the world gained a star field: beyond the horizon turned out to be space. Artifacts keep their native colors; page chrome stays on site tokens.",
  ],
  figures: [
    {
      src: BASE + "brand-board.webp",
      width: 535,
      height: 877,
      alt: "Design-a-thon brand board: Radey and Satoshi Variable type samples, primary colors, gradient ramps, and the pen-nib logo",
      caption: "The brand board: Radey display over Satoshi Variable, the candy palette with its gradient ramps, and the pen-nib logo.",
    },
    {
      src: BASE + "brand-elements.webp",
      width: 1600,
      height: 1951,
      alt: "Hand-drawn element library: clouds, stars, coaster track segments, and the illustrated mascots",
      caption: "The hand-drawn element library: clouds, stars, coaster track segments, and the five mascots in two poses.",
    },
  ],
  constraint: {
    constraint: "48 hours, hybrid audience, submissions close 9:00 AM Sunday via Devpost.",
    consequence: "So the countdown and the Devpost button live above the fold on every page. Urgency is the interface.",
  },
};

export const PROCESS = {
  n: "03",
  heading: "Three pages, two platforms, four generations deep.",
  body: [
    "The committee ran on weekly task lists, and I turned mine into shipped screens: Judges, Prizes, and Meet the Team moved through lo-fi, mid-fi, and hi-fi under my ownership, for the website and the mobile app in parallel. Along the way I wrote illustration requests for the graphics team, handed finished screens to the developers, and carried all-hands critique back into the next revision.",
  ],
  // the Judges page across four generations, in a 2x2 grid
  figures: [
    {
      src: BASE + "judges-lofi.webp",
      width: 1440,
      height: 1007,
      alt: "Judges page lo-fi wireframe with placeholder cards, role chips, and LinkedIn icons",
      caption: "Lo-fi",
    },
    {
      src: BASE + "judges-midfi.webp",
      width: 1600,
      height: 1149,
      alt: "Judges page mid-fi iteration",
      caption: "Mid-fi",
    },
    {
      src: BASE + "judges-popup-exploration.webp",
      width: 1600,
      height: 1149,
      alt: "Judge detail pop-up exploration: a modal with photo, role, links, and a full bio over the star field",
      caption: "Pop-up exploration",
    },
    {
      src: BASE + "judges-hifi.webp",
      width: 1600,
      height: 1305,
      alt: "Judges page hi-fi in the star field, with the hand-drawn coaster and mascot over the carousel",
      caption: "Shipped",
    },
  ],
  constraints: [
    {
      constraint: "Every visual on the site is hand-drawn by a parallel graphics team, on their timeline, not ours.",
      consequence: "So we designed with placeholders sized and posed before the art existed, and wrote illustration requests precise enough that whatever came back would drop in without a redesign.",
      todo: "TODO: one concrete request story.",
    },
    {
      constraint: "Mid-project, the event date moved up, and marketing needed the site live a month and a half before it.",
      consequence: "The weekly task lists became the schedule: finish, hand off to development, move on.",
      todo: "TODO: what I cut and what I refused to cut.",
    },
  ],
  beats: [
    {
      k: "PRIZES",
      p: "The awards listed in reading order, not importance order. I rebuilt the hierarchy so the podium lands before the fine print.",
    },
    {
      k: "JUDGES, MOBILE",
      p: "Ten judge cards at desktop density broke the mobile viewport. I redesigned the layout to survive a 390px screen without losing anyone's face or title.",
    },
    {
      k: "MEET THE TEAM",
      p: "The LinkedIn buttons looked pressable but behaved like links. I separated the hover affordance from the click affordance so the button stopped lying.",
    },
  ],
};

export const SHIPPED_SECTION = {
  n: "04",
  heading: "Three pages, twice: what I shipped for web and mobile.",
  // mockup overview of the whole system, above the surface selector
  lead: {
    src: BASE + "mockups-overview.webp",
    width: 1600,
    height: 2193,
    alt: "Overview collage of Design-a-thon 2025 mockups across web and mobile",
    caption:
      "The full 2025 site, a four-person UI/UX committee effort. Judges, Prizes, and Meet the Team, on web and mobile, were mine.",
  },
  /* Tall page captures carry fit: "top" so the aspect-locked device frames crop
     from the top of the page instead of the middle; the lightbox still opens the
     full capture. */
  features: [
    {
      id: "prizes",
      number: "01",
      label: "Prizes",
      title: "Prizes: the podium before the fine print",
      description:
        "Five award tiers on illustrated candy cards, sized by importance instead of reading order. First place lands first; the fine print waits.",
      images: [SHIPPED + "prizes-hifi.webp"],
      alt: "Design-a-thon Prizes page, desktop: candy cards for first place, People's Choice, second, third, and honorable mentions over sunset clouds",
    },
    {
      id: "team",
      number: "02",
      label: "Team",
      fit: "top",
      title: "Meet the Team: buttons that stopped lying",
      description:
        "The full committee riding illustrated train cars, grouped by team, with LinkedIn buttons whose hover finally matched their click. That affordance fix took three weekly critiques to land.",
      images: [SHIPPED + "meet-the-team.webp"],
      alt: "Design-a-thon Meet the Team page, desktop: committee members in illustrated train cars, grouped by team",
    },
    {
      id: "prizes-mobile",
      number: "03",
      label: "Prizes · Mobile",
      frame: "phone",
      fit: "top",
      title: "Prizes, mobile: the podium holds",
      description:
        "The podium restacks for a phone: first place full width on top, 2nd and 3rd sharing a row, the fine print last.",
      images: [SHIPPED + "mobile-prizes.webp"],
      alt: "Design-a-thon Prizes page, my mobile adaptation: award cards restacked for a phone",
    },
    {
      id: "team-mobile",
      number: "04",
      label: "Team · Mobile",
      frame: "phone",
      fit: "top",
      title: "Meet the Team, mobile: filter first",
      description:
        "Committee chips up top, the roster in a compact grid below, every LinkedIn button one thumb tap away.",
      images: [SHIPPED + "mobile-team.webp"],
      alt: "Design-a-thon Meet the Team page, my mobile adaptation: committee filter chips over a grid of member cards with LinkedIn buttons",
    },
  ],
  credit: "The full site was designed by a four-person UI/UX committee; Judges, Prizes, and Meet the Team were mine on web and mobile.",
  link: { href: "https://ucidesignathon.com", label: "ucidesignathon.com" },
};

export const REFLECTION = {
  n: "05",
  heading: "What shipping through other people taught me.",
  cards: [
    {
      k: "PIPELINE",
      p: "My pages shipped through other people: weekly task lists, illustrators drawing to my requests, developers waiting on screens. Writing a precise ask became as important as drawing a precise frame.",
    },
    {
      k: "POLISH IS A QUEUE",
      p: "The Meet the Team LinkedIn buttons took three weekly revisions: first the effect, then the prototype, then the affordance itself, hover, not click. Small interactions took the longest, and that turned out to be normal.",
    },
    {
      k: "HONEST MISS",
      variant: "warn",
      todo: "TODO: honest miss.",
    },
  ],
};

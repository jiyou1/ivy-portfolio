/* Design-a-thon case study: content source of truth.
   Copy authority: the finalized copy was meant to live in a Figma frame
   ("Case Page - skeleton") in file ijgHhVGFRfdS7JOistCMul. That frame does not
   exist in the file (only page "V1 Foundation" is present, holding the portfolio
   home/about and a Prime Academy case template). With no Figma frame to defer to,
   the copy below is authoritative, taken from the build brief. Never use em-dashes.

   TODO-SLOT rule: any string prefixed "TODO:" is an unfinished slot. It renders
   only in dev (behind a dashed amber outline via <Todo>), never as final copy, so
   nothing placeholder can ship looking finished. Fill these before publishing.

   Media: the coaster loop maps to the real file public/REVISED ROLLERCOASTER3.mp4
   (referenced url-encoded). The optimized webm path is the upgrade target and
   404s harmlessly to the mp4 until it lands. Everything under
   public/work/designathon/ is expected-but-absent, so it renders as a labelled
   placeholder until the export drops in. */

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
      caption: "Event day: 200+ participants working across the courtyard.",
    },
    {
      src: BASE + "event-mentoring.jpg",
      caption: "Between sprints I volunteered as a participant mentor through the weekend.",
    },
    {
      src: BASE + "event-team.jpg",
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
      src: BASE + "context-brand-lockup.jpg",
      caption: "The brand board: Radey display over Satoshi Variable, the candy palette with its gradient ramps, and the pen-nib logo.",
    },
    {
      src: BASE + "context-brand-elements.jpg",
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
  figures: [
    { src: BASE + "process-01-branding.jpg", label: "[ FIG 01 ] branding foundation" },
    { src: BASE + "process-02-lofi.jpg", label: "[ FIG 02 ] lo-fi: Judges, Prizes, Meet the Team, web and mobile" },
    { src: BASE + "process-03-judges.jpg", label: "[ FIG 03 ] Judges: 4 generations, density broke mobile, I rebuilt the layout for 390px" },
    { src: BASE + "process-04-hifi.jpg", label: "[ FIG 04 ] hi-fi inside the star field + my illustration requests" },
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
  // the live site's front door, above the six surfaces
  lead: {
    src: BASE + "context-front-door.jpg",
    caption: "The front door as shipped: the illustrated hero with the date card and Apply Now above the fold.",
  },
  features: [
    {
      id: "judges",
      number: "01",
      label: "Judges",
      title: "Judges: ten people, one glance",
      description:
        "Judge cards with role and affiliation, readable in a scroll, honest at 390px. Fourth generation of the layout.",
      images: [SHIPPED + "judges.webp"],
      alt: "Design-a-thon Judges page, desktop",
    },
    {
      id: "prizes",
      number: "02",
      label: "Prizes",
      title: "Prizes: the podium before the fine print",
      description:
        "Four award tiers on illustrated candy cards, sized by importance instead of reading order. First place lands first; the fine print waits.",
      images: [SHIPPED + "prizes.png"],
      alt: "Design-a-thon Prizes page, desktop",
    },
    {
      id: "team",
      number: "03",
      label: "Team",
      title: "TODO: Meet the Team title.",
      description: "TODO: Meet the Team description.",
      images: [SHIPPED + "team.webp"],
      alt: "Design-a-thon Meet the Team page, desktop",
    },
    {
      id: "judges-mobile",
      number: "04",
      label: "Judges · Mobile",
      frame: "phone",
      title: "TODO: Judges mobile title.",
      description: "TODO: Judges mobile description.",
      images: [SHIPPED + "judges-mobile.webp"],
      alt: "Design-a-thon Judges page, mobile",
    },
    {
      id: "prizes-mobile",
      number: "05",
      label: "Prizes · Mobile",
      frame: "phone",
      title: "TODO: Prizes mobile title.",
      description: "TODO: Prizes mobile description.",
      images: [SHIPPED + "prizes-mobile.webp"],
      alt: "Design-a-thon Prizes page, mobile",
    },
    {
      id: "team-mobile",
      number: "06",
      label: "Team · Mobile",
      frame: "phone",
      title: "TODO: Meet the Team mobile title.",
      description: "TODO: Meet the Team mobile description.",
      images: [SHIPPED + "team-mobile.webp"],
      alt: "Design-a-thon Meet the Team page, mobile",
    },
  ],
  credit: "The full site was designed by a four-person UI/UX committee; these six surfaces were mine.",
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

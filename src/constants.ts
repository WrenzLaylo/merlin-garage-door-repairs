export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  badge: string | null;
  features: string[];
  image?: string;
}

export interface BrandItem {
  name: string;
  subtitle: string;
}

export interface StepItem {
  num: string;
  title: string;
  desc: string;
}

export interface TestimonialItem {
  name: string;
  suburb: string;
  rating: number;
  text: string;
  date?: string;
  avatar?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  serviceType?: string;
  reviewTitle?: string;
}

export interface WhyUsItem {
  icon: string;
  title: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ShopProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
  tag: string;
  compatibility: string;
  note: string;
}

export const CONTACT = {
  email: "enquiries@aggdoors.com.au",
  address: "Greater Melbourne, VIC",
  hours: "Mon-Fri 8:00am-5:00pm | 24/7 emergency",
} as const;

export const BUSINESS = {
  name: "Merlin Garage Door Repairs",
  tagline: "Melbourne's Merlin opener specialists",
  parent: "AGG Doors",
  parentUrl: "https://www.aggdoors.com.au",
  siteUrl: "merlingaragedoorrepairs.com.au",
  established: 2004,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Parts shop", href: "#parts-shop" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Service areas", href: "#service-areas" },
  { label: "FAQ", href: "#faq" },
];

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "straight-arm-bracket",
    title: "Merlin 230T Straight Arm Bracket Straight",
    price: "$39.95",
    image: "/assets/shop/merlin-spare-01-merlin-230t-straight-arm-bracket-straight.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-230t-straight-arm-bracket-straight",
    tag: "Hardware",
    compatibility: "230T",
    note: "Straight replacement bracket for older tilt-door assemblies.",
  },
  {
    id: "red-push-button",
    title: "Merlin 230T & 430R Red Square Push Button (USED)",
    price: "$29.95",
    image: "/assets/shop/merlin-spare-02-merlin-230t-430r-red-square-push-button-used.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-230t-430r-red-square-push-button-used",
    tag: "Controls",
    compatibility: "230T / 430R",
    note: "Handy for restoring worn controls without replacing the full opener.",
  },
  {
    id: "limit-gear",
    title: "Merlin 430R and MR1000 Mounted Limit Gear Assembly (USED)",
    price: "$69.95",
    image: "/assets/shop/merlin-spare-03-merlin-430r-and-mr1000-mounted-limit-gear-assembly-used.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-430r-and-mr1000-mounted-limit-gear-assembly-used",
    tag: "Limits",
    compatibility: "430R / MR1000",
    note: "For openers losing their travel positions or stopping in the wrong spot.",
  },
  {
    id: "drive-fork",
    title: "Merlin 430R & MR1000 Bolt-On Drive Fork (USED)",
    price: "$59.95",
    image: "/assets/shop/merlin-spare-04-merlin-430r-mr1000-bolt-on-drive-fork-used.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-430r-mr1000-bolt-on-drive-fork-used",
    tag: "Drive parts",
    compatibility: "430R / MR1000",
    note: "A small drive component that can stop an otherwise healthy motor doing its job.",
  },
  {
    id: "disengagement-handle",
    title: "Merlin 230T & 430R Disengagement Handle & Pull Rope Assembly (USED)",
    price: "$24.95",
    image: "/assets/shop/merlin-spare-05-merlin-230t-430r-disengagement-handle-pull-rope-assembly-used.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-230t-430r-disengagement-handle-pull-rope-assembly-used",
    tag: "Safety release",
    compatibility: "230T / 430R",
    note: "Replace missing or brittle emergency-release handles before they fail.",
  },
  {
    id: "old-style-limit",
    title: "Merlin 230T Limit Assembly Old Style (USED)",
    price: "$49.95",
    image: "/assets/shop/merlin-spare-06-merlin-230t-limit-assembly-old-style-used.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-230t-limit-assembly-old-style-used",
    tag: "Legacy repair",
    compatibility: "230T",
    note: "Useful when a legacy opener needs a targeted repair rather than a full replacement.",
  },
  {
    id: "battery-backup",
    title: "Merlin Battery Backup 24V",
    price: "$162.00",
    image: "/assets/shop/merlin-spare-07-merlin-battery-backup-24v.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-battery-backup-24v",
    tag: "Upgrade",
    compatibility: "Selected Merlin openers",
    note: "Keeps the door moving during power interruptions when installed on compatible motors.",
  },
  {
    id: "ir-beams",
    title: "Merlin 774ANZ IR Beams Protector System",
    price: "$135.00",
    image: "/assets/shop/merlin-spare-09-merlin-774anz-ir-beams-protector-system.webp",
    href: "https://shop.aggdoors.com.au/products/merlin-774anz-ir-beams-protector-system",
    tag: "Safety beams",
    compatibility: "Merlin protector system",
    note: "Professional safety-beam upgrade for safer automatic closing.",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "opener-repairs",
    icon: "wrench",
    title: "Merlin Opener Repairs",
    desc: "Fault diagnosis and repair for Merlin motors that will not respond, run intermittently, or have stopped.",
    badge: null,
    features: ["All Merlin models", "Same-day diagnosis", "Genuine parts"],
    image: "/service-merlin-repair.webp",
  },
  {
    id: "roller-door",
    icon: "volume",
    title: "Roller Door Opener Repairs",
    desc: "SilentDrive and MR855 roller-door opener repairs and re-tuning for quiet, reliable operation.",
    badge: null,
    features: ["Quiet-operation restore", "Force and limit reset", "Safety beam check"],
    image: "/service-merlin-tuning.webp",
  },
  {
    id: "remotes-myq",
    icon: "smartphone",
    title: "Remotes, Keypads and myQ Setup",
    desc: "Pair new remotes and keypads, install the myQ Connectivity Kit, and set up app access and alerts.",
    badge: "Popular",
    features: ["myQ setup", "Remote pairing", "Keypad install"],
    image: "/service-merlin-accessories.webp",
  },
  {
    id: "hardware",
    icon: "cog",
    title: "Belt, Chain and Hardware",
    desc: "Replace worn belts, chains, sprockets, trolleys, and brackets, then safety-service the unit.",
    badge: null,
    features: ["Worn-part replacement", "Quiet and smooth", "Full safety service"],
    image: "/service-merlin-hardware.webp",
  },
  {
    id: "service",
    icon: "shield",
    title: "Safety Service and Tune-Up",
    desc: "Preventative servicing that keeps your Merlin opener safe, quiet, and reliable year-round.",
    badge: null,
    features: ["Force/limit calibration", "Lubrication", "Safety inspection"],
    image: "/service-merlin-safety-check.webp",
  },
  {
    id: "install",
    icon: "package",
    title: "New Merlin Opener Install",
    desc: "Supply and install the right Merlin opener for your door, set up and tested on the day.",
    badge: "Upgrade",
    features: ["Right-sized motor", "Pro installation", "Warranty-backed"],
    image: "/service-merlin-install.webp",
  },
];

export const BRANDS: BrandItem[] = [
  { name: "SilentDrive Elite", subtitle: "MR855MYQ" },
  { name: "SilentDrive", subtitle: "MR655MYQ" },
  { name: "Commander", subtitle: "Classic +" },
  { name: "MT60P", subtitle: "Tilt door" },
  { name: "MT100EVO", subtitle: "Sectional" },
  { name: "Professional", subtitle: "Series" },
];

export const STEPS: StepItem[] = [
  {
    num: "01",
    title: "Call or request a quote",
    desc: "Tell us your Merlin model and the symptoms. We will give honest advice up front.",
  },
  {
    num: "02",
    title: "Same-day diagnosis",
    desc: "A Merlin technician inspects your opener and quotes the exact fix on the spot.",
  },
  {
    num: "03",
    title: "Fixed on the first visit",
    desc: "Most repairs are completed the same day using genuine Merlin parts.",
  },
];

export const WHY_US: WhyUsItem[] = [
  {
    icon: "award",
    title: "Merlin specialists",
    desc: "We work on Merlin openers every day, so diagnosis is fast and accurate.",
  },
  {
    icon: "parts",
    title: "Genuine Merlin parts",
    desc: "No generic substitutes that void warranties or fail early.",
  },
  {
    icon: "clock",
    title: "20+ years experience",
    desc: "Backed by AGG Doors (est. 2004) with 781+ reviews across Melbourne.",
  },
  {
    icon: "shield",
    title: "No Fix No Fee + warranty",
    desc: "Risk-free callouts and a 12-month workmanship warranty on repairs.",
  },
];

export const FAQ: FaqItem[] = [
  {
    q: "How much does a Merlin garage door repair cost?",
    a: "Most repairs start with a fixed call-out and diagnosis, and you get a clear quote before work begins. No Fix, No Fee: if we cannot fix it, you do not pay the repair.",
  },
  {
    q: "Do you use genuine Merlin parts?",
    a: "Yes. We fit genuine Merlin components so your opener keeps its performance and warranty.",
  },
  {
    q: "Which Merlin models do you repair?",
    a: "All current and legacy models, including SilentDrive Elite MR855MYQ, Commander, MT60P, MT100EVO, and the Professional range.",
  },
  {
    q: "Can you set up the myQ app and new remotes?",
    a: "Yes. We pair remotes and keypads, install the myQ Connectivity Kit, and set up app access and alerts.",
  },
  {
    q: "How fast can you come out?",
    a: "We offer same-day and 24/7 emergency service across Melbourne.",
  },
  {
    q: "Do you offer a warranty on repairs?",
    a: "Yes. Repairs are covered by a 12-month workmanship warranty.",
  },
  {
    q: "My Merlin opener clicks but the door will not move. What is wrong?",
    a: "Usually a worn gear or sprocket, drive belt or chain, or a failing capacitor. We diagnose and quote the exact fix.",
  },
  {
    q: "Do you service both residential and commercial doors?",
    a: "Yes. Homes and businesses across Greater Melbourne.",
  },
];

export const PROMISES = { warrantyMonths: 12, noFixNoFee: true } as const;

export const FORM_OPTIONS = {
  propertyTypes: ["Residential", "Commercial"],
  serviceTypes: ["Installation", "Repair", "Maintenance", "Automation"],
  serviceFor: ["Garage Door", "Gate", "Motor", "Remote"],
  garageDoorTypes: ["Roller Door", "Panel Door", "Tilt Door", "Counterweight Tilt Door"],
  gateTypes: ["Single Swing Gate", "Dual Swing Gate", "Sliding Gate"],
} as const;

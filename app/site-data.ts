/*
  Central content for the AREM marketing homepage.
  Numbers reconciled per SITE_AUDIT.md (one consistent "50,000+" stat,
  single branded email, real package comparison).
*/

export const company = {
  name: "American Real Estate Media",
  shortName: "AREM",
  phone: "(757) 665-8656",
  phoneHref: "tel:+17576658656",
  email: "Team@AmericanRealEstateMedia.com",
  emailHref: "mailto:Team@AmericanRealEstateMedia.com",
  hours: "8am – 7pm, every day",
  hq: "Portsmouth, VA",
  /* Interim: orders use the hosted checkout while the first-party booking
     product remains a prototype. Public CTAs open this URL in a lightbox. */
  bookingUrl: "https://media.americanrealestatemedia.com/order",
  portalUrl: "https://media.americanrealestatemedia.com/portal",
  socialLinks: [
    { label: "Facebook", href: "https://www.facebook.com/americanhomepics" },
    { label: "Instagram", href: "https://www.instagram.com/americanrealestatemedia" },
    { label: "Google", href: "https://maps.app.goo.gl/axej3MRiftktfVvZA" },
    { label: "LinkTree", href: "https://linktr.ee/americanrealestatemedia" },
  ],
  stats: {
    shoots: "50,000+",
    since: "2016",
    markets: "20+",
    turnaround: "Next day",
  },
} as const;

export const nav = [
  { label: "Work", href: "/samples" },
  { label: "Packages", href: "/packages" },
  { label: "Services", href: "/services" },
  { label: "Coverage", href: "/coverage" },
  { label: "Brokerages", href: "/brokerages" },
] as const;

export type Service = {
  title: string;
  blurb: string;
  icon: string; // lucide icon name key
};

export const services: Service[] = [
  {
    title: "Photography",
    blurb: "Magazine-quality interior & exterior stills, HDR-balanced and color-corrected.",
    icon: "Camera",
  },
  {
    title: "Walkthrough Video",
    blurb: "Cinematic agent-branded tours that move buyers through the space.",
    icon: "Video",
  },
  {
    title: "Drone & Aerial",
    blurb: "FAA-licensed aerial stills and video that show the lot, location, and views.",
    icon: "Plane",
  },
  {
    title: "Matterport 3D",
    blurb: "Immersive dollhouse tours so buyers can walk the home anytime, from anywhere.",
    icon: "Box",
  },
  {
    title: "Twilight",
    blurb: "Golden-hour and dusk shots — or AI day-to-dusk conversions — that stop the scroll.",
    icon: "Sunset",
  },
  {
    title: "Floor Plans",
    blurb: "Accurate 2D/3D floor plans with measurements buyers and agents rely on.",
    icon: "Ruler",
  },
  {
    title: "Virtual Staging",
    blurb: "Furnish empty rooms digitally to help buyers picture living there.",
    icon: "Sofa",
  },
  {
    title: "Advanced Editing",
    blurb: "Sky replacement, item removal, lawn enhancement, and fire-in-fireplace.",
    icon: "Wand2",
  },
];

export const steps = [
  {
    n: "01",
    title: "Build the order",
    body: "Enter the address, choose a package, add specialty media, and select preferred timing through the AREM booking flow.",
  },
  {
    n: "02",
    title: "We shoot it",
    body: "A vetted local pro arrives on time and captures everything — photos, video, aerial, 3D.",
  },
  {
    n: "03",
    title: "Delivered for launch",
    body: "Standard listing assets follow the normal next-morning delivery schedule, with specialty media timing confirmed by scope.",
  },
] as const;

export type Pkg = {
  name: string;
  tagline: string;
  priceNote: string;
  startingPrice: number;
  bestFor: string;
  deliveryNote: string;
  deliverables: string[];
  addOns: string[];
  featured?: boolean;
  features: string[];
};

export const packages: Pkg[] = [
  {
    name: "Value Listing",
    tagline: "Essentials for a clean, fast listing",
    priceNote: "from $100",
    startingPrice: 100,
    bestFor: "Simple listings, condos, and small homes that need MLS-ready basics.",
    deliveryNote: "Photos and floor plan delivered the morning after the shoot.",
    deliverables: [
      "Limited interior and exterior photo set",
      "CubiCasa floor plan",
      "Single property showcase website",
      "Online gallery with MLS-ready downloads",
    ],
    addOns: ["Virtual staging", "Advanced editing", "Drone where appropriate"],
    features: [
      "Limited interior & exterior photos",
      "CubiCasa floor plan",
      "Single property showcase website",
      "MLS-ready gallery delivery",
    ],
  },
  {
    name: "Quick & Easy",
    tagline: "Full photo coverage plus layout clarity",
    priceNote: "from $150",
    startingPrice: 150,
    bestFor: "Standard listings that need full photo coverage without video.",
    deliveryNote: "Listing media delivered the next morning in an online gallery.",
    deliverables: [
      "Full interior and exterior photo set",
      "CubiCasa floor plan",
      "Single property showcase website",
      "Online gallery with MLS-ready downloads",
    ],
    addOns: ["Drone photos", "Virtual twilight", "Virtual staging"],
    features: [
      "Full interior & exterior photos",
      "CubiCasa floor plan",
      "Single property showcase website",
      "Next-morning delivery",
    ],
  },
  {
    name: "Property Spotlight",
    tagline: "Our most popular package",
    priceNote: "from $250",
    startingPrice: 250,
    bestFor: "Agents who want sellers to see a stronger launch plan.",
    deliveryNote: "Core launch assets follow the standard delivery schedule; video timing is confirmed at booking.",
    deliverables: [
      "Interior and exterior photo set",
      "Walkthrough video",
      "Drone photos",
      "Virtual twilight image",
      "CubiCasa floor plan and showcase website",
    ],
    addOns: ["Matterport 3D tour", "Additional aerial", "Advanced editing"],
    featured: true,
    features: [
      "Interior & exterior photos",
      "Walkthrough video",
      "Drone photos",
      "Virtual twilight image",
      "CubiCasa floor plan + showcase website",
    ],
  },
  {
    name: "Perfect Marketing",
    tagline: "Everything, for the standout listing",
    priceNote: "from $400",
    startingPrice: 400,
    bestFor: "Higher-end homes, relocation buyers, and listings that need immersive proof.",
    deliveryNote: "Includes Matterport capture; timing depends on tour processing and order details.",
    deliverables: [
      "Everything in Property Spotlight",
      "Matterport 3D tour",
      "Walkthrough video and drone photos",
      "Virtual twilight image",
      "CubiCasa floor plan and showcase website",
    ],
    addOns: ["Agent intro video", "Vertical social cuts", "Additional twilight/editing"],
    features: [
      "Everything in Property Spotlight",
      "Matterport 3D tour",
      "Interior & exterior photos",
      "Walkthrough video + drone photos",
      "Floor plan, twilight, and showcase website",
    ],
  },
];

/* Per-service detail for the Services page. Sample slots address SITE_AUDIT #7
   (service pages lacking embedded proof); priceHint addresses #17. */
export type ServiceDetail = {
  slug: string;
  title: string;
  icon: string;
  lead: string;
  description: string;
  bullets: string[];
  priceHint: string;
  sampleType: string; // what the embedded sample would be
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "photography",
    title: "Photography",
    icon: "Camera",
    lead: "The foundation of every great listing.",
    description:
      "Professionally lit, HDR-balanced interior and exterior stills, hand-edited for true-to-life color and crisp detail. Shot to MLS specs and ready to publish.",
    bullets: [
      "HDR bracketing for balanced windows & interiors",
      "Hand color-correction and vertical straightening",
      "Delivered MLS-sized and full-resolution",
    ],
    priceHint: "Included in every package",
    sampleType: "Photo gallery",
  },
  {
    slug: "video",
    title: "Walkthrough Video",
    icon: "Video",
    lead: "Motion that moves buyers.",
    description:
      "Cinematic, agent-branded walkthrough tours with stabilized motion and licensed music — built for the MLS, your website, and social.",
    bullets: [
      "Stabilized gimbal walkthrough",
      "Agent intro/outro branding",
      "Vertical social cut-downs available",
    ],
    priceHint: "Property Spotlight & up",
    sampleType: "Video reel",
  },
  {
    slug: "aerial",
    title: "Drone & Aerial",
    icon: "Plane",
    lead: "Show the lot, the location, the views.",
    description:
      "FAA Part 107–licensed aerial stills and video that establish the property in its setting — acreage, waterfront, proximity, and rooflines.",
    bullets: [
      "FAA-licensed pilots, fully insured",
      "Aerial stills and 4K video",
      "Weather-flexible rescheduling",
    ],
    priceHint: "Property Spotlight & up",
    sampleType: "Aerial gallery",
  },
  {
    slug: "matterport",
    title: "Matterport 3D",
    icon: "Box",
    lead: "Let buyers walk the home anytime.",
    description:
      "Immersive Matterport dollhouse tours that qualify out-of-town buyers and cut wasted showings. Embeds straight into your listing.",
    bullets: [
      "Full dollhouse + walkthrough view",
      "Embeddable on MLS and your site",
      "Schematic floor view included",
    ],
    priceHint: "Starting at $150 · Perfect Marketing",
    sampleType: "Live 3D tour",
  },
  {
    slug: "twilight",
    title: "Twilight",
    icon: "Sunset",
    lead: "The shot that stops the scroll.",
    description:
      "Golden-hour and dusk exteriors — captured on-site or produced as AI day-to-dusk conversions — that make a listing feel premium.",
    bullets: [
      "On-site golden-hour shoots",
      "AI day-to-dusk conversion option",
      "Warm-light window glow",
    ],
    priceHint: "Add-on or Perfect Marketing",
    sampleType: "Twilight gallery",
  },
  {
    slug: "floor-plans",
    title: "Floor Plans",
    icon: "Ruler",
    lead: "The detail serious buyers ask for.",
    description:
      "Accurate, measured 2D and 3D floor plans that help buyers understand flow and size before they ever step inside.",
    bullets: [
      "Measured 2D and 3D plans",
      "Room dimensions labeled",
      "Branded to your listing",
    ],
    priceHint: "Included in every package",
    sampleType: "Floor-plan sample",
  },
  {
    slug: "virtual-staging",
    title: "Virtual Staging",
    icon: "Sofa",
    lead: "Help buyers picture living there.",
    description:
      "Photo-realistic digital furnishing for vacant rooms — a fraction of the cost of physical staging, delivered in the same turnaround.",
    bullets: [
      "Photo-realistic furniture",
      "Multiple style options",
      "Clearly disclosed as virtually staged",
    ],
    priceHint: "Per-image add-on",
    sampleType: "Before / after",
  },
  {
    slug: "advanced-editing",
    title: "Advanced Editing",
    icon: "Wand2",
    lead: "The finishing touches that sell.",
    description:
      "Sky replacement, item removal, lawn greening, and fire-in-fireplace — subtle enhancements that present the home at its best.",
    bullets: [
      "Sky replacement & lawn enhancement",
      "Clutter / item removal",
      "Fire-in-fireplace & screen replacement",
    ],
    priceHint: "Per-image add-on",
    sampleType: "Before / after",
  },
];

/* Package comparison matrix — the side-by-side SITE_AUDIT #4 says the live site lacks.
   Columns follow `packages` order: Value, Quick & Easy, Spotlight, Perfect. */
export type CompareValue = boolean | string;
export const compareColumns = [
  "Value Listing",
  "Quick & Easy",
  "Property Spotlight",
  "Perfect Marketing",
] as const;

export const compareRows: { label: string; values: CompareValue[] }[] = [
  { label: "Interior & exterior photos", values: ["Limited set", "Full set", "Full set", "Full set"] },
  { label: "CubiCasa floor plan", values: [true, true, true, true] },
  { label: "Single property website", values: [true, true, true, true] },
  { label: "Online gallery", values: [true, true, true, true] },
  { label: "Standard photo delivery", values: ["Next morning", "Next morning", "Next morning", "Next morning"] },
  { label: "Walkthrough video", values: [false, false, true, true] },
  { label: "Drone photos", values: [false, false, true, true] },
  { label: "Virtual twilight image", values: [false, false, true, true] },
  { label: "Matterport 3D tour", values: [false, false, false, true] },
  {
    label: "Virtual staging",
    values: ["Add-on", "Add-on", "Add-on", "Add-on"],
  },
];

export const proofImages = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
    alt: "American Real Estate Media listing photography sample",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834591051-JN2FEWVNHEINTO2MWUBO/97163410_2733972403501463_3440268151260971008_o.jpg",
    alt: "Hampton Roads real estate photography sample",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834761519-HGXR84WE4739T0LMWUGL/A9907058.jpg",
    alt: "Richmond real estate photography sample",
  },
] as const;

export const launchScenarios = [
  {
    label: "Standard MLS launch",
    fit: "Quick & Easy",
    detail: "Full photo coverage, floor plan, and property website when the listing needs to go live cleanly.",
  },
  {
    label: "Seller presentation upgrade",
    fit: "Property Spotlight",
    detail: "Photo, video, drone, twilight, floor plan, and website for agents competing hard for the listing.",
  },
  {
    label: "Relocation or premium listing",
    fit: "Perfect Marketing",
    detail: "Adds Matterport so distant buyers can understand the home before they schedule a showing.",
  },
  {
    label: "Brokerage repeat workflow",
    fit: "Team rate card",
    detail: "Standardized packages, repeat ordering, and account-level support for teams and offices.",
  },
] as const;

export const operationalProof = [
  {
    label: "Booked",
    value: "Direct",
    detail: "Agents choose package, timing, add-ons, and notes through AREM's own booking path.",
  },
  {
    label: "Shot",
    value: "Local crew",
    detail: "AREM media pros capture photos, floor plan, video, drone, or 3D based on the order.",
  },
  {
    label: "Delivered",
    value: "Next morning",
    detail: "Listing-ready media lands in an online gallery with MLS and marketing assets.",
  },
] as const;

export const mediaStandards = [
  {
    service: "Photography",
    deliverables: "Interior and exterior image set, MLS-ready and full-resolution downloads.",
    timing: "Typical next-morning delivery after the shoot.",
    notes: "Photo count and final scope depend on property size and selected package.",
  },
  {
    service: "Floor plans",
    deliverables: "CubiCasa floor plan included in current public package ladder.",
    timing: "Usually delivered with the main listing media.",
    notes: "Measurements and layout support buyer understanding before showings.",
  },
  {
    service: "Video",
    deliverables: "Walkthrough video for Property Spotlight and Perfect Marketing orders.",
    timing: "Timing is confirmed at booking based on scope and editing needs.",
    notes: "Agent intros, vertical cuts, and custom edits should be scoped up front.",
  },
  {
    service: "Drone",
    deliverables: "Aerial photo coverage where package, weather, and airspace allow.",
    timing: "Captured with the main shoot when conditions permit.",
    notes: "Weather, wind, airspace, and property location may affect scheduling.",
  },
  {
    service: "Matterport 3D",
    deliverables: "Immersive 3D tour included with Perfect Marketing.",
    timing: "Processing timing is confirmed with the order.",
    notes: "Best for relocation buyers, premium listings, and sight-unseen decisions.",
  },
  {
    service: "Premium edits",
    deliverables: "Virtual staging, advanced editing, additional aerial, and specialty requests.",
    timing: "Quoted and timed by request.",
    notes: "Scope these before launch if the listing depends on them.",
  },
] as const;

/* Current service-area framing. Historical shoot data may extend beyond this
   corridor, but public booking guidance should use this footprint. */
export const serviceArea = {
  headline: "From Richmond through Hampton Roads to Elizabeth City and Edenton.",
  body: "Our primary service corridor runs from Ashland and Richmond through every Hampton Roads member city and surrounding communities, then south to Elizabeth City and Edenton.",
  shortLabel: "Richmond · Hampton Roads · Elizabeth City · Edenton",
  hubs: [
    "Ashland, VA",
    "Richmond, VA",
    "Williamsburg, VA",
    "Newport News, VA",
    "Hampton, VA",
    "Poquoson, VA",
    "Virginia Beach, VA",
    "Norfolk, VA",
    "Chesapeake, VA",
    "Portsmouth, VA",
    "Suffolk, VA",
    "Franklin, VA",
    "Elizabeth City, NC",
    "Edenton, NC",
  ],
};

export type ProofService =
  | "Photography"
  | "Video"
  | "Aerial"
  | "Twilight"
  | "Matterport"
  | "Floor Plans"
  | "Virtual Staging"
  | "Advanced Editing";

export type MarketPage = {
  slug: string;
  name: string;
  region: string;
  headline: string;
  intro: string;
  listingContext: string[];
  localPoints: string[];
  proofCue: string;
  proofServices: ProofService[];
  recommendedPackage: string;
  packageReason: string;
  nearby: string[];
};

export const marketPages: MarketPage[] = [
  {
    slug: "virginia-beach",
    name: "Virginia Beach",
    region: "Hampton Roads, VA",
    headline: "Real estate photography and listing media in Virginia Beach.",
    intro:
      "AREM supports Virginia Beach agents with photography, floor plans, video, drone, Matterport, twilight, listing websites, and launch-ready media packages.",
    listingContext: [
      "Waterfront, resort-area, suburban, condo, and military-relocation listings often need fast, complete media packages.",
      "Drone, twilight, and Matterport should be scoped before launch when views, amenities, or relocation buyers matter.",
    ],
    localPoints: [
      "Best upgrade path: Property Spotlight for waterfront, resort-area, and seller-presentation listings.",
      "Confirm drone early for beach, waterfront, and high-wind days.",
      "Matterport can help relocation and military buyers understand the home before they arrive.",
    ],
    proofCue: "Waterfront, resort, condo, and relocation listings often need upgraded media.",
    proofServices: ["Aerial", "Twilight", "Video", "Matterport"],
    recommendedPackage: "Property Spotlight",
    packageReason:
      "Adds video, drone photos, twilight, floor plan, and listing website support for listings where location and presentation matter.",
    nearby: ["Chesapeake", "Norfolk", "Portsmouth", "Hampton Roads"],
  },
  {
    slug: "norfolk",
    name: "Norfolk",
    region: "Hampton Roads, VA",
    headline: "Listing media for Norfolk agents and property teams.",
    intro:
      "From historic neighborhoods to waterfront listings and urban condos, AREM helps Norfolk agents package the right media for a clean MLS and marketing launch.",
    listingContext: [
      "Older homes, tight urban lots, and waterfront properties benefit from clear photo sequencing and floor-plan context.",
      "Drone availability, parking, access, and occupied-home prep should be confirmed before the appointment.",
    ],
    localPoints: [
      "Best baseline: Quick & Easy for most standard Norfolk listings that need complete photo coverage and floor-plan clarity.",
      "Flag parking, lockbox, tenant, or occupied-home constraints before the shoot.",
      "Use Property Spotlight when waterfront, historic details, or seller-presentation value should be emphasized.",
    ],
    proofCue: "Historic homes, tight lots, and waterfront listings benefit from clear sequencing.",
    proofServices: ["Photography", "Floor Plans", "Aerial"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "Covers full interior/exterior photos, CubiCasa floor plan, and property website without overbuilding the order.",
    nearby: ["Virginia Beach", "Portsmouth", "Chesapeake", "Hampton Roads"],
  },
  {
    slug: "chesapeake",
    name: "Chesapeake",
    region: "Hampton Roads, VA",
    headline: "Chesapeake real estate photography, from Greenbrier to Hickory.",
    intro:
      "AREM photographs listings across Great Bridge, Greenbrier, Hickory, Grassfield, Deep Creek, Western Branch, and surrounding Chesapeake communities, matching the media plan to the property and its setting.",
    listingContext: [
      "Chesapeake stretches from dense commercial corridors and mature subdivisions to canals, newer communities, and southern acreage.",
      "Water access, outbuildings, lot size, community amenities, and larger floor plans should be scoped before the appointment.",
    ],
    localPoints: [
      "Great Bridge and Deep Creek listings may need waterway, community, or exterior context explained clearly.",
      "Hickory and Grassfield acreage should scope land, outbuildings, driveway approaches, and aerial coverage before launch day.",
      "Greenbrier and Western Branch listings often benefit from complete photo coverage and floor-plan clarity, with video or twilight added when presentation pressure is higher.",
    ],
    proofCue: "Waterways, acreage, established neighborhoods, and newer communities require different media plans.",
    proofServices: ["Aerial", "Floor Plans", "Photography"],
    recommendedPackage: "Property Spotlight",
    packageReason:
      "Adds video, aerial, twilight, and floor-plan context when land, water, amenities, or seller-presentation value drive the listing story.",
    nearby: ["Virginia Beach", "Norfolk", "Suffolk", "Portsmouth"],
  },
  {
    slug: "portsmouth",
    name: "Portsmouth",
    region: "Hampton Roads, VA",
    headline: "Portsmouth real estate photography from the local AREM team.",
    intro:
      "Headquartered in Portsmouth, AREM gives local agents a direct path to listing photography, floor plans, video, drone, and launch-ready packages.",
    listingContext: [
      "Local access and repeat coverage make Portsmouth one of AREM's most natural markets.",
      "Published package anchors help agents match simple listings, seller-presentation upgrades, and premium marketing needs.",
    ],
    localPoints: [
      "Best baseline: Value Listing or Quick & Easy depending on whether the home needs limited or full photo coverage.",
      "AREM is headquartered in Portsmouth, which keeps the local team and support path straightforward.",
      "Use Matterport or video for higher-end, relocation, or seller-presentation listings.",
    ],
    proofCue: "Local access makes Portsmouth a natural fast-turnaround market.",
    proofServices: ["Photography", "Floor Plans", "Matterport"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "A clear default for full photo coverage, floor plan, and property website when agents need a clean local launch.",
    nearby: ["Norfolk", "Chesapeake", "Suffolk", "Virginia Beach"],
  },
  {
    slug: "suffolk",
    name: "Suffolk",
    region: "Hampton Roads, VA",
    headline: "Suffolk real estate photography, from Harbour View to rural acreage.",
    intro:
      "AREM photographs listings across Downtown Suffolk, North Suffolk, Harbour View, Chuckatuck, Driver, and surrounding communities, matching the media plan to suburban homes, waterfront properties, and land.",
    listingContext: [
      "Suffolk spans one of Virginia's largest municipal land areas, with growing suburban communities, historic blocks, riverfront homes, farms, and rural acreage.",
      "Travel, lot size, outbuildings, long approaches, water, and aerial priorities should be scoped before the appointment.",
    ],
    localPoints: [
      "North Suffolk and Harbour View listings often need complete photography, floor-plan clarity, and community-amenity context.",
      "Chuckatuck, Driver, and rural properties should identify acreage, outbuildings, water, and access requirements before launch day.",
      "Drone availability depends on the exact address, airspace, weather, wind, and property conditions.",
    ],
    proofCue: "Suburban growth, riverfront property, and rural acreage require different appointment plans.",
    proofServices: ["Photography", "Aerial", "Floor Plans", "Video"],
    recommendedPackage: "Property Spotlight",
    packageReason:
      "Adds video, aerial, twilight, and floor-plan context when land, water, amenities, or seller-presentation value drive the listing.",
    nearby: ["Portsmouth", "Chesapeake", "Hampton", "Newport News"],
  },
  {
    slug: "hampton",
    name: "Hampton",
    region: "Hampton Roads, VA",
    headline: "Hampton real estate photography from Phoebus to Fox Hill.",
    intro:
      "AREM serves Hampton agents across Phoebus, Buckroe Beach, Fort Monroe, Downtown, Fox Hill, Wythe, and surrounding neighborhoods with launch-ready photography and listing media.",
    listingContext: [
      "Hampton combines historic districts, Chesapeake Bay and harbor frontage, established neighborhoods, condos, and military-relocation demand.",
      "Water orientation, building access, bridge and tunnel timing, and controlled airspace can affect the appointment and media mix.",
    ],
    localPoints: [
      "Phoebus and Fort Monroe properties benefit from architecture, neighborhood context, and accurate vertical-flow coverage.",
      "Buckroe and Fox Hill listings should scope water access, views, wind, and authorized aerial coverage before launch.",
      "Floor plans and Matterport can help relocation buyers evaluate the home before arriving in Hampton Roads.",
    ],
    proofCue: "Historic neighborhoods, waterfront settings, and relocation buyers call for address-specific media decisions.",
    proofServices: ["Photography", "Floor Plans", "Aerial", "Matterport"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "A practical baseline for complete photography and floor-plan context, with video, aerial, twilight, or Matterport added when the property calls for them.",
    nearby: ["Newport News", "Poquoson", "Williamsburg", "Norfolk"],
  },
  {
    slug: "newport-news",
    name: "Newport News",
    region: "Hampton Roads, VA",
    headline: "Newport News real estate photography across the Peninsula.",
    intro:
      "AREM photographs listings from Hilton Village and Riverside to City Center, Denbigh, and the northern Peninsula, with media packages built around each property's layout and setting.",
    listingContext: [
      "Newport News stretches along the James River with historic neighborhoods, established subdivisions, urban condos, new construction, and relocation-driven listings.",
      "Waterfront context, occupied-home access, community amenities, and nearby aviation facilities should be reviewed before the shoot.",
    ],
    localPoints: [
      "Hilton Village and Riverside homes often benefit from detail photography, floor plans, and an exterior sequence that explains their setting.",
      "City Center condos require confirmed parking, access, elevator, and amenity permissions.",
      "Denbigh and northern Peninsula listings range from standard resales to larger lots where aerial or video may add useful context.",
    ],
    proofCue: "Historic homes, riverfront neighborhoods, condos, and relocation inventory need different launch plans.",
    proofServices: ["Photography", "Floor Plans", "Video", "Aerial"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "Covers complete photography, a floor plan, and a property website for standard Peninsula listings, with feature-led upgrades available.",
    nearby: ["Hampton", "Poquoson", "Williamsburg", "Suffolk"],
  },
  {
    slug: "williamsburg",
    name: "Williamsburg",
    region: "Historic Triangle, VA",
    headline: "Williamsburg real estate photography for distinctive homes and communities.",
    intro:
      "AREM serves Williamsburg, James City County, York County, and surrounding Historic Triangle communities with photography, floor plans, video, drone, Matterport, and twilight media.",
    listingContext: [
      "The Williamsburg market includes historic-area homes, planned and gated communities, golf and waterfront properties, retirement-oriented housing, and new construction.",
      "Community access, amenities, architectural details, and remote-buyer needs should shape the media plan before the appointment.",
    ],
    localPoints: [
      "City and College-area listings benefit from accurate architecture and walkable-context coverage.",
      "Kingsmill, Ford's Colony, and other amenity-rich communities may warrant video, Matterport, and approved amenity photography.",
      "James City and York County properties should identify gates, acreage, water, outbuildings, and aerial priorities before booking.",
    ],
    proofCue: "Historic character, community amenities, and remote buyers raise the value of complete visual context.",
    proofServices: ["Photography", "Matterport", "Video", "Floor Plans"],
    recommendedPackage: "Property Spotlight",
    packageReason:
      "Adds video, aerial, twilight, floor-plan, and property-site support for listings where architecture, setting, or seller presentation matters.",
    nearby: ["Newport News", "Hampton", "Yorktown", "Richmond"],
  },
  {
    slug: "hampton-roads",
    name: "Hampton Roads",
    region: "Southeastern Virginia",
    headline: "Real estate photography and media across Hampton Roads.",
    intro:
      "AREM serves agents, teams, and brokerages across Hampton Roads with a repeatable listing launch workflow and clear package ladder.",
    listingContext: [
      "Multi-city teams need consistent package language, seller prep, coverage expectations, and delivery standards.",
      "Brokerage and team workflows can define package defaults, billing preferences, support routing, and rollout cadence.",
    ],
    localPoints: [
      "Best brokerage default: Quick & Easy for standard listing launches, with Property Spotlight as the seller-presentation upgrade.",
      "Teams should define package defaults, support routing, and billing preferences before agent-wide adoption.",
      "Market-wide consistency matters when agents order across the member cities and surrounding Hampton Roads communities.",
    ],
    proofCue: "Multi-city teams need consistent defaults across Hampton Roads.",
    proofServices: ["Photography", "Floor Plans", "Video"],
    recommendedPackage: "Team package standard",
    packageReason:
      "Brokerage and team relationships should define default package rules, add-ons, billing, and escalation paths.",
    nearby: ["Virginia Beach", "Norfolk", "Chesapeake", "Portsmouth"],
  },
  {
    slug: "richmond",
    name: "Richmond",
    region: "Central Virginia",
    headline: "Real estate photography and listing media in Richmond.",
    intro:
      "AREM serves Richmond, Ashland, and surrounding communities with photography, floor plans, video, drone, Matterport, twilight, and launch-ready listing packages.",
    listingContext: [
      "Historic homes, urban properties, new construction, and larger suburban listings benefit from a media plan matched to the property rather than a one-size-fits-all order.",
      "Appointments near the northern edge of the corridor should confirm access, timing, and specialty media before the shoot is locked.",
    ],
    localPoints: [
      "Best baseline: Quick & Easy for standard listings that need complete photography and floor-plan context.",
      "Use Property Spotlight when architecture, acreage, amenities, or a seller presentation calls for video and aerial coverage.",
      "Ashland and surrounding Richmond-area appointments are part of the northern service corridor; exact timing is confirmed with the order.",
    ],
    proofCue: "Historic homes, new construction, and larger properties need a media mix matched to the listing.",
    proofServices: ["Photography", "Floor Plans", "Video", "Aerial"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "A practical starting point for standard Richmond-area listings, with video, aerial, twilight, and Matterport added when the property calls for them.",
    nearby: ["Ashland", "Williamsburg", "Hampton Roads", "Newport News"],
  },
  {
    slug: "elizabeth-city",
    name: "Elizabeth City",
    region: "Northeastern North Carolina",
    headline: "Listing media for Elizabeth City and northeastern North Carolina.",
    intro:
      "AREM supports northeastern North Carolina agents with real estate photography, floor plans, drone where conditions allow, video, and launch packages.",
    listingContext: [
      "Travel-sensitive appointments, rural properties, waterfront features, and acreage should be scoped before booking.",
      "Package anchors make it easier to decide whether the listing needs basic MLS coverage or a stronger seller-presentation package.",
    ],
    localPoints: [
      "Best scoping habit: confirm travel, access, acreage, and waterfront priorities before the appointment is locked.",
      "Property Spotlight is a stronger fit when drone, video, or twilight help explain land, water, or exterior amenities.",
      "Quick & Easy works for standard listings that need full photo coverage and floor-plan clarity.",
    ],
    proofCue: "Travel, access, acreage, and waterfront priorities should be scoped early.",
    proofServices: ["Photography", "Aerial", "Video"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "A practical default for standard northeastern North Carolina listings, with upgrades scoped around travel and property features.",
    nearby: ["Edenton", "Chesapeake", "Virginia Beach", "Hampton Roads"],
  },
  {
    slug: "edenton",
    name: "Edenton",
    region: "Northeastern North Carolina",
    headline: "Real estate photography and listing media in Edenton.",
    intro:
      "AREM serves Edenton and nearby communities at the southern end of its primary corridor with photography, floor plans, drone where conditions allow, video, and complete listing packages.",
    listingContext: [
      "Waterfront properties, historic homes, acreage, and rural access can change the ideal media mix and appointment plan.",
      "Travel, weather, drone conditions, access, and launch deadlines should be confirmed before the appointment is locked.",
    ],
    localPoints: [
      "Best baseline: Quick & Easy for standard listings, with Property Spotlight for waterfront, acreage, or seller-presentation properties.",
      "Drone and twilight are weather-sensitive; confirm wind, access, and launch deadlines early.",
      "Edenton is the southern edge of AREM's primary service corridor, so appointment timing is confirmed with the order.",
    ],
    proofCue: "Waterfront, historic, and acreage listings need setting and property context explained clearly.",
    proofServices: ["Photography", "Aerial", "Floor Plans", "Video"],
    recommendedPackage: "Quick & Easy",
    packageReason:
      "A practical default for standard Edenton-area listings, with aerial, video, and twilight added when land, water, or architecture drives the story.",
    nearby: ["Elizabeth City", "Hampton Roads", "Chesapeake", "Suffolk"],
  },
] as const;

export const testimonials = [
  {
    quote:
      "The photos consistently get my listings more showings. Booking is effortless and the next-day turnaround keeps me on schedule.",
    name: "Top-Producing Agent",
    detail: "Hampton Roads, VA",
  },
  {
    quote:
      "Drone and twilight shots elevated a luxury listing beyond what I imagined. My sellers were thrilled.",
    name: "Luxury Specialist",
    detail: "Hampton Roads, VA",
  },
  {
    quote:
      "Booking is simple and the Matterport tours alone have closed buyers relocating to Hampton Roads sight-unseen.",
    name: "Relocation Team Lead",
    detail: "Virginia Beach, VA",
  },
] as const;

/* ---------------------------------------------------- Samples gallery */
/* Filterable categories address SITE_AUDIT #16 (flat, unfilterable grid).
   Real thumbnails wire in via Vercel Blob later. */
export const sampleCategories = [
  "All",
  "Photography",
  "Video",
  "Twilight",
  "Aerial",
  "Floor Plans",
  "Virtual Staging",
  "Matterport",
  "Advanced Editing",
] as const;
export type SampleCategory = (typeof sampleCategories)[number];

export const sampleCategoryDetails = {
  Photography: {
    headline: "MLS-ready photo coverage",
    body: "Interior and exterior photography is the baseline for every AREM package, edited for clean color, straight verticals, and listing-ready delivery.",
    href: "/services/photography",
  },
  Video: {
    headline: "Walkthrough motion for seller presentations",
    body: "Video helps buyers understand flow and gives agents a stronger story for MLS, social, and listing appointments.",
    href: "/services/video",
  },
  Twilight: {
    headline: "Dusk appeal without guesswork",
    body: "Twilight and virtual twilight options help the right listing stand out when exterior mood, lighting, or curb appeal matters.",
    href: "/services/twilight",
  },
  Aerial: {
    headline: "Location, lot, and waterfront context",
    body: "Drone media is useful for acreage, water access, neighborhood context, rooflines, amenities, and properties where setting sells.",
    href: "/services/aerial",
  },
  "Floor Plans": {
    headline: "Layout clarity for serious buyers",
    body: "Floor plans help buyers understand room flow, scale, and furniture fit before a showing or relocation decision.",
    href: "/services/floor-plans",
  },
  "Virtual Staging": {
    headline: "A clearer vision for vacant spaces",
    body: "Virtual staging helps buyers understand scale, function, and room potential without moving furniture into an empty listing.",
    href: "/services/virtual-staging",
  },
  Matterport: {
    headline: "Immersive tours for serious buyers",
    body: "Matterport 3D tours support relocation buyers, premium listings, and shoppers who need to understand layout before an in-person visit.",
    href: "/services/matterport",
  },
  "Advanced Editing": {
    headline: "Polish without misrepresenting the listing",
    body: "Advanced editing covers practical image cleanup such as sky replacement, item removal, screen replacement, and other listing-safe polish.",
    href: "/services/advanced-editing",
  },
} satisfies Record<Exclude<SampleCategory, "All">, { headline: string; body: string; href: string }>;

export type Sample = {
  title: string;
  category: Exclude<SampleCategory, "All">;
  image?: string;
  externalUrl?: string;
  externalLabel?: string;
  market?: string;
  packageName?: string;
  propertyType?: string;
  useCase?: string;
  note?: string;
  proofFit?: {
    localMarkets?: string[];
    regions?: string[];
    referenceMarkets?: string[];
    referenceRegions?: string[];
    serviceFit?: ProofService[];
    priority?: number;
  };
  tall?: boolean; // hint for masonry-ish variation
};

export const samples: Sample[] = [
  {
    title: "Exterior launch hero",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
    market: "Hampton Roads, VA",
    packageName: "Property Spotlight",
    propertyType: "Feature-driven listing",
    useCase: "Hero image / seller presentation",
    note: "MLS-ready exterior proof",
    proofFit: {
      regions: ["Southeastern Virginia", "Hampton Roads, VA"],
      referenceRegions: ["Northeastern North Carolina"],
      serviceFit: ["Photography"],
      priority: 100,
    },
    tall: true,
  },
  {
    title: "Hampton Roads listing set",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834591051-JN2FEWVNHEINTO2MWUBO/97163410_2733972403501463_3440268151260971008_o.jpg",
    market: "Hampton Roads, VA",
    packageName: "Quick & Easy",
    propertyType: "Standard resale",
    useCase: "MLS launch / gallery delivery",
    note: "Interior and exterior photo coverage",
    proofFit: {
      regions: ["Hampton Roads, VA", "Southeastern Virginia"],
      referenceRegions: ["Northeastern North Carolina"],
      serviceFit: ["Photography", "Floor Plans"],
      priority: 94,
    },
  },
  {
    title: "Richmond listing photography",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834761519-HGXR84WE4739T0LMWUGL/A9907058.jpg",
    market: "Richmond, VA",
    packageName: "Quick & Easy",
    propertyType: "Standard resale",
    useCase: "MLS and agent marketing",
    note: "Representative delivered photo set",
    proofFit: {
      localMarkets: ["Richmond"],
      referenceRegions: ["Central Virginia"],
      serviceFit: ["Photography"],
      priority: 45,
    },
  },
  {
    title: "Northern Virginia interior",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834690590-2L9S48OLBUJ43VCG5Y54/A9904570_1.jpg",
    market: "Northern Virginia",
    packageName: "Value Listing",
    propertyType: "Entry package",
    useCase: "Clean interior proof",
    note: "Clean MLS-ready interior",
    proofFit: {
      referenceRegions: ["Southeastern Virginia"],
      serviceFit: ["Photography"],
      priority: 34,
    },
  },
  {
    title: "Charlottesville property media",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834605378-F3WMBB3UU67XF7V2G6FO/1920%2B%2B%2818%29.jpg",
    market: "Charlottesville, VA",
    packageName: "Property Spotlight",
    propertyType: "Seller-presentation listing",
    useCase: "Premium photo sequence",
    note: "Seller-presentation quality imagery",
    proofFit: {
      referenceMarkets: ["Virginia Beach", "Chesapeake", "Edenton"],
      referenceRegions: ["Hampton Roads, VA", "Southeastern Virginia", "Northeastern North Carolina"],
      serviceFit: ["Photography"],
      priority: 72,
    },
    tall: true,
  },
  {
    title: "Hampton Roads living area",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834616645-WXP4SFD2RD2TFL0PCRQO/A9907040.jpg",
    market: "Hampton Roads, VA",
    packageName: "Quick & Easy",
    propertyType: "Standard resale",
    useCase: "Interior flow and room context",
    note: "Interior coverage sample",
    proofFit: {
      regions: ["Hampton Roads, VA", "Southeastern Virginia"],
      referenceRegions: ["Northeastern North Carolina"],
      serviceFit: ["Photography"],
      priority: 96,
    },
  },
  {
    title: "Norfolk listing proof",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/9f640697-5084-478d-bbe9-2d70e6b890cc/done_012+%282%29.jpg",
    market: "Norfolk, VA",
    packageName: "Value Listing",
    propertyType: "Local listing",
    useCase: "MLS-ready local proof",
    note: "Local market sample",
    proofFit: {
      localMarkets: ["Norfolk"],
      regions: ["Hampton Roads, VA", "Southeastern Virginia"],
      serviceFit: ["Photography"],
      priority: 98,
    },
  },
  {
    title: "NOVA listing photos",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834636125-OCZBSRGK5UK4MV6SSN4R/A9907067.jpg",
    market: "Northern Virginia",
    packageName: "Quick & Easy",
    propertyType: "Standard resale",
    useCase: "Full photo delivery",
    note: "Full photo delivery sample",
    proofFit: {
      referenceRegions: ["Southeastern Virginia"],
      serviceFit: ["Photography"],
      priority: 30,
    },
  },
  {
    title: "Charlottesville interior",
    category: "Photography",
    image: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834642568-X7R7759K7RM2SGNP1R5P/A9907133.jpg",
    market: "Charlottesville, VA",
    packageName: "Property Spotlight",
    propertyType: "Interior proof",
    useCase: "Seller-facing visual quality",
    note: "Interior proof sample",
    proofFit: {
      referenceRegions: ["Southeastern Virginia", "Northeastern North Carolina"],
      serviceFit: ["Photography"],
      priority: 32,
    },
  },
  {
    title: "Walkthrough video library",
    category: "Video",
    externalUrl: "https://vimeo.com/americanrealestatemedia",
    externalLabel: "View video samples",
    market: "Package add-on",
    packageName: "Property Spotlight",
    propertyType: "Motion proof",
    useCase: "MLS, social, and listing presentation",
    note: "Live AREM Vimeo sample library",
    proofFit: {
      serviceFit: ["Video"],
      priority: 88,
    },
  },
  {
    title: "Drone coverage library",
    category: "Aerial",
    externalUrl: "https://americanrealestatemedia.com/aerial-photo-samples",
    externalLabel: "View aerial samples",
    market: "Weather dependent",
    packageName: "Property Spotlight",
    propertyType: "Acreage / location context",
    useCase: "Lot, roofline, water, and neighborhood proof",
    note: "Live AREM aerial sample library",
    proofFit: {
      serviceFit: ["Aerial"],
      priority: 90,
    },
  },
  {
    title: "Virtual twilight library",
    category: "Twilight",
    externalUrl: "https://americanrealestatemedia.com/twilight-photo-samples",
    externalLabel: "View twilight samples",
    market: "Add-on / Spotlight",
    packageName: "Property Spotlight",
    propertyType: "Curb appeal",
    useCase: "Hero image and scroll-stopping exterior",
    note: "Live AREM twilight sample library",
    proofFit: {
      serviceFit: ["Twilight"],
      priority: 86,
    },
  },
  {
    title: "Matterport 3D tour",
    category: "Matterport",
    externalUrl: "/services/matterport",
    externalLabel: "View Matterport details",
    market: "Premium listings",
    packageName: "Perfect Marketing",
    propertyType: "Premium / relocation listing",
    useCase: "Remote buyer layout review",
    note: "Matterport 3D tour service reference",
    proofFit: {
      serviceFit: ["Matterport"],
      priority: 84,
    },
  },
  {
    title: "CubiCasa floor plan delivery",
    category: "Floor Plans",
    externalUrl: "/services/floor-plans",
    externalLabel: "View floor plan details",
    market: "Included in current package ladder",
    packageName: "All packages",
    propertyType: "Layout proof",
    useCase: "Buyer flow, room dimensions, and seller reporting",
    note: "Floor plan service reference",
    proofFit: {
      serviceFit: ["Floor Plans"],
      priority: 92,
    },
  },
  {
    title: "Virtual staging before / after",
    category: "Virtual Staging",
    externalUrl: "https://americanrealestatemedia.com/virtual-staging-samples",
    externalLabel: "View staging samples",
    market: "Vacant listings",
    packageName: "Add-on",
    propertyType: "Vacant listing",
    useCase: "Room function and scale",
    note: "Live AREM virtual staging sample library",
    proofFit: {
      serviceFit: ["Virtual Staging"],
      priority: 72,
    },
  },
  {
    title: "Advanced edit examples",
    category: "Advanced Editing",
    externalUrl: "https://americanrealestatemedia.com/services",
    externalLabel: "Review editing services",
    market: "Add-on / request based",
    packageName: "Add-on",
    propertyType: "Listing-safe image polish",
    useCase: "Sky replacement, item removal, screen replacement, and lawn polish",
    note: "Advanced editing service reference",
    proofFit: {
      serviceFit: ["Advanced Editing"],
      priority: 68,
    },
  },
];

export const priceFactors = [
  "Property size and final media scope",
  "Travel outside routine coverage",
  "Rush timing or reschedules",
  "Drone, weather, and airspace constraints",
  "Premium edits, staging, video, Matterport, or other add-ons",
] as const;

export const pricingNotes = [
  {
    topic: "Property size",
    detail:
      "Published package anchors are starting points. Larger homes, unusual scope, or premium media needs are confirmed before the shoot is locked.",
  },
  {
    topic: "Travel",
    detail:
      "Routine Hampton Roads and nearby-market coverage is straightforward; travel-sensitive orders are confirmed before booking.",
  },
  {
    topic: "Rush timing",
    detail:
      "Rush needs should be flagged before booking so scheduling, editing, and specialty media timing can be confirmed.",
  },
  {
    topic: "Weather-sensitive media",
    detail:
      "Drone, twilight, waterfront exteriors, and some travel-heavy shoots may depend on weather, wind, access, and airspace.",
  },
  {
    topic: "Reschedules and cancellations",
    detail:
      "Reasonable reschedules are handled through the booking workflow. Same-day cancellations or access failures may create trip fees.",
  },
] as const;

export const bookingConfidence = [
  {
    topic: "Best default",
    detail:
      "Most standard resale listings start with Quick & Easy. Choose Spotlight when video, drone, or seller-presentation impact matters.",
  },
  {
    topic: "Call before booking",
    detail:
      "Confirm first when the listing is large, travel-sensitive, tenant-occupied, rush, waterfront/drone-dependent, or outside routine coverage.",
  },
  {
    topic: "Payment and billing",
    detail:
      "Routine orders use the booking flow. Brokerage billing, monthly invoicing, add-on approvals, and office-paid arrangements are confirmed directly.",
  },
  {
    topic: "Delivery expectation",
    detail:
      "Standard listing assets are planned for next business morning delivery. Video, Matterport, staging, and complex edits may have separate timing.",
  },
  {
    topic: "Price changes",
    detail:
      "Square footage, travel, rush timing, specialty media, weather-sensitive work, and advanced edits are the common reasons a starting price changes.",
  },
  {
    topic: "After booking",
    detail:
      "AREM confirms access, package fit, seller prep, weather constraints, add-ons, and any revision or delivery expectations before launch.",
  },
] as const;

export const addOnGuidance = [
  {
    addOn: "Virtual staging",
    bestFor: "Vacant rooms, awkward layouts, or listings that need buyer imagination.",
    confirm: "Image count, style direction, disclosure expectations, and turnaround.",
  },
  {
    addOn: "Drone / aerial",
    bestFor: "Acreage, waterfront, rooflines, neighborhood context, and exterior amenities.",
    confirm: "Weather, wind, airspace, property location, and package fit.",
  },
  {
    addOn: "Twilight / virtual twilight",
    bestFor: "Curb appeal, luxury listings, outdoor living, and scroll-stopping hero images.",
    confirm: "Real twilight scheduling versus virtual twilight conversion.",
  },
  {
    addOn: "Matterport 3D",
    bestFor: "Relocation buyers, premium listings, layout clarity, and remote buyer review.",
    confirm: "Property size, scan timing, and delivery expectations.",
  },
  {
    addOn: "Advanced edits",
    bestFor: "Sky replacement, item removal, lawn enhancement, screens, fireplaces, and polish.",
    confirm: "Image count, edit complexity, usage expectations, and revision path.",
  },
] as const;

export const packageDeliveryExamples = [
  {
    packageName: "Value Listing",
    receives: "Limited photo set, CubiCasa floor plan, single property website, and MLS-ready gallery.",
    files: "MLS-sized JPEGs, full-resolution downloads, floor plan file, and shareable property link.",
    use: "Simple MLS launch, agent update to seller, basic social post, and property website link.",
  },
  {
    packageName: "Quick & Easy",
    receives: "Full interior/exterior photo coverage, CubiCasa floor plan, property website, and online gallery.",
    files: "MLS-ready and full-resolution images, floor plan, property website, and downloadable gallery.",
    use: "Standard resale launch, seller reporting, MLS, print flyer, social, and agent website.",
  },
  {
    packageName: "Property Spotlight",
    receives: "Photo set, walkthrough video, drone photos, virtual twilight, CubiCasa floor plan, and website.",
    files: "Photo gallery, video link or file, aerial images, twilight image, floor plan, and property link.",
    use: "Seller-presentation upgrade, feature-driven listings, social launch, web marketing, and print.",
  },
  {
    packageName: "Perfect Marketing",
    receives: "Everything in Property Spotlight plus Matterport 3D tour and premium launch media.",
    files: "Photos, video, aerial, twilight, Matterport tour link, floor plan, gallery, and property website.",
    use: "Premium listings, relocation buyers, immersive property review, brokerage marketing, and seller reporting.",
  },
] as const;

export const packageDefaultsByListing = [
  {
    listing: "Simple condo or small home",
    defaultPackage: "Value Listing",
    addOns: "Virtual staging or advanced edits only if the listing needs help.",
  },
  {
    listing: "Standard resale listing",
    defaultPackage: "Quick & Easy",
    addOns: "Drone, virtual twilight, or staging when exterior context or vacant rooms matter.",
  },
  {
    listing: "Seller-presentation listing",
    defaultPackage: "Property Spotlight",
    addOns: "Matterport or extra edits when layout, relocation, or premium seller expectations matter.",
  },
  {
    listing: "Luxury, waterfront, or relocation",
    defaultPackage: "Perfect Marketing",
    addOns: "Additional aerial, agent intro video, vertical social cuts, or premium edits as scoped.",
  },
] as const;

export const firstShootFaqs = [
  {
    q: "How do I know if my listing is in range?",
    a: "AREM's primary service corridor runs from Ashland and Richmond through Hampton Roads to Elizabeth City and Edenton. Travel-sensitive timing can be confirmed before booking.",
  },
  {
    q: "Are these final prices?",
    a: "The package cards show published starting prices. Final totals can change with property size, travel, rush timing, add-ons, reschedules, and brokerage arrangements.",
  },
  {
    q: "What is delivered the next morning?",
    a: "Standard listing assets are delivered the morning after the shoot. Video, Matterport, specialty edits, and complex add-ons may have separate timing confirmed at booking.",
  },
  {
    q: "Can I use the media beyond MLS?",
    a: "Your listing license supports MLS, social, print, listing websites, and agent marketing for the property. Special commercial usage can be confirmed with the team.",
  },
] as const;

export const bookingSteps = [
  {
    title: "Send listing details",
    body: "Share address, package, square footage, timeline, access notes, and any add-ons or seller priorities.",
  },
  {
    title: "Confirm scope and timing",
    body: "AREM confirms coverage, appointment timing, weather-sensitive items, and any travel or rush considerations.",
  },
  {
    title: "Shoot the property",
    body: "The media team captures the package deliverables and notes any follow-up items from the appointment.",
  },
  {
    title: "Receive and launch",
    body: "Media is delivered through an online gallery or shared link for MLS, social, print, and listing marketing.",
  },
] as const;

export const listingLaunchTimeline = [
  {
    title: "Request submitted",
    body: "Agent sends address, package, timeline, access notes, and any listing-specific priorities.",
  },
  {
    title: "Scope confirmed",
    body: "AREM confirms service area, package fit, appointment timing, add-ons, and weather-sensitive items.",
  },
  {
    title: "Prep checklist sent",
    body: "Seller and agent get practical prep guidance so the property is ready when the media team arrives.",
  },
  {
    title: "Shoot completed",
    body: "Photos, floor plan, video, drone, 3D, or other deliverables are captured according to the order.",
  },
  {
    title: "Media delivered",
    body: "Listing assets are organized through a gallery or shared link for MLS, social, print, and marketing use.",
  },
] as const;

export const prepChecklist = [
  "Confirm access, lockbox, gate codes, pets, and seller contact details.",
  "Turn on lights, open blinds, clear counters, hide trash cans, and move cars from the driveway.",
  "Identify must-show features, neighborhood/location context, and any seller priorities.",
  "Flag weather-sensitive needs such as drone, waterfront, exterior amenities, twilight, or acreage.",
  "Confirm MLS/listing timeline so rush needs and add-ons are scoped before the shoot.",
] as const;

export const brokerageWorkflow = [
  {
    title: "Set the standard",
    body: "Define preferred packages, add-ons, coverage areas, billing preferences, and office expectations before agents start ordering.",
  },
  {
    title: "Onboard agents",
    body: "Give agents a simple ordering path, seller prep resources, and package guidance so office adoption does not depend on manager hand-holding.",
  },
  {
    title: "Run the launch workflow",
    body: "AREM handles appointment details, access notes, weather-sensitive media, delivery expectations, and support routing.",
  },
  {
    title: "Review and refine",
    body: "Brokerage conversations can cover package mix, recurring needs, training gaps, volume terms, and market-specific standards.",
  },
] as const;

export const brokeragePilotPlan = [
  {
    phase: "Pilot office",
    detail:
      "Start with a defined office, team, or agent group so package defaults, billing, support, and ordering expectations can be validated before broad rollout.",
  },
  {
    phase: "Agent launch",
    detail:
      "Give agents package guidance, seller prep language, booking expectations, and a direct path for listing questions.",
  },
  {
    phase: "Operating cadence",
    detail:
      "Review order volume, package mix, timing issues, support requests, add-ons, and training gaps on a regular cadence.",
  },
  {
    phase: "Scale standards",
    detail:
      "Expand the playbook once service area, billing, support, and communication patterns are working for the pilot group.",
  },
] as const;

export const brokerageRolloutPacket = [
  "Preferred package ladder and approved add-on guidance",
  "Agent ordering path and live booking link",
  "Seller prep checklist and access-note expectations",
  "Billing preference: agent-paid, office-paid, invoice, or rate-card discussion",
  "Escalation contacts for urgent listings, revisions, reschedules, and delivery questions",
  "Review cadence for volume, package mix, service issues, and adoption gaps",
] as const;

export const brokerageRolloutCadence = [
  {
    window: "First 30 days",
    focus:
      "Pilot office or team, preferred package defaults, billing preference, agent ordering path, and escalation contacts.",
  },
  {
    window: "Days 31-60",
    focus:
      "Review package mix, scheduling friction, support questions, seller prep adoption, and add-on usage.",
  },
  {
    window: "Days 61-90",
    focus:
      "Refine standards, confirm rate-card needs, document recurring issues, and decide whether to expand to more agents or offices.",
  },
] as const;

export const brokerageOperatingModel = [
  {
    topic: "Account ownership",
    detail: "Define who manages the office relationship, who can request shoots, and how coordinators or agents route questions.",
  },
  {
    topic: "Agent ordering",
    detail: "Agents can use the public package ladder while brokerage relationships define preferred defaults and booking expectations.",
  },
  {
    topic: "Billing options",
    detail: "Discuss agent-paid, office-paid, per-shoot invoicing, monthly invoicing, or preferred rate-card arrangements.",
  },
  {
    topic: "Support and revisions",
    detail: "Agree on the route for urgent listing issues, edit requests, reschedules, access problems, and delivery questions.",
  },
  {
    topic: "Rollout materials",
    detail: "Provide agents with package guidance, seller prep resources, and a simple ordering path before adoption begins.",
  },
  {
    topic: "What AREM needs",
    detail: "Clear service area expectations, billing preference, preferred packages, agent list or rollout scope, and launch timing.",
  },
] as const;

export const brokerageCapacityModel = [
  {
    topic: "Peak-week planning",
    detail:
      "Pilot setup should define expected monthly listing volume, seasonal spikes, markets served, and how urgent requests are prioritized.",
  },
  {
    topic: "Coverage routing",
    detail:
      "Large teams should confirm routine service areas, travel-sensitive zones, weather-sensitive media, and backup scheduling expectations.",
  },
  {
    topic: "Account roles",
    detail:
      "Define the account lead, scheduling contact, billing contact, coordinator inbox, and escalation path before agent rollout.",
  },
  {
    topic: "Support windows",
    detail:
      "Agree on how urgent listings, revisions, access failures, reschedules, delivery questions, and payment issues are routed.",
  },
] as const;

export const brokerageComplianceModel = [
  {
    topic: "MLS and listing license",
    detail:
      "Confirm how agents, teams, office marketing, and coordinators may use media for MLS, social, print, listing websites, and seller updates.",
  },
  {
    topic: "Asset reuse",
    detail:
      "Clarify reuse for expired listings, relists, agent changes, builder use, commercial use, and brokerage-level marketing before rollout.",
  },
  {
    topic: "Virtual staging and edits",
    detail:
      "Document disclosure expectations and limits for virtual staging, item removal, sky replacement, lawn enhancement, and material changes.",
  },
  {
    topic: "Drone and 3D constraints",
    detail:
      "Confirm FAA, insurance, airspace, weather, privacy, Matterport visibility, and reschedule expectations for specialty media.",
  },
] as const;

/* ------------------------------------------------------------- FAQ */
/* Fills SITE_AUDIT #11 content gaps; rendered with FAQPage JSON-LD (#10). */
export type Faq = { q: string; a: string };
export type FaqGroup = { group: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    group: "Booking & delivery",
    items: [
      {
        q: "How fast will I get my photos?",
        a: "Standard turnaround is the next business day. Shoots completed in the morning are often delivered same evening. Rush options are available on request.",
      },
      {
        q: "How many photos come with each package?",
        a: "Value Listing includes up to 25 photos, Quick & Easy up to 35, Property Spotlight up to 45, and Perfect Marketing 50+. Final counts scale with the size of the home.",
      },
      {
        q: "How do I book a shoot?",
        a: "Choose a package, add listing details, and request preferred timing through the AREM booking flow. AREM confirms scope, access, and any constraints before the shoot is locked. We serve the corridor from Ashland and Richmond through Hampton Roads to Elizabeth City and Edenton.",
      },
      {
        q: "What file formats are delivered?",
        a: "High-resolution JPEGs sized for MLS plus full-resolution originals, delivered through an online gallery you can download from or share directly.",
      },
    ],
  },
  {
    group: "On the shoot",
    items: [
      {
        q: "Can I request specific shots or angles?",
        a: "Absolutely. Add notes when you book or talk to your photographer on-site. We'll prioritize the features you want to highlight.",
      },
      {
        q: "Do you photograph vacant or unfurnished properties?",
        a: "Yes. Vacant homes shoot beautifully, and virtual staging is a popular add-on to help buyers picture the space furnished.",
      },
      {
        q: "What happens if weather cancels an aerial shoot?",
        a: "Drone flights are weather-dependent for safety. If conditions ground the aerial portion, we reschedule that piece at no extra charge — the rest of your shoot proceeds as planned.",
      },
    ],
  },
  {
    group: "Policies",
    items: [
      {
        q: "Who owns the copyright to the images?",
        a: "You receive a license to use the media for marketing the listing across MLS, social, print, and your website. AREM retains copyright; usage rights cover everything you need to sell the home.",
      },
      {
        q: "What's your cancellation and reschedule policy?",
        a: "Reschedules are free with reasonable notice. Same-day cancellations may incur a trip fee since a photographer has already been dispatched. Full details are confirmed at booking.",
      },
      {
        q: "How does payment work?",
        a: "Payment, brokerage billing, or invoice terms are confirmed through our online order form before the appointment is locked. Book online or call the team and we'll set it up for you.",
      },
    ],
  },
];

/* ------------------------------------------------------- Contact form */
/* Qualification fields address SITE_AUDIT #12 (form too basic). */
export const contactServiceOptions = [
  "Photography",
  "Walkthrough Video",
  "Drone & Aerial",
  "Matterport 3D",
  "Twilight",
  "Floor Plans",
  "Virtual Staging",
  "A full package",
  "Not sure yet",
] as const;

export const propertyTypes = [
  "Residential",
  "Luxury / Estate",
  "Commercial",
  "Land / Lot",
  "Rental",
] as const;

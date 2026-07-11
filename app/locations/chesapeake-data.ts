import type { PublicListing } from "../../lib/public-listings.ts";

export type ChesapeakeNeighborhood = {
  slug: string;
  name: string;
  area: string;
  overview: string;
  listingLens: string;
  landmarks: string[];
  mediaPlan: string[];
};

export type ChesapeakeBusiness = {
  name: string;
  category: string;
  area: string;
  description: string;
  relevance: string;
  href: string;
};

export const chesapeakeNeighborhoods: ChesapeakeNeighborhood[] = [
  {
    slug: "great-bridge",
    name: "Great Bridge",
    area: "Central Chesapeake",
    overview:
      "Great Bridge sits near the center of Chesapeake around the locks, the Intracoastal Waterway, established subdivisions, and an active commercial corridor. The housing mix ranges from mature single-family neighborhoods to newer communities and waterfront pockets.",
    listingLens:
      "Homes near waterways or with larger exterior amenities need a sequence that explains both the property and its setting. Established interiors benefit from clear room flow and accurate floor-plan context.",
    landmarks: ["Great Bridge Locks", "Battlefield Park", "Intracoastal Waterway"],
    mediaPlan: ["Full photo coverage", "Floor plan", "Aerial when airspace and weather allow"],
  },
  {
    slug: "greenbrier",
    name: "Greenbrier",
    area: "North-central Chesapeake",
    overview:
      "Greenbrier combines a major employment and retail district with established residential streets, townhomes, condos, and newer infill. Chesapeake City Park and the Chesapeake Arboretum add recognizable green space within the broader area.",
    listingLens:
      "Condo and townhome listings should explain amenities, parking, and interior flow efficiently. Detached homes often need a balanced package that shows neighborhood convenience without losing focus on the property itself.",
    landmarks: ["Chesapeake City Park", "Chesapeake Arboretum", "Greenbrier business district"],
    mediaPlan: ["Photography", "Amenity coverage", "Walkthrough video for layout clarity"],
  },
  {
    slug: "hickory-grassfield",
    name: "Hickory & Grassfield",
    area: "Southern Chesapeake",
    overview:
      "Southern Chesapeake shifts toward acreage, rural roads, custom homes, newer subdivisions, and properties where land is part of the value. The broader area connects residential growth with the open-space character near Northwest River Park.",
    listingLens:
      "Lot lines, outbuildings, long approaches, water features, and surrounding land can matter as much as the interior. These listings should scope appointment time and aerial coverage before launch day.",
    landmarks: ["Northwest River Park", "Hickory corridor", "Grassfield residential growth"],
    mediaPlan: ["Expanded photo count", "Drone context", "Floor plan for larger homes"],
  },
  {
    slug: "deep-creek",
    name: "Deep Creek & Culpepper Landing",
    area: "Eastern Chesapeake",
    overview:
      "Deep Creek includes long-established neighborhoods, waterfront and canal connections, and newer communities such as Culpepper Landing. The Great Dismal Swamp and its canal shape the eastern edge of the area.",
    listingLens:
      "Water access, community amenities, historic-inspired architecture, and neighborhood design can be meaningful parts of the listing story. Exterior sequencing and elevated context help buyers understand those relationships.",
    landmarks: ["Dismal Swamp Canal Trail", "Deep Creek waterways", "Culpepper Landing"],
    mediaPlan: ["Exterior story sequence", "Aerial where permitted", "Twilight for feature-driven homes"],
  },
  {
    slug: "western-branch",
    name: "Western Branch",
    area: "Northwestern Chesapeake",
    overview:
      "Western Branch is a mature suburban market positioned between Portsmouth and Suffolk, with established subdivisions, townhomes, newer construction, and convenient regional access.",
    listingLens:
      "Repeatable full-coverage packages work well for most homes here, while renovated properties and larger neighborhood listings may warrant video, twilight, or added exterior context.",
    landmarks: ["Western Branch community", "Elizabeth River connections", "Portsmouth-Suffolk access"],
    mediaPlan: ["Full photo coverage", "Floor plan", "Video or twilight as an upgrade"],
  },
] as const;

export const chesapeakeBusinesses: ChesapeakeBusiness[] = [
  {
    name: "Bergey's Breadbasket",
    category: "Farm, bakery & creamery",
    area: "Southern Chesapeake",
    description:
      "A family-operated Chesapeake farm, bakery, deli, and creamery with a local history spanning more than 75 years.",
    relevance:
      "A recognizable example of the rural and agricultural character that distinguishes southern Chesapeake from the city's denser northern corridors.",
    href: "https://bergeysbreadbasket.com/",
  },
  {
    name: "Big Ugly Brewing",
    category: "Independent brewery",
    area: "Great Bridge",
    description:
      "Chesapeake's first microbrewery, operating a community-focused taproom on South Battlefield Boulevard.",
    relevance:
      "A useful lifestyle reference for Great Bridge listings where nearby independent businesses help explain the area's local identity.",
    href: "https://biguglybrewing.com/",
  },
  {
    name: "RoJo Coffee Co.",
    category: "Independent cafe",
    area: "Great Bridge",
    description:
      "An independent coffee and food business whose team describes itself as rooted in the Great Bridge community.",
    relevance:
      "A neighborhood-scale business that helps communicate Great Bridge as an established community rather than only a commercial corridor.",
    href: "https://www.rojocoffeeco.com/",
  },
] as const;

export const representativeChesapeakeListings: PublicListing[] = [
  {
    id: "chesapeake-great-bridge-profile",
    slug: "great-bridge-waterfront-profile",
    status: "representative",
    title: "Waterfront launch profile",
    neighborhood: "Great Bridge",
    propertyType: "Waterfront",
    city: "Chesapeake",
    state: "VA",
    price: null,
    bedrooms: null,
    bathrooms: null,
    livingAreaSqft: null,
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
    heroAlt: "Representative AREM exterior real estate photography",
    href: "/samples",
    media: ["Photography", "Aerial", "Twilight"],
    updatedAt: "2026-07-10T00:00:00.000Z",
    publicationAllowed: true,
  },
  {
    id: "chesapeake-greenbrier-profile",
    slug: "greenbrier-resale-profile",
    status: "representative",
    title: "Standard resale profile",
    neighborhood: "Greenbrier",
    propertyType: "Suburban",
    city: "Chesapeake",
    state: "VA",
    price: null,
    bedrooms: null,
    bathrooms: null,
    livingAreaSqft: null,
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834616645-WXP4SFD2RD2TFL0PCRQO/A9907040.jpg",
    heroAlt: "Representative AREM interior real estate photography",
    href: "/samples",
    media: ["Photography", "Floor plan", "Property site"],
    updatedAt: "2026-07-10T00:00:00.000Z",
    publicationAllowed: true,
  },
  {
    id: "chesapeake-hickory-profile",
    slug: "hickory-acreage-profile",
    status: "representative",
    title: "Acreage launch profile",
    neighborhood: "Hickory & Grassfield",
    propertyType: "Acreage",
    city: "Chesapeake",
    state: "VA",
    price: null,
    bedrooms: null,
    bathrooms: null,
    livingAreaSqft: null,
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834605378-F3WMBB3UU67XF7V2G6FO/1920%2B%2B%2818%29.jpg",
    heroAlt: "Representative AREM property photography for a feature-driven listing",
    href: "/samples",
    media: ["Photography", "Aerial", "Floor plan"],
    updatedAt: "2026-07-10T00:00:00.000Z",
    publicationAllowed: true,
  },
  {
    id: "chesapeake-deep-creek-profile",
    slug: "deep-creek-feature-profile",
    status: "representative",
    title: "Feature-driven launch profile",
    neighborhood: "Deep Creek & Culpepper Landing",
    propertyType: "Newer community",
    city: "Chesapeake",
    state: "VA",
    price: null,
    bedrooms: null,
    bathrooms: null,
    livingAreaSqft: null,
    heroImage:
      "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/9f640697-5084-478d-bbe9-2d70e6b890cc/done_012+%282%29.jpg",
    heroAlt: "Representative AREM local listing photography",
    href: "/samples",
    media: ["Photography", "Video", "Twilight"],
    updatedAt: "2026-07-10T00:00:00.000Z",
    publicationAllowed: true,
  },
] as const;

export const chesapeakeFaqs = [
  {
    q: "Does AREM photograph listings throughout Chesapeake?",
    a: "Yes. AREM serves Great Bridge, Greenbrier, Hickory, Grassfield, Deep Creek, Western Branch, South Norfolk, and surrounding Chesapeake communities. Access, acreage, drone conditions, and unusual property requirements are confirmed with the order.",
  },
  {
    q: "What media works best for Chesapeake acreage and waterfront listings?",
    a: "Photography and a floor plan provide the baseline. Drone coverage can explain land, water access, outbuildings, and neighborhood context when weather and airspace allow. Video or twilight can strengthen feature-driven seller presentations.",
  },
  {
    q: "Can AREM provide drone photography throughout Chesapeake?",
    a: "Drone work depends on the exact address, airspace, weather, wind, and property conditions. AREM confirms feasibility before the appointment so the listing launch does not depend on an unavailable aerial deliverable.",
  },
  {
    q: "How quickly is Chesapeake listing media delivered?",
    a: "Standard listing assets are normally delivered the next business morning. Video, Matterport, advanced editing, and other specialty media may have separate timing confirmed before the shoot.",
  },
] as const;

import type { PublicListing } from "../../lib/public-listings.ts";
import {
  chesapeakeBusinesses,
  chesapeakeFaqs,
  chesapeakeNeighborhoods,
  representativeChesapeakeListings,
  type ChesapeakeBusiness,
  type ChesapeakeNeighborhood,
} from "./chesapeake-data.ts";

export type LocalNeighborhood = ChesapeakeNeighborhood;
export type LocalBusiness = ChesapeakeBusiness;

export type LocalFaq = {
  q: string;
  a: string;
};

export type CoverageArea = {
  city: string;
  state: "VA" | "NC";
};

export type LocalMarketContent = {
  state: "VA" | "NC";
  areaType: "City" | "AdministrativeArea";
  coverageAreas: CoverageArea[];
  neighborhoods: readonly LocalNeighborhood[];
  businesses: readonly LocalBusiness[];
  representativeListings: readonly PublicListing[];
  faqs: readonly LocalFaq[];
};

const representativeImages = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
    alt: "Representative AREM exterior real estate photography",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834616645-WXP4SFD2RD2TFL0PCRQO/A9907040.jpg",
    alt: "Representative AREM interior real estate photography",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834605378-F3WMBB3UU67XF7V2G6FO/1920%2B%2B%2818%29.jpg",
    alt: "Representative AREM property photography for a feature-driven listing",
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/9f640697-5084-478d-bbe9-2d70e6b890cc/done_012+%282%29.jpg",
    alt: "Representative AREM local listing photography",
  },
] as const;

type RepresentativeProfile = {
  neighborhood: string;
  title: string;
  propertyType: string;
  media: string[];
};

function makeRepresentativeListings(
  marketSlug: string,
  city: string,
  state: "VA" | "NC",
  profiles: RepresentativeProfile[],
): PublicListing[] {
  return profiles.map((profile, index) => ({
    id: `${marketSlug}-${index + 1}-profile`,
    slug: `${marketSlug}-${index + 1}-profile`,
    status: "representative",
    title: profile.title,
    neighborhood: profile.neighborhood,
    propertyType: profile.propertyType,
    city,
    state,
    price: null,
    bedrooms: null,
    bathrooms: null,
    livingAreaSqft: null,
    heroImage: representativeImages[index % representativeImages.length].src,
    heroAlt: representativeImages[index % representativeImages.length].alt,
    href: "/samples",
    media: profile.media,
    updatedAt: "2026-07-10T00:00:00.000Z",
    publicationAllowed: true,
  }));
}

const virginiaBeachNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "oceanfront-vibe",
    name: "Oceanfront & ViBe District",
    area: "Resort area",
    overview:
      "The Oceanfront combines resort towers, beach cottages, year-round residences, and the ViBe Creative District around 17th Street. Boardwalk access, parking, balconies, and proximity to the beach can be as important to buyers as the interior itself.",
    listingLens:
      "Condo listings need efficient amenity and view coverage, while detached homes need an exterior sequence that explains beach access without overselling distance or sightlines.",
    landmarks: ["Virginia Beach Boardwalk", "ViBe Creative District", "Rudee Inlet"],
    mediaPlan: ["Interior and view coverage", "Amenity photography", "Twilight when exterior appeal matters"],
  },
  {
    slug: "north-end-croatan",
    name: "North End & Croatan",
    area: "Coastal Virginia Beach",
    overview:
      "North End and Croatan place established beach homes, newer custom construction, and compact lots close to the Atlantic. The residential character changes quickly from the resort core to quieter streets and dune-lined access points.",
    listingLens:
      "Vertical floor plans, outdoor living, ocean proximity, and upper-level views should be scoped before the shoot. Wind, glare, and seasonal traffic affect the best exterior window.",
    landmarks: ["First Landing State Park", "Croatan Beach", "Atlantic Avenue"],
    mediaPlan: ["Floor plan", "Drone where authorized", "Video for multi-level flow"],
  },
  {
    slug: "shore-drive-chics-beach",
    name: "Shore Drive & Chic's Beach",
    area: "Chesapeake Bay side",
    overview:
      "The Shore Drive corridor runs between the Chesapeake Bay, First Landing State Park, established neighborhoods, beach cottages, condos, and restaurant clusters. Bay access and tree cover give it a different visual identity from the Oceanfront.",
    listingLens:
      "Show the relationship among the property, bay access, community amenities, and outdoor space. Drone feasibility varies by exact address and nearby controlled airspace.",
    landmarks: ["Chesapeake Bay", "First Landing State Park", "Lynnhaven Inlet"],
    mediaPlan: ["Exterior context", "Amenity coverage", "Aerial feasibility check"],
  },
  {
    slug: "great-neck-alanton",
    name: "Great Neck & Alanton",
    area: "North-central Virginia Beach",
    overview:
      "Great Neck and Alanton include mature subdivisions, waterfront pockets, renovated homes, and established landscaping between Broad Bay and the Lynnhaven River system.",
    listingLens:
      "Water orientation, outdoor entertaining areas, renovations, and room-to-room flow often determine whether a listing needs only complete photography or a larger video, aerial, and twilight package.",
    landmarks: ["Broad Bay", "Lynnhaven River", "Great Neck Park"],
    mediaPlan: ["Photography", "Twilight for outdoor features", "Drone when conditions allow"],
  },
  {
    slug: "sandbridge-pungo",
    name: "Sandbridge & Pungo",
    area: "Southern Virginia Beach",
    overview:
      "Southern Virginia Beach shifts from Sandbridge vacation and waterfront homes to Pungo farms, acreage, and rural roads. Lot shape, water, dunes, fields, and outbuildings can carry much of the property story.",
    listingLens:
      "Plan additional exterior time and confirm access, wind, sun direction, and aerial constraints. Large or elevated homes benefit from a floor plan and video that make vertical circulation clear.",
    landmarks: ["Sandbridge Beach", "Back Bay", "Pungo countryside"],
    mediaPlan: ["Expanded exterior coverage", "Aerial context", "Floor plan and video"],
  },
];

const virginiaBeachBusinesses: LocalBusiness[] = [
  {
    name: "Three Ships Coffee",
    category: "Independent coffee roaster",
    area: "Oceanfront & Hilltop",
    description:
      "A Virginia Beach coffee roaster with neighborhood cafes and a longstanding local presence.",
    relevance:
      "Its Oceanfront roots provide useful everyday-lifestyle context for resort-area and nearby residential listings.",
    href: "https://threeshipscoffee.com/",
  },
  {
    name: "Lynnhaven Coffee Company",
    category: "Independent cafe",
    area: "Shore Drive",
    description:
      "A locally operated coffee shop on Shore Drive serving the Chesapeake Bay side of Virginia Beach.",
    relevance:
      "A neighborhood-scale reference for the year-round community along Shore Drive and Chic's Beach.",
    href: "https://lynnhavencoffee.com/",
  },
  {
    name: "Back Bay's Farmhouse Brewing Co.",
    category: "Farmhouse brewery",
    area: "Kempsville countryside",
    description:
      "A Virginia Beach brewery operating from a restored farmhouse with outdoor community space.",
    relevance:
      "It helps illustrate how the city's inland and rural character differs from its better-known oceanfront identity.",
    href: "https://backbayfarmhouse.com/",
  },
];

const norfolkNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "ghent",
    name: "Ghent",
    area: "Central Norfolk",
    overview:
      "Ghent is known for early twentieth-century homes, apartment buildings, tree-lined blocks, and a walkable commercial district near the Chrysler Museum and the Elizabeth River Trail.",
    listingLens:
      "Historic details, narrow rooms, porches, and off-street parking need accurate sequencing. A measured floor plan helps buyers understand layouts that do not follow newer suburban conventions.",
    landmarks: ["Chrysler Museum of Art", "Colley Avenue", "Elizabeth River Trail"],
    mediaPlan: ["Detail-rich photography", "Floor plan", "Exterior streetscape context"],
  },
  {
    slug: "larchmont-edgewater",
    name: "Larchmont & Edgewater",
    area: "West Norfolk",
    overview:
      "Larchmont and Edgewater combine established residential streets, waterfront edges, and proximity to Old Dominion University and Naval Station Norfolk.",
    listingLens:
      "Water views, renovated interiors, mature landscaping, and relocation-friendly layout information can justify aerial, twilight, or Matterport beyond the standard photo set.",
    landmarks: ["Old Dominion University", "Lafayette River", "Hampton Boulevard"],
    mediaPlan: ["Photography", "Floor plan or Matterport", "Waterfront context"],
  },
  {
    slug: "ocean-view-east-beach",
    name: "Ocean View & East Beach",
    area: "Chesapeake Bay shoreline",
    overview:
      "Ocean View stretches along the Chesapeake Bay with cottages, condos, established streets, and newer coastal development. East Beach adds planned blocks, architectural guidelines, and shared waterfront amenities.",
    listingLens:
      "Bay access, porches, balconies, neighborhood amenities, and view direction should be shown precisely. Drone work requires address-level airspace review because of nearby military aviation.",
    landmarks: ["Ocean View Beach Park", "East Beach", "Chesapeake Bay"],
    mediaPlan: ["Beach and amenity context", "Video for vertical homes", "Drone feasibility review"],
  },
  {
    slug: "downtown-freemason",
    name: "Downtown & Freemason",
    area: "Urban waterfront",
    overview:
      "Downtown Norfolk and Freemason mix high-rise condos, converted buildings, historic townhomes, cultural venues, and the working Elizabeth River waterfront.",
    listingLens:
      "Building access, parking, amenity permissions, window views, and mixed lighting should be confirmed ahead of time. Condos benefit from a concise visual path rather than repetitive coverage.",
    landmarks: ["The Main", "Waterside District", "Freemason Historic District"],
    mediaPlan: ["Condo photography", "Building amenities", "Twilight city views"],
  },
  {
    slug: "colonial-place-riverview",
    name: "Colonial Place & Riverview",
    area: "Lafayette River",
    overview:
      "These connected neighborhoods pair early and mid-century housing with riverfront parks, compact lots, and convenient access to Ghent and the Granby Street corridor.",
    listingLens:
      "Renovations, porches, water proximity, and practical room flow matter more than broad neighborhood claims. Floor plans are especially helpful for additions and reconfigured interiors.",
    landmarks: ["Lafayette Park", "Virginia Zoo", "Lafayette River"],
    mediaPlan: ["Full photo coverage", "Floor plan", "Renovation detail sequence"],
  },
];

const norfolkBusinesses: LocalBusiness[] = [
  {
    name: "Norfolk Coffee & Tea Co.",
    category: "Local roaster and retailer",
    area: "Downtown Norfolk",
    description:
      "A longtime Norfolk coffee and tea company with a retail storefront on Granby Street.",
    relevance:
      "A durable local reference that connects downtown commerce with Norfolk's everyday neighborhood identity.",
    href: "https://www.norfolkcoffeeandtea.com/",
  },
  {
    name: "COVA Brewing Co.",
    category: "Independent brewery and coffeehouse",
    area: "East Ocean View",
    description:
      "A locally operated brewery and coffeehouse near the Chesapeake Bay in East Ocean View.",
    relevance:
      "It helps buyers understand East Ocean View as a year-round residential and small-business district, not only a beach destination.",
    href: "https://covabrewco.com/",
  },
  {
    name: "Selden Market",
    category: "Small-business market",
    area: "Downtown Norfolk",
    description:
      "A downtown storefront hub built around independent shops, food concepts, and emerging local businesses.",
    relevance:
      "A useful signal of the walkable retail and creative-business ecosystem surrounding downtown condo listings.",
    href: "https://seldenmarket.com/",
  },
];

const portsmouthNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "olde-towne",
    name: "Olde Towne",
    area: "Downtown waterfront",
    overview:
      "Olde Towne contains historic homes, brick sidewalks, commercial blocks, and the Elizabeth River waterfront near High Street and the ferry connection to Norfolk.",
    listingLens:
      "Historic proportions, fireplaces, millwork, courtyards, and renovated systems deserve detail coverage, while floor plans clarify additions and nonstandard room flow.",
    landmarks: ["High Street", "Portsmouth Naval Shipyard Museum", "North Landing ferry"],
    mediaPlan: ["Architectural photography", "Floor plan", "Twilight streetscape"],
  },
  {
    slug: "park-view-port-norfolk",
    name: "Park View & Port Norfolk",
    area: "North Portsmouth",
    overview:
      "Park View and Port Norfolk pair historic housing stock with compact blocks, porches, and quick access to the river, downtown, and regional tunnels.",
    listingLens:
      "Exterior condition, renovation quality, parking, and practical interior flow should be documented directly. Wide-angle coverage must remain accurate in smaller rooms.",
    landmarks: ["Owens Creek", "Naval Medical Center Portsmouth", "Port Norfolk"],
    mediaPlan: ["Full photo coverage", "Floor plan", "Renovation details"],
  },
  {
    slug: "churchland",
    name: "Churchland",
    area: "Western Portsmouth",
    overview:
      "Churchland is a predominantly suburban part of Portsmouth with established subdivisions, townhomes, waterfront pockets, schools, and convenient access toward Chesapeake and Suffolk.",
    listingLens:
      "Most homes benefit from a repeatable complete package. Water access, larger yards, major renovations, or community amenities are the usual triggers for aerial, video, or twilight upgrades.",
    landmarks: ["Western Branch Elizabeth River", "Churchland Park", "High Street West"],
    mediaPlan: ["Photography", "Floor plan", "Video or aerial when warranted"],
  },
  {
    slug: "cradock-truxton",
    name: "Cradock & Truxtun",
    area: "Southern Portsmouth",
    overview:
      "Cradock and Truxtun are planned twentieth-century neighborhoods shaped by Portsmouth's shipyard history, with compact homes, established streets, and distinctive civic architecture.",
    listingLens:
      "Clear room flow, exterior condition, and renovation work should lead the presentation. The media plan should document the property without relying on broad historic claims.",
    landmarks: ["Afton Square", "Paradise Creek Nature Park", "Shipyard history"],
    mediaPlan: ["Accurate interiors", "Floor plan", "Exterior condition sequence"],
  },
];

const portsmouthBusinesses: LocalBusiness[] = [
  {
    name: "Olde Towne Coffee",
    category: "Independent cafe",
    area: "Olde Towne",
    description:
      "A locally operated coffee shop on High Street in Portsmouth's Olde Towne district.",
    relevance:
      "A walkable neighborhood anchor that helps explain daily life around Olde Towne homes and downtown apartments.",
    href: "https://www.oldetownecoffeeshop.com/",
  },
  {
    name: "Cure Coffeehouse",
    category: "Independent cafe",
    area: "Olde Towne",
    description:
      "A locally operated coffeehouse and cafe with an Olde Towne Portsmouth location.",
    relevance:
      "Its neighborhood setting reinforces Olde Towne's identity as a walkable commercial and residential district.",
    href: "https://www.curecoffeehouse.com/",
  },
  {
    name: "Portsmouth Olde Towne Farmers Market",
    category: "Community market",
    area: "Olde Towne",
    description:
      "A recurring downtown market connecting local growers, food producers, artists, and residents.",
    relevance:
      "A concrete example of the neighborhood-scale activity around High Street and the historic downtown grid.",
    href: "https://portsmoutholdetownefarmersmarket.com/",
  },
];

const hamptonRoadsNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "southside-core",
    name: "Norfolk, Portsmouth & Chesapeake",
    area: "Southside core",
    overview:
      "The urban core moves from Norfolk condos and historic neighborhoods to Portsmouth's established housing and Chesapeake's broad mix of suburban, waterfront, and rural properties.",
    listingLens:
      "Multi-city teams need consistent package rules while still allowing parking, access, lot size, water, and floor-plan complexity to change the order.",
    landmarks: ["Elizabeth River", "Downtown Norfolk", "Great Bridge"],
    mediaPlan: ["Consistent baseline", "Address-level scoping", "Centralized team standards"],
  },
  {
    slug: "virginia-beach-market",
    name: "Virginia Beach",
    area: "Oceanfront to Pungo",
    overview:
      "Virginia Beach spans resort condos, established suburban neighborhoods, bayfront homes, military-relocation inventory, and rural acreage at the southern edge of the city.",
    listingLens:
      "Beach access, views, wind, controlled airspace, vertical layouts, and land can all change the right combination of photography, floor plans, aerial, video, and twilight.",
    landmarks: ["Atlantic Ocean", "Chesapeake Bay", "Back Bay"],
    mediaPlan: ["Photography", "Floor plan", "Feature-led upgrades"],
  },
  {
    slug: "suffolk-western-tidewater",
    name: "Suffolk & Western Tidewater",
    area: "Western Hampton Roads",
    overview:
      "Suffolk combines growing suburban communities, historic downtown blocks, riverfront property, farms, and acreage across one of Virginia's largest cities by land area.",
    listingLens:
      "Travel, acreage, outbuildings, long approaches, and neighborhood amenities should be identified before the appointment so exterior and aerial time are realistic.",
    landmarks: ["Downtown Suffolk", "Nansemond River", "Harbour View"],
    mediaPlan: ["Expanded exteriors", "Aerial planning", "Floor plans for larger homes"],
  },
  {
    slug: "peninsula",
    name: "Hampton & Newport News",
    area: "Lower Peninsula",
    overview:
      "The lower Peninsula includes waterfront and historic neighborhoods, established suburban inventory, new construction, and military-relocation demand around major employment centers.",
    listingLens:
      "Bridge and tunnel timing, occupied-home access, waterfront context, and airspace near military installations should be confirmed before relying on a specialty deliverable.",
    landmarks: ["James River", "Hampton Roads Harbor", "Fort Monroe"],
    mediaPlan: ["Complete photo coverage", "Relocation-friendly floor plans", "Drone feasibility check"],
  },
  {
    slug: "historic-triangle",
    name: "Williamsburg & the Historic Triangle",
    area: "Upper Peninsula",
    overview:
      "Williamsburg, James City County, and York County include planned communities, golf and waterfront neighborhoods, retirement-oriented properties, newer construction, and established homes.",
    listingLens:
      "Community amenities, gated access, larger floor plans, architectural details, and remote buyers often make Matterport, video, and a careful amenity sequence worthwhile.",
    landmarks: ["Colonial Williamsburg", "College of William & Mary", "York River"],
    mediaPlan: ["Amenity coverage", "Matterport or video", "Floor plan"],
  },
];

const hamptonRoadsBusinesses: LocalBusiness[] = [
  {
    name: "Three Ships Coffee",
    category: "Regional independent roaster",
    area: "Virginia Beach",
    description:
      "A Virginia Beach coffee roaster with neighborhood cafes and a growing regional following.",
    relevance:
      "One recognizable example of the independent businesses that give each Hampton Roads city its own identity.",
    href: "https://threeshipscoffee.com/",
  },
  {
    name: "Norfolk Coffee & Tea Co.",
    category: "Longstanding local retailer",
    area: "Norfolk",
    description:
      "A longtime downtown Norfolk coffee and tea company serving residents and local businesses.",
    relevance:
      "It grounds the regional guide in an established urban business rather than generic metro-area claims.",
    href: "https://www.norfolkcoffeeandtea.com/",
  },
  {
    name: "Olde Towne Coffee",
    category: "Neighborhood cafe",
    area: "Portsmouth",
    description:
      "An independent cafe on High Street in Portsmouth's walkable Olde Towne district.",
    relevance:
      "A small-scale counterpart to the region's major employment and military anchors, showing the character buyers encounter block by block.",
    href: "https://www.oldetownecoffeeshop.com/",
  },
];

const richmondNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "fan-museum-district",
    name: "The Fan & Museum District",
    area: "Central Richmond",
    overview:
      "The Fan and Museum District are defined by dense historic blocks, rowhouses and detached homes, porches, rear gardens, and walkable commercial corridors around Monument Avenue and the Virginia Museum of Fine Arts.",
    listingLens:
      "Historic details, narrow rooms, additions, basements, and parking need deliberate sequencing. Floor plans and detail photography are especially valuable when layouts have evolved over time.",
    landmarks: ["Virginia Museum of Fine Arts", "Monument Avenue", "Carytown"],
    mediaPlan: ["Architectural details", "Floor plan", "Streetscape context"],
  },
  {
    slug: "church-hill-shockoe",
    name: "Church Hill & Shockoe",
    area: "East Richmond",
    overview:
      "Church Hill rises above Shockoe and the James River with historic homes, renovated rowhouses, parks, apartments, and converted commercial buildings.",
    listingLens:
      "City views, rooftop spaces, historic fabric, vertical circulation, and mixed natural light should shape the schedule and shot list.",
    landmarks: ["St. John's Church", "Libby Hill Park", "James River"],
    mediaPlan: ["View and exterior timing", "Video for vertical flow", "Twilight where justified"],
  },
  {
    slug: "northside-lakeside",
    name: "Northside & Lakeside",
    area: "North Richmond",
    overview:
      "Northside and Lakeside include early and mid-century neighborhoods, larger lots, local commercial strips, parks, and easy access toward Henrico County.",
    listingLens:
      "Renovations, mature landscaping, porches, detached garages, and additions are frequent decision points. Accurate full coverage usually matters more than spectacle.",
    landmarks: ["Bryan Park", "Lewis Ginter Botanical Garden", "Brookland Park Boulevard"],
    mediaPlan: ["Full photography", "Floor plan", "Exterior feature coverage"],
  },
  {
    slug: "west-end-short-pump",
    name: "West End & Short Pump",
    area: "Henrico County",
    overview:
      "The West End and Short Pump range from established subdivisions to large planned communities, townhomes, luxury properties, and new construction near major retail and employment corridors.",
    listingLens:
      "Larger interiors, neighborhood amenities, outdoor living, and seller-presentation expectations can warrant video, Matterport, twilight, and expanded photo coverage.",
    landmarks: ["Short Pump Town Center", "Deep Run Park", "Broad Street corridor"],
    mediaPlan: ["Expanded photography", "Video or Matterport", "Amenity coverage"],
  },
  {
    slug: "ashland-hanover",
    name: "Ashland & Hanover",
    area: "Northern service corridor",
    overview:
      "Ashland and Hanover County form the northern end of AREM's primary corridor, with a railroad-centered town, established neighborhoods, new construction, farms, and larger rural properties.",
    listingLens:
      "Travel, acreage, outbuildings, long driveways, and aerial priorities should be confirmed before the appointment. Downtown Ashland homes call for a different sequence than rural Hanover acreage.",
    landmarks: ["Downtown Ashland", "Randolph-Macon College", "Hanover countryside"],
    mediaPlan: ["Address-specific scoping", "Aerial for land", "Floor plans for larger homes"],
  },
];

const richmondBusinesses: LocalBusiness[] = [
  {
    name: "Sub Rosa Bakery",
    category: "Independent bakery",
    area: "Church Hill",
    description:
      "A wood-fired bakery in Church Hill focused on regional grains and naturally leavened breads and pastries.",
    relevance:
      "A neighborhood business that helps convey Church Hill's walkable, locally rooted commercial character.",
    href: "https://subrosabakery.com/",
  },
  {
    name: "Stella's Grocery",
    category: "Local market and cafe",
    area: "Richmond area",
    description:
      "A Richmond-grown group of neighborhood markets offering prepared foods, groceries, and cafe service.",
    relevance:
      "Its neighborhood locations are useful lifestyle references for several distinct Richmond residential districts.",
    href: "https://www.stellasgrocery.com/",
  },
  {
    name: "Lamplighter Coffee Roasters",
    category: "Independent coffee roaster",
    area: "Scott's Addition & Addison Street",
    description:
      "A Richmond coffee roaster and cafe operator with roots in the city's independent food and creative-business community.",
    relevance:
      "A familiar local anchor for discussing the everyday amenities surrounding central Richmond neighborhoods.",
    href: "https://lamplightercoffee.com/",
  },
];

const elizabethCityNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "downtown-waterfront",
    name: "Downtown & Waterfront",
    area: "Pasquotank River",
    overview:
      "Downtown Elizabeth City combines historic commercial blocks, residential streets, apartments, and a waterfront shaped by the Pasquotank River and the city's harbor.",
    listingLens:
      "Historic details, river views, compact lots, porches, and walkability benefit from a sequence that connects the property to the waterfront without substituting area imagery for the home itself.",
    landmarks: ["Mariners' Wharf", "Museum of the Albemarle", "Pasquotank River"],
    mediaPlan: ["Architectural photography", "Waterfront context", "Floor plan"],
  },
  {
    slug: "riverside",
    name: "Riverside",
    area: "South of downtown",
    overview:
      "Riverside includes established homes, waterfront and water-adjacent streets, mature landscaping, and convenient access to downtown and Elizabeth City State University.",
    listingLens:
      "Water orientation, outdoor spaces, renovations, and mature lots should guide exterior timing and whether aerial or twilight coverage adds real information.",
    landmarks: ["Charles Creek Park", "Elizabeth City State University", "Pasquotank waterfront"],
    mediaPlan: ["Full photo coverage", "Drone where permitted", "Twilight for waterfront features"],
  },
  {
    slug: "weeksville-halstead",
    name: "Weeksville & Halstead Boulevard",
    area: "Southeast Elizabeth City",
    overview:
      "The Weeksville and Halstead Boulevard area mixes established neighborhoods, newer residential development, retail access, and proximity to the Coast Guard aviation complex.",
    listingLens:
      "Standard homes benefit from efficient complete coverage and floor-plan clarity. Drone requests require careful address-level review around aviation facilities.",
    landmarks: ["USCG Base Elizabeth City", "Weeksville Road", "Halstead Boulevard"],
    mediaPlan: ["Photography", "Floor plan", "Airspace review before drone"],
  },
  {
    slug: "pasquotank-countryside",
    name: "Pasquotank County Countryside",
    area: "Surrounding Elizabeth City",
    overview:
      "Outside the city grid, Pasquotank County shifts to rural roads, farms, wooded lots, waterfront parcels, and homes where acreage and outbuildings materially affect value.",
    listingLens:
      "Travel, driveway access, land, water, outbuildings, and sun direction should be scoped before the shoot so the appointment allows enough exterior time.",
    landmarks: ["Newbegun Creek", "Pasquotank farmland", "Albemarle waterways"],
    mediaPlan: ["Expanded exterior coverage", "Aerial context", "Floor plan for larger homes"],
  },
];

const elizabethCityBusinesses: LocalBusiness[] = [
  {
    name: "Muddy Waters Coffeehouse",
    category: "Independent coffeehouse",
    area: "Downtown Elizabeth City",
    description:
      "A locally operated downtown coffeehouse on Main Street serving residents, visitors, and the surrounding business district.",
    relevance:
      "A practical walkability reference for downtown homes and apartments near the waterfront grid.",
    href: "https://www.muddyscoffee.com/",
  },
  {
    name: "Seven Sounds Brewing Company",
    category: "Independent brewery",
    area: "Downtown waterfront",
    description:
      "A local brewery and gathering space positioned along Elizabeth City's waterfront district.",
    relevance:
      "It helps show the active small-business and social setting around downtown and river-adjacent listings.",
    href: "https://www.sevensounds.beer/",
  },
  {
    name: "Ghost Harbor Brewing Company",
    category: "Independent brewery",
    area: "Pailin's Alley",
    description:
      "A downtown Elizabeth City brewery located within the compact Pailin's Alley business district.",
    relevance:
      "A neighborhood-scale example of adaptive reuse and local business activity within the historic downtown core.",
    href: "https://www.ghostharborbrewing.com/",
  },
];

const edentonNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "historic-district",
    name: "Edenton Historic District",
    area: "Downtown Edenton",
    overview:
      "Downtown Edenton is organized around historic homes, churches, civic buildings, small businesses, and a walkable street grid leading toward Edenton Bay.",
    listingLens:
      "Architectural details, porches, outbuildings, gardens, and room proportions need careful documentation. Floor plans can make older or expanded layouts easier to understand.",
    landmarks: ["Chowan County Courthouse", "Cupola House", "Broad Street"],
    mediaPlan: ["Architectural details", "Floor plan", "Garden and streetscape context"],
  },
  {
    slug: "edenton-bay",
    name: "Edenton Bay & Pembroke Creek",
    area: "Albemarle Sound waterfront",
    overview:
      "Waterfront and water-adjacent properties around Edenton Bay and Pembroke Creek range from historic homes to newer residences with docks, views, and outdoor living spaces.",
    listingLens:
      "View direction, shoreline, docks, water access, and sunset timing should be confirmed before the appointment. Aerial work depends on weather, wind, and address-level conditions.",
    landmarks: ["Edenton Bay", "Pembroke Creek", "Colonial Park waterfront"],
    mediaPlan: ["Waterfront sequence", "Aerial where conditions allow", "Twilight"],
  },
  {
    slug: "north-edenton",
    name: "North Edenton",
    area: "North Broad Street corridor",
    overview:
      "North Edenton includes established neighborhoods, mid-century homes, newer residential pockets, schools, and convenient access to the commercial corridor along North Broad Street.",
    listingLens:
      "A complete, accurate photo set and floor plan are the practical baseline. Renovations, larger lots, or significant outdoor amenities determine whether the order needs more.",
    landmarks: ["North Broad Street", "Chowan County schools", "Edenton town grid"],
    mediaPlan: ["Photography", "Floor plan", "Exterior feature coverage"],
  },
  {
    slug: "chowan-county",
    name: "Chowan County Countryside",
    area: "Surrounding Edenton",
    overview:
      "Beyond town, Chowan County includes farms, wooded acreage, creek and sound frontage, rural communities, and homes where the land is central to the purchase decision.",
    listingLens:
      "Travel, long approaches, outbuildings, fields, shoreline, and aerial priorities should be scoped before booking. These properties often require more exterior time than a standard in-town listing.",
    landmarks: ["Albemarle Sound", "Chowan River region", "Rural Chowan County"],
    mediaPlan: ["Expanded exterior coverage", "Aerial planning", "Floor plan for larger properties"],
  },
];

const edentonBusinesses: LocalBusiness[] = [
  {
    name: "Edenton Coffee House",
    category: "Independent cafe and bakery",
    area: "Downtown Edenton",
    description:
      "A locally operated coffeehouse, bakery, and cafe serving the downtown Broad Street district.",
    relevance:
      "A useful everyday reference for the walkable small-business environment around Edenton's historic core.",
    href: "https://www.edentoncoffeehouse.com/home",
  },
  {
    name: "Edenton Bay Trading Company",
    category: "Independent bottle shop and gathering place",
    area: "Downtown Edenton",
    description:
      "A downtown shop and gathering place focused on wine, beer, events, and community activity.",
    relevance:
      "It helps communicate the active local-business layer within the historic district beyond Edenton's visitor landmarks.",
    href: "https://edentonbaytradingcompany.com/",
  },
  {
    name: "Kraken Coffee House",
    category: "Independent coffeehouse",
    area: "Edenton area",
    description:
      "A locally operated coffeehouse serving residents and visitors in the Edenton community.",
    relevance:
      "A second neighborhood-scale business reference that reflects everyday life beyond the waterfront and historic sites.",
    href: "https://www.thekrakencoffeehouse.com/",
  },
];

const suffolkNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "downtown-suffolk",
    name: "Downtown Suffolk",
    area: "Historic core",
    overview:
      "Downtown Suffolk centers on historic commercial blocks, established residential streets, civic buildings, and local businesses near the Nansemond River watershed.",
    listingLens:
      "Older floor plans, renovated details, porches, compact lots, and mixed-use surroundings need a direct visual sequence. Floor plans are valuable where additions have changed the original layout.",
    landmarks: ["Main Street", "Suffolk Seaboard Station", "Riddick's Folly"],
    mediaPlan: ["Architectural photography", "Floor plan", "Renovation details"],
  },
  {
    slug: "harbour-view-north-suffolk",
    name: "Harbour View & North Suffolk",
    area: "Northern Suffolk",
    overview:
      "North Suffolk includes Harbour View, growing subdivisions, townhomes, golf and waterfront communities, retail access, and connections toward Chesapeake and Portsmouth.",
    listingLens:
      "Community amenities, water, larger interiors, and seller-presentation expectations often determine whether video, Matterport, twilight, or aerial should supplement complete photography.",
    landmarks: ["Harbour View", "Nansemond River", "Bennett's Creek Park"],
    mediaPlan: ["Expanded photography", "Amenity coverage", "Video or Matterport"],
  },
  {
    slug: "chuckatuck-driver",
    name: "Chuckatuck & Driver",
    area: "Northwestern Suffolk",
    overview:
      "Chuckatuck and Driver retain a village and rural character with established homes, farmland, wooded parcels, waterways, and properties where the approach and land are part of the value.",
    listingLens:
      "Lot size, outbuildings, water, driveway access, and surrounding land should be scoped before the appointment. These listings may need more exterior and aerial time than a suburban resale.",
    landmarks: ["Chuckatuck Creek", "Driver village", "Lone Star Lakes Park"],
    mediaPlan: ["Expanded exteriors", "Aerial context", "Floor plan"],
  },
  {
    slug: "eclipse-holland",
    name: "Eclipse, Holland & Southern Suffolk",
    area: "Rural and waterfront Suffolk",
    overview:
      "Western and southern Suffolk extend across farms, forests, river and creek frontage, small communities, and homes separated by long rural roads.",
    listingLens:
      "Travel, acreage, outbuildings, shoreline, sun direction, and drone feasibility should be confirmed early so the property can be documented at the appropriate scale.",
    landmarks: ["Nansemond River", "Great Dismal Swamp region", "Southern Suffolk farmland"],
    mediaPlan: ["Land-focused photography", "Aerial planning", "Video for larger properties"],
  },
];

const suffolkBusinesses: LocalBusiness[] = [
  {
    name: "Nansemond Brewing Station",
    category: "Independent brewery",
    area: "Downtown Suffolk",
    description:
      "A locally operated craft brewery in Suffolk's downtown district.",
    relevance:
      "A neighborhood anchor that helps explain the small-business activity surrounding downtown residential streets.",
    href: "https://nansemondbrewing.com/",
  },
  {
    name: "Harper's Table",
    category: "Independent restaurant",
    area: "Downtown Suffolk",
    description:
      "A downtown restaurant built around regional ingredients and Southern cooking.",
    relevance:
      "Its Main Street presence adds useful walkable-lifestyle context for Suffolk's historic core.",
    href: "https://www.harperstable.com/",
  },
  {
    name: "Brighter Day Cafe",
    category: "Independent local cafe",
    area: "Suffolk",
    description:
      "A locally owned Suffolk cafe recognized in the city's independent dining directory.",
    relevance:
      "A practical everyday-business reference beyond the city's larger retail and employment corridors.",
    href: "https://www.visitsuffolkva.com/directory/brighter-day-cafe-2/",
  },
];

const hamptonNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "phoebus-fort-monroe",
    name: "Phoebus & Fort Monroe",
    area: "Southeastern Hampton",
    overview:
      "Phoebus combines a historic commercial district and established homes with direct access to Fort Monroe, whose reused military buildings, waterfront, and residential areas create a distinct market.",
    listingLens:
      "Historic details, building rules, water views, porches, and vertical layouts need careful sequencing. Fort Monroe access and property-specific permissions should be confirmed before the shoot.",
    landmarks: ["Fort Monroe", "Mellen Street", "Old Point Comfort"],
    mediaPlan: ["Architectural photography", "Floor plan", "Waterfront context"],
  },
  {
    slug: "buckroe-beach",
    name: "Buckroe Beach",
    area: "Chesapeake Bay shoreline",
    overview:
      "Buckroe includes beach cottages, established homes, newer construction, condos, and streets oriented toward the Chesapeake Bay and Buckroe Beach Park.",
    listingLens:
      "Beach access, view direction, outdoor space, wind, and nearby controlled airspace should shape exterior timing and aerial expectations.",
    landmarks: ["Buckroe Beach", "Chesapeake Bay", "Buckroe Pier"],
    mediaPlan: ["Coastal exterior coverage", "Video for vertical homes", "Drone feasibility review"],
  },
  {
    slug: "wythe-downtown",
    name: "Wythe & Downtown Hampton",
    area: "Hampton Roads harbor",
    overview:
      "Wythe and Downtown Hampton pair early and mid-century housing, waterfront pockets, apartments, civic buildings, and the commercial district around the Hampton River.",
    listingLens:
      "Renovation quality, water orientation, room flow, parking, and mixed urban access are the main scoping decisions. Floor plans improve clarity in older homes.",
    landmarks: ["Downtown Hampton", "Hampton River", "Virginia Air & Space Science Center"],
    mediaPlan: ["Full photography", "Floor plan", "Water or downtown context"],
  },
  {
    slug: "fox-hill-grandview",
    name: "Fox Hill & Grandview",
    area: "Northeastern Hampton",
    overview:
      "Fox Hill and Grandview include established neighborhoods, larger lots, creeks, marsh, and Chesapeake Bay frontage where the natural setting can be central to the listing.",
    listingLens:
      "Shoreline, marsh, docks, acreage, and outdoor features call for additional exterior planning. Wind, tides, sun direction, and airspace may affect specialty coverage.",
    landmarks: ["Grandview Nature Preserve", "Back River", "Factory Point"],
    mediaPlan: ["Expanded exteriors", "Aerial where authorized", "Twilight for waterfront features"],
  },
];

const hamptonBusinesses: LocalBusiness[] = [
  {
    name: "Oozlefinch Beers & Blending",
    category: "Independent brewery",
    area: "Fort Monroe",
    description:
      "A Hampton brewery operating within the reused historic setting at Fort Monroe.",
    relevance:
      "A strong example of the contemporary local-business activity now embedded within Fort Monroe's historic district.",
    href: "https://oozlefinchbeers.com/",
  },
  {
    name: "Firehouse Coffee 1881",
    category: "Independent coffeehouse",
    area: "Fort Monroe",
    description:
      "A coffeehouse located in Fort Monroe's historic former firehouse.",
    relevance:
      "It gives concrete neighborhood context to the adaptive reuse and walkable amenities around Fort Monroe residences.",
    href: "https://firehousecoffee1881.com/",
  },
  {
    name: "Sly Clyde Ciderworks",
    category: "Independent cidery",
    area: "Phoebus",
    description:
      "A local craft cidery and gathering place in Hampton's Phoebus district.",
    relevance:
      "A neighborhood-scale business that reflects Phoebus's active historic commercial corridor.",
    href: "https://slyclyde.com/",
  },
];

const newportNewsNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "hilton-village",
    name: "Hilton Village",
    area: "James River side",
    overview:
      "Hilton Village is a planned historic neighborhood with compact homes, mature streets, a small commercial district, and proximity to the James River and Huntington Park.",
    listingLens:
      "Historic character, smaller rooms, additions, porches, and renovation work need accurate coverage. A floor plan helps buyers understand efficient or modified layouts.",
    landmarks: ["Hilton Village", "Huntington Park", "James River"],
    mediaPlan: ["Architectural photography", "Floor plan", "Renovation details"],
  },
  {
    slug: "riverside-hidenwood",
    name: "Riverside & Hidenwood",
    area: "Central Newport News",
    overview:
      "Riverside and Hidenwood include established homes, wooded lots, river and creek frontage, and convenient access to Christopher Newport University and the Mariners' Museum area.",
    listingLens:
      "Mature landscaping, water orientation, larger interiors, and outdoor features often justify extra exterior coverage, floor plans, or feature-led upgrades.",
    landmarks: ["The Mariners' Museum", "Christopher Newport University", "James River"],
    mediaPlan: ["Full photography", "Floor plan", "Aerial or twilight when warranted"],
  },
  {
    slug: "city-center-oyster-point",
    name: "City Center & Oyster Point",
    area: "Central business district",
    overview:
      "City Center and Oyster Point combine apartments, condos, townhomes, offices, retail, and newer residential development within a highly planned commercial district.",
    listingLens:
      "Parking, building entry, elevator access, amenity permissions, and mixed window light should be confirmed. Compact listings need a concise, nonrepetitive visual sequence.",
    landmarks: ["City Center at Oyster Point", "Fountain Plaza", "Canon Boulevard"],
    mediaPlan: ["Condo photography", "Amenity coverage", "Floor plan"],
  },
  {
    slug: "denbigh-north-newport-news",
    name: "Denbigh & North Newport News",
    area: "Northern Peninsula",
    overview:
      "Denbigh and northern Newport News include established subdivisions, townhomes, newer communities, larger lots, and convenient access toward York County and Williamsburg.",
    listingLens:
      "Complete photography and a floor plan handle most resales. Larger lots, new construction, major renovations, or neighborhood amenities are the main upgrade triggers.",
    landmarks: ["Denbigh", "Newport News Park", "Warwick Boulevard"],
    mediaPlan: ["Photography", "Floor plan", "Video or aerial for feature-driven homes"],
  },
];

const newportNewsBusinesses: LocalBusiness[] = [
  {
    name: "Pangaea Coffee Emporium",
    category: "Independent coffeehouse",
    area: "Newport News",
    description:
      "A locally operated Newport News coffeehouse and community gathering space.",
    relevance:
      "A useful everyday-lifestyle reference within the city's broad residential and employment corridor.",
    href: "https://pangaeacoffee.com/",
  },
  {
    name: "Busy Nothings Coffee Company",
    category: "Independent coffee shop",
    area: "Port Warwick",
    description:
      "A locally owned specialty coffee shop in Newport News's Port Warwick district.",
    relevance:
      "It helps explain the walkable small-business environment around Port Warwick homes and apartments.",
    href: "https://busynothingscoffee.com/",
  },
  {
    name: "Tradition Brewing Company",
    category: "Independent brewery",
    area: "City Center area",
    description:
      "A Newport News brewery focused on local collaboration and community events.",
    relevance:
      "A recognizable local anchor near the city's central business and residential districts.",
    href: "https://traditionbrewing.com/",
  },
];

const williamsburgNeighborhoods: LocalNeighborhood[] = [
  {
    slug: "city-college-area",
    name: "City of Williamsburg & College Area",
    area: "Historic city core",
    overview:
      "The city core combines historic-area context, established neighborhoods, college-adjacent housing, apartments, and walkable commercial streets around Colonial Williamsburg and William & Mary.",
    listingLens:
      "Architecture, parking, occupied access, historic context, and compact layouts need careful sequencing. Area imagery should support, not overwhelm, the property itself.",
    landmarks: ["Colonial Williamsburg", "William & Mary", "Merchants Square"],
    mediaPlan: ["Architectural photography", "Floor plan", "Walkable-context coverage"],
  },
  {
    slug: "kingsmill-jamestown",
    name: "Kingsmill & Jamestown Road",
    area: "James River side",
    overview:
      "Kingsmill and the Jamestown Road corridor include gated and planned communities, golf and river-oriented properties, mature neighborhoods, condos, and townhomes.",
    listingLens:
      "Gate access, community permissions, golf or water orientation, amenities, and larger floor plans should be confirmed before the shoot.",
    landmarks: ["James River", "Historic Jamestowne", "Kingsmill"],
    mediaPlan: ["Amenity coverage", "Video or Matterport", "Aerial feasibility review"],
  },
  {
    slug: "fords-colony-lightfoot",
    name: "Ford's Colony & Lightfoot",
    area: "Western James City County",
    overview:
      "Western James City County includes large planned communities, golf neighborhoods, retirement-oriented homes, new construction, and established subdivisions near Lightfoot.",
    listingLens:
      "Larger interiors, community amenities, gates, outdoor living, and remote buyers often make floor plans, Matterport, video, and expanded photography worthwhile.",
    landmarks: ["Ford's Colony", "Lightfoot", "Richmond Road corridor"],
    mediaPlan: ["Expanded photography", "Matterport", "Community amenities"],
  },
  {
    slug: "york-county-queens-lake",
    name: "York County & Queen's Lake",
    area: "Eastern Historic Triangle",
    overview:
      "The Williamsburg service area extends into York County communities with wooded lots, waterfront pockets, established subdivisions, and convenient access to the Colonial Parkway and lower Peninsula.",
    listingLens:
      "Water, wooded acreage, outbuildings, long approaches, and travel should be identified before the appointment. Address-level drone review remains essential.",
    landmarks: ["Queen's Lake", "Colonial Parkway", "York River region"],
    mediaPlan: ["Full photography", "Aerial where authorized", "Floor plan"],
  },
];

const williamsburgBusinesses: LocalBusiness[] = [
  {
    name: "Anonymous Coffee",
    category: "Independent coffeehouse",
    area: "New Town",
    description:
      "A Williamsburg specialty coffee shop in New Town built around coffee and community connection.",
    relevance:
      "A contemporary neighborhood business that helps explain New Town's mixed residential and commercial setting.",
    href: "https://www.anon.coffee/",
  },
  {
    name: "Longneck Coffee Roasters",
    category: "Independent coffee roaster",
    area: "Williamsburg",
    description:
      "A small-batch Williamsburg coffee roaster with a locally rooted operation.",
    relevance:
      "A local-business reference beyond the Historic Area's tourism-focused identity.",
    href: "https://www.longneckroasters.com/",
  },
  {
    name: "Precarious Beer Project",
    category: "Independent brewery",
    area: "Downtown Williamsburg",
    description:
      "A locally operated brewery and gathering place near the city center and Merchants Square.",
    relevance:
      "It reflects the active independent food and beverage scene serving residents around the historic city core.",
    href: "https://precariousbeer.com/",
  },
];

export const localMarketData: Record<string, LocalMarketContent> = {
  "virginia-beach": {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Virginia Beach", state: "VA" }],
    neighborhoods: virginiaBeachNeighborhoods,
    businesses: virginiaBeachBusinesses,
    representativeListings: makeRepresentativeListings("virginia-beach", "Virginia Beach", "VA", [
      { neighborhood: "Oceanfront & ViBe District", title: "Coastal condo launch profile", propertyType: "Condo", media: ["Photography", "Amenities", "Floor plan"] },
      { neighborhood: "North End & Croatan", title: "Multi-level beach home profile", propertyType: "Coastal", media: ["Photography", "Video", "Aerial"] },
      { neighborhood: "Great Neck & Alanton", title: "Waterfront presentation profile", propertyType: "Waterfront", media: ["Photography", "Twilight", "Aerial"] },
      { neighborhood: "Sandbridge & Pungo", title: "Land-and-setting profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
    ]),
    faqs: [
      { q: "Does AREM photograph listings throughout Virginia Beach?", a: "Yes. AREM covers the Oceanfront, North End, Croatan, Shore Drive, Chic's Beach, Great Neck, Kempsville, Sandbridge, Pungo, and surrounding Virginia Beach communities. Exact travel, access, and specialty-media requirements are confirmed with the order." },
      { q: "Can AREM fly a drone near Virginia Beach military installations?", a: "Drone availability depends on the exact address, FAA airspace authorization, nearby installations, temporary restrictions, wind, and weather. AREM reviews feasibility before the appointment rather than promising aerial coverage based only on the neighborhood." },
      { q: "What media works best for Virginia Beach waterfront and resort listings?", a: "Complete photography and a floor plan provide the baseline. View-driven, multi-level, or amenity-rich properties often benefit from video, authorized aerial coverage, twilight, and a listing website." },
      { q: "How quickly is Virginia Beach listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Video, Matterport, advanced editing, and other specialty media may have separate timing confirmed before the shoot." },
    ],
  },
  norfolk: {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Norfolk", state: "VA" }],
    neighborhoods: norfolkNeighborhoods,
    businesses: norfolkBusinesses,
    representativeListings: makeRepresentativeListings("norfolk", "Norfolk", "VA", [
      { neighborhood: "Ghent", title: "Historic-home launch profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Ocean View & East Beach", title: "Bayfront feature profile", propertyType: "Coastal", media: ["Photography", "Video", "Aerial"] },
      { neighborhood: "Downtown & Freemason", title: "Urban condo profile", propertyType: "Condo", media: ["Photography", "Amenities", "Twilight"] },
      { neighborhood: "Larchmont & Edgewater", title: "Relocation-ready profile", propertyType: "Waterfront", media: ["Photography", "Matterport", "Floor plan"] },
    ]),
    faqs: [
      { q: "Does AREM serve every part of Norfolk?", a: "Yes. AREM photographs listings across Ghent, Larchmont, Edgewater, Ocean View, East Beach, Downtown, Freemason, Colonial Place, Riverview, and surrounding Norfolk neighborhoods." },
      { q: "What should agents plan for with Norfolk historic homes and condos?", a: "Historic homes benefit from detail coverage and floor plans that explain nonstandard layouts. Condos require confirmed building access, parking, amenity permissions, and any front-desk or elevator procedures." },
      { q: "Is drone photography available throughout Norfolk?", a: "Not automatically. Norfolk has complex controlled airspace and military aviation activity. AREM checks the exact address, authorization path, temporary restrictions, weather, and wind before confirming aerial work." },
      { q: "How quickly is Norfolk listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Specialty services such as video, Matterport, and advanced editing may follow a separately confirmed schedule." },
    ],
  },
  chesapeake: {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Chesapeake", state: "VA" }],
    neighborhoods: chesapeakeNeighborhoods,
    businesses: chesapeakeBusinesses,
    representativeListings: representativeChesapeakeListings,
    faqs: chesapeakeFaqs,
  },
  portsmouth: {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Portsmouth", state: "VA" }],
    neighborhoods: portsmouthNeighborhoods,
    businesses: portsmouthBusinesses,
    representativeListings: makeRepresentativeListings("portsmouth", "Portsmouth", "VA", [
      { neighborhood: "Olde Towne", title: "Historic architecture profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Twilight"] },
      { neighborhood: "Park View & Port Norfolk", title: "Renovated-home profile", propertyType: "Urban residential", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Churchland", title: "Standard resale profile", propertyType: "Suburban", media: ["Photography", "Floor plan", "Property site"] },
      { neighborhood: "Cradock & Truxtun", title: "Compact-home launch profile", propertyType: "Established neighborhood", media: ["Photography", "Floor plan", "Exterior"] },
    ]),
    faqs: [
      { q: "Where does AREM photograph listings in Portsmouth?", a: "AREM is headquartered in Portsmouth and serves Olde Towne, Park View, Port Norfolk, Churchland, Cradock, Truxtun, Westhaven, and surrounding neighborhoods." },
      { q: "What media is useful for Portsmouth's historic homes?", a: "Complete photography, architectural details, and a measured floor plan form a strong baseline. Video or twilight can help when scale, renovation quality, courtyards, or streetscape presence are central to the seller presentation." },
      { q: "Can AREM handle condo, tenant, or occupied-home access?", a: "Yes, provided parking, entry instructions, lockbox or front-desk procedures, occupant expectations, and amenity permissions are supplied before the appointment." },
      { q: "How quickly is Portsmouth listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Video, Matterport, advanced editing, and specialty requests may have separate confirmed timing." },
    ],
  },
  suffolk: {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Suffolk", state: "VA" }],
    neighborhoods: suffolkNeighborhoods,
    businesses: suffolkBusinesses,
    representativeListings: makeRepresentativeListings("suffolk", "Suffolk", "VA", [
      { neighborhood: "Downtown Suffolk", title: "Historic-core launch profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Harbour View & North Suffolk", title: "Amenity-rich suburban profile", propertyType: "Suburban", media: ["Photography", "Video", "Amenities"] },
      { neighborhood: "Chuckatuck & Driver", title: "Land-and-outbuilding profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
      { neighborhood: "Eclipse, Holland & Southern Suffolk", title: "Rural waterfront profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
    ]),
    faqs: [
      { q: "Where does AREM photograph listings in Suffolk?", a: "AREM serves Downtown Suffolk, Harbour View, North Suffolk, Chuckatuck, Driver, Eclipse, Holland, and surrounding communities. Travel, access, and unusual property requirements are confirmed with the order." },
      { q: "What media works best for Suffolk acreage and waterfront properties?", a: "Complete photography and a floor plan provide the baseline. Authorized aerial coverage can explain land, water, outbuildings, and long approaches; video or twilight can strengthen feature-driven listings." },
      { q: "Can AREM provide drone photography throughout Suffolk?", a: "Drone feasibility depends on the exact address, airspace, temporary restrictions, weather, wind, and property conditions. AREM reviews those factors before aerial work is confirmed." },
      { q: "How quickly is Suffolk listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Travel-sensitive appointments and specialty media may have separate timing confirmed before the shoot." },
    ],
  },
  hampton: {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Hampton", state: "VA" }],
    neighborhoods: hamptonNeighborhoods,
    businesses: hamptonBusinesses,
    representativeListings: makeRepresentativeListings("hampton", "Hampton", "VA", [
      { neighborhood: "Phoebus & Fort Monroe", title: "Historic waterfront profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Exterior"] },
      { neighborhood: "Buckroe Beach", title: "Coastal-home launch profile", propertyType: "Coastal", media: ["Photography", "Video", "Aerial"] },
      { neighborhood: "Wythe & Downtown Hampton", title: "Established-home profile", propertyType: "Urban residential", media: ["Photography", "Floor plan", "Property site"] },
      { neighborhood: "Fox Hill & Grandview", title: "Natural-setting profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
    ]),
    faqs: [
      { q: "What Hampton neighborhoods does AREM serve?", a: "AREM serves Phoebus, Fort Monroe, Buckroe Beach, Downtown, Wythe, Fox Hill, Grandview, and surrounding Hampton communities." },
      { q: "What should agents plan for at Fort Monroe or in historic Phoebus?", a: "Confirm property access, building rules, parking, historic details, water views, and any shared-area permissions. Floor plans and a deliberate architectural sequence help explain distinctive or vertical layouts." },
      { q: "Is drone photography available throughout Hampton?", a: "Not automatically. Military and civilian aviation, controlled airspace, temporary restrictions, weather, and wind require an exact-address review before aerial media can be confirmed." },
      { q: "How quickly is Hampton listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Video, Matterport, advanced editing, and other specialty services may have separate timing." },
    ],
  },
  "newport-news": {
    state: "VA",
    areaType: "City",
    coverageAreas: [{ city: "Newport News", state: "VA" }],
    neighborhoods: newportNewsNeighborhoods,
    businesses: newportNewsBusinesses,
    representativeListings: makeRepresentativeListings("newport-news", "Newport News", "VA", [
      { neighborhood: "Hilton Village", title: "Historic-neighborhood profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Riverside & Hidenwood", title: "Established waterfront profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
      { neighborhood: "City Center & Oyster Point", title: "Urban condo profile", propertyType: "Condo", media: ["Photography", "Amenities", "Floor plan"] },
      { neighborhood: "Denbigh & North Newport News", title: "Standard resale profile", propertyType: "Suburban", media: ["Photography", "Floor plan", "Property site"] },
    ]),
    faqs: [
      { q: "Where does AREM serve in Newport News?", a: "AREM photographs listings across Hilton Village, Riverside, Hidenwood, City Center, Oyster Point, Denbigh, northern Newport News, and surrounding Peninsula communities." },
      { q: "What should agents confirm for Newport News condos?", a: "Share parking, entry, front-desk or lockbox procedures, elevator access, occupied-home expectations, and amenity permissions before the appointment." },
      { q: "Can AREM photograph waterfront homes and provide drone media?", a: "Yes, but aerial work depends on the exact address, controlled airspace, nearby aviation facilities, weather, wind, and temporary restrictions. Water orientation and exterior priorities should be supplied when booking." },
      { q: "How quickly is Newport News listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Specialty services such as video, Matterport, and advanced editing may follow a separately confirmed schedule." },
    ],
  },
  williamsburg: {
    state: "VA",
    areaType: "AdministrativeArea",
    coverageAreas: [{ city: "Williamsburg", state: "VA" }],
    neighborhoods: williamsburgNeighborhoods,
    businesses: williamsburgBusinesses,
    representativeListings: makeRepresentativeListings("williamsburg", "Williamsburg", "VA", [
      { neighborhood: "City of Williamsburg & College Area", title: "Historic-city profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Kingsmill & Jamestown Road", title: "Golf-and-river profile", propertyType: "Amenity community", media: ["Photography", "Video", "Amenities"] },
      { neighborhood: "Ford's Colony & Lightfoot", title: "Remote-buyer profile", propertyType: "Planned community", media: ["Photography", "Matterport", "Floor plan"] },
      { neighborhood: "York County & Queen's Lake", title: "Wooded waterfront profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
    ]),
    faqs: [
      { q: "What parts of the Williamsburg area does AREM serve?", a: "AREM serves the City of Williamsburg, James City County, York County, and surrounding Historic Triangle communities. Exact travel and access requirements are confirmed with the order." },
      { q: "How should agents plan shoots in gated or amenity-rich communities?", a: "Provide gate instructions, amenity permissions, parking rules, property access, and the features that matter to the listing before the appointment. Community spaces are photographed only when access and marketing use are permitted." },
      { q: "What media helps remote and relocation buyers?", a: "Complete photography and a floor plan provide the baseline. Matterport and walkthrough video add layout clarity, while approved amenity, aerial, or twilight coverage can explain a distinctive setting." },
      { q: "How quickly is Williamsburg listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Travel-sensitive appointments and specialty media may have separate timing confirmed before the shoot." },
    ],
  },
  "hampton-roads": {
    state: "VA",
    areaType: "AdministrativeArea",
    coverageAreas: [
      { city: "Virginia Beach", state: "VA" },
      { city: "Norfolk", state: "VA" },
      { city: "Chesapeake", state: "VA" },
      { city: "Portsmouth", state: "VA" },
      { city: "Suffolk", state: "VA" },
      { city: "Hampton", state: "VA" },
      { city: "Newport News", state: "VA" },
      { city: "Poquoson", state: "VA" },
      { city: "Williamsburg", state: "VA" },
    ],
    neighborhoods: hamptonRoadsNeighborhoods,
    businesses: hamptonRoadsBusinesses,
    representativeListings: makeRepresentativeListings("hampton-roads", "Hampton Roads", "VA", [
      { neighborhood: "Southside core", title: "Urban-market launch profile", propertyType: "Regional", media: ["Photography", "Floor plan", "Property site"] },
      { neighborhood: "Virginia Beach", title: "Coastal-market profile", propertyType: "Coastal", media: ["Photography", "Video", "Aerial"] },
      { neighborhood: "Suffolk & Western Tidewater", title: "Acreage-market profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
      { neighborhood: "Lower Peninsula", title: "Relocation-market profile", propertyType: "Relocation", media: ["Photography", "Matterport", "Video"] },
    ]),
    faqs: [
      { q: "Which Hampton Roads cities does AREM serve?", a: "AREM serves the Hampton Roads member cities and surrounding communities, including Virginia Beach, Norfolk, Chesapeake, Portsmouth, Suffolk, Hampton, Newport News, Poquoson, Williamsburg, and nearby Tidewater markets." },
      { q: "Can a team standardize media packages across the region?", a: "Yes. AREM can help teams define a standard listing package, upgrade triggers, billing preferences, booking expectations, and support routing while preserving address-level decisions for drone, travel, and unusual properties." },
      { q: "How does AREM handle bridges, tunnels, travel, and military airspace?", a: "Appointment timing and specialty media are reviewed against the exact address. Bridge and tunnel travel, controlled airspace, temporary flight restrictions, weather, and access can affect the schedule and aerial feasibility." },
      { q: "How quickly is Hampton Roads listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Specialty services and large team workflows may follow timing confirmed for the order or account." },
    ],
  },
  richmond: {
    state: "VA",
    areaType: "AdministrativeArea",
    coverageAreas: [
      { city: "Richmond", state: "VA" },
      { city: "Ashland", state: "VA" },
    ],
    neighborhoods: richmondNeighborhoods,
    businesses: richmondBusinesses,
    representativeListings: makeRepresentativeListings("richmond", "Richmond", "VA", [
      { neighborhood: "The Fan & Museum District", title: "Historic-city profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Church Hill & Shockoe", title: "View-driven urban profile", propertyType: "Urban", media: ["Photography", "Video", "Twilight"] },
      { neighborhood: "West End & Short Pump", title: "Premium suburban profile", propertyType: "Suburban", media: ["Photography", "Matterport", "Video"] },
      { neighborhood: "Ashland & Hanover", title: "Northern-corridor profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
    ]),
    faqs: [
      { q: "What parts of the Richmond area does AREM serve?", a: "AREM serves Richmond, Henrico, Chesterfield, Ashland, Hanover, and surrounding communities within the primary corridor. Exact timing for outlying addresses is confirmed with the order." },
      { q: "What media works well for Richmond's historic homes?", a: "Photography should preserve architectural details and accurate room proportions. Floor plans clarify additions and older layouts, while video or twilight may help when vertical flow, gardens, rooftops, or city views are significant." },
      { q: "How should agents scope Richmond-area acreage or new construction?", a: "Share lot size, access, outbuildings, community amenities, construction status, and aerial priorities before booking. That information determines appointment time and whether drone, video, or expanded photography adds useful context." },
      { q: "How quickly is Richmond listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Travel-sensitive appointments and specialty services may have separate timing confirmed before the shoot." },
    ],
  },
  "elizabeth-city": {
    state: "NC",
    areaType: "City",
    coverageAreas: [{ city: "Elizabeth City", state: "NC" }],
    neighborhoods: elizabethCityNeighborhoods,
    businesses: elizabethCityBusinesses,
    representativeListings: makeRepresentativeListings("elizabeth-city", "Elizabeth City", "NC", [
      { neighborhood: "Downtown & Waterfront", title: "Historic waterfront profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Exterior"] },
      { neighborhood: "Riverside", title: "Water-oriented launch profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
      { neighborhood: "Weeksville & Halstead Boulevard", title: "Standard resale profile", propertyType: "Suburban", media: ["Photography", "Floor plan", "Property site"] },
      { neighborhood: "Pasquotank County Countryside", title: "Rural property profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
    ]),
    faqs: [
      { q: "Where does AREM serve around Elizabeth City?", a: "AREM serves Elizabeth City and surrounding northeastern North Carolina communities, including urban, waterfront, suburban, and rural Pasquotank County properties. Travel and access are confirmed with the order." },
      { q: "Can AREM provide drone media near Coast Guard facilities?", a: "Drone availability depends on the exact address, FAA authorization, nearby aviation facilities, temporary restrictions, weather, and wind. Feasibility is reviewed before aerial work is confirmed." },
      { q: "What media works best for waterfront and acreage listings?", a: "Complete photography and a floor plan provide the baseline. Authorized aerial coverage can explain shoreline, land, outbuildings, and approaches; video or twilight can strengthen feature-driven listings." },
      { q: "How quickly is Elizabeth City listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Travel-sensitive scheduling and specialty services may have separate timing confirmed before the appointment." },
    ],
  },
  edenton: {
    state: "NC",
    areaType: "City",
    coverageAreas: [{ city: "Edenton", state: "NC" }],
    neighborhoods: edentonNeighborhoods,
    businesses: edentonBusinesses,
    representativeListings: makeRepresentativeListings("edenton", "Edenton", "NC", [
      { neighborhood: "Edenton Historic District", title: "Historic architecture profile", propertyType: "Historic", media: ["Photography", "Floor plan", "Details"] },
      { neighborhood: "Edenton Bay & Pembroke Creek", title: "Waterfront presentation profile", propertyType: "Waterfront", media: ["Photography", "Aerial", "Twilight"] },
      { neighborhood: "North Edenton", title: "Standard in-town profile", propertyType: "Residential", media: ["Photography", "Floor plan", "Property site"] },
      { neighborhood: "Chowan County Countryside", title: "Land-and-setting profile", propertyType: "Acreage", media: ["Photography", "Aerial", "Floor plan"] },
    ]),
    faqs: [
      { q: "Does AREM photograph listings throughout Edenton and Chowan County?", a: "Yes. Edenton is the southern edge of AREM's primary service corridor. The team serves in-town, waterfront, and rural properties, with travel and appointment timing confirmed before the order is locked." },
      { q: "What media works best for Edenton's historic homes?", a: "Architectural photography, detail coverage, and a measured floor plan form a strong baseline. Gardens, outbuildings, water views, or exceptional exterior character may justify video, aerial, or twilight coverage." },
      { q: "Can AREM photograph waterfront and acreage properties around Edenton?", a: "Yes. Share shoreline, dock, acreage, outbuilding, access, and aerial priorities when booking so the appointment allows appropriate exterior time and weather-sensitive services can be reviewed." },
      { q: "How quickly is Edenton listing media delivered?", a: "Standard listing assets are normally delivered the next business morning. Travel, weather, and specialty media may have separate timing confirmed before the shoot." },
    ],
  },
};

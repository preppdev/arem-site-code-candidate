/* Interactive pre-appointment staging guide — content adapted from AREM's
   "Pre-Appointment Staging v4" guide. Each item is tagged with a timing phase
   so homeowners can filter by when to do it. */

export type Phase = "before" | "day-before" | "day-of";

export const phases: { key: Phase; label: string; sub: string }[] = [
  { key: "before", label: "2+ days before", sub: "Bigger jobs and anything that takes drying or scheduling." },
  { key: "day-before", label: "1 day before", sub: "Deep clean and declutter the night before." },
  { key: "day-of", label: "Day of", sub: "Quick final touches right before we arrive." },
];

export type Item = { id: string; text: string; phase: Phase; tip?: string };

export type Area = {
  id: string;
  name: string;
  icon: string; // lucide icon key
  intro: string;
  proTip?: string;
  optional?: boolean;
  items: Item[];
};

export const areas: Area[] = [
  {
    id: "exterior",
    name: "Exterior & curb appeal",
    icon: "Home",
    intro: "The exterior is the first thing buyers see. Make a great first impression.",
    proTip:
      "No place to hide the trash cans? Roll them onto the street next to your vehicle during the session.",
    items: [
      { id: "ext-wash", text: "Pressure-wash siding/windows if dirty or stained with algae", phase: "before" },
      { id: "ext-mulch", text: "Top off mulch beds, trim bushes, finish seasonal yard work", phase: "before" },
      { id: "ext-mow", text: "Mow the lawn (no closer than 2 days before) or bag all clippings", phase: "before" },
      { id: "ext-leaves", text: "Landscaping touch-up — clear leaves and debris", phase: "day-before" },
      { id: "ext-clear", text: "Remove yard equipment, hoses, flags/signs (incl. security signs), pet toys, and trash cans to a shed/garage", phase: "day-before" },
      { id: "ext-cars", text: "Move all vehicles off the driveway and away from the front of the home", phase: "day-of" },
    ],
  },
  {
    id: "every-room",
    name: "In every room",
    icon: "Sparkles",
    intro: "Aim for a clean, neutral look so buyers can picture themselves in the space.",
    proTip: "The home doesn't need to look vacant — it should look curated and well maintained.",
    items: [
      { id: "er-lights-ok", text: "Make sure all bulbs work and are a similar color throughout", phase: "before" },
      { id: "er-declutter", text: "Declutter and keep decor minimal", phase: "day-before" },
      { id: "er-personal", text: "Minimize personal items — framed photos, diplomas, etc.", phase: "day-before" },
      { id: "er-clean", text: "Clean, vacuum, and dust all rooms, windows, and smudge-prone surfaces", phase: "day-before" },
      { id: "er-vents", text: "Dust accessible vents and ceiling fans", phase: "day-before" },
      { id: "er-doors", text: "Open interior doors (except closets) for light and flow", phase: "day-of" },
      { id: "er-blinds", text: "Open or half-open all blinds — the same amount throughout the home", phase: "day-of" },
      { id: "er-overheads", text: "Turn on overhead lights (and lamps where applicable)", phase: "day-of" },
      { id: "er-fans", text: "Turn off all ceiling fans", phase: "day-of" },
      { id: "er-cabinets", text: "Close all cabinets", phase: "day-of" },
      { id: "er-remotes", text: "Hide remotes, magazines, laptops, tablets, and visible cords", phase: "day-of" },
      { id: "er-tvs", text: "Turn off televisions and computer monitors", phase: "day-of" },
      { id: "er-heaters", text: "Remove portable heaters or fans", phase: "day-of" },
      { id: "er-pets-items", text: "Store pet toys, bowls, and litter boxes out of view", phase: "day-of" },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "Utensils",
    intro: "Clear, minimal counters make a kitchen feel bigger and cleaner.",
    proTip: "A fruit bowl, staged coffee bar, or wine-and-cheese board makes the kitchen feel inviting.",
    items: [
      { id: "k-fridge-top", text: "Clear the top of the refrigerator", phase: "day-before" },
      { id: "k-magnets", text: "Remove magnets, notepads, and papers from the fridge", phase: "day-before" },
      { id: "k-counters", text: "Counters completely empty, or only matching/minimal items left out", phase: "day-of" },
      { id: "k-cleaning", text: "Remove towels, rags, sponges, soaps, and visible cleaning products (matching decorative towels are fine)", phase: "day-of" },
    ],
  },
  {
    id: "dining",
    name: "Dining room",
    icon: "UtensilsCrossed",
    intro: "Set the table fully or clear it completely — nothing in between.",
    items: [
      { id: "d-bulbs", text: "Dim or turn off any bare bulbs in light fixtures", phase: "day-of" },
      { id: "d-chairs", text: "Place chairs in their correct positions around the table", phase: "day-of" },
      { id: "d-highchairs", text: "Remove high-chairs and booster seats", phase: "day-of" },
      { id: "d-table", text: "Table fully set or completely bare (a centerpiece is okay)", phase: "day-of" },
    ],
  },
  {
    id: "living",
    name: "Living room",
    icon: "Sofa",
    intro: "Keep soft furnishings tidy, matching, and minimal.",
    items: [
      { id: "l-decor", text: "Keep decor minimal and consistent", phase: "day-before" },
      { id: "l-pillows", text: "Pillows matching/complementary, not too many, arranged consistently", phase: "day-of" },
      { id: "l-blankets", text: "Remove unmatched blankets; leave only clean, matching ones arranged neatly", phase: "day-of" },
    ],
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    icon: "Bath",
    intro: "Clear the counters and add fresh, matching towels.",
    items: [
      { id: "b-towels", text: "Place clean, matching towels on rings/hooks", phase: "day-before" },
      { id: "b-supplies", text: "Clear visible cleaning tools and extra personal-care items", phase: "day-before" },
      { id: "b-organizers", text: "Hide organizers and extra storage containers", phase: "day-before" },
      { id: "b-counters", text: "Clear counters except a clean hand-soap dispenser", phase: "day-of" },
      { id: "b-curtains", text: "Shower curtains open if the shower is tiled/custom, otherwise closed", phase: "day-of" },
    ],
  },
  {
    id: "laundry",
    name: "Laundry room",
    icon: "WashingMachine",
    intro: "Hide the everyday mess and clear the machines.",
    items: [
      { id: "ld-store", text: "Neatly store or hide detergents, clothes, ironing boards, and steamers", phase: "day-before" },
      { id: "ld-empty", text: "Empty all laundry from the washer and dryer", phase: "day-of" },
    ],
  },
  {
    id: "closets",
    name: "Walk-in closets",
    icon: "Shirt",
    intro: "An organized closet reads as more storage space.",
    items: [
      { id: "c-organize", text: "Organize hanging and stored items", phase: "day-before" },
      { id: "c-floor", text: "Remove as many items from the floor as possible", phase: "day-before" },
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    icon: "BedDouble",
    intro: "Crisp, made beds and clear surfaces do the heavy lifting here.",
    proTip: "Make sure under-bed storage isn't visible from any angle — or in mirrors.",
    items: [
      { id: "br-surfaces", text: "Clear nightstands, dressers, and furniture of personal items and books", phase: "day-before" },
      { id: "br-beds", text: "Make the beds with clean, minimal linens and consistent pillows", phase: "day-of" },
    ],
  },
  {
    id: "final",
    name: "Final touches (optional boosters)",
    icon: "Wand2",
    intro: "Want the space to really stand out? These extras give it a lift.",
    optional: true,
    items: [
      { id: "f-candles", text: "Add a few candles in the bath, living, or dining room for coziness", phase: "day-of" },
      { id: "f-plants", text: "Place small houseplants around for a pop of color", phase: "day-of" },
      { id: "f-color", text: "If a room feels too monochromatic after decluttering, add back one bold-color item", phase: "day-of" },
      { id: "f-pets", text: "Plan to contain pets during the appointment for their comfort", phase: "day-of" },
    ],
  },
];

export const allItemIds = areas.flatMap((a) => a.items.map((i) => i.id));
export const requiredItemIds = areas
  .filter((a) => !a.optional)
  .flatMap((a) => a.items.map((i) => i.id));

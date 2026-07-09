/* Blog content for the Resources section. Static, no CMS — posts authored here.
   Content is genuinely useful for Hampton Roads listing agents. */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMins: number;
  author: string;
  body: string; // markdown subset (see _components/markdown.tsx)
};

export const postCategories = [
  "All",
  "Listing prep",
  "Strategy",
  "Aerial",
  "3D & video",
  "Workflow",
] as const;

export const posts: Post[] = [
  {
    slug: "60-minute-listing-prep-checklist",
    title: "The 60-Minute Listing Prep Checklist (Before the Photographer Arrives)",
    excerpt:
      "The single biggest factor in great listing photos isn't the camera — it's the hour before the shoot. Here's the room-by-room checklist we wish every agent shared with their sellers.",
    category: "Listing prep",
    date: "2026-06-10",
    readMins: 6,
    author: "AREM Team",
    body: `Great listing photos start before we ever lift a camera. A clean, de-cluttered, well-lit home photographs dramatically better than a lived-in one — and no amount of editing fully fixes a messy room. Share this with your sellers a day or two ahead and your gallery will look like it belongs to a home twice the price.

## Whole-house, first
- Turn on **every** light in the house — including lamps, under-cabinet, and closet lights. Replace any dead bulbs (matching color temperature looks best).
- Open all blinds and curtains for natural light.
- Remove cars from the driveway and the front of the house.
- Hide trash cans, hoses, and recycling bins.
- Take down personal photos, diplomas, and anything with names or faces — buyers should picture themselves here.
- Tidy and hide all visible cords and chargers.

## Kitchen
- Clear the counters down to one or two intentional items (a bowl of fruit, a clean cutting board).
- Remove magnets, papers, and calendars from the fridge.
- Hide dish soap, sponges, and drying racks; empty the sink.
- Stow small appliances you don't use daily.

## Bathrooms
- Clear counters of toiletries, toothbrushes, and razors.
- Hang fresh, matching towels (or remove towels entirely for a clean look).
- Close toilet lids. Always.
- Remove bath mats and trash cans.

## Living & bedrooms
- Make every bed crisply; remove laundry and pet beds.
- Fluff and square the couch cushions and pillows.
- Clear nightstands to a lamp and maybe one book.
- Pick up toys, shoes, and floor clutter.

## Outside
- Mow, edge, and sweep walkways and the porch.
- Put away kids' toys, sports equipment, and gardening tools.
- Add a clean doormat; a couple of potted plants by the door go a long way.

> A good rule of thumb: if it isn't furniture, art, or a deliberate accent, it probably shouldn't be in the photo.

If a listing needs more than a tidy — think vacant rooms or dated furnishings — ask us about **virtual staging**. It's a fraction of the cost of physical staging and delivered in the same turnaround.`,
  },
  {
    slug: "why-twilight-photos-sell",
    title: "Why Twilight Photos Sell Homes Faster",
    excerpt:
      "One dusk exterior can do more for a listing's click-through rate than a dozen daytime shots. Here's when twilight is worth it — and how to fake it when the weather won't cooperate.",
    category: "Strategy",
    date: "2026-05-22",
    readMins: 4,
    author: "AREM Team",
    body: `Scroll any portal and the listings that stop your thumb are almost always the ones with a glowing, golden-hour hero shot. There's a reason: a twilight exterior signals *premium* before a buyer reads a single word.

## What twilight actually does
- **It creates contrast.** Warm interior light against a deep blue sky reads as "home" on an instinctive level.
- **It hides flaws.** Soft dusk light flatters siding, rooflines, and landscaping that look ordinary at noon.
- **It earns the click.** As a primary photo, a twilight shot consistently lifts listing engagement — and the first photo is the whole ballgame on the MLS and social.

## When it's worth it
Twilight pays off most on:
- Waterfront and view properties
- Homes with great exterior lighting or architectural character
- Higher-price listings where presentation drives the showing
- Pool and outdoor-living homes

## Day-to-dusk when the sky won't cooperate
Real twilight requires a photographer on-site in a 20-minute window at sunset — and Hampton Roads weather doesn't always agree. **AI day-to-dusk conversion** turns a daytime exterior into a convincing dusk shot at a fraction of the cost and with no second trip. It isn't quite a true on-site twilight, but for most listings it's the smart, fast call.

Either way, lead your gallery with it. The twilight shot is the one that gets the showing booked.`,
  },
  {
    slug: "drone-photos-and-the-rules",
    title: "Drone Photos & the Rules: What Hampton Roads Agents Should Know",
    excerpt:
      "Aerial shots sell lots, location, and lifestyle — but Hampton Roads has more restricted airspace than almost anywhere in the country. Here's how to keep your listing legal and grounded in reality.",
    category: "Aerial",
    date: "2026-05-05",
    readMins: 5,
    author: "AREM Team",
    body: `Aerial photography is one of the most persuasive tools in a listing — it shows the lot, the setting, proximity to the water, and the neighborhood in a single frame. But Hampton Roads is also wrapped in some of the most restricted airspace in the nation, thanks to a dense cluster of military installations.

## Why airspace matters here
Between Naval Station Norfolk, Langley, Oceana, and several others, large parts of the region sit under controlled or restricted airspace. Flying a drone for a listing — which is commercial use — has real rules behind it.

## What a legitimate aerial provider handles for you
- **A licensed pilot.** Commercial drone work requires an FAA Part 107 certificate. Always.
- **Airspace authorization.** Many local flights need LAANC authorization (or can't happen at all). A good provider checks before they ever drive out.
- **Insurance.** Reputable operators carry liability coverage for the flight.
- **Weather and safety calls.** Wind and rain ground drones; a pro reschedules the aerial portion rather than risking a bad — or unsafe — flight.

> If a "drone guy" can't tell you their Part 107 number and whether your address needs authorization, that's your answer.

## What aerials are great for
- Waterfront and acreage where the lot is the story
- Showing proximity to amenities, schools, or the beach
- Establishing context for new construction
- Communities with shared amenities (pools, docks, trails)

When the weather grounds a flight at your listing, we reschedule that piece at no extra charge — the rest of the shoot goes ahead as planned. You get the aerials *and* you stay on the right side of the rules.`,
  },
  {
    slug: "3d-tours-close-relocation-buyers",
    title: "How 3D Tours Close Out-of-Town & Military Buyers",
    excerpt:
      "In a market full of PCS moves and relocations, the buyer who tours your listing first is often hundreds of miles away. A Matterport tour is how you sell to them before they land.",
    category: "3D & video",
    date: "2026-04-18",
    readMins: 4,
    author: "AREM Team",
    body: `Hampton Roads runs on relocation. Between military PCS orders, contractors, and out-of-state buyers chasing coastal value, a huge share of buyers can't walk a home before they need to make a decision. A Matterport 3D tour is how you let them — anytime, from anywhere.

## What a 3D tour does that photos can't
- **It answers "how does it flow?"** Buyers walk the home in sequence and understand the layout, not just isolated rooms.
- **It qualifies showings.** Out-of-town buyers self-tour first, so the in-person showings you do book are far more serious.
- **It builds trust.** A full digital twin signals there's nothing to hide — powerful for a buyer committing sight-unseen.
- **It cuts wasted trips.** Fewer "drove an hour and it wasn't for us" showings for everyone.

## Where it earns its keep
- Military and relocation buyers on a clock
- Higher-price and unique-layout homes
- Any listing where you want to reduce showing friction
- New construction and renovations worth walking through

A 3D tour embeds straight into the MLS and your listing site, and pairs with a schematic floor view so buyers get dimensions and flow together. For the relocation buyer, it's the next best thing to standing in the doorway — and often the thing that gets the offer in before they ever visit.`,
  },
  {
    slug: "listing-photo-mistakes",
    title: "7 Listing-Photo Mistakes That Quietly Cost You Showings",
    excerpt:
      "Most listings don't lose buyers with one terrible photo — they lose them with seven small, fixable ones. Here's the quick audit we run on every gallery.",
    category: "Strategy",
    date: "2026-03-30",
    readMins: 5,
    author: "AREM Team",
    body: `Buyers decide whether to book a showing in seconds, mostly from the photos. Rarely is it one disaster that loses them — it's an accumulation of small, avoidable mistakes. Run this audit before any gallery goes live.

## 1. A weak first photo
The lead image is the entire first impression on the MLS and every portal. It should be the home's single most flattering angle — often a twilight or hero exterior, not the entryway.

## 2. Dark, flat rooms
Underexposed interiors read as small and gloomy. Proper HDR balances bright windows with the room so the space looks open and true to life.

## 3. Crooked verticals
Tilted walls and door frames make a home feel off-kilter even when buyers can't say why. Straight verticals are a quiet mark of professional work.

## 4. Clutter left in frame
Trash cans, cords, dish soap, pet bowls, and fridge magnets all pull the eye. A clean frame keeps attention on the home. (See our [60-minute prep checklist](/blog/60-minute-listing-prep-checklist).)

## 5. Too few — or too many — photos
Skimping makes buyers suspicious; 60 near-identical shots make them tune out. Cover every room and selling feature with intention, then stop.

## 6. No sense of the lot or location
Especially on waterfront or acreage, ground-level photos miss the story. One aerial often does more than five exteriors.

## 7. Slow turnaround
The best photos don't help if the listing sits unphotographed for four days. Next-day delivery keeps your launch on schedule and your seller happy.

> Fix the first photo, the lighting, and the clutter and you've solved 80% of bad galleries before they happen.`,
  },
  {
    slug: "winning-the-first-24-hours",
    title: "Shoot, List, Go Live: Winning the First 24 Hours",
    excerpt:
      "A listing gets its biggest burst of attention the day it hits the market. Here's how to compress prep, media, and launch into a single day so you never waste that window.",
    category: "Workflow",
    date: "2026-03-12",
    readMins: 4,
    author: "AREM Team",
    body: `A new listing is never more visible than in its first 24–48 hours. Every saved search and portal alert fires at once. If your photos aren't ready, you're spending that one-time burst of attention on an empty or placeholder listing — and you don't get it back.

## The fast-launch playbook
1. **Book the shoot when you take the listing**, not after the sign goes up. Lock a time the moment the seller signs.
2. **Send the prep checklist** to your seller the same day so the home is camera-ready on arrival.
3. **Shoot in the morning** when possible — morning shoots are often delivered the same evening.
4. **Have your MLS draft ready** — copy, price, and details — so the only thing you're waiting on is media.
5. **Drop the media and go live** the next morning, ahead of the weekend if you can.

## Why next-day delivery is the whole game
A two- or three-day photo turnaround quietly costs you the launch window. With next-day delivery, you can take a listing on Tuesday, shoot Wednesday morning, and go live Thursday — fresh, fully merchandised, and timed for peak traffic.

> Speed isn't a luxury in a fast market. It's how you make the first 24 hours actually count.

Pick your package and preferred timing through online booking, then AREM confirms scope, access, and any constraints before the shoot is locked.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

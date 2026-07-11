import {
  ArrowRight,
  Building2,
  CalendarDays,
  ExternalLink,
  Landmark,
  MapPinned,
} from "lucide-react";
import { company } from "../site-data";
import { hasDb } from "../../lib/db";
import { getCityCoverageSummary, type CityCoverageSummary } from "../../lib/coverage";
import { getPublicListings } from "../../lib/public-listings";
import {
  chesapeakeBusinesses,
  chesapeakeNeighborhoods,
  representativeChesapeakeListings,
} from "./chesapeake-data";
import { ChesapeakeListingDirectory } from "./chesapeake-listing-directory";

async function loadCoverageSummary(): Promise<CityCoverageSummary | null> {
  if (!hasDb) return null;
  try {
    return await getCityCoverageSummary("Chesapeake", "VA");
  } catch {
    return null;
  }
}

function formatMonthYear(value: string | null) {
  if (!value) return null;
  const date = new Date(`${value.slice(0, 10)}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function ChesapeakePilot() {
  const [coverage, feed] = await Promise.all([
    loadCoverageSummary(),
    getPublicListings("Chesapeake"),
  ]);
  const live = feed.connected && feed.listings.length > 0;
  const listings = live ? feed.listings : [...representativeChesapeakeListings];
  const latestCoverage = formatMonthYear(coverage?.latestShootDate ?? null);
  const listingJsonLd = live
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Active Chesapeake listings photographed by AREM",
        itemListElement: listings.map((listing, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "RealEstateListing",
            name: listing.title,
            url: listing.href ?? undefined,
            image: listing.heroImage,
            dateModified: listing.updatedAt,
            about: {
              "@type": "Residence",
              name: `${listing.propertyType} in ${listing.neighborhood}, Chesapeake`,
              numberOfBedrooms: listing.bedrooms ?? undefined,
              floorSize: listing.livingAreaSqft
                ? {
                    "@type": "QuantitativeValue",
                    value: listing.livingAreaSqft,
                    unitCode: "FTK",
                  }
                : undefined,
            },
            offers: listing.price
              ? {
                  "@type": "Offer",
                  price: listing.price,
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                }
              : undefined,
          },
        })),
      }
    : null;

  const proofPoints = [
    {
      value: coverage ? coverage.totalShoots.toLocaleString() : company.stats.shoots,
      label: coverage ? "Chesapeake shoots in the archive" : "AREM shoots since 2016",
    },
    {
      value: coverage ? `${coverage.activeYears} years` : "Since 2016",
      label: latestCoverage ? `Coverage through ${latestCoverage}` : "Established Hampton Roads coverage",
    },
    {
      value: "5 local areas",
      label: "Detailed below with property-specific media guidance",
    },
    {
      value: company.stats.turnaround,
      label: "Standard listing-asset delivery target",
    },
  ];

  return (
    <>
      {listingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
        />
      )}
      <section className="border-b border-line bg-night text-paper">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="eyebrow text-twilight">Chesapeake market proof</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                Chesapeake is not one kind of listing market.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/70">
                Greenbrier condos, Great Bridge waterfront homes, Western Branch
                resales, and southern Chesapeake acreage need different media
                decisions. The page below connects local context to the way each
                property should be photographed and launched.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-paper/15 lg:grid-cols-4">
              {proofPoints.map((point) => (
                <div key={point.label} className="min-h-32 bg-night p-4 sm:p-5">
                  <p className="text-xl font-semibold tracking-tight text-paper">{point.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-paper/55">{point.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="chesapeake-neighborhoods" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="eyebrow text-brand">Neighborhood field guide</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Local context that changes the media plan.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Chesapeake spans dense commercial corridors, mature subdivisions,
              canals, planned communities, and rural acreage. These are practical
              listing notes, not generic neighborhood descriptions.
            </p>
            <nav aria-label="Chesapeake neighborhood sections" className="mt-6 border-y border-line py-4">
              <ul className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-1">
                {chesapeakeNeighborhoods.map((neighborhood) => (
                  <li key={neighborhood.slug}>
                    <a
                      href={`#${neighborhood.slug}`}
                      className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-ink"
                    >
                      <MapPinned className="h-4 w-4" /> {neighborhood.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {chesapeakeNeighborhoods.map((neighborhood) => (
              <article
                id={neighborhood.slug}
                key={neighborhood.slug}
                className="scroll-mt-24 py-7 first:pt-0 last:pb-0"
              >
                <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr]">
                  <div>
                    <p className="font-mono text-[0.68rem] font-semibold uppercase text-brand">
                      {neighborhood.area}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                      {neighborhood.name}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {neighborhood.landmarks.map((landmark) => (
                        <span
                          key={landmark}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2 px-2.5 py-1 text-xs text-ink-2"
                        >
                          <Landmark className="h-3 w-3 text-brand" /> {landmark}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-ink-2">{neighborhood.overview}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      <span className="font-semibold text-ink">Listing lens: </span>
                      {neighborhood.listingLens}
                    </p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {neighborhood.mediaPlan.map((item) => (
                        <p key={item} className="border-t border-line pt-2 text-xs font-medium text-ink">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChesapeakeListingDirectory listings={listings} live={live} updatedAt={feed.updatedAt} />

      <section id="chesapeake-businesses" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="eyebrow text-brand">Local places to know</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Independent businesses help explain the city around the listing.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              These are editorial community references, selected because they
              add useful context to the Chesapeake areas described above. They
              are not paid placements or service endorsements.
            </p>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {chesapeakeBusinesses.map((business) => (
              <article key={business.name} className="grid gap-4 py-6 sm:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase text-brand">
                    <Building2 className="h-3.5 w-3.5" /> {business.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{business.name}</h3>
                  <p className="mt-1 text-xs text-muted">{business.area}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-ink-2">{business.description}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    <span className="font-semibold text-ink">Local context: </span>
                    {business.relevance}
                  </p>
                  <a
                    href={business.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-ink"
                  >
                    Visit business <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-brand">
              <CalendarDays className="h-4 w-4" /> Chesapeake appointment planning
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              Match the media plan to the address before launch day.
            </h2>
          </div>
          <a
            href={company.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-ink"
          >
            Book in Chesapeake <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}

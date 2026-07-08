import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Aperture,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  Cuboid,
  Layers3,
  MapPinned,
  MoonStar,
  Plane,
  Play,
  ShieldCheck,
  Ruler,
  Star,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import "./styles.css";

type Direction = "studio" | "system" | "playbook" | "local" | "hybrid";

const bookingUrl = "https://americanrealestatemedia.aryeo.com/";
const phoneUrl = "tel:+17576658656";
const samplesUrl = "https://americanrealestatemedia.com/real-estate-photography-gallery";

const aremImages = {
  heroExterior: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
  twilight: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834683237-GGSLCEONKIJ04QQERTNV/1920%2B%2B%282%29.jpg",
  interior: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834761519-HGXR84WE4739T0LMWUGL/A9907058.jpg",
  kitchen: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834690590-2L9S48OLBUJ43VCG5Y54/A9904570_1.jpg",
  living: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834605378-F3WMBB3UU67XF7V2G6FO/1920%2B%2B%2818%29.jpg",
  aerial: "https://images.squarespace-cdn.com/content/v1/5f13be7a7449b4666085ff74/1599834616645-WXP4SFD2RD2TFL0PCRQO/A9907040.jpg",
};

const services = [
  { icon: Camera, title: "Photography", text: "HDR interior and exterior photos edited for MLS, web, social, and print." },
  { icon: Video, title: "Walkthrough Video", text: "Listing films and social cuts that help buyers feel the flow before they visit." },
  { icon: Plane, title: "Drone & Aerial", text: "FAA-friendly aerial stills and video for lot lines, water, land, and context." },
  { icon: Cuboid, title: "Matterport 3D", text: "Immersive tours for relocation buyers, busy sellers, and sight-unseen confidence." },
  { icon: MoonStar, title: "Twilight", text: "Golden-hour and day-to-dusk imagery designed to stop the scroll." },
  { icon: Ruler, title: "Floor Plans", text: "Readable plans and measurements that reduce buyer uncertainty." },
  { icon: Wand2, title: "Virtual Staging", text: "Warm, realistic furnishing for empty rooms without delaying launch." },
  { icon: Layers3, title: "Advanced Editing", text: "Polish, declutter, replace screens, enhance skies, and solve visual blockers." },
];

const packages = [
  {
    name: "Value Listing",
    label: "Essential launch",
    price: "Starting at $X",
    copy: "Clean listing photography for speed-sensitive properties.",
    items: ["Up to 25 HDR photos", "MLS-ready sizing", "Online gallery", "Next-day delivery"],
  },
  {
    name: "Quick & Easy",
    label: "Photos plus motion",
    price: "Starting at $X",
    copy: "The practical upgrade for agents who want more reach without overbuilding.",
    items: ["Up to 35 HDR photos", "Vertical social video", "Drone exterior photos", "Next-day delivery"],
    featured: true,
  },
  {
    name: "Property Spotlight",
    label: "Most popular",
    price: "Starting at $X",
    copy: "A richer launch kit for homes where first impression carries the showing.",
    items: ["Up to 45 HDR photos", "Walkthrough video tour", "Drone photos and video", "2D floor plan"],
  },
  {
    name: "Perfect Marketing",
    label: "Full media suite",
    price: "Starting at $X",
    copy: "The complete package for sellers expecting a premium presentation.",
    items: ["50+ HDR photos", "Cinematic video and social", "Matterport 3D tour", "Floor plan and twilight"],
  },
];

const locations = ["Virginia Beach", "Norfolk", "Chesapeake", "Hampton Roads", "Williamsburg", "Richmond", "Coastal VA", "NE North Carolina"];

const portfolio = [
  {
    city: "Curb appeal hero",
    image: aremImages.twilight,
    tags: ["Exterior", "Aerial", "Video"],
  },
  {
    city: "Bright interior story",
    image: aremImages.interior,
    tags: ["Photography", "Social cuts"],
  },
  {
    city: "MLS kitchen hero",
    image: aremImages.living,
    tags: ["HDR", "Next day"],
  },
  {
    city: "Exterior context",
    image: aremImages.heroExterior,
    tags: ["Drone", "Listing site"],
  },
];

const operationalDetails = [
  { title: "Prep guide", text: "Clear seller checklist before arrival, including staging, lights, vehicles, pets, and access." },
  { title: "Weather calls", text: "Drone, twilight, and exterior-heavy shoots get a practical go/no-go review when conditions matter." },
  { title: "Add-ons", text: "Twilight, virtual staging, extra aerial, floor plans, Matterport, and advanced editing attach to any launch." },
  { title: "Support", text: "Call, email, or book directly through Aryeo; the public site should make every next step obvious." },
];

const process = [
  { icon: CalendarCheck, title: "Book in 60 seconds", text: "Choose a package, add the details, and lock the shoot through the portal." },
  { icon: Compass, title: "We capture the full story", text: "Photo, video, drone, 3D, twilight, and floor plans handled by one team." },
  { icon: Zap, title: "Launch next day", text: "Edited media arrives ready for MLS, social, seller updates, and paid campaigns." },
];

function App() {
  const params = new URLSearchParams(window.location.search);
  const requestedDirection = params.get("direction");
  const initialDirection: Direction =
    requestedDirection === "system" || requestedDirection === "playbook" || requestedDirection === "local" || requestedDirection === "hybrid"
      ? requestedDirection
      : "studio";
  const [direction, setDirection] = useState<Direction>(initialDirection);

  return (
    <main className={`site ${direction}`}>
      <Header direction={direction} onDirectionChange={setDirection} />
      {direction === "studio" && <StudioDirection />}
      {direction === "system" && <SystemDirection />}
      {direction === "playbook" && <PlaybookDirection />}
      {direction === "local" && <LocalDirection />}
      {direction === "hybrid" && <HybridDirection />}
    </main>
  );
}

function Header({ direction, onDirectionChange }: { direction: Direction; onDirectionChange: (direction: Direction) => void }) {
  return (
    <header className="nav-shell">
      <a className="brand" href="#top" aria-label="American Real Estate Media home">
        <span className="brand-mark">AR</span>
        <span>
          <strong>American Real Estate Media</strong>
          <small>Coastal VA · NE North Carolina</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#packages">Packages</a>
        <a href="#coverage">Coverage</a>
      </nav>
      <div className="nav-actions">
        <div className="toggle four-up" aria-label="Design direction">
          {[
            ["studio", "A", "Show Direction A, cinematic studio"],
            ["system", "B", "Show Direction B, booking system"],
            ["playbook", "C", "Show Direction C, listing playbook"],
            ["local", "D", "Show Direction D, local market trust"],
            ["hybrid", "E", "Show Direction E, hybrid candidate"],
          ].map(([value, label, srLabel]) => (
            <button
              className={direction === value ? "active" : ""}
              onClick={() => onDirectionChange(value as Direction)}
              aria-pressed={direction === value}
              key={value}
            >
              <span aria-hidden="true">{label}</span>
              <span className="sr-only">{srLabel}</span>
            </button>
          ))}
        </div>
        <a className="btn ghost" href={phoneUrl}>(757) 665-8656</a>
        <a className="btn solid" href={bookingUrl}>Book <ArrowRight size={16} /></a>
      </div>
    </header>
  );
}

function StudioDirection() {
  return (
    <>
      <section id="top" className="hero studio-hero">
        <div className="hero-media-grid" aria-hidden="true">
          <img className="tile tall" src={aremImages.heroExterior} alt="" decoding="async" />
          <img src={aremImages.interior} alt="" decoding="async" />
          <img src={aremImages.living} alt="" decoding="async" />
          <img className="wide" src={aremImages.twilight} alt="" decoding="async" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Real estate media for agents who launch louder</p>
          <h1>Be the listing buyers remember.</h1>
          <p className="lede">
            Photography, video, aerial, 3D tours, floor plans, twilight, and social-ready edits from one local media team,
            delivered next business day.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href={bookingUrl}>Book a shoot <ArrowRight size={18} /></a>
            <a className="btn glass" href="#work"><Play size={17} /> See the work</a>
          </div>
          <Stats />
        </div>
      </section>
      <PersonaStrip />
      <PortfolioSection />
      <SellerImpactSection />
      <ServiceGrid />
      <CampaignBuilder />
      <PackageSection />
      <CoverageSection />
      <FinalCta title="Launch every listing like a campaign." />
    </>
  );
}

function SystemDirection() {
  return (
    <>
      <section id="top" className="hero system-hero">
        <div className="system-copy">
          <p className="eyebrow">American Real Estate Media</p>
          <h1>The listing media operating system for Coastal Virginia agents.</h1>
          <p className="lede">
            Book once, get the full launch kit: photos, video, drone, Matterport, floor plans, twilight, and add-ons
            coordinated through one reliable next-day workflow.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href={bookingUrl}>Book in the portal <ArrowRight size={18} /></a>
            <a className="btn ghost" href="#packages">Compare packages</a>
          </div>
          <div className="ops-panel" aria-label="Booking workflow status">
            <div><span>01</span><strong>Choose package</strong><small>Value, Quick & Easy, Spotlight, Perfect</small></div>
            <div><span>02</span><strong>Capture day</strong><small>Local pros handle every media product</small></div>
            <div><span>03</span><strong>Next-day launch</strong><small>MLS, social, seller-ready delivery</small></div>
          </div>
        </div>
        <div className="dashboard-preview">
          <img src={aremImages.interior} alt="Bright real estate listing photography" decoding="async" />
          <div className="booking-card">
            <strong>Next available</strong>
            <span>Tomorrow · 10:30 AM</span>
            <a href={bookingUrl}>Reserve shoot</a>
          </div>
          <div className="delivery-card">
            <Clock3 size={18} />
            <span>Average delivery</span>
            <strong>Next business day</strong>
          </div>
        </div>
      </section>
      <ProofBar />
      <ServiceGrid />
      <PackageMatrix />
      <OperationsSection />
      <ProcessSection />
      <CoverageSection />
      <FinalCta title="One booking. The full media package." />
    </>
  );
}

function PlaybookDirection() {
  return (
    <>
      <section id="top" className="hero playbook-hero">
        <div className="playbook-copy">
          <p className="eyebrow">Direction C · Listing playbook</p>
          <h1>A clearer media plan for every listing.</h1>
          <p className="lede">
            Help agents choose the right launch kit by property type, seller expectation, timeline, and market moment,
            then move straight into booking.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href="#packages">Find the right package <ArrowRight size={18} /></a>
            <a className="btn ghost" href={samplesUrl}>View samples</a>
          </div>
        </div>
        <div className="playbook-panel">
          <div className="playbook-tabs">
            <span className="active">Occupied</span>
            <span>Vacant</span>
            <span>Luxury</span>
            <span>Land</span>
          </div>
          <img src={aremImages.living} alt="Kitchen and living area media sample" decoding="async" />
          <div className="playbook-recommend">
            <strong>Recommended path</strong>
            <p>Quick & Easy for speed, Property Spotlight when outdoor setting or seller expectations matter.</p>
          </div>
        </div>
      </section>
      <StrategySection />
      <PackageMatrix />
      <ServiceGrid />
      <ProcessSection />
      <FinalCta title="Make media selection feel simple." />
    </>
  );
}

function LocalDirection() {
  return (
    <>
      <section id="top" className="hero local-hero">
        <div className="local-photo">
          <img src={aremImages.heroExterior} alt="American Real Estate Media exterior listing sample" decoding="async" />
        </div>
        <div className="local-copy">
          <p className="eyebrow">Direction D · Local market trust</p>
          <h1>Local media pros for Coastal Virginia listings.</h1>
          <p className="lede">
            A grounded, regional site direction built around service area confidence, next-day delivery, and a team that
            knows how homes sell across Hampton Roads and northeastern North Carolina.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href={bookingUrl}>Book locally <ArrowRight size={18} /></a>
            <a className="btn ghost" href="#coverage">Check coverage</a>
          </div>
          <Stats />
        </div>
      </section>
      <CoverageSection />
      <LocalTrustSection />
      <ServiceGrid />
      <PackageSection />
      <OperationsSection />
      <FinalCta title="A reliable local team for every listing launch." />
    </>
  );
}

function HybridDirection() {
  return (
    <>
      <section id="top" className="hero hybrid-hero">
        <div className="hybrid-copy">
          <p className="eyebrow">Version E · Hybrid candidate</p>
          <h1>Real estate media that gets listings launched.</h1>
          <p className="lede">
            Photos, video, drone, 3D tours, floor plans, twilight, and social-ready assets from one Coastal Virginia
            team, delivered next business day.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href={bookingUrl}>Book a shoot <ArrowRight size={18} /></a>
            <a className="btn ghost" href="#packages">Compare packages</a>
            <a className="btn glass" href="#recommender">Get a recommendation</a>
          </div>
          <div className="hybrid-proof">
            <div><strong>50,000+</strong><span>shoots completed since 2016</span></div>
            <div><strong>Next day</strong><span>average delivery for MLS-ready media</span></div>
            <div><strong>20+ cities</strong><span>across Coastal VA and NE North Carolina</span></div>
          </div>
        </div>
        <div className="hybrid-media" aria-label="American Real Estate Media sample listing media">
          <img className="hybrid-main" src={aremImages.heroExterior} alt="Exterior real estate photography sample" decoding="async" />
          <img src={aremImages.interior} alt="Interior real estate photography sample" decoding="async" />
          <img src={aremImages.living} alt="Kitchen real estate photography sample" decoding="async" />
          <div className="hybrid-booking-card">
            <CalendarCheck size={18} />
            <strong>One appointment</strong>
            <span>Photo, video, drone, 3D, floor plans, twilight, and edits coordinated together.</span>
          </div>
        </div>
      </section>
      <HybridTrustBar />
      <PackageMatrix />
      <HybridRecommender />
      <PortfolioSection />
      <OperationsSection />
      <CoverageSection />
      <FinalCta title="One listing. One local team. One launch-ready media package." />
    </>
  );
}

function Stats() {
  return (
    <div className="stats" aria-label="Company proof points">
      <div><strong>50,000+</strong><span>shoots since 2016</span></div>
      <div><strong>20+</strong><span>cities served</span></div>
      <div><strong>Next day</strong><span>average delivery</span></div>
    </div>
  );
}

function PersonaStrip() {
  const personas = ["Listing agent", "Luxury seller", "Brokerage team", "Builder", "Relocation buyer"];
  return (
    <section className="persona-strip">
      <span>Route me to:</span>
      {personas.map((persona) => <a href={bookingUrl} key={persona}>{persona}</a>)}
    </section>
  );
}

function ProofBar() {
  return (
    <section className="proof-bar">
      <Stats />
      <div className="proof-quote">
        <Star size={18} fill="currentColor" />
        <p>“Booking is simple and the Matterport tours alone have closed buyers relocating to Hampton Roads sight-unseen.”</p>
      </div>
    </section>
  );
}

function HybridTrustBar() {
  return (
    <section className="hybrid-trust-bar">
      <article>
        <ShieldCheck size={20} />
        <strong>Built for repeatable launches</strong>
        <span>Clear packages, portal booking, prep guidance, and one accountable media team.</span>
      </article>
      <article>
        <MapPinned size={20} />
        <strong>Local coverage depth</strong>
        <span>Hampton Roads, Coastal Virginia, Richmond, Williamsburg, and northeastern North Carolina.</span>
      </article>
      <article>
        <Star size={20} />
        <strong>Seller-ready presentation</strong>
        <span>Visuals agents can use in MLS, social, listing appointments, and seller updates.</span>
      </article>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="work" className="section">
      <div className="section-head">
        <p className="eyebrow">Real listing energy</p>
        <h2>Campaign visuals that feel premium before the first showing.</h2>
        <a className="text-link" href={samplesUrl}>Open sample gallery <ChevronRight size={16} /></a>
      </div>
      <div className="portfolio-grid">
        {portfolio.map((item) => (
          <article className="portfolio-card" key={item.city}>
            <img src={item.image} alt={`${item.city} property media sample`} decoding="async" />
            <div>
              <strong>{item.city}</strong>
              <span>{item.tags.join(" · ")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceGrid() {
  return (
    <section id="services" className="section service-section">
      <div className="section-head compact">
        <p className="eyebrow">Everything in one shoot</p>
        <h2>Build the exact launch kit the listing deserves.</h2>
      </div>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, text }) => (
          <article className="service-card" key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SellerImpactSection() {
  return (
    <section className="impact-band">
      <div>
        <p className="eyebrow">Seller presentation</p>
        <h2>Give agents a better story to win, launch, and report back.</h2>
      </div>
      <div className="impact-grid">
        <article>
          <strong>Listing appointment</strong>
          <p>Show sellers a clear media plan before the sign goes in the yard.</p>
        </article>
        <article>
          <strong>Launch week</strong>
          <p>Deliver MLS photos, video, aerial, 3D, and social assets from one coordinated shoot.</p>
        </article>
        <article>
          <strong>Seller updates</strong>
          <p>Point to polished visuals, tour links, and paid/social-friendly assets with confidence.</p>
        </article>
      </div>
    </section>
  );
}

function CampaignBuilder() {
  return (
    <section className="builder-band">
      <div>
        <p className="eyebrow">Smart package guidance</p>
        <h2>Pick the property. We suggest the media mix.</h2>
        <p>
          Instead of forcing agents to decode every option, the site can recommend a practical launch plan by property
          type, price point, seller goal, and deadline.
        </p>
      </div>
      <div className="recommendation">
        <span>Recommended for waterfront luxury</span>
          <strong>Property Spotlight + Twilight + Drone Video</strong>
        <ul>
          <li><Check size={15} /> Show the setting and water approach</li>
          <li><Check size={15} /> Lead MLS with twilight exterior</li>
          <li><Check size={15} /> Create short-form social motion</li>
        </ul>
      </div>
    </section>
  );
}

function HybridRecommender() {
  return (
    <section id="recommender" className="hybrid-recommender">
      <div>
        <p className="eyebrow">Package recommender</p>
        <h2>Start with the listing. We’ll point agents to the right media mix.</h2>
        <p>
          This keeps C’s decision support, but makes it more practical: common listing scenarios map directly to packages
          and add-ons.
        </p>
      </div>
      <div className="hybrid-scenarios">
        {[
          ["Occupied home", "Quick & Easy", "Photos, vertical social video, drone exterior photos, next-day delivery."],
          ["Waterfront or acreage", "Property Spotlight", "Walkthrough video, drone photos and video, floor plan, add twilight."],
          ["Premium seller", "Perfect Marketing", "Full campaign kit with video, Matterport, floor plan, and twilight."],
          ["Fast MLS launch", "Value Listing", "Clean HDR photography, MLS-ready sizing, online gallery."],
        ].map(([scenario, packageName, detail]) => (
          <article key={scenario}>
            <span>{scenario}</span>
            <strong>{packageName}</strong>
            <p>{detail}</p>
            <a href={bookingUrl}>Book this path <ArrowRight size={15} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function StrategySection() {
  const strategies = [
    ["Fast MLS launch", "Value Listing", "Clean photos, online gallery, next-day delivery."],
    ["Social reach", "Quick & Easy", "Photo, vertical social video, and drone exterior context."],
    ["Premium seller", "Property Spotlight", "Video tour, aerial motion, floor plan, and stronger presentation."],
    ["Full campaign", "Perfect Marketing", "Photo, cinematic video, Matterport, floor plan, and twilight."],
  ];

  return (
    <section className="section strategy-section">
      <div className="section-head">
        <p className="eyebrow">Decision support</p>
        <h2>Start with the listing goal, then choose the media.</h2>
      </div>
      <div className="strategy-grid">
        {strategies.map(([goal, packageName, detail]) => (
          <article key={goal}>
            <span>{goal}</span>
            <h3>{packageName}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LocalTrustSection() {
  return (
    <section className="local-trust">
      <div>
        <p className="eyebrow">Local proof</p>
        <h2>Built for agents balancing seller expectations and launch deadlines.</h2>
      </div>
      <div className="trust-list">
        <article><strong>Regional coverage</strong><span>Hampton Roads, Coastal Virginia, Richmond, Williamsburg, and NE North Carolina.</span></article>
        <article><strong>Practical scheduling</strong><span>Book through Aryeo, call the team, and keep shoots moving with clear prep expectations.</span></article>
        <article><strong>One accountable vendor</strong><span>Photo, video, drone, 3D, floor plans, twilight, staging, and edits stay coordinated.</span></article>
      </div>
    </section>
  );
}

function PackageSection() {
  return (
    <section id="packages" className="section package-section">
      <div className="section-head">
        <p className="eyebrow">Packages</p>
        <h2>Fast choices for common listing launches.</h2>
        <p>Pricing can wire into Aryeo later; this prototype focuses on hierarchy, clarity, and conversion flow.</p>
      </div>
      <div className="package-grid">
        {packages.map((pkg) => (
          <article className={`package-card ${pkg.featured ? "featured" : ""}`} key={pkg.name}>
            <span>{pkg.label}</span>
            <h3>{pkg.name}</h3>
            <strong className="package-price">{pkg.price}</strong>
            <p>{pkg.copy}</p>
            <ul>
              {pkg.items.map((item) => <li key={item}><BadgeCheck size={16} /> {item}</li>)}
            </ul>
            <a href={bookingUrl}>Book {pkg.name} <ArrowRight size={16} /></a>
          </article>
        ))}
      </div>
    </section>
  );
}

function PackageMatrix() {
  return (
    <section id="packages" className="section matrix-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Package comparison</p>
          <h2>Pick a tier. See exactly what changes.</h2>
        </div>
        <a className="btn ghost" href={bookingUrl}>Open booking portal</a>
      </div>
      <div className="matrix">
        <div className="matrix-row matrix-head">
          <span>Package</span>
          <span>Best for</span>
          <span>Core deliverables</span>
          <span>Next step</span>
        </div>
        {packages.map((pkg) => (
          <div className="matrix-row" key={pkg.name}>
            <span><strong>{pkg.name}</strong><small>{pkg.price}</small></span>
            <span>{pkg.label}</span>
            <span>{pkg.items.join(" · ")}</span>
            <a href={bookingUrl}>Book <ArrowRight size={15} /></a>
          </div>
        ))}
      </div>
    </section>
  );
}

function OperationsSection() {
  return (
    <section className="ops-section">
      <div>
        <p className="eyebrow">Operational trust</p>
        <h2>The details that make booking feel low-risk.</h2>
      </div>
      <div className="ops-detail-grid">
        {operationalDetails.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section">
      <div className="section-head compact">
        <p className="eyebrow">Workflow</p>
        <h2>Designed for agents who cannot afford launch friction.</h2>
      </div>
      <div className="process-grid">
        {process.map(({ icon: Icon, title, text }) => (
          <article key={title}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CoverageSection() {
  return (
    <section id="coverage" className="coverage-section">
      <div>
        <p className="eyebrow">Coverage</p>
        <h2>Built around Hampton Roads, Coastal Virginia, and northeastern North Carolina.</h2>
      </div>
      <div className="location-cloud">
        {locations.map((location) => <span key={location}><MapPinned size={15} /> {location}</span>)}
      </div>
    </section>
  );
}

function FinalCta({ title }: { title: string }) {
  return (
    <section className="final-cta">
      <Aperture size={34} />
      <h2>{title}</h2>
      <p>American Real Estate Media helps agents deliver a polished seller experience without juggling separate vendors.</p>
      <div className="hero-actions">
        <a className="btn solid" href={bookingUrl}>Book a shoot <ArrowRight size={18} /></a>
        <a className="btn ghost" href={phoneUrl}>Call (757) 665-8656</a>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

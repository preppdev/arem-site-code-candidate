"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Loader2, MoveUpRight, PackageCheck, Sun, Waves } from "lucide-react";

type OrderIntelligenceToolsProps = {
  address: string;
  city: string;
  zip: string;
  packageName: string;
  addOns: string[];
  preferredDate: string;
  timeWindow: string;
};

type TidePoint = {
  time: string;
  level: number;
  type?: "H" | "L";
};

type TideResponse = {
  source: string;
  station: {
    id: string;
    name: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  requested?: {
    date: string;
    time: string;
    note: string;
  };
  current: (TidePoint & { trend: "rising" | "falling" | "slack" }) | null;
  points: TidePoint[];
  extremes: TidePoint[];
};

type PackageFeatures = {
  photos: boolean;
  floorPlan: boolean;
  website: boolean;
  drone: boolean;
  video: boolean;
  twilight: boolean;
  matterport: boolean;
  staging: boolean;
  clips: boolean;
};

const demoLocation = {
  latitude: 36.9467,
  longitude: -76.3300,
  label: "Sewells Point / Norfolk demo station",
};

function includedInPackage(packageName: string, addOnName: string) {
  if (packageName === "Perfect Marketing") {
    return ["Drone / aerial", "Walkthrough video", "Twilight / virtual twilight", "Matterport 3D"].includes(addOnName);
  }
  if (packageName === "Property Spotlight") {
    return ["Drone / aerial", "Walkthrough video", "Twilight / virtual twilight"].includes(addOnName);
  }
  return false;
}

function featuresFor(packageName: string, addOns: string[]): PackageFeatures {
  return {
    photos: true,
    floorPlan: true,
    website: true,
    drone: includedInPackage(packageName, "Drone / aerial") || addOns.includes("Drone / aerial"),
    video: includedInPackage(packageName, "Walkthrough video") || addOns.includes("Walkthrough video"),
    twilight:
      includedInPackage(packageName, "Twilight / virtual twilight") ||
      addOns.includes("Twilight / virtual twilight"),
    matterport: includedInPackage(packageName, "Matterport 3D") || addOns.includes("Matterport 3D"),
    staging: addOns.includes("Virtual staging"),
    clips: addOns.includes("Vertical social clips"),
  };
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

function timeWindowHour(timeWindow: string) {
  if (timeWindow === "Morning") return 9.5;
  if (timeWindow === "Midday") return 13;
  if (timeWindow === "Afternoon") return 16;
  if (timeWindow === "Twilight request") return 19.25;
  return new Date().getHours() + new Date().getMinutes() / 60;
}

function dayOfYear(date: Date) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

function degToRad(value: number) {
  return (value * Math.PI) / 180;
}

function radToDeg(value: number) {
  return (value * 180) / Math.PI;
}

function calculateSun(preferredDate: string, timeWindow: string) {
  const date = preferredDate ? new Date(`${preferredDate}T00:00:00`) : new Date();
  const hour = timeWindowHour(timeWindow);
  date.setHours(Math.floor(hour), Math.round((hour % 1) * 60), 0, 0);

  const latitude = demoLocation.latitude;
  const longitude = demoLocation.longitude;
  const timezone = -4;
  const day = dayOfYear(date);
  const gamma = (2 * Math.PI) / 365 * (day - 1 + (hour - 12) / 24);
  const equationOfTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));
  const declination =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);
  const minutes = hour * 60;
  const trueSolarTime = (minutes + equationOfTime + 4 * longitude - 60 * timezone + 1440) % 1440;
  const hourAngle = degToRad(trueSolarTime / 4 - 180);
  const latRad = degToRad(latitude);
  const cosZenith =
    Math.sin(latRad) * Math.sin(declination) +
    Math.cos(latRad) * Math.cos(declination) * Math.cos(hourAngle);
  const zenith = Math.acos(Math.max(-1, Math.min(1, cosZenith)));
  const altitude = 90 - radToDeg(zenith);
  const azimuth =
    (radToDeg(
      Math.atan2(
        Math.sin(hourAngle),
        Math.cos(hourAngle) * Math.sin(latRad) - Math.tan(declination) * Math.cos(latRad),
      ),
    ) +
      180) %
    360;
  const sunriseHourAngle = Math.acos(
    Math.cos(degToRad(90.833)) / (Math.cos(latRad) * Math.cos(declination)) -
      Math.tan(latRad) * Math.tan(declination),
  );
  const sunriseMinutes = 720 - 4 * (longitude + radToDeg(sunriseHourAngle)) - equationOfTime + timezone * 60;
  const sunsetMinutes = 720 - 4 * (longitude - radToDeg(sunriseHourAngle)) - equationOfTime + timezone * 60;
  const daylightProgress = Math.max(0, Math.min(1, (minutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes)));
  const shadowRatio = altitude > 4 ? 1 / Math.tan(degToRad(altitude)) : 12;

  return {
    altitude,
    azimuth,
    daylightProgress,
    shadowRatio,
    sunrise: sunriseMinutes,
    sunset: sunsetMinutes,
    date,
  };
}

function minutesToClock(minutes: number) {
  const normalized = (minutes + 1440) % 1440;
  const hour = Math.floor(normalized / 60);
  const minute = Math.round(normalized % 60);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function sunAdvice(altitude: number, timeWindow: string) {
  if (timeWindow === "Twilight request") {
    return "Twilight timing should be confirmed directly; use virtual twilight if weather or route timing is tight.";
  }
  if (altitude < 15) {
    return "Low sun can create long exterior shadows and glare. Confirm the priority elevation before locking the window.";
  }
  if (timeWindow === "Morning") {
    return "Morning is usually useful for cooler exterior light, but front-facing direction still matters.";
  }
  if (timeWindow === "Afternoon") {
    return "Afternoon can help west-facing exteriors and outdoor living areas, with stronger glare risk.";
  }
  return "Midday gives the shortest shadows, but can be harsh for pools, bright concrete, and waterfront glare.";
}

function chartPath(points: TidePoint[], width: number, height: number) {
  if (!points.length) return "";
  const levels = points.map((point) => point.level);
  const min = Math.min(...levels);
  const max = Math.max(...levels);
  const spread = Math.max(0.25, max - min);
  return points
    .map((point, index) => {
      const x = (index / Math.max(1, points.length - 1)) * width;
      const y = height - ((point.level - min) / spread) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function TideTool({
  address,
  city,
  zip,
  preferredDate,
  timeWindow,
}: Pick<OrderIntelligenceToolsProps, "address" | "city" | "zip" | "preferredDate" | "timeWindow">) {
  const [tide, setTide] = useState<TideResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (preferredDate) params.set("date", preferredDate);
    if (timeWindow) params.set("window", timeWindow);

    fetch(`/api/environment/tides?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load tides");
        return response.json() as Promise<TideResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        setTide(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [preferredDate, timeWindow]);

  const enteredAddress = address.trim()
    ? `${address}${city ? `, ${city}` : ""}${zip ? ` ${zip}` : ""}`
    : "No listing address entered yet";
  const requestedLabel = preferredDate
    ? `${preferredDate} · ${timeWindow}`
    : `Today · ${timeWindow}`;
  const points = tide?.points.slice(0, 48) ?? [];
  const chart = chartPath(points, 280, 92);
  const currentIndex = tide?.current
    ? Math.max(0, points.findIndex((point) => point.time === tide.current?.time))
    : -1;
  const currentX = currentIndex >= 0 ? (currentIndex / Math.max(1, points.length - 1)) * 280 : 0;

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-paper p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Waves className="h-4 w-4 text-brand" />
            Tide window
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-2">
            Demo NOAA station, not geocoded: {demoLocation.label}. Entered address: {enteredAddress}.
          </p>
        </div>
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin text-muted" />}
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-line bg-paper-2 p-3 text-sm leading-relaxed text-ink-2">
          Tide feed did not load. The production build should fall back to a cached station response.
        </p>
      )}

      {tide && (
        <div className="mt-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-semibold text-ink">
                {tide.current ? `${tide.current.level.toFixed(1)} ft` : "Pending"}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-brand">
                {tide.current?.trend ?? "loading"} tide for {requestedLabel}
              </p>
            </div>
            <p className="max-w-40 text-right text-xs leading-relaxed text-ink-2">
              NOAA {tide.station.name}, {tide.station.region}
            </p>
          </div>
          <p className="mt-3 rounded-lg border border-line bg-paper-2 p-3 text-xs leading-relaxed text-ink-2">
            Production guardrail: geocode the listing, choose the nearest NOAA station, show station distance, and require manual confirmation for waterfront, marsh, dock, or exterior-heavy shoots.
          </p>

          <svg className="mt-4 h-28 w-full overflow-visible" viewBox="0 0 280 112" role="img" aria-label="Tide rise and fall chart">
            <line x1="0" x2="280" y1="92" y2="92" className="stroke-line" strokeWidth="1" />
            <polyline points={chart} fill="none" className="stroke-brand" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            {currentIndex >= 0 && (
              <>
                <line x1={currentX} x2={currentX} y1="0" y2="92" className="stroke-twilight" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx={currentX} cy="46" r="4" className="fill-twilight" />
              </>
            )}
          </svg>

          <div className="grid gap-2 sm:grid-cols-2">
            {tide.extremes.slice(0, 4).map((point) => (
              <div key={`${point.time}-${point.type}`} className="rounded-lg bg-paper-2 px-3 py-2 text-xs">
                <span className="font-semibold text-ink">{point.type === "H" ? "High" : "Low"}</span>
                <span className="text-ink-2"> · {formatTime(point.time)} · {point.level.toFixed(1)} ft</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SunShadowTool({ preferredDate, timeWindow }: Pick<OrderIntelligenceToolsProps, "preferredDate" | "timeWindow">) {
  const sun = useMemo(() => calculateSun(preferredDate, timeWindow), [preferredDate, timeWindow]);
  const markerX = 24 + sun.daylightProgress * 232;
  const markerY = 86 - Math.sin(sun.daylightProgress * Math.PI) * 60;
  const shadowLength = Math.min(78, Math.max(16, sun.shadowRatio * 14));
  const shadowAngle = sun.azimuth + 180;

  return (
    <section className="rounded-[var(--radius-card)] border border-line bg-paper p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Sun className="h-4 w-4 text-twilight" />
            Sun and shadow
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-2">
            Demo solar model for {demoLocation.label}; not property-orientation aware yet.
          </p>
        </div>
        <Compass className="h-5 w-5 text-muted" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <svg className="h-32 w-full" viewBox="0 0 280 120" role="img" aria-label="Sun path chart">
          <path d="M24 86 C80 10 200 10 256 86" fill="none" className="stroke-line-strong" strokeWidth="5" strokeLinecap="round" />
          <path
            d={`M24 86 C80 10 200 10 ${markerX.toFixed(1)} ${markerY.toFixed(1)}`}
            fill="none"
            className="stroke-twilight"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx={markerX} cy={markerY} r="10" className="fill-twilight" />
          <line x1="20" x2="260" y1="98" y2="98" className="stroke-line" strokeWidth="1" />
          <text x="18" y="115" className="fill-muted text-[10px]">
            {minutesToClock(sun.sunrise)}
          </text>
          <text x="218" y="115" className="fill-muted text-[10px]">
            {minutesToClock(sun.sunset)}
          </text>
        </svg>

        <div className="grid place-items-center rounded-lg bg-paper-2 p-3">
          <div className="relative h-28 w-28 rounded-full border border-line bg-paper">
            <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[10px] font-semibold text-muted">N</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-muted">S</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted">W</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted">E</span>
            <span
              className="absolute left-1/2 top-1/2 h-1.5 origin-left rounded-full bg-ink/70"
              style={{
                width: `${shadowLength}px`,
                transform: `rotate(${shadowAngle}deg)`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md bg-brand text-white shadow-soft"
              aria-hidden="true"
            >
              <MoveUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <p className="rounded-lg bg-paper-2 px-3 py-2">
          <span className="font-semibold text-ink">{Math.max(0, sun.altitude).toFixed(0)} deg</span>
          <span className="text-ink-2"> altitude</span>
        </p>
        <p className="rounded-lg bg-paper-2 px-3 py-2">
          <span className="font-semibold text-ink">{sun.azimuth.toFixed(0)} deg</span>
          <span className="text-ink-2"> azimuth</span>
        </p>
        <p className="rounded-lg bg-paper-2 px-3 py-2">
          <span className="font-semibold text-ink">{sun.shadowRatio.toFixed(1)}x</span>
          <span className="text-ink-2"> shadow</span>
        </p>
      </div>
      <p className="mt-3 rounded-lg border border-line bg-paper-2 p-3 text-xs leading-relaxed text-ink-2">
        {sunAdvice(sun.altitude, timeWindow)}
      </p>
    </section>
  );
}

function PackageScene({ features, packageName }: { features: PackageFeatures; packageName: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(4.8, 3.2, 6.4);
      camera.lookAt(0, 0.3, 0);

      const root = new THREE.Group();
      scene.add(root);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x8aa0b8, 2.5));
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
      keyLight.position.set(3, 5, 4);
      scene.add(keyLight);

      const ink = new THREE.Color("#11151c");
      const brand = new THREE.Color("#1d4ed8");
      const twilight = new THREE.Color("#f59e0b");
      const paper = new THREE.Color("#f3f3ef");
      const line = new THREE.Color("#d6d6cd");

      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 5),
        new THREE.MeshStandardMaterial({ color: paper, roughness: 0.9 }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.55;
      root.add(ground);

      const house = new THREE.Mesh(
        new THREE.BoxGeometry(1.9, 1.1, 1.45),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 }),
      );
      house.position.y = 0.08;
      root.add(house);

      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(1.55, 0.75, 4),
        new THREE.MeshStandardMaterial({ color: ink, roughness: 0.55 }),
      );
      roof.position.y = 1.0;
      roof.rotation.y = Math.PI / 4;
      roof.scale.z = 0.8;
      root.add(roof);

      const lens = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.3, 32),
        new THREE.MeshStandardMaterial({ color: brand, metalness: 0.2, roughness: 0.35 }),
      );
      lens.rotation.z = Math.PI / 2;
      lens.position.set(-1.7, 0.1, 0.9);
      root.add(lens);

      const cameraBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.45, 0.38),
        new THREE.MeshStandardMaterial({ color: ink, roughness: 0.45 }),
      );
      cameraBody.position.set(-1.95, 0.1, 0.9);
      root.add(cameraBody);

      const floorPlan = new THREE.Mesh(
        new THREE.PlaneGeometry(1.45, 0.95),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
      );
      floorPlan.rotation.x = -Math.PI / 2;
      floorPlan.position.set(1.85, -0.52, 0.85);
      root.add(floorPlan);

      for (let index = 0; index < 4; index += 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(1.25 + index * 0.25, -0.5, 0.4),
          new THREE.Vector3(1.25 + index * 0.25, -0.5, 1.3),
        ]);
        root.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: line })));
      }

      const droneGroup = new THREE.Group();
      const propellers: import("three").Mesh[] = [];
      if (features.drone) {
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 0.18, 0.38),
          new THREE.MeshStandardMaterial({ color: brand, roughness: 0.42 }),
        );
        droneGroup.add(body);
        [
          [0, 0, 0.72],
          [0, 0, -0.72],
          [0.72, 0, 0],
          [-0.72, 0, 0],
        ].forEach(([x, y, z]) => {
          const arm = new THREE.Mesh(
            new THREE.BoxGeometry(Math.abs(x) > 0 ? 1.25 : 0.12, 0.07, Math.abs(z) > 0 ? 1.25 : 0.12),
            new THREE.MeshStandardMaterial({ color: ink, roughness: 0.5 }),
          );
          arm.position.set(0, 0, 0);
          droneGroup.add(arm);
          const prop = new THREE.Mesh(
            new THREE.TorusGeometry(0.18, 0.015, 8, 32),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }),
          );
          prop.position.set(x, y + 0.03, z);
          prop.rotation.x = Math.PI / 2;
          droneGroup.add(prop);
          propellers.push(prop);
        });
        droneGroup.position.set(-1.35, 1.75, -1.1);
        root.add(droneGroup);
      }

      if (features.video) {
        const path = new THREE.Mesh(
          new THREE.TorusGeometry(1.6, 0.018, 8, 96, Math.PI * 1.35),
          new THREE.MeshStandardMaterial({ color: brand, emissive: brand, emissiveIntensity: 0.15 }),
        );
        path.rotation.x = Math.PI / 2;
        path.position.set(0.25, -0.47, 0);
        root.add(path);
      }

      if (features.matterport) {
        [0.85, 1.1, 1.35].forEach((radius, index) => {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(radius, 0.012, 8, 96),
            new THREE.MeshStandardMaterial({ color: brand, transparent: true, opacity: 0.45 - index * 0.08 }),
          );
          ring.position.y = 0.25 + index * 0.22;
          ring.rotation.x = Math.PI / 2;
          root.add(ring);
        });
      }

      if (features.twilight) {
        const sun = new THREE.Mesh(
          new THREE.SphereGeometry(0.34, 32, 32),
          new THREE.MeshStandardMaterial({ color: twilight, emissive: twilight, emissiveIntensity: 1.2 }),
        );
        sun.position.set(2.45, 1.75, -1.25);
        root.add(sun);
        const glow = new THREE.PointLight(twilight, 6, 8);
        glow.position.copy(sun.position);
        root.add(glow);
      }

      if (features.staging) {
        const sofa = new THREE.Group();
        const seat = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.22, 0.32),
          new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.6 }),
        );
        const back = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.42, 0.12),
          new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.6 }),
        );
        back.position.set(0, 0.2, -0.16);
        sofa.add(seat, back);
        sofa.position.set(0.35, 0.33, 0.25);
        root.add(sofa);
      }

      if (features.clips) {
        const phone = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.7, 0.04),
          new THREE.MeshStandardMaterial({ color: ink, roughness: 0.35 }),
        );
        phone.position.set(2.2, 0.25, -0.55);
        phone.rotation.y = -0.45;
        root.add(phone);
      }

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(280, Math.floor(bounds.width));
        const height = Math.max(260, Math.floor(bounds.height));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      const animate = () => {
        if (disposed) return;
        frame = requestAnimationFrame(animate);
        root.rotation.y += 0.003;
        if (features.drone) {
          droneGroup.position.y = 1.75 + Math.sin(Date.now() / 450) * 0.08;
          propellers.forEach((propeller) => {
            propeller.rotation.z += 0.45;
          });
        }
        renderer.render(scene, camera);
      };
      animate();

      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        scene.traverse((object: import("three").Object3D) => {
          const mesh = object as import("three").Mesh;
          mesh.geometry?.dispose();
          const material = mesh.material as import("three").Material | import("three").Material[] | undefined;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material?.dispose();
          }
        });
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [features]);

  return (
    <div className="relative min-h-72 overflow-hidden bg-paper-2">
      <canvas ref={canvasRef} className="h-72 w-full" aria-label={`${packageName} 3D package visualization`} />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 text-xs font-semibold text-ink shadow-soft">
        Live package model
      </div>
    </div>
  );
}

function PackageVisualizer({ packageName, addOns }: Pick<OrderIntelligenceToolsProps, "packageName" | "addOns">) {
  const features = useMemo(() => featuresFor(packageName, addOns), [packageName, addOns]);
  const featureList: Array<[string, boolean, "included" | "extra" | "confirm" | "timing"]> = [
    ["Photos", features.photos, "included"],
    ["Floor plan", features.floorPlan, "included"],
    ["Property website", features.website, "included"],
    ["Drone", features.drone, features.drone ? "confirm" : "extra"],
    ["Video", features.video, features.video ? "timing" : "extra"],
    ["Twilight", features.twilight, features.twilight ? "confirm" : "extra"],
    ["Matterport", features.matterport, features.matterport ? "timing" : "extra"],
    ["Staging", features.staging, features.staging ? "timing" : "extra"],
    ["Social clips", features.clips, features.clips ? "timing" : "extra"],
  ];

  return (
    <section className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <PackageCheck className="h-4 w-4 text-brand" />
            Package configurator
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-2">
            A concept model of what the selected package includes. Drone, video, twilight, 3D, staging, and clips appear as the order changes.
          </p>
        </div>
        <p className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">{packageName}</p>
      </div>

      <PackageScene features={features} packageName={packageName} />

      <div className="grid gap-2 border-t border-line p-4 sm:grid-cols-3">
        {featureList.map(([label, enabled, status]) => (
          <div
            key={label}
            className={[
              "rounded-lg px-3 py-2 text-xs font-semibold",
              enabled && status === "included"
                ? "bg-brand-soft text-brand"
                : enabled && status === "confirm"
                  ? "bg-amber-50 text-amber-800"
                  : enabled && status === "timing"
                    ? "bg-paper-2 text-ink"
                    : "bg-paper-2 text-muted",
            ].join(" ")}
          >
            <span>{label}</span>
            <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-widest">
              {enabled ? status : "not selected"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OrderIntelligenceTools(props: OrderIntelligenceToolsProps) {
  return (
    <section className="border-t border-line pt-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-brand">Order intelligence</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">Environmental and package preview tools.</h3>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-ink-2">
          These are proof-of-concept helpers that can inform scheduling, exterior media, and package expectations while the order is being built.
        </p>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <TideTool
          address={props.address}
          city={props.city}
          zip={props.zip}
          preferredDate={props.preferredDate}
          timeWindow={props.timeWindow}
        />
        <SunShadowTool preferredDate={props.preferredDate} timeWindow={props.timeWindow} />
      </div>

      <div className="mt-4">
        <PackageVisualizer packageName={props.packageName} addOns={props.addOns} />
      </div>
    </section>
  );
}

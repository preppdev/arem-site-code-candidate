import type { Metadata } from "next";
import { WeatherWidget } from "./weather-widget";

export const metadata: Metadata = {
  title: "Weather & Tides",
  description:
    "Interactive weather forecast and tide predictions for any address — hourly temperature, rain chance, 7-day outlook, and the nearest NOAA tide station.",
  // Quiet URL while Jordan evaluates — flip to index when it joins the nav.
  robots: { index: false, follow: false },
};

export default function WeatherPage() {
  return (
    <div className="border-b border-line bg-paper-2">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <p className="eyebrow text-brand">Local conditions</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-ink">
          Weather &amp; tides for any address
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
          Enter a property address for the hourly forecast, 7-day outlook, and tide
          predictions from the closest NOAA station — useful for planning waterfront
          shoots, showings, and open houses.
        </p>
        <div className="mt-8">
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}

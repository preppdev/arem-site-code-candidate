const station = {
  id: "8638610",
  name: "Sewells Point",
  region: "Norfolk / Hampton Roads",
  latitude: 36.9467,
  longitude: -76.3300,
};

type NoaaPrediction = {
  t: string;
  v: string;
  type?: "H" | "L";
};

function yyyymmdd(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function targetDateFromRequest(request: Request) {
  const url = new URL(request.url);
  const rawDate = url.searchParams.get("date");
  if (rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    return rawDate;
  }
  return new Date().toISOString().slice(0, 10);
}

function hourFromWindow(window: string | null) {
  if (window === "Morning") return 9.5;
  if (window === "Midday") return 13;
  if (window === "Afternoon") return 16;
  if (window === "Twilight request") return 19.25;
  return new Date().getHours() + new Date().getMinutes() / 60;
}

function targetTimeFromRequest(request: Request, targetDate: string) {
  const url = new URL(request.url);
  const hour = hourFromWindow(url.searchParams.get("window"));
  const wholeHour = Math.floor(hour);
  const minute = Math.round((hour % 1) * 60);
  return new Date(
    `${targetDate}T${String(wholeHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00-04:00`,
  );
}

function predictionUrl(interval: "60" | "hilo", targetDate: string) {
  const anchor = new Date(`${targetDate}T12:00:00Z`);
  const begin = new Date(anchor);
  begin.setUTCDate(anchor.getUTCDate() - 1);
  const end = new Date(anchor);
  end.setUTCDate(anchor.getUTCDate() + 1);

  const params = new URLSearchParams({
    begin_date: yyyymmdd(begin),
    end_date: yyyymmdd(end),
    station: station.id,
    product: "predictions",
    datum: "MLLW",
    time_zone: "gmt",
    units: "english",
    interval,
    application: "american-real-estate-media-concept",
    format: "json",
  });

  return `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?${params.toString()}`;
}

function parsePrediction(prediction: NoaaPrediction) {
  return {
    time: `${prediction.t.replace(" ", "T")}Z`,
    level: Number(prediction.v),
    type: prediction.type,
  };
}

export const revalidate = 900;

export async function GET(request: Request) {
  const targetDate = targetDateFromRequest(request);
  const targetTime = targetTimeFromRequest(request, targetDate);
  const [hourlyResponse, extremesResponse] = await Promise.all([
    fetch(predictionUrl("60", targetDate), { next: { revalidate } }),
    fetch(predictionUrl("hilo", targetDate), { next: { revalidate } }),
  ]);

  if (!hourlyResponse.ok || !extremesResponse.ok) {
    return Response.json(
      {
        error: "Unable to load NOAA tide predictions.",
        station,
      },
      { status: 502 },
    );
  }

  const hourlyJson = (await hourlyResponse.json()) as { predictions?: NoaaPrediction[] };
  const extremesJson = (await extremesResponse.json()) as { predictions?: NoaaPrediction[] };
  const points = (hourlyJson.predictions ?? []).map(parsePrediction).filter((point) => Number.isFinite(point.level));
  const extremes = (extremesJson.predictions ?? []).map(parsePrediction).filter((point) => Number.isFinite(point.level));
  if (!points.length) {
    return Response.json(
      {
        error: "NOAA returned no tide predictions for this station and date.",
        station,
        requested: {
          date: targetDate,
          time: targetTime.toISOString(),
        },
        points: [],
        extremes,
      },
      { status: 502 },
    );
  }

  const targetMs = targetTime.getTime();
  const nearestIndex = points.reduce((bestIndex, point, index) => {
    const bestTime = new Date(points[bestIndex]?.time ?? 0).getTime();
    const pointTime = new Date(point.time).getTime();
    return Math.abs(pointTime - targetMs) < Math.abs(bestTime - targetMs) ? index : bestIndex;
  }, 0);
  const nearest = points[nearestIndex];
  const previous = points[Math.max(0, nearestIndex - 1)] ?? nearest;
  const next = points[Math.min(points.length - 1, nearestIndex + 1)] ?? nearest;
  const delta = (next?.level ?? nearest.level) - (previous?.level ?? nearest.level);

  return Response.json({
    source: "NOAA CO-OPS tide predictions",
    station,
    generatedAt: new Date().toISOString(),
    requested: {
      date: targetDate,
      time: targetTime.toISOString(),
      note: "Demo station only. A production version should geocode the listing and choose the nearest NOAA station.",
    },
    current: {
      ...nearest,
      trend: Math.abs(delta) < 0.05 ? "slack" : delta > 0 ? "rising" : "falling",
    },
    points,
    extremes,
  });
}

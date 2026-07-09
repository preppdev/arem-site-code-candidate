export function publicCoord(value: number) {
  return Math.round(value * 100) / 100;
}

export function publicCoverageBucketKey({
  lat,
  lng,
  stateIndex,
  year,
  cityIndex,
}: {
  lat: number;
  lng: number;
  stateIndex: number;
  year: number;
  cityIndex: number;
}) {
  return `${publicCoord(lat)}|${publicCoord(lng)}|${stateIndex}|${year}|${cityIndex}`;
}

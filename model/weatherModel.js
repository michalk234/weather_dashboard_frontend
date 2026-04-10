export function mapWeatherForView(apiData) {
  return {
    locationName: apiData?.city || "Nieznana lokalizacja",
    description: apiData?.description || "Brak opisu",
    temperature: formatTemperature(apiData?.temp),
    feelsLike: "Odczuwalna: —",
    humidity: "—",
    windSpeed: "—",
    pressure: "—",
    coordinates: "—"
  };
}

function formatTemperature(value) {
  return value === null || value === undefined ? "—" : `${Math.round(value)}°C`;
}

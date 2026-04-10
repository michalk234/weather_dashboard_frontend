export function mapWeatherForView(apiData) {
  return {
    locationName: `${apiData.location.city}, ${apiData.location.country}`,
    description: apiData.current.description || "Brak opisu",
    temperature: formatTemperature(apiData.current.temperature),
    feelsLike: `Odczuwalna: ${formatTemperature(apiData.current.feelsLike)}`,
    humidity: formatPercent(apiData.current.humidity),
    windSpeed: formatWind(apiData.current.windSpeed),
    pressure: formatPressure(apiData.current.pressure),
    coordinates: formatCoordinates(apiData.location.lat, apiData.location.lon)
  };
}

function formatTemperature(value) {
  return value === null || value === undefined ? "—" : `${Math.round(value)}°C`;
}

function formatPercent(value) {
  return value === null || value === undefined ? "—" : `${value}%`;
}

function formatWind(value) {
  return value === null || value === undefined ? "—" : `${value} m/s`;
}

function formatPressure(value) {
  return value === null || value === undefined ? "—" : `${value} hPa`;
}

function formatCoordinates(lat, lon) {
  if (lat === null || lat === undefined || lon === null || lon === undefined) {
    return "—";
  }
  return `${Number(lat).toFixed(4)}, ${Number(lon).toFixed(4)}`;
}

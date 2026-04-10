export function mapWeatherData(data) {
  return {
    city: data?.city || "Unknown city",
    temp: data?.temp ?? "—",
    description: data?.description || ""
  };
}

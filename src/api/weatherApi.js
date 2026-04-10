import { config } from "../config.js";

export async function fetchCurrentWeather(city) {
  const url = new URL("/api/weather/current", config.backendBaseUrl);
  url.searchParams.set("city", city);

  const response = await fetch(url.toString());

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData?.error) {
        message = errorData.error;
      }
    } catch {
      // ignore JSON parsing issues
    }
    throw new Error(message);
  }

  return response.json();
}

const BACKEND_BASE_URL = "https://weather-gateway-service.onrender.com";

export async function fetchWeather(city) {
  const trimmedCity = String(city || "").trim();

  if (!trimmedCity) {
    throw new Error("Enter city name.");
  }

  const url = new URL("/api/weather/current", BACKEND_BASE_URL);
  url.searchParams.set("city", trimmedCity);

  const res = await fetch(url.toString());

  if (!res.ok) {
    let message = `Backend error: ${res.status}`;
    try {
      const errorData = await res.json();
      if (errorData?.error) {
        message = errorData.error;
      }
    } catch {
      // ignore parsing issues
    }
    throw new Error(message);
  }

  return res.json();
}

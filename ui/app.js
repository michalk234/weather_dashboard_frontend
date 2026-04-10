import { fetchCurrentWeather } from "../api/weatherApi.js";
import { mapWeatherForView } from "../model/weatherModel.js";

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const statusPanel = document.getElementById("status-panel");
const weatherCard = document.getElementById("weather-card");

const locationName = document.getElementById("location-name");
const weatherDescription = document.getElementById("weather-description");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const coordinates = document.getElementById("coordinates");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    showStatus("Wpisz nazwę miasta.", "error");
    cityInput.focus();
    return;
  }

  showStatus("Ładowanie danych pogodowych...", "loading");
  hideWeather();

  try {
    const apiData = await fetchCurrentWeather(city);
    const viewModel = mapWeatherForView(apiData);
    renderWeather(viewModel);
    showStatus("Dane pobrane poprawnie.", "success");
  } catch (error) {
    showStatus(`Nie udało się pobrać danych: ${error.message}`, "error");
  }
});

window.addEventListener("load", () => {
  form.requestSubmit();
});

function renderWeather(data) {
  locationName.textContent = data.locationName;
  weatherDescription.textContent = data.description;
  temperature.textContent = data.temperature;
  feelsLike.textContent = data.feelsLike;
  humidity.textContent = data.humidity;
  windSpeed.textContent = data.windSpeed;
  pressure.textContent = data.pressure;
  coordinates.textContent = data.coordinates;
  weatherCard.classList.remove("is-hidden");
}

function hideWeather() {
  weatherCard.classList.add("is-hidden");
}

function showStatus(message, type) {
  statusPanel.textContent = message;
  statusPanel.className = `status-panel ${type}`;
}

import { fetchWeather } from '../api/weatherApi.js';
import { mapWeatherData } from '../model/weatherModel.js';

const searchButton = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const currentWeather = document.getElementById('currentWeather');

searchButton.addEventListener('click', async () => {
  const city = cityInput.value;

  currentWeather.innerHTML = '<p>Loading...</p>';

  try {
    const data = await fetchWeather(city);
    const model = mapWeatherData(data);
    render(model);
  } catch (error) {
    currentWeather.innerHTML = `<p>Could not load weather data: ${error.message}</p>`;
  }
});

function render(model) {
  currentWeather.innerHTML = `
    <h2>${model.city}</h2>
    <p>${model.temp}°C</p>
    <p>${model.description}</p>
  `;
}

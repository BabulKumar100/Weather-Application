const API_KEY = "f09fe8a17c92bb65a827f7ca545113df";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";


const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchBtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelslike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");


searchbtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  hideAllSections();
  showLoading();
  fetchWeatherData(city);
  cityInput.value = "";
}

async function fetchWeatherData(city) {
  try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check spelling.");
      } else if (response.status === 401) {
        throw new Error("Invalid API key.");
      } else {
        throw new Error("Failed to fetch weather data.");
      }
    }

    const data = await response.json();
    displayWeatherData(data);
  } catch (err) {
    hideLoading();
    showError(err.message);
  }
}

function displayWeatherData(data) {
  hideLoading();

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = Math.round(data.main.temp);
  weatherDescription.textContent = data.weather[0].description;
  feelslike.textContent = Math.round(data.main.feels_like);
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = Math.round(data.wind.speed);

  weatherDisplay.classList.remove("hidden");
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  error.classList.remove("hidden");
}

function hideError() {
  error.classList.add("hidden");
}

function hideAllSections() {
  hideLoading();
  hideError();
  weatherDisplay.classList.add("hidden");
}

feather.replace(); // render feather icons

var fetchWeather = "/weather";

const weatherForm = document.getElementById("location-form");
const input = document.querySelector(".location-input");
const cityName = document.querySelector(".location");
const weatherCondition = document.querySelector(".weather-desc");
const weatherIcon = document.querySelector(".weather-container i");
const temperature = document.querySelector(".weather-temp");
const dayName = document.querySelector(".date-dayname");
const fullDate = document.querySelector(".date-day");

console.log(weatherIcon.className);

//DISPLAY DATE
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
dayName.textContent = `${days[new Date().getDay()]}`;
fullDate.textContent = `${new Date().getDate()}, ${
  months[new Date().getMonth()]
} ${new Date().getFullYear()}`;

function constructURL() {
  cityName.textContent = "Loading...";
  temperature.textContent = "";
  weatherCondition.textContent = "";
  const locationApi = `${fetchWeather}?address=${input.value}`;
  console.log(locationApi);
  fetchWeatherAPI(locationApi);
}

function fetchWeatherAPI(locationApi) {
  // API call with input value
  fetch(locationApi).then((response) => {
    // transform response into json
    response.json().then((data) => displayData(data));
  });
}

function displayData(data) {
  if (data.error) {
    cityName.textContent = "nowhere";
    temperature.textContent = "";
    weatherIcon.innerHTML = "";
    weatherCondition.textContent = data.error;
  } else {
    cityName.textContent = data.cityName;
    temperature.textContent = getCelsiusTemperature(data.temperature);
    weatherCondition.textContent = data.description;
    displayWeatherIcon(data.description);
  }
}

function getCelsiusTemperature(temperature) {
  let celsiusTemp = `${(temperature - 273.5).toFixed()}${String.fromCharCode(
    176
  )}C`;
  return celsiusTemp;
}

function displayWeatherIcon(condition) {
  console.log(condition);
  if (condition === "Clouds") {
    weatherIcon.className = "wi wi-cloud weather-icon";
  } else if (condition === "Clear" || condition === "Sunny") {
    weatherIcon.className = "wi wi-day-sunny weather-icon";
  } else if (condition === "Fog") {
    weatherIcon.className = "wi wi-fog weather-icon";
  } else if (condition === "Rain") {
    weatherIcon.className = "wi wi-rain weather-icon";
  }
}

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  constructURL();
});
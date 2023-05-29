let now = new Date();
let dateDisplayHeading = document.querySelector("h1");

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDays = weekday[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

dateDisplayHeading.innerHTML = `${weekDays} ${currentHour}:${currentMinutes}`;


function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  document.getElementsByClassName("currentCity")[0].innerHTML = `${cityInput.value}`;
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", updateCity);

function alertTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let city = response.data.name;
  alert(`It is ${temp}ºC in ${city}`);
}

function alertPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(alertTemperature);
}

function updateTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#feelsLikeDisplay").innerHTML = `Feels like ${feelsLike}º`;
  document.querySelector("#celsiusTemperature").innerHTML = `${temp}º`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${wind} km/h`
  
}

function searchTemperature(city) {
    let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let unit = "metric";
    let apiUrl = `${apiEndpoint}q=${city.value}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(updateTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchTemperature(city);
}

navigator.geolocation.getCurrentPosition(alertPosition);
form.addEventListener("submit", handleSubmit);


const landing = document.querySelector(".landing");
const navbar = document.querySelector(".navbar");
const searchBtn = document.getElementById("searchbtn");
const navSearchBtn = document.getElementById("navsearchbtn");
const cityInput = document.getElementById("cityinput");
const navCityInput = document.getElementById("navcityinput");
const weatherResult = document.getElementById("weatherResult");
const homeBtn = document.getElementById("homeBtn");

// Replace with your OpenWeatherMap API key
const apiKey = "246e7510e8c579425e3c4ba745ffa00f";

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        weatherResult.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        `;
      } else {
        weatherResult.innerHTML = `<p>City not found!</p>`;
      }
    })
    .catch(() => {
      weatherResult.innerHTML = `<p>Error fetching weather data.</p>`;
    });
}

// Initial Search Button (Landing)
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    landing.style.display = "none";
    navbar.style.display = "flex";
    navCityInput.value = city;
    fetchWeather(city);
  }
});

// Navbar Search Button
navSearchBtn.addEventListener("click", () => {
  const city = navCityInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  }
});

homeBtn.addEventListener("click", () => {
  // Hide navbar
  navbar.style.display = "none";
  // Show landing
  landing.style.display = "flex";
  // Clear previous weather result
  weatherResult.innerHTML = "";
  cityInput.value = "";
});
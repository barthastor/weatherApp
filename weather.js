const api = {
    key: "a06d5bc2725f98f2acd25900efd2afad",
    baseurl: "http://api.weatherstack.com/current"
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

async function getResults(query) {
    const response = await fetch(`${api.baseurl}?query=${query}&access_key=${api.key}`);
    const weather = await response.json();
    console.log(weather);
    displayResults(weather);
}

function displayResults(weather) {
    let city = document.querySelector('.place .city');
    city.innerText = `${weather.location.name}, ${weather.location.country}`;
    let now = new Date();
    let date = document.querySelector('.place .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.actual .temp');
    temp.innerHTML = `${Math.round(weather.current.temperature)}<span>°c</span>`;
    let weather_el = document.querySelector('.actual .weather');
    weather_el.innerText = weather.current.weather_descriptions[0];
    let hilow = document.querySelector('.min-max');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
}

async function fetchMoviesJSON() {
    const response = await fetch('/movies');
    const movies = await response.json();
    return movies;
}

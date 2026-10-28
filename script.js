/* ======================================
   WEATHER WEBSITE JAVASCRIPT
====================================== */


/* ======================================
   API KEY
====================================== */

// Get your API key from OpenWeatherMap
const API_KEY = "1d760bc99fad45b08c3004916b8ca375";


/* ======================================
   API URL
====================================== */

const WEATHER_URL =
    "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_URL =
    "https://api.openweathermap.org/data/2.5/forecast";


/* ======================================
   HTML ELEMENTS
====================================== */

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const weatherSection =
    document.getElementById("weatherSection");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const themeBtn =
    document.getElementById("themeBtn");


/* ======================================
   WEATHER ELEMENTS
====================================== */

const cityName =
    document.getElementById("cityName");

const dateElement =
    document.getElementById("date");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const description =
    document.getElementById("description");

const feelsLike =
    document.getElementById("feelsLike");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const pressure =
    document.getElementById("pressure");

const visibility =
    document.getElementById("visibility");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");

const forecastContainer =
    document.getElementById("forecastContainer");

const recentCities =
    document.getElementById("recentCities");


/* ======================================
   SEARCH BUTTON
====================================== */

searchBtn.addEventListener(
    "click",
    searchWeather
);


/* ======================================
   ENTER KEY
====================================== */

cityInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            searchWeather();

        }

    }
);


/* ======================================
   SEARCH WEATHER FUNCTION
====================================== */

async function searchWeather() {

    const city =
        cityInput.value.trim();


    // Check empty input

    if (city === "") {

        showError(
            "Please enter a city name."
        );

        return;

    }


    // Check API key

    if (API_KEY === "YOUR_API_KEY") {

        showError(
            "Please add your OpenWeatherMap API key in script.js."
        );

        return;

    }


    showLoading();


    try {

        /* =========================
           CURRENT WEATHER
        ========================= */

        const weatherResponse =
            await fetch(
                `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );


        if (!weatherResponse.ok) {

            throw new Error(
                "City not found"
            );

        }


        const weatherData =
            await weatherResponse.json();


        /* =========================
           FORECAST
        ========================= */

        const forecastResponse =
            await fetch(
                `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`
            );


        const forecastData =
            await forecastResponse.json();


        /* =========================
           DISPLAY DATA
        ========================= */

        displayWeather(
            weatherData
        );


        displayForecast(
            forecastData
        );


        /* =========================
           SAVE CITY
        ========================= */

        saveRecentCity(
            weatherData.name
        );


        weatherSection.style.display =
            "block";

        errorMessage.textContent = "";


    } catch (error) {

        showError(
            "Unable to find the city. Please check the city name."
        );

    } finally {

        hideLoading();

    }

}


/* ======================================
   DISPLAY WEATHER
====================================== */

function displayWeather(data) {


    /* City */

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    /* Date */

    const currentDate =
        new Date();

    dateElement.textContent =
        currentDate.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    /* Temperature */

    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;


    /* Description */

    description.textContent =
        data.weather[0].description;


    /* Feels Like */

    feelsLike.textContent =
        Math.round(data.main.feels_like);


    /* Weather Icon */

    const icon =
        data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;


    /* Humidity */

    humidity.textContent =
        data.main.humidity;


    /* Wind */

    windSpeed.textContent =
        Math.round(
            data.wind.speed * 3.6
        );


    /* Pressure */

    pressure.textContent =
        data.main.pressure;


    /* Visibility */

    visibility.textContent =
        (data.visibility / 1000)
        .toFixed(1);


    /* Sunrise */

    sunrise.textContent =
        convertTime(
            data.sys.sunrise,
            data.timezone
        );


    /* Sunset */

    sunset.textContent =
        convertTime(
            data.sys.sunset,
            data.timezone
        );

}


/* ======================================
   CONVERT UNIX TIME
====================================== */

function convertTime(
    unixTime,
    timezone
) {

    const date =
        new Date(
            (unixTime + timezone) * 1000
        );


    let hours =
        date.getUTCHours();

    let minutes =
        date.getUTCMinutes();


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12;

    hours =
        hours || 12;


    minutes =
        minutes < 10
            ? "0" + minutes
            : minutes;


    return `${hours}:${minutes} ${ampm}`;

}


/* ======================================
   DISPLAY 5-DAY FORECAST
====================================== */

function displayForecast(data) {

    forecastContainer.innerHTML = "";


    /*
       OpenWeather gives forecast
       every 3 hours.

       We select one forecast
       approximately every 24 hours.
    */

    const dailyForecast =
        data.list.filter(
            item =>
                item.dt_txt.includes("12:00:00")
        );


    dailyForecast
        .slice(0, 5)
        .forEach(
            item => {

                const date =
                    new Date(
                        item.dt * 1000
                    );


                const day =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            weekday: "short"
                        }
                    );


                const icon =
                    item.weather[0].icon;


                const temp =
                    Math.round(
                        item.main.temp
                    );


                const condition =
                    item.weather[0].description;


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "forecast-card";


                card.innerHTML = `

                    <h3>${day}</h3>

                    <img
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                        alt="Weather"
                    >

                    <p class="temp">
                        ${temp}°C
                    </p>

                    <p>
                        ${condition}
                    </p>

                `;


                forecastContainer.appendChild(
                    card
                );

            }
        );

}


/* ======================================
   SHOW ERROR
====================================== */

function showError(message) {

    errorMessage.textContent =
        message;

    weatherSection.style.display =
        "none";

    hideLoading();

}


/* ======================================
   SHOW LOADING
====================================== */

function showLoading() {

    loading.style.display =
        "block";

    weatherSection.style.display =
        "none";

}


/* ======================================
   HIDE LOADING
====================================== */

function hideLoading() {

    loading.style.display =
        "none";

}


/* ======================================
   SAVE RECENT CITY
====================================== */

function saveRecentCity(city) {

    let cities =
        JSON.parse(
            localStorage.getItem(
                "recentCities"
            )
        ) || [];


    /*
       Remove duplicate city
    */

    cities =
        cities.filter(
            item =>
                item.toLowerCase()
                !== city.toLowerCase()
        );


    /*
       Add city at beginning
    */

    cities.unshift(city);


    /*
       Keep only 5 cities
    */

    cities =
        cities.slice(0, 5);


    localStorage.setItem(
        "recentCities",
        JSON.stringify(cities)
    );


    displayRecentCities();

}


/* ======================================
   DISPLAY RECENT CITIES
====================================== */

function displayRecentCities() {

    const cities =
        JSON.parse(
            localStorage.getItem(
                "recentCities"
            )
        ) || [];


    recentCities.innerHTML = "";


    cities.forEach(
        city => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "city-button";


            button.textContent =
                city;


            button.addEventListener(
                "click",
                function() {

                    cityInput.value =
                        city;

                    searchWeather();

                }
            );


            recentCities.appendChild(
                button
            );

        }
    );

}


/* ======================================
   DARK MODE
====================================== */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent =
                "☀️";

        } else {

            themeBtn.textContent =
                "🌙";

        }

    }
);


/* ======================================
   LOAD RECENT CITIES
====================================== */

displayRecentCities();
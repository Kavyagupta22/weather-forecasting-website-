# 🌦️ Smart Weather Website

A responsive, feature-rich web application built with vanilla HTML, CSS, and JavaScript. This project fetches real-time weather details and a 5-day weather forecast for any city worldwide using the **OpenWeatherMap API**. 

Designed as part of an **MCA Web Programming Mini Project**, the app features a clean user interface with glassmorphism design elements, persistent search history via `localStorage`, and dynamic dark mode toggling.

---

## 🌟 Key Features

- 🔍 **Real-Time Weather Search:** Get live weather conditions for any city globally.
- 📅 **5-Day Weather Forecast:** Displays mid-day temperature predictions and conditions for upcoming days.
- 📊 **Detailed Weather Data:**
  - Temperature & "Feels Like" temperature
  - Humidity percentage
  - Wind speed (converted to km/h)
  - Atmospheric pressure (hPa)
  - Visibility distance (km)
  - Sunrise & Sunset times dynamically formatted in standard time (AM/PM)
- 💾 **Recent Searches History:** Keeps track of your last 5 searched cities using `localStorage` for fast one-click re-searching.
- 🌙 **Dark/Light Theme Switching:** Easily switch between modern vibrant and dark themes.
- 📱 **Fully Responsive Layout:** Optimized across desktop, tablet, and mobile devices with fluid CSS grid and flexible breakpoints.

---

## 🛠️ Project Structure

```text
├── index.html   # Main HTML markup and structure
├── style.css    # Styling, glassmorphism UI design, themes, and responsiveness
└── script.js    # Data fetching, API interactions, UI updates, and local storage logic
```

---

## ⚙️ How to Run & Setup

### 1. Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Edge, Safari).
- A free API Key from [OpenWeatherMap](https://openweathermap.org/).

### 2. Getting Started

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/your-username/smart-weather-website.git
   cd smart-weather-website
   ```

2. **Configure Your API Key:**
   Open `script.js` in your code editor and update line 10 with your OpenWeatherMap API key:
   ```javascript
   const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
   ```

3. **Launch the Application:**
   Open `index.html` directly in your browser or serve it using a local development server like Live Server in VS Code.

---

## 💻 Tech Stack

- **HTML5:** Semantic layout structuring.
- **CSS3:** Custom styling featuring CSS Grid, Flexbox, glassmorphism (`backdrop-filter`), CSS variables/classes for Dark Mode, and responsive media queries.
- **JavaScript (ES6+):** `async/await` Fetch API calls, DOM manipulation, dynamic HTML rendering, dynamic date/time conversions, and `localStorage` integration.
- **API:** [OpenWeatherMap Current Weather & 5-Day Forecast API](https://openweathermap.org/api).

---

## 📄 Project Notes & Specifications

- **Course:** MCA Web Programming Mini Project
- **Year:** 2026
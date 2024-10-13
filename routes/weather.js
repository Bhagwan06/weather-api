// weather.js (Your weather route)
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Route to fetch weather forecast for a specific city
router.get("/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await axios.get(weatherApiUrl);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        res.status(404).json({ error: "City not found." });
      } else if (error.response.status === 401) {
        res.status(401).json({ error: "Invalid API key." });
      } else {
        res.status(500).json({ error: "Error fetching weather forecast." });
      }
    } else if (error.request) {
      res.status(500).json({ error: "No response from weather API." });
    } else {
      res.status(500).json({ error: "Error in fetching weather data." });
    }
  }
});

// Route to fetch 5-day forecast
router.get("/forecast/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${5}&aqi=no&alerts=no`;

  try {
    const response = await axios.get(forecastApiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather forecast" });
  }
});

module.exports = router;

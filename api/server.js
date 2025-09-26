const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
const NASA_API_BASE_URL = 'https://api.nasa.gov';

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

/**
 * @route   GET /weather
 * @desc    Get the latest weather data from the InSight lander on Mars.
 * @access  Public
 */
app.get('/weather', async (req, res) => {
  try {
    const url = `${NASA_API_BASE_URL}/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;
    console.log('Fetching Mars weather data from:', url);
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars weather:', error.message);
    res.status(500).json({ msg: 'Error fetching Mars weather data.' });
  }
});

/**
 * @route   GET /photos
 * @desc    Get photos from a Mars rover.
 * @access  Public
 * @query   rover - The rover name (e.g., curiosity, opportunity, spirit). Defaults to 'curiosity'.
 * @query   sol - The Martian sol (day). Defaults to 1000.
 */
app.get('/photos', async (req, res) => {
  const { rover = 'curiosity', sol = 1000 } = req.query;
  try {
    const url = `${NASA_API_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars photos:', error.message);
    res.status(500).json({ msg: 'Error fetching Mars photos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/weather and /photos endpoints`);
  // if you see this message, WE'RE SO BACK
});

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Quotes API
// Quotes API (Dynamic from public API)
// Quotes API (Dynamic from ZenQuotes)
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const { q: quote, a: author } = response.data[0]; // ZenQuotes returns an array
    res.json({ quote, author });
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ error: 'Failed to fetch quote.' });
  }
});



// Weather API
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London'; // default to London if no city provided
    const apiKey = process.env.WEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const { temp } = response.data.main;
    const condition = response.data.weather[0].description;
    const icon = response.data.weather[0].icon; // <-- get icon from API

    res.json({ city, temperature: temp, condition, icon });
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
});


// Currency API
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const response = await axios.get('https://open.er-api.com/v6/latest/INR');
    const rates = response.data.rates;
    res.json({ usd: (amount * rates.USD).toFixed(2), eur: (amount * rates.EUR).toFixed(2) });
  } catch {
    res.status(500).json({ error: 'Could not fetch currency data.' });
  }
});

app.get('/', (req, res) => {
  res.send('InfoHub Backend is running!');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const city = req.query.city || 'London';
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Weather API key not configured' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    const { temp } = response.data.main;
    const condition = response.data.weather[0].description;
    const icon = response.data.weather[0].icon;

    res.status(200).json({ city, temperature: temp, condition, icon });
  } catch (error) {
    console.error('Weather API error:', error?.message || error);
    res.status(500).json({ error: 'Could not fetch weather data.' });
  }
}

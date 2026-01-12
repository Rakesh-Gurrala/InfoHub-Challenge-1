import axios from 'axios';

export default async function handler(req, res) {
  try {
    const city = req.query.city || 'London';
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      console.error('Weather API key not configured (process.env.WEATHER_API_KEY is empty)');
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
    // Log detailed information for debugging (do not log secrets)
    console.error('Weather API error:', {
      message: error?.message,
      code: error?.code,
      responseStatus: error?.response?.status,
      responseData: error?.response?.data,
    });

    // Return a helpful message to the client while keeping sensitive details out of the response
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || 'Could not fetch weather data.';
    res.status(status).json({ error: message });
  }
}

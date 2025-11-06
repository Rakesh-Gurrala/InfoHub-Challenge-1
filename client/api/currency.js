import axios from 'axios';

export default async function handler(req, res) {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    const response = await axios.get('https://open.er-api.com/v6/latest/INR');
    const rates = response.data.rates;
    res.status(200).json({ usd: (amount * rates.USD).toFixed(2), eur: (amount * rates.EUR).toFixed(2) });
  } catch (error) {
    console.error('Currency API error:', error?.message || error);
    res.status(500).json({ error: 'Could not fetch currency data.' });
  }
}

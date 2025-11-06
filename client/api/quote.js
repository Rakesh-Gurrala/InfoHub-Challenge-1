import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const { q: quote, a: author } = response.data[0];
    res.status(200).json({ quote, author });
  } catch (error) {
    console.error('Quote API error:', error?.message || error);
    res.status(500).json({ error: 'Failed to fetch quote.' });
  }
}

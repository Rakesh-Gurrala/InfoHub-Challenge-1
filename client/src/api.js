import axios from 'axios';

// Use VITE_API_BASE_URL when provided at build/deploy time. Otherwise
// fall back to the current origin so the client will call the same host
// it was served from. This makes the app resilient in different deploy setups.
const baseURL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '');

const api = axios.create({
  baseURL
});

export const fetchQuote = () => api.get('/api/quote');
export const fetchWeather = (city) => api.get(`/api/weather?city=${city}`);
export const fetchCurrency = (amount) => api.get(`/api/currency?amount=${amount}`);
export default api;
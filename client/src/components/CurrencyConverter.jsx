import { useState } from 'react';
import { fetchCurrency } from '../api';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const convert = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchCurrency(amount);
      setResult(res.data);
    } catch {
      setError('Failed to fetch currency rates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-green-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">INR to USD/EUR Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount in INR"
        className="border p-2 rounded mr-2"
      />
      <button onClick={convert} className="px-4 py-2 bg-green-500 text-white rounded">Convert</button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="mt-2">
          <p>USD: {result.usd}</p>
          <p>EUR: {result.eur}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;

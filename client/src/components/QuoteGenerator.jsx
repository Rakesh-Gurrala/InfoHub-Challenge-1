import { useEffect, useState } from 'react';
import { fetchQuote as fetchQuoteApi } from '../api';

function QuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuote = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchQuoteApi();
      setQuote(res.data.quote);
      setAuthor(res.data.author);
    } catch {
      setError('Failed to load quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <div className="p-6 bg-yellow-100 rounded-xl shadow text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-gray-800">✨ Motivational Quote</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="transition-opacity duration-500 ease-in-out">
          <p className="text-lg italic text-gray-700 mb-2">"{quote}"</p>
          <p className="text-sm text-gray-500">— {author}</p>
        </div>
      )}

      <button
        onClick={loadQuote}
        className="mt-4 px-5 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
      >
        New Quote
      </button>
    </div>
  );
}

export default QuoteGenerator;

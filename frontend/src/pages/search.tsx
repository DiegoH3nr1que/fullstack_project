// pages/search.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const SearchResults = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/games/search/', {
          params: { q }
        });
        setResults(response.data.results);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
        setError('Erro ao buscar jogos. Por favor, tente novamente.');
      }
    };

    if (q) {
      fetchResults();
    }
  }, [q]);

  return (
    <div>
      <h1>Resultados da pesquisa para: {q}</h1>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {results.map((game) => (
          <div key={game.id} className="border rounded p-4">
            <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover rounded" />
            <h2 className="mt-2 text-lg font-bold">{game.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

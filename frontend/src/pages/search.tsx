import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';

const SearchResults: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!q) return;
      try {
        const response = await axios.get('http://127.0.0.1:8000/games/search/', {
          params: { q },
        });
        setResults(response.data.results);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
        setError('Erro ao buscar jogos. Por favor, tente novamente.');
      }
    };

    fetchResults();
  }, [q]);

  const handleSearch = (newQuery: string) => {
    router.push(`/search?q=${newQuery}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-800 py-10 px-4">
      <div className="container mx-auto max-w-screen-lg relative">
        <div className="flex items-center mb-6 space-x-4">
          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
              alt="Gemini Logo"
              className="w-20 h-20 cursor-pointer"
            />
          </Link>
          <SearchBar onSearch={handleSearch} initialQuery={q as string || ''} />
        </div>
        
        <h1 className="text-3xl text-white font-bold mt-6">
          Resultados da pesquisa para: {q}
        </h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {results.map((game) => (
            <Link key={game.id} href={`/games/${game.slug}`}>
              <div className="game-card bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="content mt-4">
                  <h2 className="game-title text-lg font-bold text-white truncate hover:text-clip">
                    {game.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
// pages/search.tsx
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
  const [currentQuery, setCurrentQuery] = useState(q || ''); // Estado para a query atual

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/games/search/', {
          params: { q: currentQuery }, // Usa currentQuery na busca
        });
        setResults(response.data.results);
      } catch (err) {
        console.error('Erro ao buscar jogos:', err);
        setError('Erro ao buscar jogos. Por favor, tente novamente.');
      }
    };

    if (currentQuery) {
      fetchResults();
    }
  }, [currentQuery]); // Atualiza quando currentQuery mudar

  const handleSearch = (newQuery: string) => {
    setCurrentQuery(newQuery);
    router.push(`/search?q=${newQuery}`); 
  };

  return (
    <div className="search-results">
        <div className="container">
            <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />

            <h1 className="title">Resultados da pesquisa para: {currentQuery}</h1>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {results.map((game) => (
                    <Link key={game.id} href={`/games/${game.slug}`}>
                        <div className="game-card">
                            <img src={game.background_image} alt={game.name} />
                            <div className="content">
                                <h2 className="text-lg font-bold">{game.name}</h2>
                                {/* ... (outras informações do jogo) */}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Paginação */}
            <div className="pagination">
                {/* ... (botões de paginação) */}
            </div>
        </div>
    </div>
);
};


export default SearchResults;

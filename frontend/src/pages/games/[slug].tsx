import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import UserMenu from '@/components/userMenu'; 

const Star: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'gold' : 'gray'}
    stroke="currentColor"
    className="w-10 h-10 cursor-pointer"
  >
    <path d="M12 .587l3.668 7.431 8.167 1.151-5.835 5.816 1.378 8.106L12 18.896l-7.378 3.892 1.378-8.106L.165 9.169l8.167-1.151z" />
  </svg>
);

const GameDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [game, setGame] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const apiKey = 'e4c06793c5804f288d80ad5c6bf9684f';
  const isLoggedIn = true; // Defina conforme a lógica de autenticação da sua aplicação

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (slug) {
        try {
          const gameResponse = await axios.get(`https://api.rawg.io/api/games/${slug}`, {
            params: { key: apiKey },
          });
          setGame(gameResponse.data);

          const reviewsResponse = await axios.get(`http://localhost:8000/games/details/${slug}/`);
          setReviews(reviewsResponse.data);
        } catch (err: any) {
          console.error('Erro ao buscar detalhes do jogo:', err);
          setError(err.message || 'Jogo não encontrado.');
        }
      }
    };

    fetchGameDetails();
  }, [slug, apiKey]);

  const handleSubmitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === null) {
      setError('Por favor, selecione uma avaliação de 0 a 5 estrelas.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/games/details/${slug}/reviews/`, {
        rating,
        text: reviewText,
      });
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating(null); // Reinicia a seleção de rating
    } catch (err: any) {
      console.error('Erro ao enviar review:', err);
      setError(err.message || 'Erro ao enviar review.');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          filled={i <= currentRating}
          onClick={() => interactive && handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") return;
    router.push(`/search?q=${searchInput}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="game-details-page bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4 w-full top- left-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center md:items-start">
            <Link href="/">
              <img
                src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
                alt="Gemini Logo"
                className="w-20 h-20 cursor-pointer"
              />
            </Link>
            <div className="md:hidden ml-4">
              {isLoggedIn ? (
                <UserMenu /> // Usando o novo componente de menu do usuário
              ) : (
                <Link href="/login" className="text-white">
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 max-w-md mx-4 mt-6 md:mt-0">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md mt-2">
              <input
                type="search"
                placeholder="Search games..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 py-2 text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
              />

              <button
                className="bg-transparent text-gray-700 font-bold py-2 px-4 rounded-md"
                type="button"
                onClick={handleSearch}
              >
                <img
                  src="/images/icons8-monóculo-50.png"
                  alt="Search"
                  className="h-6 w-6 mx-2"
                />
              </button>
            </div>

            <div className="mt-4">
              {searchResults.length > 0 && (
                <ul>
                  {searchResults.map((game) => (
                    <li key={game.id} className="border-b py-2">
                      {game.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <nav className="hidden md:flex md:items-center">
            {isLoggedIn ? (
              <UserMenu /> // Usando o novo componente de menu do usuário
            ) : (
              <Link href="/login" className="text-white">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div className="container mx-auto py-10 pt-28"> {/* Ajustei o padding-top aqui */}
        {game && (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <div className="relative w-full md:w-96 h-56 md:h-96 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={game.background_image}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <div className="md:ml-8 mt-4 md:mt-0">
                <h1 className="text-3xl font-bold">{game.name}</h1>
                <p className="text-sm text-gray-400">Lançamento: {formatDate(game.released)}</p>
                <div className="flex items-center mt-2">{renderStars(game.rating)}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Sobre o jogo:</h2>
                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: game.description }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Detalhes:</h2>
                <ul className="list-disc list-inside">
                  <li><strong>Plataformas:</strong> {game.platforms.map((p: any) => p.platform.name).join(', ')}</li>
                  <li><strong>Desenvolvedoras:</strong> {game.developers.map((d: any) => d.name).join(', ')}</li>
                  <li><strong>Gêneros:</strong> {game.genres.map((g: any) => g.name).join(', ')}</li>
                  <li><strong>Website:</strong> <a href={game.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{game.website}</a></li>
                </ul>
              </div>
            </div>
          </>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews:</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-4">
                  <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{review.user}</span>
                      <span className="text-sm text-gray-400">{formatDate(review.date)}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-200">{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Nenhuma review disponível para este jogo.</p>
          )}
        </div>
        {isLoggedIn && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Deixe sua review:</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Sua avaliação:</label>
                <div className="flex items-center">{renderStars(rating ?? 0, true)}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Seu comentário:</label>
                <textarea
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetails;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GameDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [game, setGame] = useState<any>(null); // Tipando o estado game
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const apiKey = 'e4c06793c5804f288d80ad5c6bf9684f'; // Substitua pela sua chave de API

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (slug) {
        try {
          const gameResponse = await axios.get(`https://api.rawg.io/api/games/${slug}`, {
            params: { key: apiKey },
          });
          setGame(gameResponse.data);

          const reviewsResponse = await axios.get(`/api/games/${slug}/reviews/`); // Certifique-se que a URL está correta
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
    try {
      const response = await axios.post(`/api/games/${slug}/reviews/`, {
        rating,
        text: reviewText,
      });
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating(0);
    } catch (err: any) {
      console.error('Erro ao enviar review:', err);
      setError(err.message || 'Erro ao enviar review.');
    }
  };

  return (
    <div className="game-details-page">
      <div className="container">
        {game && (
          <>
            <div className="game-header">
              <img src={game.background_image} alt={game.name} className="cover-image" />
              <div className="game-info">
                <h1>{game.name}</h1>
                <p className="release-date">Lançamento: {game.released}</p>
                <p className="rating">Avaliação: {game.rating} / 5</p>
              </div>
            </div>

            <div className="game-content">
              <div className="description">
                <h2>Sobre o jogo:</h2>
                <p dangerouslySetInnerHTML={{ __html: game.description }} />
              </div>

              <div className="details">
                <h2>Detalhes:</h2>
                <ul>
                  <li><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</li>
                  <li><strong>Desenvolvedoras:</strong> {game.developers.map(d => d.name).join(', ')}</li>
                  <li><strong>Gêneros:</strong> {game.genres.map(g => g.name).join(', ')}</li>
                  <li><strong>Website:</strong> <a href={game.website} target="_blank" rel="noopener noreferrer">{game.website}</a></li>
                  <li><strong>Metacritic:</strong> {game.metacritic}</li>
                </ul>
              </div>

              <div className="reviews">
                <h2>Reviews:</h2>

                {reviews.map((review) => (
                  <div key={review.id}>
                    <p>Avaliação: {review.rating}</p>
                    <p>{review.text}</p>
                  </div>
                ))}

                <h3>Deixe sua review:</h3>
                <form onSubmit={handleSubmitReview}>
                  <div>
                    <label htmlFor="rating">Avaliação:</label>
                    <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reviewText">Review:</label>
                    <textarea id="reviewText" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                  </div>
                  <button type="submit">Enviar</button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GameDetails;

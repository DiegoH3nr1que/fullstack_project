import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface Game {
  name: string;
  background_image: string;
  released: string;
  rating: number;
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [highlightedPage, setHighlightedPage] = useState(0);
  const [releasesPage, setReleasesPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/games/')
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setGames(response.data);
        } else {
          console.error('A resposta da API não é uma matriz:', response.data);
        }
      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  const handleNextHighlighted = () => {
    setHighlightedPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / 5));
  };
  
  const handlePrevHighlighted = () => {
    setHighlightedPage((prevPage) => (prevPage - 1 + Math.ceil(games.length / 5)) % Math.ceil(games.length / 5));
  };

  const handleNextReleases = () => {
    setReleasesPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / 5));
  };

  const handlePrevReleases = () => {
    setReleasesPage((prevPage) => (prevPage - 1 + Math.ceil(games.length / 5)) % Math.ceil(games.length / 5));
  };

  const currentHighlightedGames = games.slice(highlightedPage * 5, (highlightedPage + 1) * 5);
  const currentReleasesGames = games.slice(releasesPage * 5, (releasesPage + 1) * 5);

  const PrevArrow = (onClickHandler: () => void, hasPrev: boolean, label: string) =>
    hasPrev && (
      <button
        onClick={onClickHandler}
        className="absolute top-1/2 left-4 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
        aria-label={label}
      >
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    );

  const NextArrow = (onClickHandler: () => void, hasNext: boolean, label: string) =>
    hasNext && (
      <button
        onClick={onClickHandler}
        className="absolute top-1/2 right-4 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
        aria-label={label}
      >
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18l6-6-6-6" />
        </svg>
      </button>
    );

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex justify-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`}/>
        ))}
        {halfStar && <FaStarHalfAlt/>}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`}/>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d - yyyy', { locale: enUS });
  };

  return (
    <>
      <Head>
        <meta name="description" content="Save Point - Reviews de Games" />
      </Head>

      <main className="bg-gray-900 text-white min-h-screen">
        <header className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <img
              src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
              alt="Gemini Logo"
              className="w-20 h-20"
            />
            <div className="flex-1 max-w-md mx-4 mt-6 relative">
              <input
                type="search"
                placeholder="Search games..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 mb-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                style={{ marginBottom: '8px' }}
              />
              {searchInput.length > 0 && (
                <button
                  className="absolute top-0 right-2 bg-transparent text-gray-700 font-bold py-2 px-4 rounded-md"
                  type="button"
                  onClick={() => setSearchInput('')}
                  style={{ marginRight: '8px' }}
                >
                  <img src="/images/icons8-monóculo-50.png" alt="Search" className="h-6 w-6" />
                </button>
              )}
            </div>
            <nav>
              {isLoggedIn ? (
                <Link href="/user" className="text-white">
                  User
                </Link>
              ) : (
                <Link href="/login" className="text-white">
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>

          <section className="container mx-auto py-10">
            <h2 className="text-2xl font-bold mb-8 text-center">Favoritos da Crítica</h2>
            <div className="max-w-screen-lg mx-auto">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={false}
                autoPlay={false}
                transitionTime={600}
                useKeyboardArrows={true}
                renderArrowPrev={PrevArrow}
                renderArrowNext={NextArrow}
              >
                {games.slice(0, 5).map((game, index) => (
                  <div key={index} className="relative h-[50vh] md:h-[70vh] lg:h-[70vh] overflow-hidden group">
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                    <div className="absolute top-0 bg-gray-900 bg-opacity-75 w-full text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-xl font-bold">{game.name}</h3>
                      {renderStars(game.rating)}
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>

            <section className="container max-w-screen-lg mx-auto py-10">
              <h2 className="text-2xl font-bold mb-8 text-center">Em destaque essa semana</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentHighlightedGames.map((game, index) => (
                  <div key={index} className="relative h-80 md:h-96 overflow-hidden group">
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
                      <h3 className="text-xl font-bold">{game.name}</h3>
                      <p>Released: {formatDate(game.released)}</p>
                      {renderStars(game.rating)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={handlePrevHighlighted} className="bg-gray-800 p-2 rounded">Prev</button>
                <button onClick={handleNextHighlighted} className="bg-gray-800 p-2 rounded">Next</button>
              </div>
            </section>

            <section className="container max-w-screen-lg mx-auto py-10">
              <h2 className="text-2xl font-bold mb-8 text-center">Lançamentos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentReleasesGames.map((game, index) => (
                  <div key={index} className="relative h-80 md:h-96 overflow-hidden group">
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-white">
                      <h3 className="text-xl font-bold">{game.name}</h3>
                      <p>Released: {formatDate(game.released)}</p>
                      {renderStars(game.rating)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button onClick={handlePrevReleases} className="bg-gray-800 p-2 rounded">Prev</button>
                <button onClick={handleNextReleases} className="bg-gray-800 p-2 rounded">Next</button>
              </div>
            </section>
          </section>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Save Point. Todos os direitos reservados.</p>
          </div>
        </footer>
      </>
    );
  };

  export default Home;

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useRouter } from "next/router";

interface Game {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string;
  rating: number;
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [popularGames, setPopularGames] = useState<Game[]>([]);
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [highlightedPage, setHighlightedPage] = useState(0);
  const [releasesPage, setReleasesPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [startIndexs, setStartIndexs] = useState(0);
  const router = useRouter();
  const [transitioning, setTransitioning] = useState(false);
  const [destaques, setDestaques] = useState<Game[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/games/games") // Substitua pela sua URL
      .then((response) => setGames(response.data))
      .catch((error) => console.error("Error fetching games:", error));

    axios
      .get("http://localhost:8000/games/popular_games/") // Substitua pela sua URL
      .then((response) => setPopularGames(response.data))
      .catch((error) => console.error("Error fetching popular games:", error));

    axios
      .get("http://localhost:8000/games/upcoming_games/") // Substitua pela sua URL
      .then((response) => setUpcomingGames(response.data))
      .catch((error) => console.error("Error fetching upcoming games:", error));

    axios
      .get("http://localhost:8000/games/destaques/")
      .then((response) => setDestaques(response.data)) // Supondo que sua view retorna um objeto com a chave 'games
      .catch((error) =>
        console.error("Erro ao buscar jogos em destaque:", error)
      ); // Opcional: armazena o erro no estado para exibir ao usuário
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() === "") return;
    router.push(`/search?q=${searchInput}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleNextHighlighted = () => {
    setHighlightedPage(
      (prevPage) => (prevPage + 1) % Math.ceil(games.length / 5)
    );
  };

  const handlePrevHighlighted = () => {
    setHighlightedPage(
      (prevPage) =>
        (prevPage - 1 + Math.ceil(games.length / 5)) %
        Math.ceil(games.length / 5)
    );
  };

  const handleNextReleases = () => {
    if (startIndex + 5 < upcomingGames.length) {
      setTransitioning(true);
      setTimeout(() => {
        setStartIndex(startIndex + 5);
        setTransitioning(false);
      }, 300); // Tempo de duração da transição em milissegundos
    }
  };

  const handlePrevReleases = () => {
    if (startIndex > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setStartIndex(startIndex - 5);
        setTransitioning(false);
      }, 300); // Tempo de duração da transição em milissegundos
    }
  };
  const handleNextRelease = () => {
    if (startIndexs + 5 < destaques.length) {
      setTransitioning(true);
      setTimeout(() => {
        setStartIndexs(startIndexs + 5);
        setTransitioning(false);
      }, 300); // Tempo de duração da transição em milissegundos
    }
  };
  const handlePrevRelease = () => {
    if (startIndexs > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setStartIndexs(startIndexs - 5);
        setTransitioning(false);
      }, 300); // Tempo de duração da transição em milissegundos
    }
  };

  const currentHighlightedGames = games.slice(
    highlightedPage * 5,
    (highlightedPage + 1) * 5
  );
  const currentReleasesGames = games.slice(
    releasesPage * 5,
    (releasesPage + 1) * 5
  );

  const PrevArrow = (
    onClickHandler: () => void,
    hasPrev: boolean,
    label: string
  ) =>
    hasPrev && (
      <button
        onClick={onClickHandler}
        className="absolute top-1/2 left-4 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
        aria-label={label}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 18l-6-6 6-6"
          />
        </svg>
      </button>
    );

  const NextArrow = (
    onClickHandler: () => void,
    hasNext: boolean,
    label: string
  ) =>
    hasNext && (
      <button
        onClick={onClickHandler}
        className="absolute top-1/2 right-4 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
        aria-label={label}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 18l6-6-6-6"
          />
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
          <FaStar key={`full-${index}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM d - yyyy", { locale: enUS });
  };

  return (
    <>
      <Head>
        <meta name="description" content="Save Point - Reviews de Games" />
      </Head>

      <main className="bg-gray-900 text-white min-h-screen">
        <header className="bg-gray-800 p-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center md:items-start">
              <img
                src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
                alt="Gemini Logo"
                className="w-20 h-20"
              />
              <div className="md:hidden ml-4">
                {isLoggedIn ? (
                  <Link href="/user" className="text-white">
                    User
                  </Link>
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
              {error && <p className="text-red-500 mt-2">{error}</p>}
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

        <section className="container max-w-screen-lg mx-auto py-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Os Favoritos</h2>
          <div className="mb-10">
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              renderArrowPrev={PrevArrow}
              renderArrowNext={NextArrow}
            >
              {popularGames.slice(0, 10).map((game, index) => (
                <div
                  key={index}
                  className="relative h-[600px] md:h-[600px] lg:h-[600px] overflow-hidden group"
                >
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
            <h2 className="text-2xl font-bold mb-8 text-center">
              Populares do ultimo ano
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {destaques
                .slice(startIndexs, startIndexs + 5)
                .map((game, index) => (
                  <div
                    key={index}
                    className="relative h-80 md:h-96 overflow-hidden group"
                    onClick={() => router.push(`/games/games/${game.slug}`)}
                  >
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
              <button
                onClick={handlePrevRelease}
                className="bg-gray-800 p-2 rounded"
              >
                Prev
              </button>
              <button
                onClick={handleNextRelease}
                className="bg-gray-800 p-2 rounded"
              >
                Next
              </button>
            </div>
          </section>

          <section className="container max-w-screen-lg mx-auto py-10">
            <h2 className="text-2xl font-bold mb-8 text-center">Lançamentos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {upcomingGames
                .slice(startIndex, startIndex + 5)
                .map((game, index) => (
                  <div
                    key={index}
                    className={`relative h-80 md:h-96 overflow-hidden group ${
                      transitioning
                        ? "opacity-100 scale-1000"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full transition-opacity duration-00"
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
              <button
                onClick={handlePrevReleases}
                className="bg-gray-800 p-2 rounded"
              >
                Prev
              </button>
              <button
                onClick={handleNextReleases}
                className="bg-gray-800 p-2 rounded"
              >
                Next
              </button>
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

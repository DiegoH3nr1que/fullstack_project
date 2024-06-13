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
        const [currentPage, setCurrentPage] = useState(0);

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

        const handleNext = () => {
          setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / 5));
        };
        
        const handlePrev = () => {
          setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(games.length / 5)) % Math.ceil(games.length / 5));
        };
        
        const currentGames = games.slice(currentPage * 5, (currentPage + 1) * 5);

        const PrevArrow = (onClickHandler: () => void, hasPrev: boolean, label: string) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 left-20 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
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
              className="absolute top-1/2 right-20 z-10 bg-gray-800 hover:bg-opacity-75 text-white rounded-full p-2 focus:outline-none"
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
              <title>Save Point</title>
              <meta name="description" content="Save Point - Reviews de Games" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-gray-900 text-white min-h-screen">
              <header className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                  <img
                    src="/images/Gemini_Generated_Image_sm9kpasm9kpasm9k-removebg-preview.png"
                    alt="Gemini Logo"
                    className="w-20 h-20"
                  />
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
        <div key={index} className="relative h-[70vh] md:h-[100vh] overflow-hidden group">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {currentGames.map((game, index) => (
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
            <button onClick={handlePrev} className="bg-gray-800 p-2 rounded">Prev</button>
            <button onClick={handleNext} className="bg-gray-800 p-2 rounded">Next</button>
          </div>
        </section>

        <section className="container max-w-screen-lg mx-auto py-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Lançamentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {currentGames.map((game, index) => (
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
            <button onClick={handlePrev} className="bg-gray-800 p-2 rounded">Prev</button>
            <button onClick={handleNext} className="bg-gray-800 p-2 rounded">Next</button>
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

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(games.length / 3));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(games.length / 3)) % Math.ceil(games.length / 3));
  };

  const currentGames = games.slice(currentPage * 3, (currentPage + 1) * 3);

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
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            transitionTime={600}
          >
            {games.map((game, index) => (
              <div key={index} className="hover:scale-105 transition-transform duration-300">
                <Image src={game.background_image} alt={game.name} layout="responsive" width={500} height={300} />
                <div className="carousel-caption">
                  <h3>{game.name}</h3>
                  <p>Released: {game.released}</p>
                  <p>Rating: {game.rating}</p>
                </div>
              </div>
            ))}
          </Carousel>

          <h2 className="text-2xl font-bold mt-6">Em destaque hoje</h2>
          <div className="flex items-center">
            <button onClick={handlePrev} className="bg-gray-800 p-2 rounded">Prev</button>
            <div className="grid grid-cols-3 gap-4 mx-4">
              {currentGames.map((game, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded hover:scale-105 transition-transform duration-300">
                  <Image src={game.background_image} alt={game.name} layout="responsive" width={200} height={300} />
                  <h3 className="mt-2">{game.name}</h3>
                  <p>Released: {game.released}</p>
                  <p>Rating: {game.rating}</p>
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="bg-gray-800 p-2 rounded">Next</button>
          </div>
        </section>

        <section className="container mx-auto py-10">
          <h2 className="text-2xl font-bold mt-6">Lançamentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {games.slice(0, 3).map((game, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded">
                <Image src={game.background_image} alt={game.name} layout="responsive" width={200} height={300} />
                <h3 className="mt-2">{game.name}</h3>
                <p>Released: {game.released}</p>
                <p>Rating: {game.rating}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [highlightedImages, setHighlightedImages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/games/')
      .then(response => {
        if (Array.isArray(response.data)) {
          setHighlightedImages(response.data);
        } else {
          console.error('A resposta da API não é uma matriz:', response.data);
        }
      })
      .catch(error => console.error('Error fetching games:', error));
  }, []);
  
  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(highlightedImages.length / 3));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(highlightedImages.length / 3)) % Math.ceil(highlightedImages.length / 3));
  };

  const currentImages = highlightedImages.slice(currentPage * 3, (currentPage + 1) * 3);

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
            {highlightedImages.map((image, index) => (
              <div key={index} className="hover:scale-105 transition-transform duration-300">
                <Image src={image} alt={`Highlighted Game ${index + 1}`} width={500} height={300} />
              </div>
            ))}
          </Carousel>

          <h2 className="text-2xl font-bold mt-6">Em destaque hoje</h2>
          <div className="flex items-center">
            <button onClick={handlePrev} className="bg-gray-800 p-2 rounded">Prev</button>
            <div className="grid grid-cols-3 gap-4 mx-4">
              {currentImages.map((image, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded hover:scale-105 transition-transform duration-300">
                  <Image src={image} alt={`Highlighted Game ${index + 1}`} width={200} height={300} />
                </div>
              ))}
            </div>
            <button onClick={handleNext} className="bg-gray-800 p-2 rounded">Next</button>
          </div>
        </section>

        <section className="container mx-auto py-10">
          <h2 className="text-2xl font-bold mt-6">Lançamentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {highlightedImages.slice(0, 3).map((image, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded">
                <Image src={image} alt={`Game ${index + 1}`} width={200} height={300} />
                <h3 className="mt-2">{`Game ${index + 1}`}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
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
              <Link href="/login" className="text-white">
                Login
              </Link>
            </nav>
          </div>
        </header>

        <section className="container mx-auto py-10">
          <div className="flex justify-center items-center">
            <Image src="/path-to-your-image1.png" alt="Highlighted Game" width={500} height={300} />
          </div>
          <h2 className="text-2xl font-bold mt-6">Em destaque hoje</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-800 p-4 rounded">
              <Image src="/path-to-game-image1.png" alt="Game 1" width={200} height={300} />
              <h3 className="mt-2">Game 1</h3>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <Image src="/path-to-game-image2.png" alt="Game 2" width={200} height={300} />
              <h3 className="mt-2">Game 2</h3>
            </div>
            <div className="bg-gray-800 p-4 rounded">
              <Image src="/path-to-game-image3.png" alt="Game 3" width={200} height={300} />
              <h3 className="mt-2">Game 3</h3>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

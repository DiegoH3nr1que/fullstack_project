import Link from 'next/link';

const GameList = ({ games }) => {
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id} className="mb-4">
            <Link href={`/games/${generateSlug(game.name)}`}>
              <a className="text-2xl text-blue-500">{game.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;

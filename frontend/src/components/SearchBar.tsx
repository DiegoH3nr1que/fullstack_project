// components/SearchBar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      onSearch(searchInput); // Chama a função de busca do componente pai
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
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
  );
};

export default SearchBar;

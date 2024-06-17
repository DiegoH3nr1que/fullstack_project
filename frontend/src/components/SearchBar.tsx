import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery = '' }) => {
  const [searchInput, setSearchInput] = useState(initialQuery);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      onSearch(searchInput);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
  };

  return (
    <div className="flex flex-1 items-center bg-gray-100 border border-gray-300 rounded-md mt-2">
      <input
        type="search"
        placeholder="Search games..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 py-2 px-4 text-sm text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
      />
      {searchInput.length > 0 && (
        <button
          className="bg-transparent text-gray-700 font-bold py-2 px-4 rounded-md"
          type="button"
          onClick={handleClear}
        >
          <img
            src="/images/icons8-monóculo-50.png"
            alt="Search"
            className="h-6 w-6 mx-2"
          />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

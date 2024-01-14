import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Example({ style }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Make API call with the search term
    fetch(`http://wauu.uz/api/products/?name=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error('Error fetching search results:', error));
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsDropdownVisible(true);
  };

  const handleInputBlur = () => {
    // Delay hiding the dropdown to allow the click event on the dropdown item to trigger first
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  if (style === 'small') {
    return (
      <Link to="/" className="ml-2 p-2 text-gray-400 hover:text-gray-500 z-10">
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </Link>
    );
  } else if (style === 'large') {
    return (
      <div className="hidden lg:flex relative z-10">
        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <div className="w-full max-w-lg lg:max-w-xs relative">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="focus:ring-indigo-700 focus:outline-none
                        block w-full rounded-md border-0 bg-white
                        py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2
                        sm:text-sm
                        sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
            {/* Display search results */}
            {isDropdownVisible && searchTerm !== '' && (
              <div className="absolute mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-100 w-full">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div key={result.id} className="p-2">
                      <Link to={`/product/${result.id}`}>{result.name}</Link>
                    </div>
                  ))
                ) : (
                  [1, 2, 3].map((result) => (
                    <div key={result} className="p-2">
                      <p className="py-5 rounded animate-pulse bg-gray-200"></p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

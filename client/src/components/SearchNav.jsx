import { useState, useEffect, useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SearchNav = () => {
  const searchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetchingResults, setIsFetchingResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleFetchSearchResults = useCallback(async () => {
    if (searchQuery.trim() === "") {
      // Clear results if the search query is empty
      setSearchResults([]);
      return;
    }

    setIsFetchingResults(true);
    console.log({ searchQuery });

    try {
      const { data, status } = await axios.get(
        `/search/products?q=${encodeURIComponent(searchQuery)}`
      );
      if (status === 200) {
        console.log({ data });
        setSearchResults(data);
        setShowResults(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingResults(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const delayTimer = setTimeout(handleFetchSearchResults, 1000);

    return () => clearTimeout(delayTimer);
  }, [handleFetchSearchResults]);

  /** terminmate the search results popup when you click outside of it */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search">
      <div className="search-input_container">
        <FaSearch />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search products, categories and brands"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleFetchSearchResults} type="button">
          Search
        </button>
      </div>
      {showResults && (
        <div ref={searchRef} className="results-container">
          {isFetchingResults ? (
            <div className="w-full flex gap-2 items-center justify-center text-theme-700">
              <Loader2 className="animate-spin" />
              <span>Loading...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="w-full p-2 flex justify-center items-center">
              <p className="text-theme-700 font-poppins">No products found! Try a different search...</p>
            </div>
          ) : (
            searchResults?.map((result) => (
              <Link
                key={result._id}
                to={`/products/${result?.title}/${result?._id}`}
              >
                <img src={result?.images[0]} alt="image" />
                <div className="content">
                  <h3>{result?.title.slice(0, 50)}</h3>
                  <p>UGX {result?.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchNav;

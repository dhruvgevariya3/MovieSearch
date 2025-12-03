import { useEffect, useState } from "react";
import Result from "./components/Result";

const API_URL = "http://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFav, setShowFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (title) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        const unique = [
          ...new Map(data.Search.map((item) => [item.imdbID, item])).values(),
        ];
        setMovie(unique);
      } else {
        setMovie([]);
      }
    } catch (e) {
      console.error(e);
      setMovie([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("war");
  }, []);

  const toggleFavorite = (movie) => {
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen p-6">
      <div className="max-w-7xl mx-auto mt-5 p-8 rounded-xl shadow-xl bg-[#1C1C1C] border border-[#292929]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">🎬 Movie Finder</h1>

          <button
            onClick={() => setShowFav(!showFav)}
            className="bg-[#E50914] hover:bg-[#b2060f] text-white px-5 py-2 rounded-lg transition font-semibold shadow-md"
          >
            {showFav ? "View All Movies" : "View Favorites"}
          </button>
        </div>
        {!showFav && (
          <input
            placeholder="Search for a movie..."
            type="search"
            className="border border-[#292929] w-full p-3 rounded-lg bg-[#0F0F0F] text-white placeholder-gray-400 focus:ring-2 focus:ring-[#E50914] outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          />
        )}
        {loading && !showFav && (
          <div className="flex justify-center mt-10">
            <div className="w-12 h-12 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-8">
          {(showFav ? favorites : movie).map((m) => (
            <Result
              key={m.imdbID}
              movie={m}
              isFav={favorites.some((fav) => fav.imdbID === m.imdbID)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {showFav && favorites.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">
            No favorite movies yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

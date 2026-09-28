import { useState ,useEffect} from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

function App() {
  const [Watchlist, setWatchlist] = useState([]);
  // add movie to watchlist
  const addToWatchlist = (movie) => {
    const alreadyInWatchlist = Watchlist.some((item) => item.id === movie.id);
    if (alreadyInWatchlist) {
      alert("Movie is already in the watchlist!");
      return;
    }
    setWatchlist([...Watchlist, movie]);
  };


  //  remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId)
    );
  };

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    axios.get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  const filteredMovies = genre === "All" 
  ? movies 
  : movies.filter((movie) => movie.genre === genre);

  if (loading) {
    return (<h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading movies...</h2>);
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2px", gridColumn: "1 / -1", }}>
        🎬 Movie Watchlist
      </h1>
       <h2 style={{ textAlign: "center", marginBottom: "20px", gridColumn: "1 / -1", padding: "1px" }}>Movie List</h2>

    /* Genre buttons */

    <div style={{ textAlign: "center", marginBottom: "20px", gridColumn: "1 / -1", padding: "1px" }}>

      <button style={{ margin: "5px" , spacing: "5px", spacebetween: "5px"}} onClick={() => setGenre("All")}>
        All
      </button>

      <button style={{ margin: "5px" , spacing: "5px", spacebetween: "5px"}} onClick={() => setGenre("Action")}>
        Action
      </button>

      <button style={{ margin: "5px" , spacing: "5px", spacebetween: "5px"}} onClick={() => setGenre("Comedy")}>
        Comedy
      </button>

      <button style={{ margin: "5px" , spacing: "5px", spacebetween: "5px"}} onClick={() => setGenre("Drama")}>
        Drama
      </button>

    </div>

    {filteredMovies.length === 0 ? (
      <h2>No movies found for the selected genre.</h2>
    ) : (
      <div style={{ display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)", 
      gap: "20px" }}>

      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          genre={movie.genre}
          year={movie.year}
          rating={movie.rating}
          onAdd={() => addToWatchlist(movie)}
        />
      ))}
      </div>
    )}

      <h2 style={{ textAlign: "center" }}>My Watchlist</h2>

      {Watchlist.map((movie) => (
        <div key={movie.id}>
          <p>
            {movie.title}-{movie.genre}-{movie.year}-{movie.rating}
          </p>
          <button onClick={() => removeFromWatchlist(movie.id)}> Remove</button>
        </div>
      ))}
    </div>
  );
}


export default App;

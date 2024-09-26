import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import { fetchTrendingMovies } from "../../api/moviesAPI";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllMovies = async () => {
      setLoading(true);
      try {
        const results = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        toast.error("Something went wrong. Try again later", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    getAllMovies();
  }, []);
  return (
    <div>
      <h1>Trending now</h1>
      {loading && <Loader />}
      <MoviesList movies={movies} />
      <Toaster />
    </div>
  );
}

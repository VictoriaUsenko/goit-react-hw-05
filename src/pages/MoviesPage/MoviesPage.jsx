import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import MoviesList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

import { fetchMovies } from "../../api/moviesAPI";

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const userRequest = searchParams.get("query") ?? "";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      if (!userRequest) return;
      setLoading(true);
      try {
        const data = await fetchMovies(userRequest);
        setMovies(data);
      } catch (error) {
        toast.error("Something went wrong. Try again later", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [userRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchValue = e.target.userRequest.value.trim();
    const params = searchValue !== "" ? { query: searchValue } : {};
    setSearchParams(params);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userRequest" />
        <button type="submit">Search</button>
      </form>
      {loading && <Loader />}
      {movies !== null && <MoviesList movies={movies} />}
      <Toaster />
    </div>
  );
}

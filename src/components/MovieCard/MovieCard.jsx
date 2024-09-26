import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { fetchMovieDetails } from "../../api/moviesAPI";
import Loader from "../../components/Loader/Loader";

import css from "./MovieCard.module.css";

export default function MovieCard() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const release_date = new Date(movieDetails.release_date);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        toast.error("Something went wrong. Try again later", {
          duration: 4000,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      <div className={css.movieWrap}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.original_title}
        />
        <div className={css.info}>
          <h2>
            {movieDetails.title} {release_date.getFullYear()}
          </h2>
          <p>User score: {Math.round(movieDetails.vote_average * 10)}% </p>
          <h3>Overveiw</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <ul className={css.list}>
            {movieDetails.genres &&
              movieDetails.genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
          </ul>
        </div>
        <Toaster />
      </div>
    </>
  );
}

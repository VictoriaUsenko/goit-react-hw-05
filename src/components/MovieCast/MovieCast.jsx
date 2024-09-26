import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { fetchCast } from "../../api/moviesAPI";

import css from "./MovieCast.module.css";
import Loader from "../../components/Loader/Loader";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const data = await fetchCast(movieId);
        setCast(data.cast);
      } catch (error) {
        toast.error("Something went wrong. Sorry! You can try again later", {
          duration: 4000,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, []);

  return (
    <div>
      <h3 className={css.title}>Movie Cast</h3>
      {loading && <Loader />}
      <ul className={css.list}>
        {cast !== null &&
          cast.map((actor) => {
            return (
              <li key={actor.id} className={css.listItem}>
                <img
                  className={css.actorPhoto}
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={`Photo of ${actor.name}`}
                />
                <h4>{actor.name}</h4>
                <p>Role: {actor.character}</p>
              </li>
            );
          })}
      </ul>
      <Toaster />
    </div>
  );
}

import axios from "axios";
export {
  fetchTrendingMovies,
  fetchMovies,
  fetchMovieDetails,
  fetchReviews,
  fetchCast,
};

const base = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGI5MmRjYTdiZDVlNzExNGEzMWVmNjgyYjNjNTcwNyIsIm5iZiI6MTcyNzI5Njg3OS44NTQxNDksInN1YiI6IjY2ZjQ0NGIzZmM2NTYzMjllMjBkZmZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iUrhiJDEQ5RQ2jvhAllTRf3_WUxVTUcV4l8FO5EGyQ",
  },
};

const fetchTrendingMovies = async () => {
  const { data } = await axios(`${base}/trending/movie/day`, options);
  return data.results;
};

const fetchMovies = async (userRequest) => {
  const { data } = await axios(
    `${base}/search/movie?query=${userRequest}`,
    options
  );
  return data.results;
};

const fetchMovieDetails = async (movieId) => {
  const { data } = await axios(`${base}/movie/${movieId}`, options);
  return data;
};

const fetchCast = async (movieId) => {
  const { data } = await axios(`${base}/movie/${movieId}/credits`, options);
  return data;
};

const fetchReviews = async (movieId) => {
  const { data } = await axios(`${base}/movie/${movieId}/reviews`, options);
  return data;
};

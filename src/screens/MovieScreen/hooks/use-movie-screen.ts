import { useSelector, } from "react-redux";

import { Movie, MovieState, } from "@redux";
import { ScreenRouteProp, } from "../types";

export const useMovieScreen = (route: ScreenRouteProp) => {
  const foundMovies = useSelector((state: MovieState) => state.foundMovies);
  const isFetchingMovie = useSelector((state: MovieState) => state.isFetchingMovie);

  const { id, title, } = route.params;

  const movie = foundMovies.find((item) => item.id === id) as Movie;

  return {
    isFetchingMovie,
    movie,
    title,
  };
};

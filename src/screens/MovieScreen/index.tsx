import React from "react";

import { IMovieScreen, } from "./types";
import { MovieScreenComponent, } from "./components";
import { useMovieScreen, } from "./hooks";

export const MovieScreen: React.FC<IMovieScreen> = ({ route, }) => {
  const { isFetchingMovie, title, movie, } = useMovieScreen(route);

  return <MovieScreenComponent {...movie} defaultTitle={title} isFetchingMovie={isFetchingMovie} />;
};

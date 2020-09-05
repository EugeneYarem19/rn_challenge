import React from "react";
import { RouteProp, } from "@react-navigation/native";
import { useSelector, } from "react-redux";

import { Movie, State, } from "@redux";
import { RootStackParamList, } from "@navigation";

import { MovieScreen as MovieScreenComponent, } from "./MovieScreen";

type ScreenRouteProp = RouteProp<RootStackParamList, "Movie">;

type Props = {
  route: ScreenRouteProp;
};

export const MovieScreen: React.FC<Props> = ({ route, }): JSX.Element => {
  const foundMovies = useSelector((state: State) => state.foundMovies);

  const { id, title, } = route.params;

  const movie = foundMovies.find((item) => item.id === id) as Movie;

  return <MovieScreenComponent {...movie} defaultTitle={title} />;
};

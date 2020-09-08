import { Movie, } from "@redux";

export interface IMovieScreenComponent extends Movie {
  defaultTitle: string;
  isFetchingMovie: boolean;
}

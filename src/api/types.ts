import { ApiResponse, } from "apisauce";

interface MovieBrief {
  Title: string;
  imdbID: string;
  Poster: string;
}

interface Response {
  Response: string;
}

export interface SearchOkResponse extends Response {
  Search: MovieBrief[];
  totalResults: string;
}

export interface ErrorResponse extends Response {
  Error: string;
}

export type SearchResponse = ApiResponse<SearchOkResponse | ErrorResponse>;

export interface MovieOkResponse extends Response, MovieBrief {
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
}

export type MovieResponse = ApiResponse<MovieOkResponse | ErrorResponse>;

export type IResponse = ApiResponse<Response>;

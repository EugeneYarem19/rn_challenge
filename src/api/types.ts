import { ApiResponse, } from "apisauce";

export interface MovieBrief {
  Title: string;
  imdbID: string;
  Poster: string;
}

export interface MovieDetailed extends MovieBrief {
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
}

export interface Response {
  Response: string;
}

export interface SearchOkResponse extends Response {
  Search: MovieBrief[];
  totalResults: string;
}

export interface SearchErrorResponse extends Response {
  Error: string;
}

export type SearchResponse = ApiResponse<SearchOkResponse | SearchErrorResponse>;

export interface MovieResponse extends MovieDetailed {
  Response: string;
}

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

export interface SearchResponse {
  Search: MovieBrief[];
  totalResults: string;
  Response: string;
}

export interface MovieResponse extends MovieDetailed {
  Response: string;
}

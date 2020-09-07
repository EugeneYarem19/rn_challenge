import { Movie, } from "@redux";

export interface ISearchScreen {
  fetchMore: () => void;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isSearching: boolean;
  renderItem: (renderElementItem: { item: Movie }) => JSX.Element;
  searchErrorMessage: string;
}

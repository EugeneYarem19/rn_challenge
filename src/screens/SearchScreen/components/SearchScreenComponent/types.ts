import { Movie, } from "@redux";

export interface ISearchScreenComponent {
  fetchMore: () => void;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isSearching: boolean;
  renderItem: (renderElementItem: { item: Movie }) => JSX.Element;
  searchErrorMessage: string;
}

import { ActionTypes, FetchMoreSuccessAction, FetchMovieSuccessAction, SearchAction, SearchSuccessAction, State, actions, initState, } from "./types";

export default (state: State = initState, action: ActionTypes): State => {
  switch (action.type) {
    case actions.SEARCH_REQUEST:
      return {
        ...state,
        isSearching: true,
        currentSearchTitle: (action as SearchAction).payload.title,
      };

    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        foundMovies: (action as SearchSuccessAction).payload.movies,
      };

    case actions.SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
      };

    case actions.FETCH_MORE_REQUEST:
      return {
        ...state,
        isFetchingMore: true,
      };

    case actions.FETCH_MORE_SUCCESS:
      return {
        ...state,
        isFetchingMore: false,
        foundMovies: [...state.foundMovies, ...(action as FetchMoreSuccessAction).payload.movies,],
        nextSearchPage: state.nextSearchPage + 1,
      };

    case actions.FETCH_MORE_FAILED:
      return {
        ...state,
        isFetchingMore: false,
      };

    case actions.FETCH_MOVIE_REQUEST:
      return {
        ...state,
        isFetchingMovie: true,
      };

    case actions.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        isFetchingMovie: false,
        foundMovies: state.foundMovies.map((item) =>
          item.id === (action as FetchMovieSuccessAction).payload.id ? { ...item, fullPlot: (action as FetchMovieSuccessAction).payload.fullPlot, } : item
        ),
      };

    case actions.FETCH_MOVIE_FAILED:
      return {
        ...state,
        isFetchingMovie: false,
      };

    default:
      return state;
  }
};

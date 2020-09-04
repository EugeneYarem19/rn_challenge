import {
  ActionTypes,
  FetchMoreFailedAction,
  FetchMoreSuccessAction,
  FetchMovieSuccessAction,
  SearchAction,
  SearchFailedAction,
  SearchSuccessAction,
  State,
  actionTypes,
  initState,
} from "./types";

export default (state: State = initState, action: ActionTypes): State => {
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isFetchingMore: false,
        isSearching: true,
        isThatsAll: true,
        currentSearchTitle: (action as SearchAction).payload.title,
        foundMovies: [],
        searchErrorMessage: "",
        nextSearchPage: 2,
      };

    case actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        foundMovies: (action as SearchSuccessAction).payload.movies,
        isThatsAll: (action as SearchSuccessAction).payload.isThatsAll,
      };

    case actionTypes.SEARCH_FAILED:
      return {
        ...state,
        isSearching: false,
        isThatsAll: true,
        searchErrorMessage: (action as SearchFailedAction).payload.errorMessage,
      };

    case actionTypes.FETCH_MORE_REQUEST:
      return {
        ...state,
        isFetchingMore: true,
        searchErrorMessage: "",
      };

    case actionTypes.FETCH_MORE_SUCCESS:
      return {
        ...state,
        isFetchingMore: false,
        foundMovies: [...state.foundMovies, ...(action as FetchMoreSuccessAction).payload.movies,],
        nextSearchPage: state.nextSearchPage + 1,
        isThatsAll: (action as FetchMoreSuccessAction).payload.isThatsAll,
      };

    case actionTypes.FETCH_MORE_FAILED:
      return {
        ...state,
        isFetchingMore: false,
        searchErrorMessage: (action as FetchMoreFailedAction).payload.errorMessage,
      };

    case actionTypes.FETCH_MOVIE_REQUEST:
      return {
        ...state,
        isFetchingMovie: true,
      };

    case actionTypes.FETCH_MOVIE_SUCCESS: {
      const { id, ...restPayload } = (action as FetchMovieSuccessAction).payload;

      return {
        ...state,
        isFetchingMovie: false,
        foundMovies: state.foundMovies.map((item) => (item.id === id ? { ...item, ...restPayload.detailedInfo, } : item)),
      };
    }

    case actionTypes.FETCH_MOVIE_FAILED:
      return {
        ...state,
        isFetchingMovie: false,
      };

    default:
      return state;
  }
};

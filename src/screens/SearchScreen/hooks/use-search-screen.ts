import { StackActions, } from "@react-navigation/native";
import { useCallback, } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { MovieState, moviesActions, } from "@redux";
import { StackNavigationNames, } from "@src/constants";

import { ScreenNavigationProp, } from "../types";

export const useSearchScreen = (navigation: ScreenNavigationProp | null) => {
  const dispatch = useDispatch();
  const foundMovies = useSelector((state: MovieState) => state.foundMovies);
  const isFetchingMore = useSelector((state: MovieState) => state.isFetchingMore);
  const isSearching = useSelector((state: MovieState) => state.isSearching);
  const isThatsAll = useSelector((state: MovieState) => state.isThatsAll);
  const searchErrorMessage = useSelector((state: MovieState) => state.searchErrorMessage);

  const fetchMore = useCallback(() => {
    if (!isFetchingMore && !isThatsAll) {
      dispatch(moviesActions.fetchMore());
    }
  }, [dispatch, isFetchingMore, isThatsAll,]);

  const handleOnPressMovie = useCallback(
    (id: string, title: string) => {
      if (navigation) {
        navigation.dispatch(StackActions.push(StackNavigationNames.movie, { id, title, }));
        dispatch(moviesActions.fetchMovie(id));
      }
    },
    [dispatch, navigation,]
  );

  return {
    isFetchingMore,
    isSearching,
    isThatsAll,
    searchErrorMessage,
    foundMovies,
    fetchMore,
    handleOnPressMovie,
  };
};

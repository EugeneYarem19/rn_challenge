import { Keyboard, } from "react-native";
import { useCallback, useState, } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { MovieState, moviesActions, } from "@redux";
import { displayInfo, } from "@utils";
import { errors, } from "@src/constants";

export const useSearchBar = () => {
  const dispatch = useDispatch();
  const currentSearchTitle = useSelector((state: MovieState) => state.currentSearchTitle);
  const [searchTitle, setSearchTitle,] = useState<string>("");

  const search = useCallback(() => {
    if (!searchTitle || !searchTitle.length || !searchTitle.trim()) {
      displayInfo(errors.emptyTitle);
      return;
    }
    if (searchTitle === currentSearchTitle) {
      return;
    }

    Keyboard.dismiss();
    dispatch(moviesActions.findMovies(searchTitle));
  }, [dispatch, currentSearchTitle, searchTitle,]);

  const updateSearchTitle = useCallback((title) => setSearchTitle(title), [setSearchTitle,]);
  const clearSearchTitle = useCallback(() => setSearchTitle(""), [setSearchTitle,]);

  return {
    searchTitle,
    clearSearchTitle,
    search,
    updateSearchTitle,
  };
};

import { Keyboard, } from "react-native";
import { useCallback, useState, } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { State, actions, } from "@redux";
import { displayInfo, } from "@utils";

export const useSearchBar = () => {
  const dispatch = useDispatch();
  const currentSearchTitle = useSelector((state: State) => state.currentSearchTitle);
  const [searchTitle, setSearchTitle,] = useState<string>("");

  const search = useCallback(() => {
    if (!searchTitle || !searchTitle.length || !searchTitle.trim()) {
      displayInfo("Please, provide movie title to search");
      return;
    }
    if (searchTitle === currentSearchTitle) {
      return;
    }

    Keyboard.dismiss();
    dispatch(actions.findMovies(searchTitle));
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

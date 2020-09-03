import React, { useCallback, useState, } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { State, actions, } from "@redux";
import { displayInfo, } from "@utils";

import { SearchScreen as SearchScreenComponent, } from "./SearchScreen";

export const SearchScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const foundMovies = useSelector((state: State) => state.foundMovies);
  const isFetchingMore = useSelector((state: State) => state.isFetchingMore);
  const isSearching = useSelector((state: State) => state.isSearching);
  const searchErrorMessage = useSelector((state: State) => state.searchErrorMessage);

  const [searchTitle, setSearchTitle,] = useState("");

  const search = useCallback(() => {
    if (!searchTitle || !searchTitle.length || !searchTitle.trim()) {
      displayInfo("Please, provide movie title to search");
      return;
    }

    dispatch(actions.findMovies(searchTitle));
  }, [dispatch, searchTitle,]);
  const fetchMore = useCallback(() => dispatch(actions.fetchMore()), [dispatch,]);
  const updateSearchTitle = useCallback((title) => setSearchTitle(title), [setSearchTitle,]);

  return (
    <SearchScreenComponent
      fetchMore={fetchMore}
      foundMovies={foundMovies}
      isFetchingMore={isFetchingMore}
      isSearching={isSearching}
      search={search}
      searchErrorMessage={searchErrorMessage}
      searchTitle={searchTitle}
      updateSearchTitle={updateSearchTitle}
    />
  );
};

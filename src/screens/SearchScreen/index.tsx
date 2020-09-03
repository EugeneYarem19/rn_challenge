import React, { useCallback, } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Movie, State, actions, } from "@redux";

import { SearchScreen as SearchScreenComponent, } from "./SearchScreen";
import { SearchResultItem, } from "./components";

export const SearchScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const foundMovies = useSelector((state: State) => state.foundMovies);
  const isFetchingMore = useSelector((state: State) => state.isFetchingMore);
  const isSearching = useSelector((state: State) => state.isSearching);
  const searchErrorMessage = useSelector((state: State) => state.searchErrorMessage);

  const fetchMore = useCallback(() => dispatch(actions.fetchMore()), [dispatch,]);
  const renderItem = useCallback(
    ({ item: { id, title, poster, }, }: { item: Movie }): JSX.Element => (
      <SearchResultItem title={title} poster={poster} onPress={() => dispatch(actions.fetchMovie(id))} />
    ),
    [dispatch,]
  );

  return (
    <SearchScreenComponent
      fetchMore={fetchMore}
      foundMovies={foundMovies}
      isFetchingMore={isFetchingMore}
      isSearching={isSearching}
      renderItem={renderItem}
      searchErrorMessage={searchErrorMessage}
    />
  );
};

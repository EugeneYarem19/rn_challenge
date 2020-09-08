import React from "react";

import { Movie, } from "@redux";

import { ISearchScreen, } from "./types";
import { SearchScreenComponent, } from "./components";
import { SearchResultItem, } from "./components";
import { useSearchScreen, } from "./hooks";

export const SearchScreen: React.FC<ISearchScreen> = ({ navigation, }) => {
  const { isFetchingMore, isSearching, foundMovies, searchErrorMessage, fetchMore, handleOnPressMovie, } = useSearchScreen(navigation);

  const renderItem = (renderElementItem: { item: Movie }) => {
    const { id, title, poster, } = renderElementItem.item;

    return <SearchResultItem title={title} testID={id} poster={poster} onPress={() => handleOnPressMovie(id, title)} />;
  };

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

import React, { useCallback, } from "react";
import { StackActions, } from "@react-navigation/native";
import { StackNavigationProp, } from "@react-navigation/stack";
import { useDispatch, useSelector, } from "react-redux";

import { Movie, MovieState, moviesActions, } from "@redux";
import { RootStackParamList, } from "@navigation";

import { SearchScreen as SearchScreenComponent, } from "./SearchScreen";
import { SearchResultItem, } from "./components";

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: ScreenNavigationProp;
};

export const SearchScreen: React.FC<Props> = ({ navigation, }): JSX.Element => {
  const dispatch = useDispatch();
  const foundMovies = useSelector((state: MovieState) => state.foundMovies);
  const isFetchingMore = useSelector((state: MovieState) => state.isFetchingMore);
  const isSearching = useSelector((state: MovieState) => state.isSearching);
  const isThatsAll = useSelector((state: MovieState) => state.isThatsAll);
  const searchErrorMessage = useSelector((state: MovieState) => state.searchErrorMessage);

  const fetchMore = useCallback(() => {
    if (!isFetchingMore && !isThatsAll) {
      console.warn("fetch");
      dispatch(moviesActions.fetchMore());
    }
  }, [dispatch, isFetchingMore, isThatsAll,]);

  const renderItem = useCallback(
    ({ item: { id, title, poster, }, }: { item: Movie }): JSX.Element => (
      <SearchResultItem
        title={title}
        testID={id}
        poster={poster}
        onPress={() => {
          navigation.dispatch(StackActions.push("Movie", { id, title, }));
          dispatch(moviesActions.fetchMovie(id));
        }}
      />
    ),
    [dispatch, navigation,]
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

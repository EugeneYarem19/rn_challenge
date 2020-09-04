import React from "react";
import { FlatList, Text, View, } from "react-native";

import { LoadingIndicator, } from "@components";

import { Movie, } from "@redux";

import { styles, } from "./styles";

interface SearchCallback {
  (): void;
}

interface RenderItemCallback {
  ({ item, }: { item: Movie }): JSX.Element;
}

interface Props {
  fetchMore: SearchCallback;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isSearching: boolean;
  renderItem: RenderItemCallback;
  searchErrorMessage: string;
}

export const SearchScreen: React.FC<Props> = ({ fetchMore, foundMovies, isFetchingMore, isSearching, renderItem, searchErrorMessage, }): JSX.Element => (
  <View style={styles.screen}>
    {isSearching ? (
      <LoadingIndicator />
    ) : searchErrorMessage !== "" ? (
      <View style={styles.errorMessageBlock}>
        <Text style={styles.errorMessageText}>{searchErrorMessage}</Text>
      </View>
    ) : (
      <FlatList
        data={foundMovies}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.listContentContainer}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingMore ? <LoadingIndicator /> : null}
      />
    )}
  </View>
);

import React from "react";
import { FlatList, Text, View, } from "react-native";

import { Movie, } from "@redux";

import { styles, } from "./styles";

interface SearchCallback {
  (): void;
}

interface Props {
  fetchMore: SearchCallback;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isSearching: boolean;
  searchErrorMessage: string;
}

export const SearchScreen: React.FC<Props> = ({ fetchMore, foundMovies, isFetchingMore, isSearching, searchErrorMessage, }): JSX.Element => (
  <View style={styles.screen}>
    {searchErrorMessage !== "" ? (
      <Text>{searchErrorMessage}</Text>
    ) : (
      <FlatList
        data={foundMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item, }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    )}
  </View>
);

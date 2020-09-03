import React from "react";
import { Button, FlatList, Text, TextInput, View, } from "react-native";

import { Movie, } from "@redux";

import { styles, } from "./styles";

interface SearchCallback {
  (): void;
}

interface UpdateTitleCallback {
  (title: string): void;
}

interface Props {
  fetchMore: SearchCallback;
  foundMovies: Movie[];
  isFetchingMore: boolean;
  isSearching: boolean;
  search: SearchCallback;
  searchErrorMessage: string;
  searchTitle: string;
  updateSearchTitle: UpdateTitleCallback;
}

export const SearchScreen: React.FC<Props> = ({
  fetchMore,
  foundMovies,
  isFetchingMore,
  isSearching,
  search,
  searchErrorMessage,
  searchTitle,
  updateSearchTitle,
}): JSX.Element => (
  <View style={styles.screen}>
    <TextInput value={searchTitle} onChangeText={updateSearchTitle} />
    <Button title="Search" onPress={search} />
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

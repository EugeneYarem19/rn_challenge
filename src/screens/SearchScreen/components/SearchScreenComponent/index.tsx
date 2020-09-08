import React from "react";
import { FlatList, Text, View, } from "react-native";

import { LoadingIndicator, } from "@components";

import { ISearchScreenComponent, } from "./types";
import { styles, } from "./styles";

export const SearchScreenComponent: React.FC<ISearchScreenComponent> = ({ fetchMore, foundMovies, isFetchingMore, isSearching, renderItem, searchErrorMessage, }) => (
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

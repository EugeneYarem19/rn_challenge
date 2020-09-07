import React from "react";
import { Text, TouchableOpacity, View, } from "react-native";

import { Poster, } from "@components";

import { ISearchResultItem, } from "./types";
import { styles, } from "./styles";

export const SearchResultItem: React.FC<ISearchResultItem> = ({ poster, onPress, title, testID, }) => (
  <TouchableOpacity testID={testID} onPress={onPress} style={styles.container}>
    <View style={styles.wrapper}>
      <Poster poster={poster} style={styles.poster} />
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

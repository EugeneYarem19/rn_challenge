import React from "react";
import { Text, TouchableOpacity, View, } from "react-native";

import { Poster, } from "@components";

import { styles, } from "./styles";

interface Callback {
  (): void;
}

interface Props {
  poster: string | undefined;
  onPress: Callback;
  title: string;
  testID: string;
}

export const SearchResultItem: React.FC<Props> = ({ poster, onPress, title, testID, }): JSX.Element => (
  <TouchableOpacity testID={testID} onPress={onPress} style={styles.container}>
    <View style={styles.wrapper}>
      <Poster poster={poster} style={styles.poster} />
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

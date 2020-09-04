import React from "react";
import { Icon, } from "react-native-material-ui";
import { Image, Text, TouchableOpacity, View, } from "react-native";

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
      {poster ? (
        <Image source={{ uri: poster, }} style={styles.poster} />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="wallpaper" size={50} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
);

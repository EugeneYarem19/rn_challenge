import React from "react";
import { View, } from "react-native";
import { Button, } from "react-native-material-ui";

import { ISearchButton, } from "./types";
import { styles, } from "./styles";

export const SearchButton: React.FC<ISearchButton> = ({ onPress, }) => (
  <View testID="SearchButton">
    <Button icon="search" text="" onPress={onPress} style={{ container: styles.container, }} />
  </View>
);

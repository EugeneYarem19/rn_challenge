import React from "react";
import { View, } from "react-native";
import { Button, } from "react-native-material-ui";

import { styles, } from "./styles";

interface SearchCallback {
  (): void;
}

interface Props {
  onPress: SearchCallback;
}

export const SearchButton: React.FC<Props> = ({ onPress, }): JSX.Element => (
  <View testID="SearchButton">
    <Button icon="search" text="" onPress={onPress} style={{ container: styles.container, }} />
  </View>
);

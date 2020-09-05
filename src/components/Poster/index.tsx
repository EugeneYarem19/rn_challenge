import React from "react";
import { Icon, } from "react-native-material-ui";
import { Image, View, } from "react-native";

import { styles, } from "./styles";

type ImageSize = "small" | "large";

interface Props {
  poster: string | undefined;
  size: ImageSize;
  style?: Record<string, unknown> | null;
}

export const Poster: React.FC<Props> = ({ poster, size = "small", style, }) => {
  let sizeStyle;
  switch (size) {
    case "small":
      sizeStyle = styles.small;
      break;
    case "large":
      sizeStyle = styles.large;
      break;
  }

  return poster ? (
    <Image source={{ uri: poster, }} style={{ ...styles.poster, ...sizeStyle, ...style, }} />
  ) : (
    <View style={{ ...styles.placeholder, ...sizeStyle, ...style, }}>
      <Icon name="wallpaper" size={50} />
    </View>
  );
};

import React from "react";
import ProgressImage from "react-native-image-progress";
import { Icon, } from "react-native-material-ui";
import { View, } from "react-native";

import { LoadingIndicator, } from "@components";

import { IPoster, } from "./types";
import { styles, } from "./styles";
import { usePoster, } from "./hooks";

export const Poster: React.FC<IPoster> = ({ poster, size = "small", smallOnEmptyPoster = true, smallOnError = true, style, }) => {
  const { loadError, onError, } = usePoster();

  let sizeStyle;
  switch (size) {
    case "small":
      sizeStyle = styles.small;
      break;
    case "large":
      sizeStyle = styles.large;
      break;
  }

  const Img = loadError ? (
    <View style={{ ...styles.placeholder, ...(smallOnError ? styles.small : sizeStyle), ...style, }}>
      <Icon name="wallpaper" size={50} />
    </View>
  ) : (
    <ProgressImage
      source={{ uri: poster, }}
      indicator={LoadingIndicator}
      onError={onError}
      resizeMode="contain"
      style={{ ...styles.poster, ...sizeStyle, ...style, }}
      threshold={0}
    />
  );

  return poster ? (
    <>{Img}</>
  ) : (
    <View style={{ ...styles.placeholder, ...(smallOnEmptyPoster ? styles.small : sizeStyle), ...style, }}>
      <Icon name="wallpaper" size={50} />
    </View>
  );
};

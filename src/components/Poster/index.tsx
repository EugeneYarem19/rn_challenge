import React, { useCallback, useState, } from "react";
import ProgressImage from "react-native-image-progress";
import { Icon, } from "react-native-material-ui";
import { View, } from "react-native";

import { LoadingIndicator, } from "@components";

import { styles, } from "./styles";

type ImageSize = "small" | "large";

interface Props {
  poster: string | undefined;
  size?: ImageSize;
  smallOnEmptyPoster?: boolean;
  smallOnError?: boolean;
  style?: Record<string, unknown> | null;
}

export const Poster: React.FC<Props> = ({ poster, size = "small", smallOnEmptyPoster = true, smallOnError = true, style, }) => {
  const [loadError, setError,] = useState(false);

  const onError = useCallback(() => setError(true), [setError,]);

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

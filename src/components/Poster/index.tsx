import React from "react";
import ProgressImage from "react-native-image-progress";
import { Icon, } from "react-native-material-ui";
import { View, } from "react-native";

import { LoadingIndicator, } from "../LoadingIndicator";

import { IPoster, ImageSize, } from "./types";
import { styles, } from "./styles";
import { usePoster, } from "./hooks";

export const Poster: React.FC<IPoster> = ({
  poster,
  size = ImageSize.small,
  smallOnEmptyPoster = true,
  smallOnError = true,
  style,
}) => {
  const sizeStyle = size === ImageSize.small ? styles.small : styles.large;
  const { loadError, onError, } = usePoster();

  const renderPlaceholder = (additionalSizedStyle: typeof style) => (
    <View style={[styles.placeholder, additionalSizedStyle, style,]}>
      <Icon name="wallpaper" size={50} />
    </View>
  );

  const renderPosterIcon = () => {
    if (loadError) {
      return renderPlaceholder(smallOnError ? styles.small : sizeStyle);
    } else if (!poster) {
      return renderPlaceholder(smallOnEmptyPoster ? styles.small : sizeStyle);
    } else {
      return (
        <ProgressImage
          source={{ uri: poster, }}
          indicator={LoadingIndicator}
          onError={onError}
          resizeMode="contain"
          style={[styles.poster, sizeStyle, style,]}
          threshold={0}
        />
      );
    }
  };

  return renderPosterIcon();
};

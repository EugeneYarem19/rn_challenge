import { Dimensions, StyleSheet, } from "react-native";

import { palette, } from "@theme";

const imageWidth = Dimensions.get("window").width - 16;

const image = { borderRadius: 8, };

export const styles = StyleSheet.create({
  poster: { ...image, },
  placeholder: {
    ...image,
    alignItems: "center",
    backgroundColor: palette.canvasColor,
    flexDirection: "column",
    justifyContent: "center",
  },
  small: { height: 180, width: 122, },
  large: { maxHeight: 443, maxWidth: 300, height: imageWidth * 1.4, width: imageWidth, },
});

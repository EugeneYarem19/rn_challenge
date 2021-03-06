import { Dimensions, StyleSheet, } from "react-native";

import { palette, } from "@theme";

const imageWidth = Dimensions.get("window").width - 16;
const image = { backgroundColor: palette.canvasColor, };

export const styles = StyleSheet.create({
  poster: { ...image, overflow: "hidden", },
  placeholder: {
    ...image,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  small: { borderRadius: 8, height: 180, width: 122, },
  large: {
    borderRadius: 20,
    maxHeight: 443,
    maxWidth: 300,
    height: imageWidth * 1.4,
    width: imageWidth,
  },
});

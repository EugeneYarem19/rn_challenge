import { StyleSheet, } from "react-native";

import { palette, } from "@theme";

const image = { borderRadius: 8, height: 180, marginTop: -35, width: 122, };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
    height: 200,
    marginBottom: 20,
    overflow: "hidden",
  },
  wrapper: {
    backgroundColor: palette.primaryColor,
    borderRadius: 5,
    flexDirection: "row",
    height: 165,
    paddingHorizontal: 16,
  },
  poster: { ...image, },
  placeholder: {
    ...image,
    alignItems: "center",
    backgroundColor: palette.canvasColor,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    color: palette.primaryTextColor,
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 16,
  },
});

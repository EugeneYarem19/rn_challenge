import { StyleSheet, } from "react-native";

import { palette, } from "@theme";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.canvasColor,
    flex: 1,
    paddingHorizontal: 16,
  },
  screenContainer: { alignItems: "center", },
  title: {
    color: palette.primaryTextColor,
    fontFamily: "Arial",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  poster: {
    backgroundColor: palette.primaryColor,
    borderColor: palette.primaryColor,
    borderWidth: 4,
    marginTop: 15,
    marginBottom: 15,
  },
});

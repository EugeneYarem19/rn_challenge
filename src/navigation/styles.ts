import { Platform, StyleSheet, } from "react-native";

import { palette, } from "@theme";

export const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: palette.canvasColor,
    elevation: 0,
    height: Platform.OS === "ios" ? 110 : 70,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontFamily: "Arial",
    fontSize: 32,
    fontWeight: "bold",
  },
});

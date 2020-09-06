import { StyleSheet, } from "react-native";

import { palette, } from "@theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
  },
  key: {
    color: palette.primaryTextColor,
    fontSize: 21,
    fontWeight: "bold",
    marginRight: 5,
  },
  source: {
    color: palette.primaryTextColor,
    fontSize: 20,
    marginRight: 5,
    textDecorationLine: "underline",
  },
  value: {
    color: palette.primaryTextColor,
    flex: 1,
    fontSize: 21,
    fontWeight: "bold",
    marginVertical: 3,
  },
});

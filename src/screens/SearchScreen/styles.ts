import { StyleSheet, } from "react-native";

import { palette, } from "@theme";

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: palette.canvasColor,
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  listContentContainer: { paddingBottom: 25, },
  errorMessageBlock: {
    alignItems: "center",
    backgroundColor: palette.primaryColor,
    borderRadius: 5,
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 25,
    minHeight: 60,
    padding: 16,
  },
  errorMessageText: {
    color: palette.accentColor,
    fontSize: 21,
    fontWeight: "bold",
  },
});

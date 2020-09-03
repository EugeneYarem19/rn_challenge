/**
 * This module contains app main theme.
 *
 * @format
 */

import Color from "color";

export const palette = {
  // main theme colors
  primaryColor: "#1e3166",
  accentColor: "#e59f2b",
  // text color palette
  primaryTextColor: "#ccc",
  secondaryTextColor: "#c0cadb",
  alternateTextColor: "#7b58ab",
  // backgournds and borders
  canvasColor: "#131d3d",
  borderColor: "#0b1124",
  // https://material.google.com/style/color.html#color-text-background-colors
  disabledColor: Color("#000").alpha(0.38).toString(),
  disabledTextColor: Color("#000").alpha(0.26).toString(),
  activeIcon: Color("#000").alpha(0.54).toString(),
  inactiveIcon: Color("#000").alpha(0.38).toString(),

  transparent: "transparent",
};

export const uiTheme = { palette, }; // it's for merging with default react-native-material-ui theme

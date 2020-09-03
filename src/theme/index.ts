/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * This module contains app main theme.
 *
 * @format
 */

import Color from "color";

export const palette = {
  // main theme colors
  primaryColor: "#132555",
  accentColor: "#e59f2b",
  // text color palette
  primaryTextColor: "#c0cadb",
  secondaryTextColor: "#c0cadb",
  alternateTextColor: "#4f3444",
  // backgournds and borders
  canvasColor: "#0b1124",
  borderColor: "#0b1124",
  // https://material.google.com/style/color.html#color-text-background-colors
  disabledColor: Color("#000").alpha(0.38).toString(),
  disabledTextColor: Color("#000").alpha(0.26).toString(),
  activeIcon: Color("#000").alpha(0.54).toString(),
  inactiveIcon: Color("#000").alpha(0.38).toString(),
};

export const uiTheme = { palette, }; // it's for merging with default react-native-material-ui theme

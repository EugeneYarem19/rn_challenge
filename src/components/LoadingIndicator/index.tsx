import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, } from "react-native";

import { palette, } from "@theme";

export const LoadingIndicator: React.FC<ActivityIndicatorProps> = ({ color = palette.accentColor, size = "large", }) => (
  <ActivityIndicator size={size} color={color} />
);

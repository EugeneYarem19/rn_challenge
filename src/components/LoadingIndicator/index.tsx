import React from "react";
import { ActivityIndicator, } from "react-native";

import { palette, } from "@theme";

export const LoadingIndicator = (): JSX.Element => <ActivityIndicator size="large" color={palette.accentColor} />;

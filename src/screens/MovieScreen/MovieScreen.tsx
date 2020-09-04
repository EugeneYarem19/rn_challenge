import React from "react";
import { View, } from "react-native";

import { Movie, } from "@redux";

import { styles, } from "./styles";

interface Props extends Movie {
    defaultTitle: string;
}

export const MovieScreen: React.FC<Props> = (): JSX.Element => <View style={styles.screen} />;

import React from "react";
import { Text, View, } from "react-native";

import { IDetailsItem, } from "./types";
import { styles, } from "./styles";

export const DetailsItem: React.FC<IDetailsItem> = ({ title, value, }) => (
  <View style={styles.container}>
    <Text style={styles.key}>{title + ": "}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

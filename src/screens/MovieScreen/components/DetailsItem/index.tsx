import React from "react";
import { Text, View, } from "react-native";

import { styles, } from "./styles";

interface Props {
  title: string;
  value: string;
}

export const DetailsItem: React.FC<Props> = ({ title, value, }) => (
  <View style={styles.container}>
    <Text style={styles.key}>{title + ": "}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

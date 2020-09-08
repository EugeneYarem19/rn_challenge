import React from "react";
import { Text, View, } from "react-native";

import { IRating, } from "./types";
import { styles, } from "./styles";

export const Rating: React.FC<IRating> = ({ ratings, }) => (
  <View style={styles.container}>
    <Text style={styles.key}>Ratings: </Text>
    <View>
      {ratings.map(({ source, value, }) => (
        <View key={source}>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  </View>
);

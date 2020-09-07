import React from "react";
import { Text, View, } from "react-native";

import { Rating as IRating, } from "@redux";

import { styles, } from "./styles";

interface Props {
  ratings: IRating[];
}

export const Rating: React.FC<Props> = ({ ratings, }) => (
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

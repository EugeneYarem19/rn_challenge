import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";

import { MovieScreen, SearchScreen, } from "@screens";
import { SearchBar, } from "@components";

import { palette, } from "@theme";

import { styles, } from "./styles";

const Stack = createStackNavigator();

export const Navigation = (): JSX.Element => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: styles.headerStyle,
      headerTintColor: palette.primaryTextColor,
      headerTitleAlign: "left",
      headerTitleStyle: styles.headerTitleStyle,
    }}
  >
    <Stack.Screen name="Home" component={SearchScreen} options={{ headerRight: () => <SearchBar />, }} />
    <Stack.Screen name="Movie" component={MovieScreen} />
  </Stack.Navigator>
);

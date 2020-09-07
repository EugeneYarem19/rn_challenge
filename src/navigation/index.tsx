import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";

import { MovieScreen, SearchScreen, } from "@screens";
import { SearchBar, } from "@components";

import { StackNavigationNames, } from "@src/constants";
import { palette, } from "@theme";

import { styles, } from "./styles";

const Stack = createStackNavigator();

export * from "./types";

export const Navigation: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: styles.headerStyle,
      headerTintColor: palette.primaryTextColor,
      headerTitleAlign: "left",
      headerTitleStyle: styles.headerTitleStyle,
    }}
  >
    <Stack.Screen name={StackNavigationNames.home} component={SearchScreen} options={{ headerRight: () => <SearchBar />, }} />
    <Stack.Screen
      name={StackNavigationNames.movie}
      component={MovieScreen}
      options={{
        headerLeftContainerStyle: styles.movieLeftContainer,
        headerTitleContainerStyle: styles.movieScreenTitleContainer,
        title: "",
      }}
    />
  </Stack.Navigator>
);

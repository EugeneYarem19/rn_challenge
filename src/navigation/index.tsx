import React from "react";
import { createStackNavigator, } from "@react-navigation/stack";

import { MovieScreen, SearchScreen, } from "@screens";

const Stack = createStackNavigator();

export const Navigation = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={SearchScreen} />
    <Stack.Screen name="Movie" component={MovieScreen} />
  </Stack.Navigator>
);

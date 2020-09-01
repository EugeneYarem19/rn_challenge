/**
 * React Native app for evaluation that lists searched results from OMDb API
 * https://github.com/EugeneYarem19/rn_challenge
 *
 * @format
 */

import React from "react";
import { NavigationContainer, } from "@react-navigation/native";

import { Navigation, } from "@navigation";

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;

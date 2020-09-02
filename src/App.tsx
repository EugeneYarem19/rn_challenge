/**
 * React Native app for evaluation that lists searched results from OMDb API
 * https://github.com/EugeneYarem19/rn_challenge
 *
 * @format
 */

import React from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { Provider, } from "react-redux";

import { Navigation, } from "@navigation";
import { store, } from "@redux";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

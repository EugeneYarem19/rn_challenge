/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * React Native app for evaluation that lists searched results from OMDb API
 * https://github.com/EugeneYarem19/rn_challenge
 *
 * @format
 */

import React from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { Provider, } from "react-redux";
import { ThemeContext, getTheme, } from "react-native-material-ui";

import { Navigation, } from "@navigation";
import { store, } from "@redux";
import { uiTheme, } from "@theme";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;

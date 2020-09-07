/**
 * React Native app for evaluation that lists searched results from OMDb API
 * https://github.com/EugeneYarem19/rn_challenge
 *
 * @format
 */

import React from "react";
import { NavigationContainer, } from "@react-navigation/native";
import { Provider, } from "react-redux";
import { StatusBar, } from "react-native";
import { ThemeContext, getTheme, } from "react-native-material-ui";

import { Navigation, } from "@navigation";
import { store, } from "@redux";
import { uiTheme, palette, } from "@theme";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <NavigationContainer>
          <StatusBar backgroundColor={palette.canvasColor} barStyle="light-content" />
          <Navigation />
        </NavigationContainer>
      </ThemeContext.Provider>
    </Provider>
  );
};

export default App;

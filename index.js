/* eslint-disable no-undef */
/* eslint-disable no-global-assign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry, } from "react-native";

import App from "@src/App";
import { name as appName, } from "./app.json";

// needed for network debug
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

AppRegistry.registerComponent(appName, () => App);

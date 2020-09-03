import { Alert, } from "react-native";

export const displayInfo = (message: string, title = ""): void => Alert.alert(title, message);

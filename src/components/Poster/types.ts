import { StyleProp, ViewStyle, } from "react-native";

export enum ImageSize {
  small = "small",
  large = "large",
}

export interface IPoster {
  poster: string | undefined;
  size?: ImageSize;
  smallOnEmptyPoster?: boolean;
  smallOnError?: boolean;
  style?: StyleProp<ViewStyle>;
}

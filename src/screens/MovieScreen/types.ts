import { RouteProp, } from "@react-navigation/native";

import { RootStackParamList, } from "@navigation";

export type ScreenRouteProp = RouteProp<RootStackParamList, "Movie">;

export type IMovieScreen = {
  route: ScreenRouteProp;
};

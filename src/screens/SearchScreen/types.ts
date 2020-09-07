import { StackNavigationProp, } from "@react-navigation/stack";
import { RootStackParamList, } from "@navigation";

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export interface ISearchScreen {
  navigation: ScreenNavigationProp | null;
}

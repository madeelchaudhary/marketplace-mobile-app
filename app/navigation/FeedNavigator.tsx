import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";
import routes from "./routes";

interface StackParamList extends ParamListBase {
  [routes.LISTINGS]: undefined;
  [routes.LISTING_DETAILS]: {
    item: {
      id: number;
      title: string;
      price: number;
      images: any;
    };
  };
}

export type ListingsScreenProps = StackScreenProps<
  StackParamList,
  (typeof routes)["LISTINGS"]
>;
export type ListingDetailScreenProps = StackScreenProps<
  StackParamList,
  (typeof routes)["LISTING_DETAILS"]
>;

const Stack = createStackNavigator<StackParamList>();

export default function FeedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} />
      <Stack.Screen
        name={routes.LISTING_DETAILS}
        component={ListingDetailScreen}
      />
    </Stack.Navigator>
  );
}

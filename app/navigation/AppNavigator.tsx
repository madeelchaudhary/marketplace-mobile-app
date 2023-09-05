import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ParamListBase } from "@react-navigation/native";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./newListingButton";
import colors from "../constants/colors";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";

interface TabParamList extends ParamListBase {
  [routes.FEED]: undefined;
  [routes.ACCOUNT_OPTIONS]: undefined;
  [routes.LISTING_EDIT]: undefined;
}

export type FeedScreenProps = BottomTabScreenProps<
  TabParamList,
  typeof routes.FEED
>;
export type ListingEditScreenProps = BottomTabScreenProps<
  TabParamList,
  typeof routes.LISTING_EDIT
>;

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  useNotifications();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: colors.neutral,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={routes.FEED}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.LISTING_EDIT}
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton() {
            return (
              <NewListingButton
                onPress={() => navigation.navigate(routes.LISTING_EDIT)}
              />
            );
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name={routes.ACCOUNT_OPTIONS}
        component={AccountNavigator}
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

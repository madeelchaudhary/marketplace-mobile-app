import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import defaultStyles from "../constants/styles";
import routes from "./routes";

interface StackParamList extends ParamListBase {
  [routes.ACCOUNT]: undefined;
  [routes.MESSAGES]: undefined;
}

export type AccountScreenProps = StackScreenProps<
  StackParamList,
  typeof routes.ACCOUNT
>;
export type MessagesScreenProps = StackScreenProps<
  StackParamList,
  typeof routes.MESSAGES
>;

const Stack = createStackNavigator<StackParamList>();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { ...defaultStyles.text, fontWeight: "600" },
      }}
    >
      <Stack.Screen
        name={routes.ACCOUNT}
        component={AccountScreen}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
    </Stack.Navigator>
  );
}

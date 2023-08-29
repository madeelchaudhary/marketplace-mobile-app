import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import routes from "./routes";

interface StackParamList extends ParamListBase {
  [routes.REGISTER]: undefined;
  [routes.LOGIN]: undefined;
  [routes.WELCOME]: undefined;
}

export type RegisterScreenProps = NativeStackScreenProps<
  StackParamList,
  typeof routes.REGISTER
>;
export type LoginScreenProps = NativeStackScreenProps<
  StackParamList,
  typeof routes.LOGIN
>;
export type WelcomeScreenProps = NativeStackScreenProps<
  StackParamList,
  typeof routes.WELCOME
>;

const Stack = createNativeStackNavigator<StackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

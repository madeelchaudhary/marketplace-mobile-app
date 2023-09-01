import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthProvider, { useAuth } from "./app/providers/auth";

SplashScreen.preventAutoHideAsync().catch((err) => {
  console.log(err);
});

function MainScreen() {
  const auth = useAuth();
  const user = auth.user;

  if (auth.loading) return null;
  if (!auth.loading) SplashScreen.hideAsync();

  const navigator = user ? <AppNavigator /> : <AuthNavigator />;

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {navigator}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainScreen />
    </AuthProvider>
  );
}

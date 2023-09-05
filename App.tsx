import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthProvider, { useAuth } from "./app/providers/auth";
import logger from "./app/lib/logger";

logger.start();

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // you can add your logic here to handle the notification
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

SplashScreen.preventAutoHideAsync().catch((err) => {
  logger.log(err);
});

function MainScreen() {
  const auth = useAuth();
  const user = auth.user;

  if (auth.loading !== false) return null;
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

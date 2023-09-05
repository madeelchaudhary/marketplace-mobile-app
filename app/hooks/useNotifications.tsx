import { useEffect } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import pushToken from "../api/pushToken";

type NotificationResponseListener = (
  response: Notifications.NotificationResponse
) => void;

export default function useNotifications(
  notificationResponseListener?: NotificationResponseListener
) {
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (!token) return;
      pushToken.register(token);
    });

    let responseListener: Notifications.Subscription | undefined;

    if (notificationResponseListener)
      responseListener = Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(response);
        }
      );

    return () => {
      if (responseListener) responseListener.remove();
    };
  }, []);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  const projectId = Constants.expoConfig!.extra!.eas.projectId;
  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId,
    })
  ).data;

  return token;
}

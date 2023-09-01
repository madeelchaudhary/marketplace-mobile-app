import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import colors from "../constants/colors";
import BaseText from "./ui/base-text";

export default function OfflineNotice() {
  const { type, isInternetReachable } = useNetInfo();

  if (type !== "unknown" && isInternetReachable === false)
    return (
      <View style={styles.container}>
        <BaseText style={styles.text}>No Internet Connection</BaseText>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: StatusBar.currentHeight,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger,
    height: 50,
    width: "100%",
  },
  text: {
    color: colors.white,
  },
});

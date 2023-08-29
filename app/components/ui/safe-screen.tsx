import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SafeScreen({ children, style }: Props) {
  const viewStyle = [styles.screen, style];

  return <SafeAreaView style={viewStyle}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

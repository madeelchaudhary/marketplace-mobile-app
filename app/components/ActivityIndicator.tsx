import React from "react";
import { View, StyleSheet } from "react-native";
import AnimatedLottieView from "lottie-react-native";

interface Props {
  visible?: boolean;
}

export default function ActivityIndicator({ visible = false }: Props) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        autoPlay={true}
        loop={true}
        source={require("../../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.8,
  },
});

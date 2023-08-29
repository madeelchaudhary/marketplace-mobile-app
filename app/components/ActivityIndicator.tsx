import React from "react";
import AnimatedLottieView from "lottie-react-native";

interface Props {
  visible?: boolean;
}

export default function ActivityIndicator({ visible = false }: Props) {
  if (!visible) return null;
  return (
    <AnimatedLottieView
      autoPlay={true}
      loop={true}
      source={require("../../assets/animations/loading.json")}
      enableMergePathsAndroidForKitKatAndAbove
    />
  );
}

import { StyleSheet, Modal, View } from "react-native";
import React from "react";
import ProgressBar from "react-native-progress/Bar";
import colors from "../constants/colors";
import AnimatedLottieView from "lottie-react-native";
import { ErrorMessage } from "../components/ui/forms";

interface Props {
  error?: boolean | string;
  progress: number;
  success?: boolean;
  visible: boolean;
  onCompleted?: () => void;
}

export default function UploadScreen({
  error = false,
  progress,
  success = false,
  visible,
  onCompleted,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {progress < 1 && (
          <ProgressBar
            progress={progress}
            width={200}
            color={colors.primary}
            borderColor={colors.primary}
            borderWidth={2}
          />
        )}
        {success && (
          <AnimatedLottieView
            autoPlay
            loop={false}
            source={require("../../assets/animations/done.json")}
            style={styles.successAnim}
            resizeMode="cover"
            onAnimationFinish={onCompleted}
          />
        )}
        {error && (
          <>
            <AnimatedLottieView
              autoPlay
              loop={false}
              source={require("../../assets/animations/animation_llvykq0f.json")}
              style={styles.errorAnim}
              resizeMode="cover"
              onAnimationFinish={onCompleted}
            />
            {typeof error === "string" && (
              <ErrorMessage visible>{error}</ErrorMessage>
            )}
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errorAnim: {
    width: 200,
  },
  successAnim: {
    width: 150,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

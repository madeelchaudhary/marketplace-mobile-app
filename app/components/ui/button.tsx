import {
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import React from "react";

import colors from "../../constants/colors";

interface Props {
  children: React.ReactNode;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: keyof typeof colors;
  color?: keyof typeof colors;
}

const Button = ({
  children,
  onPress,
  backgroundColor,
  color,
  buttonStyle,
  textStyle,
  disabled,
}: Props) => {
  const textStyles = [styles.text, textStyle];
  const buttonStyles = [styles.button, buttonStyle];

  if (backgroundColor) {
    buttonStyles.push({ backgroundColor: colors[backgroundColor] });
  }

  if (color) {
    textStyles.push({ color: colors[color] });
  }

  if (disabled) {
    buttonStyles.push({ opacity: 0.5 });
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

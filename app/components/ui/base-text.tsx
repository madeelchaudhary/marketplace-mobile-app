import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

import colors from "../../constants/colors";
import defaultStyles from "../../constants/styles";

interface Props extends React.ComponentProps<typeof Text> {
  children: React.ReactNode;
  color?: keyof typeof colors;
  style?: StyleProp<TextStyle>;
}

export default function BaseText({
  children,
  color,
  style,
  ...otherProps
}: Props) {
  const textStyle: StyleProp<TextStyle> = [defaultStyles.text, style];

  if (color) {
    textStyle.push({ color: colors[color] });
  }

  return (
    <Text style={textStyle} {...otherProps}>
      {children}
    </Text>
  );
}

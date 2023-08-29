import { View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "../../types/icon";
import colors from "../../constants/colors";

export default function Icon({
  name,
  size = 40,
  color = "white",
  backgroundColor = colors.black,
}: IconProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
      }}
    >
      <MaterialCommunityIcons
        name={name}
        size={size / 2}
        color={colors[color]}
      />
    </View>
  );
}

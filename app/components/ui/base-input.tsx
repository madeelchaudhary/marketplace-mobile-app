import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import defaultStyles from "../../constants/styles";

interface Props extends TextInputProps {
  icon?: keyof (typeof MaterialCommunityIcons)["glyphMap"];
  width?: DimensionValue;
}

export default function BaseInput({
  icon,
  width = "100%",
  ...inputProps
}: Props) {
  const style: any = [defaultStyles.text];

  if (inputProps.style) {
    style.push(inputProps.style);
  }

  return (
    <View
      style={[
        styles.container,
        {
          width,
        },
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.neutral}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.neutral}
        {...inputProps}
        style={style}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    gap: 10,
  },
  icon: {
    alignSelf: "center",
  },
});

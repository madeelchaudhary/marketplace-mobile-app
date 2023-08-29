import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import BaseText from "./base-text";
import {
  PickerItemProps,
  PickerItem as PickerItemType,
} from "../../types/picker";

export default function PickerItem<T extends PickerItemType>({
  item,
  onPress,
}: PickerItemProps<T>) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <BaseText>{item.label}</BaseText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import BaseText from "./ui/base-text";
import {
  CategoryPickerItem as CategoryPickerItemType,
  PickerItemProps,
} from "../types/picker";
import Icon from "./ui/icon";

interface Props extends PickerItemProps<CategoryPickerItemType> {}

export default function CategoryPickerItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <Icon size={95} name={item.icon} backgroundColor={item.backgroundColor} />
      <BaseText style={styles.text}>{item.label}</BaseText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    width: "33%",
    rowGap: 5,
  },
  icon: {
    marginRight: 10,
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
});

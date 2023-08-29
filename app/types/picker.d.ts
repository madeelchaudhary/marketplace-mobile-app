import { StyleProp, TextStyle, DimensionValue } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

declare interface PickerItem {
  label: string;
  value: string | number;
}

declare interface CategoryPickerItem extends PickerItem {
  backgroundColor: string;
  icon: keyof (typeof MaterialCommunityIcons)["glyphMap"];
}

declare interface PickerProps<TItem> {
  icon?: keyof (typeof MaterialCommunityIcons)["glyphMap"];
  items: TItem[];
  onItemSelect: (item: TItem) => void;
  PickerItemComponent?: React.FC<PickerItemProps<TItem>>;
  placeholder?: string;
  selectedItem?: TItem;
  textStyle?: StyleProp<TextStyle>;
  width?: DimensionValue;
  numberOfColumns?: number;
}

declare interface PickerItemProps<T> {
  item: T;
  onPress: (item: T) => void;
}

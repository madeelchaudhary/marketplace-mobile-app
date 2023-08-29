import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../../constants/colors";

interface Props {
  onPress: () => void;
}

export default function ListItemDeleteAction({ onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={35}
          color={colors.white}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});

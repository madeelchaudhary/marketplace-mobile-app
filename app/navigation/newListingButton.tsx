import { StyleSheet, Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import colors from "../constants/colors";

export default function NewListingButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          color={colors.white}
          size={40}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderColor: colors.white,
    borderWidth: 10,
    borderRadius: 40,
    backgroundColor: colors.primary,
    bottom: 25,
  },
});

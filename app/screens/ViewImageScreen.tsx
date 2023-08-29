import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../constants/colors";

export default function ViewImageScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.btnGroup}>
        <MaterialCommunityIcons name="close" size={35} color={colors.white} />
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={35}
          color={colors.white}
        />
      </View>
      <Image
        source={require("../../assets/chair.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

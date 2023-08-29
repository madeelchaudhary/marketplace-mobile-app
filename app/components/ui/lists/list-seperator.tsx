import { StyleSheet, View } from "react-native";
import React from "react";

import colors from "../../../constants/colors";

export default function ListSeperator() {
  return <View style={styles.seperator}></View>;
}

const styles = StyleSheet.create({
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.light,
  },
});

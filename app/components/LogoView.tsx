import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

interface Props {
  subTitle?: string;
}

const LogoView = ({ subTitle }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
        resizeMode="center"
      />
      {subTitle && <Text style={styles.text}>{subTitle}</Text>}
    </View>
  );
};

export default LogoView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 26,
    fontWeight: "500",
    marginVertical: 12,
  },
});

import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

import colors from "../../constants/colors";
import BaseText from "./base-text";

interface Props {
  title: string;
  subTitle: string;
  imageUri: string;
  onPress?: () => void;
}

export default function Card({ title, subTitle, imageUri, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <BaseText style={styles.title}>{title}</BaseText>
          <BaseText style={styles.subTitle}>{subTitle}</BaseText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  content: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

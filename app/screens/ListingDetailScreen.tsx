import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import React from "react";

import BaseText from "../components/ui/base-text";
import colors from "../constants/colors";
import { ListItemColumns } from "../components/ui/lists";
import { ListingDetailScreenProps } from "../navigation/FeedNavigator";

export default function ListingDetailScreen({
  route,
}: ListingDetailScreenProps) {
  const { item } = route.params;
  const { images, title, price } = item;

  return (
    <View>
      <Image
        source={{
          uri: images[0].url,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <BaseText style={styles.title}>{title}</BaseText>
        <BaseText style={styles.subTitle}>${price}</BaseText>
        <View style={styles.authorContainer}>
          <ListItemColumns
            image={require("../../assets/author.jpg")}
            title="Mosh Hamedani"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authorContainer: {
    marginVertical: 40,
  },
  content: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    marginBottom: 7,
  },
});

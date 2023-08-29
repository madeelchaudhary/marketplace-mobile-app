import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { Swipeable } from "react-native-gesture-handler";

import BaseText from "../base-text";
import colors from "../../../constants/colors";

interface Props {
  image?: ImageSourcePropType;
  IconComponent?: React.ReactNode;
  title: string;
  subTitle?: string;
  onPress?: () => void;
  rightActions?: () => React.ReactNode;
}

export default function ListItemColumns({
  image,
  IconComponent,
  title,
  subTitle,
  onPress,
  rightActions,
}: Props) {
  return (
    <Swipeable renderRightActions={rightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {image && (
            <Image source={image} style={styles.avatar} resizeMode="contain" />
          )}
          {IconComponent}
          <View style={styles.content}>
            <BaseText style={styles.title} numberOfLines={1}>
              {title}
            </BaseText>
            {subTitle && (
              <BaseText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </BaseText>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 15,
  },
  content: {
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
  },
  subTitle: {
    color: colors.neutral,
  },
});

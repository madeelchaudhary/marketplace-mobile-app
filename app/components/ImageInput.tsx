import { StyleSheet, TouchableHighlight, DimensionValue } from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../constants/colors";

interface Props {
  onImageChange: (image: ImagePicker.ImagePickerAsset) => void;
  size?: DimensionValue;
  iconSize?: number;
}

export default function ImageInput({
  onImageChange,
  size = 100,
  iconSize = 40,
}: Props) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.canceled) onImageChange(result.assets[0]);
    } catch (error) {
      console.log(error);
      alert("Error reading an image");
    }
  };

  useEffect(() => {
    // requestPermission();
  }, []);

  return (
    <TouchableHighlight
      underlayColor={"#ccc"}
      activeOpacity={0.8}
      style={[styles.container, { width: size, height: size }]}
      onPress={() => pickImage()}
    >
      <MaterialCommunityIcons
        name="camera"
        size={iconSize}
        color={colors.neutral}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
});

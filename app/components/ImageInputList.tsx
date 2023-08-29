import { StyleSheet, Image, View, Alert, ScrollView } from "react-native";
import React, { useRef } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import ImageInput from "./ImageInput";
import { TouchableHighlight } from "react-native-gesture-handler";

interface Props extends React.ComponentProps<typeof ImageInput> {
  images: ImagePickerAsset[];
  maxImages?: number;
  onImageChange: (image: ImagePickerAsset) => void;
  onImageDelete: (image: ImagePickerAsset) => void;
}

export default function ImageInputList({
  images,
  onImageChange,
  onImageDelete,
  iconSize,
  size = 100,
  maxImages,
}: Props) {
  const scrollRef = useRef<ScrollView>(null);

  const handleDelete = (image: ImagePickerAsset) => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      {
        text: "Yes",
        onPress: () => onImageDelete(image),
        style: "destructive",
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <ScrollView
      ref={scrollRef}
      onContentSizeChange={() => scrollRef.current?.scrollToEnd()}
      horizontal={true}
    >
      <View style={styles.container}>
        {images.length > 0 &&
          images.map((image) => (
            <TouchableHighlight
              key={image.uri}
              underlayColor={"#ccc"}
              activeOpacity={0.8}
              onPress={() => handleDelete(image)}
              style={[styles.imageContainer, { width: size, height: size }]}
            >
              <Image
                alt="image"
                source={{ uri: image.uri }}
                style={styles.image}
              />
            </TouchableHighlight>
          ))}

        {(!maxImages || images.length < maxImages) && (
          <ImageInput
            iconSize={iconSize}
            size={size}
            onImageChange={onImageChange}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
  imageContainer: {
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

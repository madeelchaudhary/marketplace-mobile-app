import { View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../../ImageInputList";
import ErrorMessage from "./error-message";
import { ImagePickerAsset } from "expo-image-picker";

interface Props
  extends Omit<
    React.ComponentProps<typeof ImageInputList>,
    "images" | "onImageChange" | "onImageDelete"
  > {
  name: string;
}

export default function FormImagePicker({ name, ...otherProps }: Props) {
  const { errors, setFieldValue, touched, values } = useFormikContext() as any;
  const images = values[name];

  const handleDelete = (image: ImagePickerAsset) => {
    setFieldValue(
      name,
      images.filter((img: ImagePickerAsset) => img.uri !== image.uri)
    );
  };

  const handleAdd = (image: ImagePickerAsset) => {
    setFieldValue(name, [...images, image]);
  };
  return (
    <View>
      <ImageInputList
        {...otherProps}
        images={images}
        onImageChange={handleAdd}
        onImageDelete={handleDelete}
      />
      <ErrorMessage visible={touched[name]}>{errors[name]}</ErrorMessage>
    </View>
  );
}

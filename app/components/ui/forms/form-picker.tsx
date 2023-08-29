import { View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";
import Picker from "../picker";
import ErrorMessage from "./error-message";

interface Props
  extends Omit<
    React.ComponentProps<typeof Picker>,
    "onItemSelect" | "selectedItem"
  > {
  name: string;
}

export default function FormPicker({ name, ...otherProps }: Props) {
  const { errors, setFieldValue, touched, values } = useFormikContext() as any;

  return (
    <View>
      <Picker
        {...otherProps}
        onItemSelect={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <ErrorMessage visible={touched[name]}>{errors[name]}</ErrorMessage>
    </View>
  );
}

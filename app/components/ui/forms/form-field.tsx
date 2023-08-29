import { useFormikContext } from "formik";

import BaseInput from "../base-input";
import ErrorMessage from "./error-message";
import { View } from "react-native";

interface Props extends React.ComponentProps<typeof BaseInput> {
  name: string;
}

export default function FormField({ name, ...otherProps }: Props) {
  const { handleChange, handleBlur, errors, touched, values } =
    useFormikContext();

  return (
    <View>
      <BaseInput
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={(values as any)[name]}
        {...otherProps}
      />
      <ErrorMessage visible={!!(touched as any)[name]}>
        {(errors as any)[name]}
      </ErrorMessage>
    </View>
  );
}

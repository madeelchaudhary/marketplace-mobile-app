import { useFormikContext } from "formik";

import Button from "../button";

interface Props extends Omit<React.ComponentProps<typeof Button>, "onPress"> {}

export default function SubmitButton({ children, ...otherProps }: Props) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button {...otherProps} onPress={handleSubmit}>
      {children}
    </Button>
  );
}

import BaseText from "../base-text";

interface Props {
  children: React.ReactNode;
  visible: boolean;
}

export default function ErrorMessage({ children, visible }: Props) {
  return !visible || !children ? null : (
    <BaseText color="danger" style={{ fontSize: 16 }}>
      {children}
    </BaseText>
  );
}

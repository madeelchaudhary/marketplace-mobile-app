declare module "react-native-progress/Bar" {
  import { Component } from "react";
  import { ViewStyle } from "react-native";

  interface BarProps {
    progress?: number;
    width?: number;
    height?: number;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    color?: string;
    unfilledColor?: string;
    animationConfig?: object;
    useNativeDriver?: boolean;
    animationType?: "decay" | "timing";
    animated?: boolean;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    style?: ViewStyle;
  }

  export default class Bar extends Component<BarProps> {}
}

import { DefaultTheme } from "@react-navigation/native";
import colors from "../constants/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
    primary: colors.primary,
    text: colors.primary,
  },
};

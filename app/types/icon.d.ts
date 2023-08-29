import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

declare interface IconProps {
  name: keyof (typeof MaterialCommunityIcons)["glyphMap"];
  size?: number;
  color?: keyof typeof colors;
  backgroundColor?: string;
}

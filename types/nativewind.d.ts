declare module "nativewind" {
  import { ViewProps, TextProps } from "react-native";
  export interface StyledViewProps extends ViewProps {
    className?: string;
  }
  export interface StyledTextProps extends TextProps {
    className?: string;
  }
} 

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../assets/globals";
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  disabled?: boolean;
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
};

const XButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  onPress,
  size = "md",
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.base, styles[size]];

    switch (variant) {
      case "primary":
        return [...baseStyle, styles.primary];
      case "secondary":
        return [...baseStyle, styles.secondary];
      case "outline":
        return [...baseStyle, styles.outline];
      case "ghost":
        return [...baseStyle, styles.ghost];
      case "danger":
        return [...baseStyle, styles.danger];
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={getButtonStyle()}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  text: {
    fontSize: 16,
    color: colors.matisse950,
  },
  primary: {
    backgroundColor: colors.matisse300,
  },
  secondary: {
    backgroundColor: colors.matisse100,
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: colors.matisse300,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  danger: {
    backgroundColor: "#dc3545",
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default XButton;

import { ComponentProps } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CINEMA } from "../../utils/cinemaTheme";
import styles from "./CinemaHeader.styles";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

export function CinemaBrandRow() {
  return (
    <View style={styles.brandRow} accessibilityRole="header">
      <Ionicons name="film" size={22} color={CINEMA.red} style={styles.brandIcon} />
      <Text style={styles.brandText}>CINEMA</Text>
    </View>
  );
}

export function CinemaHeaderTitle() {
  return (
    <Text style={styles.brandText} accessibilityRole="header">
      CINEMA
    </Text>
  );
}

type CircleHeaderButtonProps = {
  onPress: () => void;
  icon: IoniconName;
  accessibilityLabel: string;
};

export function CinemaCircleHeaderButton({ onPress, icon, accessibilityLabel }: CircleHeaderButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={22} color="#fff" />
    </Pressable>
  );
}

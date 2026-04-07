import { View, Text, TextInput, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { CINEMA } from "../../utils/cinemaTheme";
import styles from "./MoviesSearch.styles";

export type HomeMovieSearchSectionProps = {
  value: string;
  onChangeText: (text: string) => void;
  isPipelineTruncated?: boolean;
  pipelineLimit?: number;
  placeholder?: string;
  placeholderKey?: "moviesSearch.placeholder" | "moviesSearch.placeholderGenres";
};

export function MoviesSearch({
  value,
  onChangeText,
  isPipelineTruncated = false,
  pipelineLimit = 0,
  placeholder,
  placeholderKey = "moviesSearch.placeholder",
}: HomeMovieSearchSectionProps) {
  const { t } = useTranslation();
  const resolvedPlaceholder = placeholder ?? t(placeholderKey);

  return (
    <>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color={CINEMA.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder={resolvedPlaceholder}
          placeholderTextColor="#636366"
          value={value}
          onChangeText={onChangeText}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value.length > 0 ? (
          <Pressable
            onPress={() => onChangeText("")}
            hitSlop={12}
            style={styles.clearButton}
            accessibilityRole="button"
            accessibilityLabel={t("moviesSearch.clearA11y")}
          >
            <Ionicons name="close-circle" size={22} color={CINEMA.textMuted} />
          </Pressable>
        ) : null}
      </View>
      {isPipelineTruncated && (
        <Text style={styles.pipelineNotice}>{t("moviesSearch.pipelineNotice", { count: pipelineLimit })}</Text>
      )}
    </>
  );
}

import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CINEMA } from "../../utils/cinemaTheme";
import styles from "./MoviesSearch.styles";

export type HomeMovieSearchSectionProps = {
  value: string;
  onChangeText: (text: string) => void;
  isPipelineTruncated?: boolean;
  pipelineLimit?: number;
  placeholder?: string;
};

export function MoviesSearch({
  value,
  onChangeText,
  isPipelineTruncated = false,
  pipelineLimit = 0,
  placeholder = "Buscar películas...",
}: HomeMovieSearchSectionProps) {
  return (
    <>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color={CINEMA.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder={placeholder}
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
            accessibilityLabel="Limpiar búsqueda"
          >
            <Ionicons name="close-circle" size={22} color={CINEMA.textMuted} />
          </Pressable>
        ) : null}
      </View>
      {isPipelineTruncated && (
        <Text style={styles.pipelineNotice}>
          Mostrando el filtro avanzado solo entre las primeras {pipelineLimit} coincidencias. Afiná la búsqueda para
          acotar la lista.
        </Text>
      )}
    </>
  );
}

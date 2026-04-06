import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CINEMA } from "../../utils/cinemaTheme";
import styles from "./MoviesSearch.styles";

export type HomeMovieSearchSectionProps = {
  value: string;
  onChangeText: (text: string) => void;
  isPipelineTruncated: boolean;
  pipelineLimit: number;
};

export function MoviesSearch({ value, onChangeText, isPipelineTruncated, pipelineLimit }: HomeMovieSearchSectionProps) {
  return (
    <>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color={CINEMA.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar películas, directores..."
          placeholderTextColor="#636366"
          value={value}
          onChangeText={onChangeText}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
        />
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

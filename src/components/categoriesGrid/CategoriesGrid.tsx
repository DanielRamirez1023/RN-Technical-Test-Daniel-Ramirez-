import { View, Text, Pressable } from "react-native";
import type { MovieGenre } from "../../services/movieService";
import { genreTileBackground } from "../../utils/browseGenreUi";
import styles from "./CategoriesGrid.styles";

export type CategoriesGridProps = {
  left: MovieGenre;
  right?: MovieGenre;
  colWidth: number;
  onSelect: (g: MovieGenre) => void;
};

export function CategoriesGrid({ left, right, colWidth, onSelect }: CategoriesGridProps) {
  return (
    <View style={styles.gridRow}>
      <Pressable
        onPress={() => onSelect(left)}
        style={[styles.genreTile, { width: colWidth, backgroundColor: genreTileBackground(left.id) }]}
      >
        <Text style={styles.genreTileLabel} numberOfLines={2}>
          {left.name}
        </Text>
      </Pressable>
      {right ? (
        <Pressable
          onPress={() => onSelect(right)}
          style={[styles.genreTile, { width: colWidth, backgroundColor: genreTileBackground(right.id) }]}
        >
          <Text style={styles.genreTileLabel} numberOfLines={2}>
            {right.name}
          </Text>
        </Pressable>
      ) : (
        <View style={{ width: colWidth }} />
      )}
    </View>
  );
}

import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useMovies } from "../../hooks/useMovies";
import styles from "./Home.screen.styles";
import { getImageUrl } from "./Home.screen.helpers";

export default function HomeScreen() {
  const [page] = useState(1);

  const { data, isLoading, isError } = useMovies(page);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Error cargando películas ❌</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data?.results}
      contentContainerStyle={{ paddingBottom: 20 }}
      keyExtractor={(item) => `movie-${item.id}`}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{
              uri: getImageUrl(item.poster_path),
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

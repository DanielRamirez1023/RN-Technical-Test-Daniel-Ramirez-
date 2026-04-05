import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useMovies } from "../../hooks/useMovies";
import { getImageUrl } from "./Home.screen.helpers";
import styles from "./Home.screen.styles";

export default function HomeScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

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
      data={movies}
      keyExtractor={(item) => `movie-${item.id}`}
      contentContainerStyle={{ paddingBottom: 20 }}
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
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
    />
  );
}

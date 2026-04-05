import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useMovies } from "../../hooks/useMovies";
import { getImageUrl } from "../../utils/movies";
import styles from "./Home.screen.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];
  const navigation = useNavigation<NavigationProp>();

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
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}>
          <Image
            source={{
              uri: getImageUrl(item.poster_path),
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
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

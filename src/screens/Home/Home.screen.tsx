import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { useMovies, useMoviesWithDetails } from "../../hooks/useMovies";
import { getImageUrl } from "../../utils/movies";
import styles from "./Home.screen.styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const [searchLetter, setSearchLetter] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  const filteredMovies = movies.filter((movie) => {
    if (!searchLetter) return true;

    return movie.title.toLowerCase().startsWith(searchLetter.toLowerCase());
  });

  const detailQueries = useMoviesWithDetails(filteredMovies);

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

  const fullyFilteredMovies = filteredMovies.filter((movie, index) => {
    const query = detailQueries[index];

    if (!query?.data) return false;

    const { genres, cast } = query.data;

    const hasGenres = genres.length >= 3;

    const femaleCount = cast.filter((c) => c.gender === 1).length;

    const maleCount = cast.filter((c) => c.gender === 2).length;

    const hasBalancedCast = femaleCount >= 3 && maleCount >= 3;

    return hasGenres && hasBalancedCast;
  });

  return (
    <>
      <Button title="Ver Watchlist ⭐" onPress={() => navigation.navigate("Watchlist")} />
      <TextInput
        placeholder="Buscar por letra..."
        value={searchLetter}
        onChangeText={(text) => setSearchLetter(text)}
        style={styles.input}
      />
      <FlatList
        data={fullyFilteredMovies}
        keyExtractor={(item) => `movie-${item.id}`}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("MovieDetails", { movieId: item.id })}
          >
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
    </>
  );
}

import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { useMovieDetail } from "../../hooks/useMovies";
import styles from "./MovieDetails.screen.styles";
import { getImageUrl } from "../../utils/movies";

type MovieDetailsRouteProp = RouteProp<RootStackParamList, "MovieDetails">;

export default function MovieDetailsScreen() {
  const route = useRoute<MovieDetailsRouteProp>();
  const { movieId } = route.params;

  const { data, isLoading, isError } = useMovieDetail(movieId);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando detalle...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text>Error cargando detalle ❌</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: getImageUrl(data.poster_path),
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{data.title}</Text>

      <Text style={styles.section}>Descripción</Text>
      <Text>{data.overview}</Text>

      <Text style={styles.section}>Géneros</Text>
      <Text>{data.genres.map((g) => g.name).join(", ")}</Text>

      <Text style={styles.section}>Cast</Text>
      {data.cast.slice(0, 5).map((actor) => (
        <Text key={actor.id}>
          {actor.name} - {actor.character}
        </Text>
      ))}
    </ScrollView>
  );
}

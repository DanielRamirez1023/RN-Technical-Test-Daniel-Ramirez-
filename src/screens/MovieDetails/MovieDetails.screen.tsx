import { useLayoutEffect } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, Button } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { CinemaCircleHeaderButton, CinemaHeaderTitle } from "../../components";
import { CINEMA } from "../../utils/cinemaTheme";
import { useMovieDetail } from "../../hooks/useMovies";
import styles from "./MovieDetails.screen.styles";
import { getImageUrl } from "../../utils/movies";
import { useWatchlistStore } from "../../store/watchlistStore";
import { useNotificationsStore } from "../../store/notificationsStore";
import { cancelNotification, scheduleMovieReminder } from "../../utils/notifications";

type MovieDetailsRouteProp = RouteProp<RootStackParamList, "MovieDetails">;
type MovieDetailsNavProp = NativeStackNavigationProp<RootStackParamList, "MovieDetails">;

export default function MovieDetailsScreen() {
  const route = useRoute<MovieDetailsRouteProp>();
  const navigation = useNavigation<MovieDetailsNavProp>();
  const { movieId } = route.params;

  const { data, isLoading, isError } = useMovieDetail(movieId);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore();
  const { notifications, setNotification, removeNotification } = useNotificationsStore();

  const isFavorite = isInWatchlist(movieId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: CINEMA.black },
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerTitle: () => <CinemaHeaderTitle />,
      headerTintColor: "#fff",
      headerLeft: () => (
        <View style={{ marginLeft: 8 }}>
          <CinemaCircleHeaderButton
            icon="chevron-back"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver"
          />
        </View>
      ),
    });
  }, [navigation, data]);

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
      <Button
        title={isFavorite ? "Quitar de watchlist" : "Agregar a watchlist"}
        onPress={async () => {
          if (isFavorite) {
            removeFromWatchlist(movieId);

            const notifId = notifications[movieId];
            if (notifId) {
              await cancelNotification(notifId);
              removeNotification(movieId);
            }
          } else {
            addToWatchlist({
              id: data.id,
              title: data.title,
              poster_path: data.poster_path,
            });

            if (!notifications[movieId]) {
              const notifId = await scheduleMovieReminder(movieId, data.title);
              setNotification(movieId, notifId);
            }
          }
        }}
      />

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

import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput } from "react-native";
import { useMovies, useMoviesWithDetails } from "../../hooks/useMovies";
import { dedupeMoviesById, getImageUrl } from "../../utils/movies";
import styles from "./Home.screen.styles";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList, RootStackParamList } from "../../navigation";
import { useState, useCallback, useMemo, memo } from "react";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import type { Movie } from "../../services/movieService";

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

const DETAIL_PIPELINE_LIMIT = 200;

const MOVIE_ROW_HEIGHT = 10 + 225 + 10 + 44 + 10;

type MovieListItemProps = {
  movie: Movie;
  onPress: (movieId: number) => void;
};

const MovieListItem = memo(function MovieListItem({ movie, onPress }: MovieListItemProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(movie.id)} activeOpacity={0.7}>
      <Image source={{ uri: getImageUrl(movie.poster_path) }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
});

export default function HomeScreen() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();

  const [searchLetter, setSearchLetter] = useState("");
  const debouncedSearchLetter = useDebouncedValue(searchLetter, 350);
  const navigation = useNavigation<HomeNavigationProp>();
  const { isOffline } = useNetworkStatus();

  const movies = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.results) ?? [];
    return dedupeMoviesById(flat);
  }, [data?.pages]);

  const filteredMovies = useMemo(() => {
    const letter = debouncedSearchLetter.toLowerCase();
    if (!letter) return movies;
    return movies.filter((movie) => movie.title.toLowerCase().startsWith(letter));
  }, [movies, debouncedSearchLetter]);

  const moviesForDetailPipeline = useMemo(() => filteredMovies.slice(0, DETAIL_PIPELINE_LIMIT), [filteredMovies]);

  const isPipelineTruncated = filteredMovies.length > DETAIL_PIPELINE_LIMIT;

  const detailQueries = useMoviesWithDetails(moviesForDetailPipeline);

  const fullyFilteredMovies = useMemo(() => {
    return moviesForDetailPipeline.filter((movie, index) => {
      const query = detailQueries[index];

      if (!query?.data) return false;

      const { genres, cast } = query.data;

      const hasGenres = genres.length >= 3;

      const femaleCount = cast.filter((c) => c.gender === 1).length;

      const maleCount = cast.filter((c) => c.gender === 2).length;

      const hasBalancedCast = femaleCount >= 3 && maleCount >= 3;

      return hasGenres && hasBalancedCast;
    });
  }, [moviesForDetailPipeline, detailQueries]);

  const handleMoviePress = useCallback(
    (movieId: number) => {
      navigation.navigate("MovieDetails", { movieId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieListItem movie={item} onPress={handleMoviePress} />,
    [handleMoviePress]
  );

  const keyExtractor = useCallback((item: Movie) => `movie-${item.id}`, []);

  const getItemLayout = useCallback(
    (_: ArrayLike<Movie> | null | undefined, index: number) => ({
      length: MOVIE_ROW_HEIGHT,
      offset: MOVIE_ROW_HEIGHT * index,
      index,
    }),
    []
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const listFooter = useMemo(() => (isFetchingNextPage ? <ActivityIndicator /> : null), [isFetchingNextPage]);

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
    <View style={styles.root}>
      {isOffline && <Text style={styles.offlineBanner}>Estás sin conexión ⚠️</Text>}
      <TextInput
        placeholder="Buscar por letra..."
        value={searchLetter}
        onChangeText={setSearchLetter}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {isPipelineTruncated && (
        <Text style={styles.pipelineNotice}>
          Mostrando el filtro avanzado solo entre las primeras {DETAIL_PIPELINE_LIMIT} coincidencias. Afiná la búsqueda
          para acotar la lista.
        </Text>
      )}
      <FlatList
        data={fullyFilteredMovies}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooter}
      />
    </View>
  );
}

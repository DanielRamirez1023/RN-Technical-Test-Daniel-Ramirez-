import { useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { MovieCard } from "../../components";
import { useDiscoverMoviesByGenre } from "../../hooks/useMovies";
import { RootStackParamList } from "../../navigation";
import { dedupeMoviesById } from "../../utils/movies";
import type { Movie } from "../../types/movies";
import { CINEMA } from "../../utils/cinemaTheme";
import styles from "./GenreResults.screen.styles";

const LIST_BOTTOM_PAD = 24;

type GenreResultsRoute = RouteProp<RootStackParamList, "GenreResults">;
type GenreResultsNav = NativeStackNavigationProp<RootStackParamList, "GenreResults">;

export default function GenreResultsScreen() {
  const route = useRoute<GenreResultsRoute>();
  const navigation = useNavigation<GenreResultsNav>();
  const { genreId, genreName } = route.params;
  const { width: winWidth } = useWindowDimensions();
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDiscoverMoviesByGenre(genreId);

  const colWidth = useMemo(() => {
    const gap = 12;
    const pad = 16;
    return (winWidth - pad * 2 - gap) / 2;
  }, [winWidth]);

  const movies = useMemo(() => {
    const flat = data?.pages.flatMap((p) => p.results) ?? [];
    return dedupeMoviesById(flat);
  }, [data?.pages]);

  const handleMoviePress = useCallback(
    (movieId: number) => {
      navigation.navigate("MovieDetails", { movieId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} posterWidth={colWidth} onPress={handleMoviePress} />,
    [colWidth, handleMoviePress]
  );

  const keyExtractor = useCallback((item: Movie) => `genre-movie-${item.id}`, []);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const listHeader = useMemo(
    () => (
      <View style={styles.filterRow}>
        <View style={styles.activeChip}>
          <Text style={styles.activeChipText}>{genreName}</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Quitar filtro de género"
          >
            <Ionicons name="close" size={18} color={CINEMA.textPrimary} />
          </Pressable>
        </View>
        <Pressable style={styles.filtersPill} disabled accessibilityRole="button">
          <Ionicons name="options-outline" size={18} color={CINEMA.textMuted} />
          <Text style={styles.filtersPillText}>Filtros</Text>
        </Pressable>
      </View>
    ),
    [genreName, navigation]
  );

  const listFooter = useMemo(() => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.loadMoreWrap}>
          <ActivityIndicator color={CINEMA.red} />
          <Text style={styles.loadMoreText}>Cargando más títulos</Text>
        </View>
      );
    }
    if (hasNextPage) {
      return (
        <Pressable style={styles.loadMoreButton} onPress={() => fetchNextPage()}>
          <Text style={styles.loadMoreButtonText}>Cargar más títulos</Text>
        </Pressable>
      );
    }
    return null;
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={styles.root}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={CINEMA.red} />
          <Text style={styles.centerText}>Cargando películas...</Text>
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.root}>
        <View style={styles.center}>
          <Text style={[styles.centerText, { color: CINEMA.textPrimary }]}>Error al cargar resultados</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={movies}
        keyExtractor={keyExtractor}
        numColumns={2}
        style={styles.flatList}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomInset + LIST_BOTTOM_PAD }]}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        extraData={colWidth}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        onEndReached={onEndReached}
        onEndReachedThreshold={0.35}
      />
    </View>
  );
}

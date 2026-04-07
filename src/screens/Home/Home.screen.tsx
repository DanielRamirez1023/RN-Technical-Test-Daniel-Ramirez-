import { View, Text, FlatList, ActivityIndicator, useWindowDimensions } from "react-native";
import { useMovies, useMoviesWithDetails } from "../../hooks/useMovies";
import { useHomeMovieSearch } from "../../hooks/useHomeMovieSearch";
import { dedupeMoviesById } from "../../utils/movies";
import styles from "./Home.screen.styles";
import { MoviesSearch } from "../../components";
import { MovieCard } from "../../components";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { MainTabParamList } from "../../navigation/TabBarNavigator";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { Movie } from "../../types/movies";
import { CINEMA } from "../../utils/cinemaTheme";

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Home">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const { t } = useTranslation();
  const { width: winWidth } = useWindowDimensions();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovies();
  const navigation = useNavigation<HomeNavigationProp>();
  const { isOffline } = useNetworkStatus();

  const colWidth = useMemo(() => {
    const gap = 12;
    const pad = 16;
    return (winWidth - pad * 2 - gap) / 2;
  }, [winWidth]);

  const movies = useMemo(() => {
    const flat = data?.pages.flatMap((page) => page.results) ?? [];
    return dedupeMoviesById(flat);
  }, [data?.pages]);

  const { searchLetter, setSearchLetter, moviesForDetailPipeline, isPipelineTruncated, pipelineLimit } =
    useHomeMovieSearch(movies);

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
    ({ item }: { item: Movie }) => <MovieCard movie={item} posterWidth={colWidth} onPress={handleMoviePress} />,
    [colWidth, handleMoviePress]
  );

  const keyExtractor = useCallback((item: Movie) => `movie-${item.id}`, []);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const listFooter = useMemo(
    () =>
      isFetchingNextPage ? (
        <View style={styles.loadMoreWrap}>
          <View style={styles.loadMoreDots}>
            <View style={[styles.loadMoreDot, styles.loadMoreDotActive]} />
            <View style={styles.loadMoreDot} />
            <View style={styles.loadMoreDot} />
          </View>
          <ActivityIndicator color={CINEMA.red} />
          <Text style={styles.loadMoreText}>{t("home.loadMoreFooter")}</Text>
        </View>
      ) : null,
    [isFetchingNextPage, t]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={CINEMA.red} />
        <Text style={styles.centerText}>{t("home.loadingMovies")}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={[styles.centerText, { color: CINEMA.textPrimary }]}>{t("home.errorLoadingMovies")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {isOffline && <Text style={styles.offlineBanner}>{t("home.offlineBanner")}</Text>}
      <MoviesSearch
        value={searchLetter}
        onChangeText={setSearchLetter}
        isPipelineTruncated={isPipelineTruncated}
        pipelineLimit={pipelineLimit}
      />
      {fullyFilteredMovies.length > 0 && (
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>{t("home.popularMovies")}</Text>
        </View>
      )}
      {fullyFilteredMovies.length === 0 && searchLetter.length > 0 && (
        <View style={styles.center}>
          <Text style={styles.centerText}>{t("home.noMoviesFound")}</Text>
        </View>
      )}
      <FlatList
        data={fullyFilteredMovies}
        keyExtractor={keyExtractor}
        numColumns={2}
        style={styles.flatList}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        extraData={colWidth}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
        onEndReached={searchLetter ? undefined : onEndReached}
        onEndReachedThreshold={0.35}
        ListFooterComponent={listFooter}
      />
    </View>
  );
}

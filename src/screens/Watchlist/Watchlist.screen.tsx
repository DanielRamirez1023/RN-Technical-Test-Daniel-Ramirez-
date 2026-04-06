import { View, Text, FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useWatchlistStore } from "../../store/watchlistStore";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList } from "../../navigation/TabBarNavigator";
import { RootStackParamList } from "../../navigation";
import { MovieCard } from "../../components";
import { useCallback, useMemo } from "react";
import { Movie } from "../../types/movies";
import styles from "./Watchlist.screen.styles";

type WatchlistNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Watchlist">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function WatchlistScreen() {
  const { watchlist } = useWatchlistStore();
  const navigation = useNavigation<WatchlistNavigationProp>();
  const { width: winWidth } = useWindowDimensions();

  const colWidth = useMemo(() => {
    const gap = 12;
    const pad = 16;
    return (winWidth - pad * 2 - gap) / 2;
  }, [winWidth]);

  const handleMoviePress = useCallback(
    (movieId: number) => {
      navigation.navigate("MovieDetails", { movieId });
    },
    [navigation]
  );

  const handleDiscoverPress = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard movie={item} posterWidth={colWidth} onPress={handleMoviePress} />,
    [colWidth, handleMoviePress]
  );

  const keyExtractor = useCallback((item: Movie) => `watchlist-${item.id}`, []);

  if (watchlist.length === 0) {
    return (
      <View style={styles.emptyRoot}>
        <View style={styles.emptyIconWrap}>
          <View style={[styles.emptyRing, styles.emptyRingOuter]} />
          <View style={[styles.emptyRing, styles.emptyRingMid]} />
          <View style={[styles.emptyRing, styles.emptyRingInner]} />
          <Entypo name="clapperboard" size={72} color="#4a4a4a" />
        </View>
        <Text style={styles.emptyTitle}>No movies yet</Text>
        <Text style={styles.emptyDescription}>
          Your cinematic adventure is waiting to be explored. Start adding masterpieces to your list.
        </Text>
        <TouchableOpacity style={styles.discoverButton} onPress={handleDiscoverPress} activeOpacity={0.85}>
          <Text style={styles.discoverButtonText}>Discover Movies</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerBlock}>
        <Text style={styles.pageTitle}>My Watchlist</Text>
        <Text style={styles.pageSubtitle}>Tu colección cuidadosamente seleccionada de viajes cinematográficos..</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={watchlist}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
        extraData={colWidth}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}

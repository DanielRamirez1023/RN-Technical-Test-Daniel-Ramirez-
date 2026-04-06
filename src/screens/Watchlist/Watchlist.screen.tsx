import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useWatchlistStore } from "../../store/watchlistStore";
import { FLOATING_TAB_BAR_EXTRA_PADDING } from "../../utils/cinemaTheme";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList } from "../../navigation/TabBarNavigator";
import { RootStackParamList } from "../../navigation";
import { getImageUrl } from "../../utils/movies";
import styles from "./Watchlist.screen.styles";

type WatchlistNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "Watchlist">,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function WatchlistScreen() {
  const { watchlist } = useWatchlistStore();
  const navigation = useNavigation<WatchlistNavigationProp>();

  if (watchlist.length === 0) {
    return (
      <View style={[styles.center, { paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING }]}>
        <Text style={styles.emptyText}>No hay películas en tu watchlist</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.root}
      data={watchlist}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MovieDetails", {
              movieId: item.id,
            })
          }
        >
          <View style={styles.card}>
            <Image
              source={{
                uri: getImageUrl(item.poster_path),
              }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

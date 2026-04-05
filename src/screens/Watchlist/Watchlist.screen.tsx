import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useWatchlistStore } from "../../store/watchlistStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { getImageUrl } from "../../utils/movies";
import styles from "./Watchlist.screen.styles";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function WatchlistScreen() {
  const { watchlist } = useWatchlistStore();
  const navigation = useNavigation<NavigationProp>();

  if (watchlist.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No hay películas en tu watchlist 🎬</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={watchlist}
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

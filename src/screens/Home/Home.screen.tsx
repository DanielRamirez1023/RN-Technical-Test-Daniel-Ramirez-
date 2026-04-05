import { View, Text, Button } from "react-native";
import styles from "./Home.screen.styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { useMovies } from "../../hooks/useMovies";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data, isLoading, error } = useMovies(1);

  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("error", error);

  return (
    <View style={styles.container}>
      <Text>Movies App 🎬</Text>
      <Button title="Go to Movie Details" onPress={() => navigation.navigate("MovieDetails", { movieId: "123" })} />
    </View>
  );
}

import { View, Text, Button } from "react-native";
import styles from "./Home.screen.styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text>Movies App 🎬</Text>
      <Button title="Go to Movie Details" onPress={() => navigation.navigate("MovieDetails", { movieId: "123" })} />
    </View>
  );
}

import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/Home.screen";
import MovieDetailsScreen from "../screens/MovieDetails/MovieDetails.screen";
import WatchlistScreen from "../screens/Watchlist/Watchlist.screen";

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
  Watchlist: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

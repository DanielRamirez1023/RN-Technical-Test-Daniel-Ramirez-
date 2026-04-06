import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailsScreen from "../screens/MovieDetails/MovieDetails.screen";
import { CINEMA } from "../utils/cinemaTheme";
import MainTabNavigator from "./TabBarNavigator";

export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movieId: number };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{
            headerStyle: { backgroundColor: CINEMA.black },
            headerShadowVisible: false,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

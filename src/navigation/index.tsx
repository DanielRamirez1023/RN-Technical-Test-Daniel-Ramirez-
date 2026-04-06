import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/Home.screen";
import MovieDetailsScreen from "../screens/MovieDetails/MovieDetails.screen";
import WatchlistScreen from "../screens/Watchlist/Watchlist.screen";

export type MainTabParamList = {
  Home: undefined;
  Watchlist: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movieId: number };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? "star" : "star-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: "Detalle" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { customTabBarScreenOptions } from "./helpers";
import HomeScreen from "../screens/Home/Home.screen";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WatchlistScreen from "../screens/Watchlist/Watchlist.screen";
import { CINEMA } from "../utils/cinemaTheme";

export type MainTabParamList = {
  Home: undefined;
  Watchlist: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIconStyles = StyleSheet.create({
  hitSlot: {
    width: 56,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  activeHalo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#ed7e83",
    justifyContent: "center",
    alignItems: "center",
  },
});

function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={customTabBarScreenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tabIconStyles.hitSlot}>
              {focused ? (
                <View style={tabIconStyles.activeHalo}>
                  <Ionicons name="home" size={24} color={CINEMA.red} />
                </View>
              ) : (
                <Ionicons name="home-outline" size={24} color={CINEMA.tabBarIconInactive} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={tabIconStyles.hitSlot}>
              {focused ? (
                <View style={tabIconStyles.activeHalo}>
                  <Ionicons name="bookmark" size={24} color={CINEMA.red} />
                </View>
              ) : (
                <Ionicons name="bookmark-outline" size={24} color={CINEMA.tabBarIconInactive} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;

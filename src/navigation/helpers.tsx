import { CINEMA } from "../utils/cinemaTheme";
import { CinemaBrandRow } from "../components";
import { Platform } from "react-native";

const headerScreenOptions = {
  headerStyle: { backgroundColor: CINEMA.black },
  headerShadowVisible: false,
  headerTitle: () => null,
  headerLeft: () => <CinemaBrandRow />,
  headerLeftContainerStyle: { paddingLeft: 16 },
  headerRightContainerStyle: { paddingRight: 12 },
};

const borderOpacity = Platform.OS === "ios" ? 0.5 : 0.2;

const tabBarScreenOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 110,
    backgroundColor: CINEMA.tabBarBg,
    paddingTop: 15,
    borderTopColor: `"rgba(255, 255, 255, ${borderOpacity})"`,
  },
  tabBarActiveBackgroundColor: "transparent",
  tabBarInactiveBackgroundColor: "transparent",
  tabBarActiveTintColor: CINEMA.red,
  tabBarInactiveTintColor: CINEMA.tabBarIconInactive,
};

export const customTabBarScreenOptions = {
  ...headerScreenOptions,
  ...tabBarScreenOptions,
};

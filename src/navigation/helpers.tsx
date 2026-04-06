import { CINEMA } from "../utils/cinemaTheme";
import { CinemaBrandRow } from "../components";

const headerScreenOptions = {
  headerStyle: { backgroundColor: CINEMA.black },
  headerShadowVisible: false,
  headerTitle: () => null,
  headerLeft: () => <CinemaBrandRow />,
  headerLeftContainerStyle: { paddingLeft: 16 },
  headerRightContainerStyle: { paddingRight: 12 },
};

const tabBarScreenOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: CINEMA.tabBarBg,
    paddingTop: 10,
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

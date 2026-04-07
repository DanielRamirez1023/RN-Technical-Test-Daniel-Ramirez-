import { Platform, StyleSheet } from "react-native";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { CINEMA } from "../utils/cinemaTheme";
import { CinemaBrandRow } from "../components";

const headerScreenOptions: Pick<
  BottomTabNavigationOptions,
  | "headerStyle"
  | "headerShadowVisible"
  | "headerTitle"
  | "headerLeft"
  | "headerLeftContainerStyle"
  | "headerRightContainerStyle"
> = {
  headerStyle: { backgroundColor: CINEMA.black },
  headerShadowVisible: false,
  headerTitle: () => null,
  headerLeft: () => <CinemaBrandRow />,
  headerLeftContainerStyle: { paddingLeft: 16 },
  headerRightContainerStyle: { paddingRight: 12 },
};

const borderOpacity = Platform.OS === "ios" ? 0.5 : 0.2;

const TAB_BAR_PADDING_TOP = 15;
const TAB_BAR_ICON_ROW_HEIGHT = 52;

export function getCustomTabBarScreenOptions(bottomInset: number): BottomTabNavigationOptions {
  const tabBarHeight = TAB_BAR_PADDING_TOP + TAB_BAR_ICON_ROW_HEIGHT + bottomInset;

  return {
    ...headerScreenOptions,
    tabBarShowLabel: false,
    tabBarStyle: {
      height: tabBarHeight,
      backgroundColor: CINEMA.tabBarBg,
      paddingTop: TAB_BAR_PADDING_TOP,
      paddingBottom: bottomInset,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: `rgba(255, 255, 255, ${borderOpacity})`,
    },
    tabBarActiveBackgroundColor: "transparent",
    tabBarInactiveBackgroundColor: "transparent",
    tabBarActiveTintColor: CINEMA.red,
    tabBarInactiveTintColor: CINEMA.tabBarIconInactive,
  };
}

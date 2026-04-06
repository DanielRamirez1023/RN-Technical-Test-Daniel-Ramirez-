import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIcon: {
    marginRight: 8,
  },
  brandText: {
    color: CINEMA.red,
    fontWeight: "800",
    fontSize: 18,
    letterSpacing: 2,
  },
  profileOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: CINEMA.red,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInner: {
    flex: 1,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CINEMA.circleButtonBg,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default styles;

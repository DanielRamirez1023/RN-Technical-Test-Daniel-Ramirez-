import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  gridRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  genreTile: {
    borderRadius: 16,
    overflow: "hidden",
    minHeight: 100,
    justifyContent: "flex-end",
    padding: 14,
  },
  genreTileLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: CINEMA.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default styles;

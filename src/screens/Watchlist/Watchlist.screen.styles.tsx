import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CINEMA.screenBg,
  },
  emptyText: {
    color: CINEMA.textMuted,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  card: {
    margin: 10,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 225,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    color: CINEMA.textPrimary,
  },
});

export default styles;

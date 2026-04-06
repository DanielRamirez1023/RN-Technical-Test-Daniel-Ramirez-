import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

export const movieCardStyles = StyleSheet.create({
  card: {
    marginBottom: 4,
  },
  posterWrap: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: {
    aspectRatio: 2 / 3,
    borderRadius: 12,
    backgroundColor: "#222",
  },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.72)",
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: CINEMA.textPrimary,
  },
  cardMeta: {
    marginTop: 4,
    fontSize: 12,
    color: CINEMA.textMuted,
  },
});

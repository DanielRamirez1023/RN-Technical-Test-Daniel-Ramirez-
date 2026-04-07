import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  activeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CINEMA.red,
    paddingVertical: 8,
    paddingLeft: 14,
    paddingRight: 10,
    borderRadius: 999,
    gap: 6,
  },
  activeChipText: {
    color: CINEMA.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  filtersPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CINEMA.searchBg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 8,
  },
  filtersPillText: {
    color: CINEMA.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
  flatList: {
    flex: 1,
  },
  listContent: {},
  columnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  centerText: {
    color: CINEMA.textMuted,
    marginTop: 8,
    textAlign: "center",
  },
  loadMoreWrap: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 10,
  },
  loadMoreText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: CINEMA.textMuted,
  },
  loadMoreButton: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: CINEMA.searchBg,
    alignItems: "center",
  },
  loadMoreButtonText: {
    color: CINEMA.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;

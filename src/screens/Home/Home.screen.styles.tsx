import { StyleSheet } from "react-native";
import { CINEMA, FLOATING_TAB_BAR_EXTRA_PADDING } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
  },
  offlineBanner: {
    textAlign: "center",
    color: CINEMA.red,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING,
  },
  flatList: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CINEMA.screenBg,
  },
  centerText: {
    color: CINEMA.textMuted,
    marginTop: 8,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  loadMoreWrap: {
    paddingVertical: 24,
    alignItems: "center",
    gap: 12,
  },
  loadMoreDots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
  },
  loadMoreDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#333",
  },
  loadMoreDotActive: {
    backgroundColor: CINEMA.red,
  },
  loadMoreText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: CINEMA.textMuted,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: CINEMA.textPrimary,
  },
});

export default styles;

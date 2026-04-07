import { StyleSheet } from "react-native";
import { CINEMA, FLOATING_TAB_BAR_EXTRA_PADDING } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
  },
  scrollContent: {
    paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING + 24,
  },
  pageHeader: {
    paddingHorizontal: 16,
    paddingTop: 4,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: CINEMA.textPrimary,
  },
  pageSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: CINEMA.textMuted,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: CINEMA.textMuted,
    textTransform: "uppercase",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: CINEMA.searchBg,
    borderRadius: 12,
  },
  genreRowIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  genreRowLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: CINEMA.textPrimary,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  centerText: {
    color: CINEMA.textMuted,
    textAlign: "center",
    marginTop: 8,
  },
});

export default styles;

import { StyleSheet } from "react-native";
import { CINEMA, FLOATING_TAB_BAR_EXTRA_PADDING } from "../../utils/cinemaTheme";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
  },
  headerBlock: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: CINEMA.textPrimary,
  },
  pageSubtitle: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "400",
    color: "#CABBB5",
    lineHeight: 22,
  },
  flatList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 12,
  },
  emptyRoot: {
    flex: 1,
    backgroundColor: CINEMA.screenBg,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: FLOATING_TAB_BAR_EXTRA_PADDING,
  },
  emptyIconWrap: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  emptyRing: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  emptyRingOuter: {
    width: 268,
    height: 268,
    borderRadius: 134,
    top: 6,
    left: 6,
  },
  emptyRingMid: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderColor: "rgba(255, 255, 255, 0.05)",
    top: 35,
    left: 35,
  },
  emptyRingInner: {
    width: 152,
    height: 152,
    borderRadius: 76,
    borderColor: "rgba(255, 255, 255, 0.04)",
    top: 64,
    left: 64,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: CINEMA.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: CINEMA.textMuted,
    textAlign: "center",
    maxWidth: 320,
    marginBottom: 28,
  },
  discoverButton: {
    backgroundColor: CINEMA.red,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  discoverButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: CINEMA.textPrimary,
  },
});

export default styles;

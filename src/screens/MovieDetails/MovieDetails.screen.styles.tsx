import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

export const DETAIL_BG = "#121212";
export const SECONDARY_BTN_BG = "#2C2C2E";
export const SALMON_LABEL = "#E8A598";
export const GRADIENT_START = "#E54B4B";
export const PRIMARY_BTN_SOLID = "#CD3D3D";

const H_PADDING = 20;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: DETAIL_BG,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DETAIL_BG,
  },
  centerText: {
    color: "#8e8e93",
    marginTop: 12,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  heroWrap: {
    width: SCREEN_W,
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  heroShade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: DETAIL_BG,
    opacity: 0.82,
  },
  ratingBadge: {
    position: "absolute",
    left: H_PADDING,
    bottom: 20,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  ratingStar: {
    marginRight: 2,
  },
  ratingValue: {
    color: "#111",
    fontSize: 15,
    fontWeight: "800",
  },
  ratingMax: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
  body: {
    paddingHorizontal: H_PADDING,
    marginTop: -20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  metaLine: {
    fontSize: 14,
    color: "#A0A0A8",
    marginBottom: 14,
  },
  genreRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },
  genrePill: {
    backgroundColor: SECONDARY_BTN_BG,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  genrePillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  primaryBtn: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
  },
  primaryBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 10,
    backgroundColor: PRIMARY_BTN_SOLID,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SECONDARY_BTN_BG,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 10,
    marginBottom: 28,
  },
  secondaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  synopsisText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#C8C8D0",
    marginBottom: 28,
  },
  castHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  castSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: SALMON_LABEL,
  },
  castScroll: {
    marginBottom: 28,
    marginHorizontal: -H_PADDING,
    paddingLeft: H_PADDING,
  },
  castItem: {
    width: 88,
    marginRight: 14,
    alignItems: "center",
  },
  castAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#333",
    marginBottom: 8,
  },
  castAvatarImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  castName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  castCharacter: {
    fontSize: 11,
    color: "#8e8e93",
    textAlign: "center",
    marginTop: 2,
  },
  footerCards: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    borderRadius: 14,
    padding: 16,
    minHeight: 88,
  },
  infoCardLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: SALMON_LABEL,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  infoCardValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    lineHeight: 20,
  },
});

export default styles;

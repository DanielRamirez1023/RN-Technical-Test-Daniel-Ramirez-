import { StyleSheet } from "react-native";
import { CINEMA } from "../../utils/cinemaTheme";

const moviesSearchStyles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CINEMA.searchBg,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: CINEMA.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pipelineNotice: {
    marginHorizontal: 16,
    marginBottom: 12,
    fontSize: 12,
    color: CINEMA.textMuted,
    lineHeight: 16,
  },
});

export default moviesSearchStyles;

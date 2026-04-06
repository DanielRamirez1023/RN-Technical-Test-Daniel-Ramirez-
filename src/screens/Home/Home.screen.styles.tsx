import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  offlineBanner: {
    textAlign: "center",
    color: "red",
  },
  listContent: {
    paddingBottom: 20,
  },
  flatList: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  pipelineNotice: {
    marginHorizontal: 10,
    marginBottom: 4,
    fontSize: 12,
    color: "#666",
  },
});

export default styles;

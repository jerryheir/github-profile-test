import { StyleSheet } from "react-native";
import { Theme } from "./Colors";

export const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: Theme.light.bgColor,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function LiveAgentBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>Policy Agent is scanning for eligibility changes...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8E1F2",
    backgroundColor: "#EAF0FF",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: colors.success
  },
  text: {
    fontSize: 13,
    color: colors.primary,
    flex: 1,
    fontWeight: "600"
  }
});

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function LiveAgentBanner() {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Pressable
      style={[styles.container, isHovered && styles.containerHover]}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <View style={styles.dot} />
      <Text style={styles.text}>Policy Agent is scanning for eligibility changes...</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "#002061",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  containerHover: {
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    transform: [{ scale: 1.01 }],
    elevation: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 99,
    backgroundColor: "#D4AF37"
  },
  text: {
    fontSize: 13,
    color: "#D4AF37",
    flex: 1,
    fontWeight: "600"
  }
});

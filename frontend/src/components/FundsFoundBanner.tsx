import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

type Props = {
  total: string;
};

export function FundsFoundBanner({ total }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Funds Found</Text>
      <Text style={styles.amount}>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.primary,
    gap: 4
  },
  label: {
    fontSize: 13,
    color: colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  amount: {
    fontSize: 28,
    color: colors.accent,
    fontWeight: "800"
  }
});

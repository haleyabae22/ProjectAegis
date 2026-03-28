import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

type BenefitCardProps = {
  icon: string;
  title: string;
  amount: string;
  description: string;
  matchPercent: number;
};

export function BenefitCard({
  icon,
  title,
  amount,
  description,
  matchPercent
}: BenefitCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{matchPercent}% MATCH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  icon: {
    fontSize: 24
  },
  info: {
    flex: 1,
    gap: 2
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary
  },
  amount: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.accent
  },
  description: {
    fontSize: 12,
    color: "#5A667F"
  },
  badge: {
    backgroundColor: colors.success,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.primary
  }
});

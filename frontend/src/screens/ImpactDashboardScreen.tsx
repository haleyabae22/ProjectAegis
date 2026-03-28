import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export function ImpactDashboardScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Impact Dashboard</Text>
      <Text style={styles.subtitle}>Track your security score and active benefit pipeline.</Text>

      <View style={styles.grid}>
        <MetricCard label="Security Score" value="92" tone="primary" />
        <MetricCard label="Active Programs" value="3" tone="nutrition" />
        <MetricCard label="Pending Docs" value="2" tone="energy" />
        <MetricCard label="Projected Annual" value="$19.8k" tone="primary" />
      </View>

      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Automation Timeline</Text>
        <Text style={styles.timelineItem}>- SNAP Recertification: Auto-submit in 9 days</Text>
        <Text style={styles.timelineItem}>- LIHEAP: Additional proof of address requested</Text>
        <Text style={styles.timelineItem}>- Rent Relief: Eligibility window opens next Monday</Text>
      </View>
    </ScrollView>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
  tone: "primary" | "nutrition" | "energy";
};

function MetricCard({ label, value, tone }: MetricCardProps) {
  const bgColor =
    tone === "nutrition"
      ? colors.badge.nutrition
      : tone === "energy"
        ? colors.badge.energy
        : colors.primary;

  return (
    <View style={[styles.metricCard, { backgroundColor: bgColor }]}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 16,
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary
  },
  subtitle: {
    fontSize: 14,
    color: "#5A667F"
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  metricCard: {
    width: "48%",
    borderRadius: 14,
    padding: 14,
    minHeight: 96,
    justifyContent: "space-between"
  },
  metricLabel: {
    color: colors.text.primary,
    fontSize: 12,
    opacity: 0.9
  },
  metricValue: {
    color: colors.text.primary,
    fontWeight: "800",
    fontSize: 24
  },
  timelineCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    gap: 8
  },
  timelineTitle: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 16
  },
  timelineItem: {
    fontSize: 13,
    color: "#485167"
  }
});

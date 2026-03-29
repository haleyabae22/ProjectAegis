import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadow, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

export function ImpactDashboardScreen() {
  return (
    // Level 0: base surface (#f4faff)
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>

      {/* Hero header — primary blue with xl radius overlap */}
      <View style={styles.hero}>
        <Text style={styles.title}>Impact Dashboard</Text>
        <Text style={styles.subtitle}>
          Track your security score and active benefit pipeline.
        </Text>
      </View>

      {/* Level 1 section — color shift from base, no border */}
      <View style={styles.section}>
        <View style={styles.grid}>
          <MetricCard label="Security Score"    value="92"     tone="primary"    />
          <MetricCard label="Active Programs"   value="3"      tone="nutrition"  />
          <MetricCard label="Pending Docs"      value="2"      tone="energy"     />
          <MetricCard label="Projected Annual"  value="$19.8k" tone="primary"    />
        </View>
      </View>

      {/* Timeline card — surfaceContainerLowest on surfaceContainerLow = natural lift */}
      <View style={[styles.timelineCard, shadow]}>
        <Text style={styles.timelineTitle}>Automation Timeline</Text>
        {/* spacing-6 gap replaces divider lines between items */}
        <TimelineItem text="SNAP Recertification: Auto-submit in 9 days"        tone="gold"    />
        <TimelineItem text="LIHEAP: Additional proof of address requested"       tone="warning" />
        <TimelineItem text="Rent Relief: Eligibility window opens next Monday"   tone="primary" />
      </View>

    </ScrollView>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

type MetricCardProps = {
  label: string;
  value: string;
  tone: "primary" | "nutrition" | "energy";
};

function MetricCard({ label, value, tone }: MetricCardProps) {
  // Tone → token mapping (replaces raw hex strings)
  const bgColor =
    tone === "nutrition" ? colors.badge.nutrition
    : tone === "energy"  ? colors.badge.energy
    : colors.primary;

  // Gold tone gets dark text for contrast; others get onPrimary white
  const textColor = colors.onPrimary;

  return (
    <View style={[styles.metricCard, { backgroundColor: bgColor }, shadow]}>
      <Text style={[styles.metricLabel, { color: textColor }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: textColor }]}>{value}</Text>
    </View>
  );
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

type TimelineItemProps = {
  text: string;
  tone: "gold" | "warning" | "primary";
};

function TimelineItem({ text, tone }: TimelineItemProps) {
  // Accent dot color per tone
  const dotColor =
    tone === "gold"    ? colors.tertiaryContainer
    : tone === "warning" ? colors.badge.energy
    : colors.primary;

  return (
    // spacing-6 vertical gap between items replaces divider lines — "no-line rule"
    <View style={styles.timelineRow}>
      <View style={[styles.timelineDot, { backgroundColor: dotColor }]} />
      <Text style={styles.timelineItem}>{text}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.surface,         // Level 0
  },
  content: {
    paddingBottom: spacing[16],
    gap: 0,                                   // sections manage their own spacing
  },

  // Hero: primary blue, bleeds edge-to-edge, overlaps next section by 20px
  hero: {
    backgroundColor: colors.primary,
    padding: spacing[12],
    paddingTop: spacing[12],
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    marginBottom: -20,                        // architectural overlap per spec
    gap: spacing[2],
  },
  title: {
    ...typography.headlineMd,
    color: colors.onPrimary,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onPrimary,
    opacity: 0.8,
  },

  // Level 1 section — background shift, never a border
  section: {
    backgroundColor: colors.surfaceContainerLow,
    paddingTop: spacing[8] + 20,              // extra 20px to clear the overlap
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    width: "48%",
    borderRadius: radius.lg,                  // lg for inner cards
    padding: spacing[4],
    minHeight: 96,
    justifyContent: "space-between",
    // NO borderWidth — no-line rule
  },
  metricLabel: {
    ...typography.bodyMd,
    opacity: 0.9,
  },
  metricValue: {
    ...typography.headlineMd,
    color: colors.onPrimary,
  },

  // Timeline: surfaceContainerLowest (#fff) on surfaceContainerLow = natural lift
  timelineCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[6],
    gap: spacing[6],                          // spacing replaces dividers
    // NO borderWidth — no-line rule
  },
  timelineTitle: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginTop: 5,                             // vertically centers with first line
  },
  timelineItem: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
});
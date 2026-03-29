/**
 * MilestoneFunnelChart.tsx
 * Chart 4 — Milestone funnel showing user pipeline completion rates.
 * Pure React Native — no SVG or canvas library needed.
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MilestoneRow } from "../services/impactApi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const BLUE       = "#185FA5";
const BLUE_BG    = "#E6F1FB";
const GOLD       = "#BA7517";
const GOLD_BG    = "#FAEEDA";
const GREEN      = "#0F6E56";
const GREEN_BG   = "#E1F5EE";
const TRACK_BG   = "rgba(0,0,0,0.06)";
const LABEL_CLR  = "#5F5E5A";
const MUTED_CLR  = "#888780";

// ─── Tone map ─────────────────────────────────────────────────────────────────

const TONE_BAR: Record<MilestoneRow["tone"], string> = {
  blue:  BLUE,
  gold:  "#D4AF37",
  green: "#1D9E75",
};

const TONE_BADGE: Record<MilestoneRow["tone"], { bg: string; text: string }> = {
  blue:  { bg: BLUE_BG,  text: BLUE  },
  gold:  { bg: GOLD_BG,  text: GOLD  },
  green: { bg: GREEN_BG, text: GREEN },
};

// ─── Step icon ────────────────────────────────────────────────────────────────

function StepDot({ tone, complete }: { tone: MilestoneRow["tone"]; complete: boolean }) {
  const { bg, text } = TONE_BADGE[tone];
  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: complete ? TONE_BAR[tone] : bg, borderColor: TONE_BAR[tone] },
      ]}
    >
      {complete && <View style={styles.dotInner} />}
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  data: MilestoneRow[];
  /** Percentage threshold above which a step is considered "complete" */
  completeThreshold?: number;
};

export function MilestoneFunnelChart({ data, completeThreshold = 85 }: Props) {
  return (
    <View style={styles.root}>
      {/* Header row */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Pipeline stage</Text>
        <Text style={styles.headerLabel}>Completion</Text>
      </View>

      {/* Milestone rows */}
      {data.map((item, index) => {
        const isComplete = item.pct >= completeThreshold;
        const barColor   = TONE_BAR[item.tone];
        const badge      = TONE_BADGE[item.tone];

        return (
          <View key={item.label} style={styles.milestoneRow}>
            {/* Step icon + connector */}
            <View style={styles.iconCol}>
              <StepDot tone={item.tone} complete={isComplete} />
              {index < data.length - 1 && (
                <View
                  style={[
                    styles.connector,
                    { backgroundColor: isComplete ? barColor : TRACK_BG },
                  ]}
                />
              )}
            </View>

            {/* Label + bar */}
            <View style={styles.content}>
              <View style={styles.labelRow}>
                <Text style={styles.milestoneLabel}>{item.label}</Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: badge.bg },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: badge.text }]}>
                    {item.pct}%
                  </Text>
                </View>
              </View>

              {/* Track */}
              <View style={styles.track}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${item.pct}%`,
                      backgroundColor: barColor,
                      opacity: isComplete ? 1 : 0.65,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        );
      })}

      {/* Summary footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Of users who completed their profile, {data[data.length - 1]?.pct ?? 0}% received funds.
        </Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    width: "100%",
    gap: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 32,
    marginBottom: 8,
  },
  headerLabel: {
    fontSize: 11,
    color: MUTED_CLR,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  milestoneRow: {
    flexDirection: "row",
    gap: 12,
    minHeight: 56,
  },
  iconCol: {
    width: 20,
    alignItems: "center",
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  connector: {
    flex: 1,
    width: 2,
    borderRadius: 1,
    marginTop: 2,
    marginBottom: 2,
  },
  content: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 6,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  milestoneLabel: {
    fontSize: 13,
    color: LABEL_CLR,
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  track: {
    height: 6,
    backgroundColor: TRACK_BG,
    borderRadius: 3,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 3,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.08)",
    paddingLeft: 32,
  },
  footerText: {
    fontSize: 12,
    color: MUTED_CLR,
    lineHeight: 18,
  },
});
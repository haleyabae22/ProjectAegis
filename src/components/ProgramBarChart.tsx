/**
 * ProgramBarChart.tsx
 * Chart 2 — Horizontal bar chart showing annual value per benefit program.
 * Pure React Native — no SVG library needed.
 */

import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ProgramBar } from "../services/impactApi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const GOLD       = "#D4AF37";
const GOLD_PEND  = "#FAC775";
const BLUE       = "#185FA5";
const BLUE_AVAIL = "#85B7EB";
const LABEL_CLR  = "rgba(255,255,255,0.7)";
const MUTED_CLR  = "rgba(255,255,255,0.85)";
const BG_TRACK   = "rgba(0,0,0,0.06)";

const STATUS_COLOR: Record<ProgramBar["status"], string> = {
  active:    GOLD,
  pending:   GOLD_PEND,
  available: BLUE_AVAIL,
};

const STATUS_LABEL: Record<ProgramBar["status"], string> = {
  active:    "Active",
  pending:   "Pending",
  available: "Available",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtK(n: number): string {
  return `$${(n / 1000).toFixed(1)}k`;
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = { data: ProgramBar[] };

export function ProgramBarChart({ data }: Props) {
  const maxValue = useMemo(
    () => Math.max(...data.map((d) => d.annualValue), 1),
    [data]
  );

  return (
    <View style={styles.root}>
      {/* Legend */}
      <View style={styles.legend}>
        {(["active", "pending", "available"] as ProgramBar["status"][]).map((s) => (
          <View key={s} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: STATUS_COLOR[s] }]} />
            <Text style={styles.legendLabel}>{STATUS_LABEL[s]}</Text>
          </View>
        ))}
      </View>

      {/* Bars */}
      <View style={styles.bars}>
        {data.map((item) => {
          const barColor = STATUS_COLOR[item.status];
          const pct      = (item.annualValue / maxValue) * 100;

          return (
            <View key={item.program} style={styles.row}>
              <Text style={styles.programLabel} numberOfLines={1}>
                {item.program}
              </Text>
              <View style={styles.trackWrap}>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.bar,
                      { width: `${pct}%`, backgroundColor: barColor },
                    ]}
                  />
                </View>
                <Text style={[styles.valueLabel, { color: barColor === GOLD ? MUTED_CLR : barColor }]}>
                  {fmtK(item.annualValue)}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  legend: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 14,
    color: LABEL_CLR,
  },
  bars: {
    gap: 14,
  },
  row: {
    gap: 4,
  },
  programLabel: {
    fontSize: 14,
    color: MUTED_CLR,
    marginBottom: 2,
  },
  trackWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  track: {
    flex: 1,
    height: 10,
    backgroundColor: BG_TRACK,
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 5,
  },
  valueLabel: {
    fontSize: 14,
    fontWeight: "500",
    minWidth: 40,
    textAlign: "right",
  },
});
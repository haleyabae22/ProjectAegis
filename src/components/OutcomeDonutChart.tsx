/**
 * OutcomeDonutChart.tsx
 * Chart 3 — Donut chart showing application outcome breakdown (approved/pending/denied).
 * Drawn with react-native-svg.
 */

import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

import { OutcomeSlice } from "../services/impactApi";

// ─── Palette ──────────────────────────────────────────────────────────────────
const LABEL_CLR = "rgba(255,255,255,0.7)";
const TEXT_CLR  = "#2C2C2A";

// ─── Donut math ───────────────────────────────────────────────────────────────

const SIZE       = 160;
const CX         = SIZE / 2;
const CY         = SIZE / 2;
const R_OUTER    = 68;
const R_INNER    = 46;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number, cy: number,
  rOuter: number, rInner: number,
  startDeg: number, endDeg: number,
): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const o1 = polarToCartesian(cx, cy, rOuter, startDeg);
  const o2 = polarToCartesian(cx, cy, rOuter, endDeg);
  const i1 = polarToCartesian(cx, cy, rInner, endDeg);
  const i2 = polarToCartesian(cx, cy, rInner, startDeg);
  return [
    `M ${o1.x} ${o1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${o2.x} ${o2.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${i2.x} ${i2.y}`,
    "Z",
  ].join(" ");
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  data: OutcomeSlice[];
  centreLabel?: string;
  centreSubLabel?: string;
};

export function OutcomeDonutChart({
  data,
  centreLabel,
  centreSubLabel,
}: Props) {
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.count, 0),
    [data]
  );

  const slices = useMemo(() => {
    let cursor = 0;
    return data.map((d) => {
      const pct   = d.count / total;
      const sweep = pct * 360;
      const start = cursor;
      const end   = cursor + sweep - 1.5;
      cursor += sweep;
      return { ...d, start, end, pct };
    });
  }, [data, total]);

  const primary = slices.reduce((a, b) => (a.count > b.count ? a : b));
  const displayLabel    = centreLabel    ?? `${primary.count}%`;
  const displaySubLabel = centreSubLabel ?? primary.label;

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        {/* Donut */}
        <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {slices.map((s) => (
            <Path
              key={s.label}
              d={arcPath(CX, CY, R_OUTER, R_INNER, s.start, s.end)}
              fill={s.color}
            />
          ))}
          <Circle cx={CX} cy={CY} r={R_INNER - 2} fill="#fff" />
        </Svg>

        {/* Centre text overlay */}
        <View style={styles.centre} pointerEvents="none">
          <Text style={styles.centreValue}>{displayLabel}</Text>
          <Text style={styles.centreSub}>{displaySubLabel}</Text>
        </View>

        {/* Legend */}
        <View style={styles.meta}>
          {slices.map((s) => (
            <View key={s.label} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: s.color }]} />
              <Text style={styles.legendLabel}>{s.label}</Text>
              <Text style={[styles.legendPct, { color: s.color }]}>
                {s.count}%
              </Text>
            </View>
          ))}
          <Text style={styles.note}>
            Pending cases are actively followed up by automated agents.
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  centre: {
    position: "absolute",
    left: 0,
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  centreValue: {
    fontSize: 28,
    fontWeight: "500",
    color: TEXT_CLR,
  },
  centreSub: {
    fontSize: 14,
    color: "#888780",
    marginTop: 2,
  },
  meta: {
    flex: 1,
    gap: 10,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    flex: 1,
    fontSize: 15,
    color: LABEL_CLR,
  },
  legendPct: {
    fontSize: 15,
    fontWeight: "500",
  },
  note: {
    fontSize: 14,
    color: LABEL_CLR,
    lineHeight: 20,
    marginTop: 4,
  },
});
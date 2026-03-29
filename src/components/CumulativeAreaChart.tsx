import React, { useMemo } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Path, Line, Circle, Text as SvgText } from "react-native-svg";

import { WeeklyFundPoint } from "../services/impactApi";

const BLUE = "#185FA5";
const BLUE_PROJ = "#85B7EB";
const GOLD = "#D4AF37";
const LABEL_CLR = "rgba(255,255,255,0.7)";
const GRID_CLR = "rgba(0,0,0,0.06)";

const PAD_TOP = 6;
const PAD_BOTTOM = 18;
const PAD_LEFT = 44;
const PAD_RIGHT = 12;

// ─── Helpers ───────────────────────────────

function fmt(n: number): string {
  if (n >= 1000) return `$${Math.round(n / 1000)}k`;
  return `$${n}`;
}

function buildPath(points: { x: number; y: number }[], close: boolean, baseY: number): string {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y} ${cpx} ${curr.y} ${curr.x} ${curr.y}`;
  }
  if (close) {
    d += ` L ${points[points.length - 1].x} ${baseY} L ${points[0].x} ${baseY} Z`;
  }
  return d;
}

// ─── Component ─────────────────────────────

type Props = { data: WeeklyFundPoint[]; cardWidth?: number; cardHeight?: number };

export function CumulativeAreaChart({ data, cardWidth, cardHeight }: Props) {
  const { width: screenWidth } = useWindowDimensions();
  const W = cardWidth ?? screenWidth;
  const H = cardHeight ?? 160;
  const CHART_W = W - PAD_LEFT - PAD_RIGHT;
  const CHART_H = H - PAD_TOP - PAD_BOTTOM;

  const { securedPts, projectedPts, yTicks, xLabels } = useMemo(() => {
    const allValues = data.flatMap((d) => [d.secured, d.projected].filter((v): v is number => v != null));
    const maxVal = Math.max(...allValues, 1);
    const step = Math.ceil(maxVal / 4 / 5000) * 5000;
    const yMax = step * 4;

    const toX = (i: number) => PAD_LEFT + (i / (data.length - 1)) * CHART_W;
    const toY = (v: number) => PAD_TOP + CHART_H - (v / yMax) * CHART_H;

    const securedPts: { x: number; y: number }[] = [];
    const projectedPts: { x: number; y: number }[] = [];

    data.forEach((d, i) => {
      const x = toX(i);
      if (d.secured != null) securedPts.push({ x, y: toY(d.secured) });
      if (d.projected != null) projectedPts.push({ x, y: toY(d.projected) });
    });

    const yTicks = Array.from({ length: 5 }, (_, i) => ({ value: i * step, y: toY(i * step) }));
    const xLabels = data
      .filter((_, i) => i % 2 === 0 || i === data.length - 1)
      .map((d) => ({ label: d.week, x: toX(data.indexOf(d)) }));

    return { securedPts, projectedPts, yTicks, xLabels };
  }, [data, CHART_W, CHART_H]);

  const baseY = PAD_TOP + CHART_H;
  const areaPath = buildPath(securedPts, true, baseY);
  const linePath = buildPath(securedPts, false, baseY);
  const projPath = buildPath(projectedPts, false, baseY);
  const projArea = buildPath(projectedPts, true, baseY);

  return (
    <View style={styles.root}>
      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: BLUE }]} />
          <Text style={styles.legendLabel}>Funds secured</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: BLUE_PROJ, borderWidth: 1, borderColor: BLUE_PROJ, borderStyle: "dashed" },
            ]}
          />
          <Text style={styles.legendLabel}>Projected</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={{ height: H, width: "100%" }}>
        <Svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}>
          <Defs>
            <LinearGradient id="grad-secured" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={BLUE} stopOpacity="0.18" />
              <Stop offset="100%" stopColor={BLUE} stopOpacity="0.02" />
            </LinearGradient>
            <LinearGradient id="grad-projected" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={BLUE_PROJ} stopOpacity="0.12" />
              <Stop offset="100%" stopColor={BLUE_PROJ} stopOpacity="0.01" />
            </LinearGradient>
          </Defs>

          {/* Grid lines + Y labels */}
          {yTicks.map(({ value, y }) => (
            <React.Fragment key={value}>
              <Line x1={PAD_LEFT} y1={y} x2={W - PAD_RIGHT} y2={y} stroke={GRID_CLR} strokeWidth="1" />
              <SvgText x={PAD_LEFT - 4} y={y + 4} textAnchor="end" fontSize="10" fill={LABEL_CLR}>
                {fmt(value)}
              </SvgText>
            </React.Fragment>
          ))}

          {/* X labels */}
          {xLabels.map(({ label, x }) => (
            <SvgText key={label} x={x} y={H - 6} textAnchor="middle" fontSize="11" fill={LABEL_CLR}>
              {label}
            </SvgText>
          ))}

          {/* Projected */}
          {projectedPts.length > 1 && (
            <>
              <Path d={projArea} fill="url(#grad-projected)" />
              <Path d={projPath} fill="none" stroke={BLUE_PROJ} strokeWidth="1.5" strokeDasharray="4 3" />
            </>
          )}

          {/* Secured */}
          {securedPts.length > 1 && (
            <>
              <Path d={areaPath} fill="url(#grad-secured)" />
              <Path d={linePath} fill="none" stroke={BLUE} strokeWidth="1.5" />
            </>
          )}

          {/* Handoff dot */}
          {securedPts.length > 0 && (
            <Circle
              cx={securedPts[securedPts.length - 1].x}
              cy={securedPts[securedPts.length - 1].y}
              r="3"
              fill={BLUE}
              stroke="#fff"
              strokeWidth="1.2"
            />
          )}

          {/* Baseline */}
          <Line x1={PAD_LEFT} y1={baseY} x2={W - PAD_RIGHT} y2={baseY} stroke={GRID_CLR} strokeWidth="1" />
        </Svg>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────

const styles = StyleSheet.create({
  root: { width: "100%" },
  legend: { flexDirection: "row", gap: 12, marginBottom: 6 },
  legendLabel: { fontSize: 13, color: LABEL_CLR },
  legendDot: { width: 8, height: 8, borderRadius: 2 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
});
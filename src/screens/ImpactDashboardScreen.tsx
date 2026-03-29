/**
 * ImpactDashboardScreen.tsx
 * Color scheme: Dark Navy (#001F3F), Gold (#D4AF37), Blue (#185FA5)
 */

import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, radius, shadow, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

import { getImpactData, ImpactData } from "../services/impactApi";
import { CumulativeAreaChart }  from "../components/CumulativeAreaChart";
import { ProgramBarChart }      from "../components/ProgramBarChart";
import { OutcomeDonutChart }    from "../components/OutcomeDonutChart";
import { MilestoneFunnelChart } from "../components/MilestoneFunnelChart";

// ─── Palette ─────────────────────────────────────────────────────────────────
const NAVY      = "#001F3F";
const NAVY_MID  = "#002E5C";   // slightly lighter navy for cards
const BLUE      = "#185FA5";
const GOLD      = "#D4AF37";
const GOLD_DIM  = "#9A7B1C";
const ON_NAVY   = "#FFFFFF";
const ON_NAVY_M = "rgba(255,255,255,0.7)";

// ─── MetricCard ──────────────────────────────────────────────────────────────

type MetricCardProps = {
  label: string;
  value: string;
  variant: "blue" | "gold";
};

function MetricCard({ label, value, variant }: MetricCardProps) {
  const bg   = variant === "gold" ? GOLD      : BLUE;
  const clr  = variant === "gold" ? NAVY      : ON_NAVY;
  const subC = variant === "gold" ? NAVY_MID  : ON_NAVY_M;
  return (
    <View style={[cardStyles.metricCard, { backgroundColor: bg }]}>
      <Text style={[cardStyles.metricLabel, { color: subC }]}>{label}</Text>
      <Text style={[cardStyles.metricValue, { color: clr }]}>{value}</Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  metricCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: radius.lg,
    padding: spacing[4],
    minHeight: 96,
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: GOLD,
  },
  metricLabel: {
    ...typography.bodyMd,
    fontSize: 11,
  },
  metricValue: {
    ...typography.headlineMd,
    fontWeight: "700",
  },
});

// ─── Chart section wrapper ───────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>{title}</Text>
      {subtitle ? <Text style={styles.chartSubtitle}>{subtitle}</Text> : null}
      <View style={styles.chartBody}>{children}</View>
    </View>
  );
}

// ─── Loading / Error states ──────────────────────────────────────────────────

function LoadingState() {
  return (
    <View style={[styles.centred, { backgroundColor: NAVY }]}>
      <ActivityIndicator size="large" color={GOLD} />
      <Text style={[styles.loadingText, { color: ON_NAVY_M }]}>Loading impact data…</Text>
    </View>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={[styles.centred, { backgroundColor: NAVY }]}>
      <Text style={[styles.errorText, { color: ON_NAVY }]}>{message}</Text>
      <Text style={[styles.retryText, { color: GOLD }]} onPress={onRetry}>
        Tap to retry
      </Text>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export function ImpactDashboardScreen() {
  const [data, setData]             = useState<ImpactData | null>(null);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      const result = await getImpactData();
      setData(result);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load impact data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <LoadingState />;
  if (error)   return <ErrorState message={error} onRetry={() => load()} />;
  if (!data)   return null;

  const fmtK = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => load(true)}
          tintColor={GOLD}
        />
      }
    >
      {/* ── Hero header ── */}
      <View style={styles.hero}>
        <Text style={styles.subtitle}>
          Track your security score and active benefit pipeline.
        </Text>
      </View>

      {/* ── Metric cards ── */}
      <View style={styles.section}>
        <View style={styles.grid}>
          <MetricCard label="Security Score"    value="92"                        variant="blue" />
          <MetricCard label="Active Programs"   value={String(data.activePrograms)} variant="gold" />
          <MetricCard label="Approval Rate"     value={`${data.approvalRate}%`}   variant="blue" />
          <MetricCard label="Projected Annual"  value={fmtK(data.projectedAnnual)} variant="gold" />
        </View>
      </View>

      {/* ── Chart 1: Cumulative area ── */}
      <ChartCard
        title="Funds secured over time"
        subtitle="Actual (solid) vs projected (dashed) cumulative total"
      >
        <CumulativeAreaChart data={data.weeklyFunds} />
      </ChartCard>

      {/* ── Chart 2: Program bars ── */}
      <ChartCard
        title="Benefit programs"
        subtitle="Annual value by program and enrollment status"
      >
        <ProgramBarChart data={data.programs} />
      </ChartCard>

      {/* ── Chart 3: Outcome donut ── */}
      <ChartCard
        title="Application outcomes"
        subtitle="Breakdown across all submitted applications"
      >
        <OutcomeDonutChart
          data={data.outcomes}
          centreLabel={`${data.approvalRate}%`}
          centreSubLabel="Approved"
        />
      </ChartCard>

      {/* ── Chart 4: Milestone funnel ── */}
      <ChartCard
        title="User pipeline"
        subtitle="Completion rate at each stage of the journey"
      >
        <MilestoneFunnelChart data={data.milestones} />
      </ChartCard>

      {/* ── Automation timeline ── */}
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Automation Timeline</Text>
        <TimelineItem
          text="SNAP Recertification: Auto-submit in 9 days"
          tone="gold"
        />
        <TimelineItem
          text="LIHEAP: Additional proof of address requested"
          tone="blue"
        />
        <TimelineItem
          text="Rent Relief: Eligibility window opens next Monday"
          tone="blue"
        />
      </View>
    </ScrollView>
  );
}

// ─── TimelineItem ─────────────────────────────────────────────────────────────

type TimelineItemProps = { text: string; tone: "gold" | "blue" };

function TimelineItem({ text, tone }: TimelineItemProps) {
  const dotColor = tone === "gold" ? GOLD : BLUE;
  return (
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
    backgroundColor: NAVY,
  },
  content: {
    paddingBottom: spacing[16],
    gap: 0,
  },

  // Hero
  hero: {
    backgroundColor: NAVY,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    marginBottom: spacing[2],
    gap: spacing[1],
  },
  subtitle: {
    ...typography.bodyMd,
    fontSize: 18,
    color: ON_NAVY,
    opacity: 0.9,
    textAlign: "left",
    marginLeft: 32,
  },

  // Metric cards section
  section: {
    backgroundColor: NAVY,
    paddingTop: spacing[4],
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[6],
  },
  grid: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    gap: 8,
  },

  // Chart cards
  chartCard: {
    backgroundColor: NAVY_MID,
    borderRadius: radius.xl,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    gap: spacing[2],
    borderWidth: 2,
    borderColor: GOLD,
  },
  chartTitle: {
    ...typography.headlineSm,
    color: GOLD,
    fontSize: 16,
    fontWeight: "600",
  },
  chartSubtitle: {
    ...typography.bodyMd,
    color: ON_NAVY_M,
    fontSize: 12,
    marginBottom: 4,
  },
  chartBody: {
    marginTop: spacing[2],
  },

  // Timeline
  timelineCard: {
    backgroundColor: NAVY_MID,
    borderRadius: radius.xl,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    gap: spacing[6],
    borderWidth: 2,
    borderColor: GOLD,
  },
  timelineTitle: {
    ...typography.headlineSm,
    color: GOLD,
    fontWeight: "600",
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
    marginTop: 5,
  },
  timelineItem: {
    ...typography.bodyMd,
    color: ON_NAVY_M,
    flex: 1,
  },

  // Loading / Error
  centred: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
    padding: spacing[8],
  },
  loadingText: {
    ...typography.bodyMd,
  },
  errorText: {
    ...typography.bodyMd,
    textAlign: "center",
  },
  retryText: {
    ...typography.labelLg,
  },
});
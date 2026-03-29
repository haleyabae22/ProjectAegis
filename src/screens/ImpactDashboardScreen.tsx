/**
 * ImpactDashboardScreen.tsx
 * Integrates all 4 impact charts with dummy data from impactApi.
 * Swap getImpactData() for a real endpoint when the backend is ready.
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

// ─── Palette (matches existing dashboard) ────────────────────────────────────
const GOLD      = "#D4AF37";
const GOLD_DARK = "#9A7B1C";

// ─── MetricCard (unchanged from original) ─────────────────────────────────────

type MetricCardProps = {
  label: string;
  value: string;
  bgColor?: string;
  textColor?: string;
};

function MetricCard({ label, value, bgColor, textColor }: MetricCardProps) {
  return (
    <View style={[cardStyles.metricCard, { backgroundColor: bgColor }, shadow]}>
      <Text style={[cardStyles.metricLabel, { color: textColor }]}>{label}</Text>
      <Text style={[cardStyles.metricValue, { color: textColor }]}>{value}</Text>
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
  },
  metricLabel: {
    ...typography.bodyMd,
    opacity: 0.9,
  },
  metricValue: {
    ...typography.headlineMd,
    color: colors.onPrimary,
  },
});

// ─── Chart section wrapper ────────────────────────────────────────────────────

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

// ─── Loading / Error states ───────────────────────────────────────────────────

function LoadingState() {
  return (
    <View style={styles.centred}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Loading impact data…</Text>
    </View>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.centred}>
      <Text style={styles.errorText}>{message}</Text>
      <Text style={styles.retryText} onPress={onRetry}>
        Tap to retry
      </Text>
    </View>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export function ImpactDashboardScreen() {
  const [data, setData]           = useState<ImpactData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]         = useState<string | null>(null);

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
          tintColor={colors.primary}
        />
      }
    >
      {/* ── Hero header ── */}
      <View style={styles.hero}>
        <Text style={styles.title}>Impact Dashboard</Text>
        <Text style={styles.subtitle}>
          Track your security score and active benefit pipeline.
        </Text>
      </View>

      {/* ── Metric cards ── */}
      <View style={styles.section}>
        <View style={styles.grid}>
          <MetricCard
            label="Security Score"
            value="92"
            bgColor={colors.primary}
            textColor={colors.onPrimary}
          />
          <MetricCard
            label="Active Programs"
            value={String(data.activePrograms)}
            bgColor={GOLD}
            textColor={colors.onSurface}
          />
          <MetricCard
            label="Approval Rate"
            value={`${data.approvalRate}%`}
            bgColor={colors.primary}
            textColor={colors.onPrimary}
          />
          <MetricCard
            label="Projected Annual"
            value={fmtK(data.projectedAnnual)}
            bgColor={GOLD}
            textColor={colors.onSurface}
          />
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

      {/* ── Automation timeline (original) ── */}
      <View style={[styles.timelineCard, shadow]}>
        <Text style={styles.timelineTitle}>Automation Timeline</Text>
        <TimelineItem
          text="SNAP Recertification: Auto-submit in 9 days"
          tone="gold"
        />
        <TimelineItem
          text="LIHEAP: Additional proof of address requested"
          tone="warning"
        />
        <TimelineItem
          text="Rent Relief: Eligibility window opens next Monday"
          tone="primary"
        />
      </View>
    </ScrollView>
  );
}

// ─── TimelineItem (unchanged from original) ───────────────────────────────────

type TimelineItemProps = { text: string; tone: "gold" | "warning" | "primary" };

function TimelineItem({ text, tone }: TimelineItemProps) {
  const dotColor =
    tone === "gold"
      ? colors.tertiaryContainer
      : tone === "warning"
      ? colors.badge.energy
      : colors.primary;

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
    backgroundColor: colors.surface,
  },
  content: {
    paddingBottom: spacing[16],
    gap: 0,
  },

  // Hero
  hero: {
    backgroundColor: colors.primary,
    padding: spacing[12],
    paddingTop: spacing[12],
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    marginBottom: -20,
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

  // Metric cards section
  section: {
    backgroundColor: colors.surfaceContainerLow,
    paddingTop: spacing[8] + 20,
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
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    gap: spacing[2],
  },
  chartTitle: {
    ...typography.headlineSm,
    color: colors.primary,
    fontSize: 16,
  },
  chartSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginBottom: 4,
  },
  chartBody: {
    marginTop: spacing[2],
  },

  // Timeline (unchanged)
  timelineCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.xl,
    padding: spacing[6],
    marginHorizontal: spacing[4],
    marginTop: spacing[4],
    gap: spacing[6],
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
    marginTop: 5,
  },
  timelineItem: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
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
    color: colors.onSurfaceVariant,
  },
  errorText: {
    ...typography.bodyMd,
    color: colors.onSurface,
    textAlign: "center",
  },
  retryText: {
    ...typography.labelLg,
    color: colors.primary,
  },
});
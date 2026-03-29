// src/components/BenefitCard.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, shadow, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

// ── Icon config ─────────────────────────────────────────────
const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  food: "leaf-outline",      // SNAP / nutrition
  energy: "flash-outline",   // LIHEAP / utilities
  housing: "home-outline",   // rent relief
};

const ICON_BG: Record<string, string> = {
  food: "#e6f4ea",
  energy: "#fff8e1",
  housing: "#e8f0fe",
};

const ICON_FG: Record<string, string> = {
  food: "#2e7d32",
  energy: "#f57c00",
  housing: "#1a73e8",
};

// ── Tag config ─────────────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  food: "NUTRITIONAL AID",
  energy: "UTILITIES",
  housing: "HOUSING",
};

// Match-percent → pill color
function matchPillStyle(pct: number) {
  if (pct >= 90) return { bg: "#e6f4ea", fg: "#2e7d32" }; // green
  if (pct >= 80) return { bg: "#e8f0fe", fg: "#1a73e8" }; // blue
  return { bg: "#fff8e1", fg: "#f57c00" };                // amber
}

// ── Component ───────────────────────────────────────────────
type BenefitCardProps = {
  icon: "food" | "energy" | "housing" | string;
  title: string;
  amount: string;
  description: string;
  matchPercent: number;
  status?: string;
  tags?: string[];
};

export function BenefitCard({
  icon,
  title,
  amount,
  description,
  matchPercent,
  status,
  tags,
}: BenefitCardProps) {
  const pill = matchPillStyle(matchPercent);

  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={[styles.iconBox, { backgroundColor: ICON_BG[icon] ?? "#f0f4f8" }]}>
        <Ionicons
          name={ICON_MAP[icon] ?? "help-circle-outline"}
          size={22}
          color={ICON_FG[icon] ?? colors.onSurface}
        />
      </View>

      {/* Text stack */}
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>

        {/* Tag row */}
        <View style={styles.tagRow}>
          {tags
            ? tags.map((tagText, i) => (
                <View key={i} style={[styles.tag, { backgroundColor: "#eef2ff" }]}>
                  <Text style={[styles.tagText, { color: "#3b4bdb" }]}>{tagText}</Text>
                </View>
              ))
            : <>
                <View style={[styles.tag, { backgroundColor: "#eef2ff" }]}>
                  <Text style={[styles.tagText, { color: "#3b4bdb" }]}>{CATEGORY_LABEL[icon] ?? "BENEFIT"}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: pill.bg }]}>
                  <Text style={[styles.tagText, { color: pill.fg }]}>{matchPercent}% MATCH</Text>
                </View>
                {status && (
                  <View style={[styles.tag, { backgroundColor: "#e6f4ea" }]}>
                    <Text style={[styles.tagText, { color: "#2e7d32" }]}>{status.toUpperCase()}</Text>
                  </View>
                )}
              </>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: spacing[2],
    ...shadow,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  body: {
    flex: 1,
    gap: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.onSurface,
    flexShrink: 1,
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primary,
    flexShrink: 0,
  },

  description: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 17,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 2,
  },

  tag: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});
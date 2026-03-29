// src/components/BenefitCard.tsx

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
  food: "#002061",
  energy: "#002061",
  housing: "#002061",
};

const ICON_FG: Record<string, string> = {
  food: "#D4AF37",
  energy: "#D4AF37",
  housing: "#D4AF37",
};

// ── Tag config ─────────────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  food: "NUTRITIONAL AID",
  energy: "UTILITIES",
  housing: "HOUSING",
};

// Match-percent → pill color
function matchPillStyle(pct: number) {
  if (pct >= 90) return { bg: "#002061", fg: "#D4AF37" };
  if (pct >= 80) return { bg: "#002061", fg: "#D4AF37" };
  return { bg: "#002061", fg: "#D4AF37" };
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
  const [isHovered, setIsHovered] = React.useState(false);
  const pill = matchPillStyle(matchPercent);

  return (
    <Pressable
      style={[styles.card, isHovered && styles.cardHover]}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
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
                <View key={i} style={[styles.tag, { backgroundColor: "#002061" }]}>
                  <Text style={[styles.tagText, { color: "#D4AF37" }]}>{tagText}</Text>
                </View>
              ))
            : <>
                <View style={[styles.tag, { backgroundColor: "#002061" }]}>
                  <Text style={[styles.tagText, { color: "#D4AF37" }]}>{CATEGORY_LABEL[icon] ?? "BENEFIT"}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: pill.bg }]}>
                  <Text style={[styles.tagText, { color: pill.fg }]}>{matchPercent}% MATCH</Text>
                </View>
                {status && (
                  <View style={[styles.tag, { backgroundColor: "#002061" }]}>
                    <Text style={[styles.tagText, { color: "#D4AF37" }]}>{status.toUpperCase()}</Text>
                  </View>
                )}
              </>
          }
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#002061",
    borderRadius: radius.lg,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: spacing[2],
    borderWidth: 2,
    borderColor: "#D4AF37",
    ...shadow,
  },
  cardHover: {
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    transform: [{ scale: 1.01 }],
    elevation: 8,
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
    color: "#ffffff",
    flexShrink: 1,
  },

  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#D4AF37",
    flexShrink: 0,
  },

  description: {
    fontSize: 12,
    color: "#ffffff",
    lineHeight: 17,
    opacity: 0.85,
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
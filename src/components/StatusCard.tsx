import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, shadow, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

type Props = {
  title: string;
  subtitle: string;
  accent?: string;
  border?: string;
  surface?: string;
  text?: string;
  textMuted?: string;
  // New: design system variant
  variant?: "default" | "gold";
};

export function StatusCard({
  title,
  subtitle,
  accent,
  // Defaults pull straight from Luminous Guardian tokens
  surface  = colors.surfaceContainerLowest,
  text     = colors.onSurface,
  textMuted = colors.onSurfaceVariant,
  variant  = "default",
}: Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const isGold = variant === "gold";

  // Dot color: use accent prop if explicitly passed, otherwise derive from variant
  const dotColor = accent ?? (isGold ? "#D4AF37" : "#D4AF37");

  return (
    <Pressable
      style={[
        styles.card,
        shadow,
        isHovered && styles.cardHover,
        {
          backgroundColor: isGold ? "#D4AF37" : "#002061",
          borderWidth: 2,
          borderColor: "#D4AF37",
        },
      ]}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      {/* Accent dot — kept from teammate's layout, color now token-driven */}
      <View style={[styles.dot, { backgroundColor: dotColor }]} />

      <View style={styles.copyWrap}>
        <Text
          style={[
            styles.title,
            typography.labelLg,
            {
              color: isGold ? "#001f3f" : "#D4AF37",
            },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            typography.bodyMd,
            {
              color: isGold ? "#001f3f" : "#ffffff",
            },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    // xl radius (24) instead of teammate's 12 — softens the gov edge per spec
    borderRadius: radius.xl,
    // spacing-6 (24px) instead of teammate's 14 — "premium sense of space"
    padding: spacing[6],
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    // spacing-8 (32px) bottom margin replaces divider lines between cards
    marginBottom: spacing[8],
  },
  cardHover: {
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    transform: [{ scale: 1.01 }],
    elevation: 7,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  copyWrap: {
    flex: 1,
    gap: 2,
  },
  // Base styles only — color/font overridden above by typography tokens
  title: {
    fontSize: 16,   // kept >= bodyMd (14px) min — accessibility rule
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
  },
});
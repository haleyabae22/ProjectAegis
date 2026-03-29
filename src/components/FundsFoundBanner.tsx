import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

type Props = {
  total: string;
  matchCount?: number;
};

export function FundsFoundBanner({ total, matchCount = 3 }: Props) {
  return (
    <View style={styles.card}>
      {/* Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>ACTIVE PROTECTION</Text>
      </View>

      {/* Headline — white + gold split */}
      <Text style={styles.headline}>
        <Text style={styles.headlineWhite}>Total Funds{"\n"}Found: </Text>
        <Text style={styles.headlineGold}>{total}</Text>
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Based on your profile, our agents have secured {matchCount} matches.
      </Text>

      {/* CTA
      <TouchableOpacity style={styles.cta} activeOpacity={0.85}>
        <Ionicons name="flash" size={16} color={colors.onPrimary} />
        <Text style={styles.ctaText}>Auto-Apply (1-Click)</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#001f3f",
    borderRadius: radius.xl,
    padding: spacing[6],
    gap: spacing[3],
    marginBottom: spacing[4],
    borderWidth: 2,
    borderColor: "#D4AF37",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#D4AF37",
    borderRadius: radius.sm,
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
  },
  badgeText: {
    ...typography.labelSm,
    color: "#001f3f",
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "700",
  },
  headline: {
    fontSize: 32,
    fontFamily: "Manrope_700Bold",
    lineHeight: 38,
  },
  headlineWhite: {
    color: "#ffffff",
  },
  headlineGold: {
    color: "#D4AF37",
  },
  subtitle: {
    ...typography.bodyMd,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 20,
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    backgroundColor: "#D4AF37",
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    marginTop: spacing[1],
  },
  ctaText: {
    ...typography.labelLg,
    color: "#001f3f",
    fontSize: 15,
  },
});
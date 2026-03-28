import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BenefitCard } from "../components/BenefitCard";
import { FundsFoundBanner } from "../components/FundsFoundBanner";
import { LiveAgentBanner } from "../components/LiveAgentBanner";
import { colors } from "../theme/colors";

export function LandingScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.headline}>Benefit Discovery</Text>
        <Text style={styles.copy}>Find and track programs matched to your household profile.</Text>
      </View>

      <FundsFoundBanner total="$1,650/mo" />
      <LiveAgentBanner />

      <BenefitCard
        icon="food"
        title="SNAP"
        amount="$800/mo"
        description="Nutrition support based on income and household size"
        matchPercent={94}
      />
      <BenefitCard
        icon="energy"
        title="LIHEAP"
        amount="$350/mo"
        description="Energy assistance with priority seasonal enrollment"
        matchPercent={88}
      />
      <BenefitCard
        icon="housing"
        title="Rent Relief"
        amount="$500/mo"
        description="Housing cost reduction and emergency support"
        matchPercent={82}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 16,
    gap: 12
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    padding: 16,
    gap: 8
  },
  headline: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "800"
  },
  copy: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20
  }
});

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { BenefitCard } from "../components/BenefitCard";
import { FundsFoundBanner } from "../components/FundsFoundBanner";
import { LiveAgentBanner } from "../components/LiveAgentBanner";
import { spacing } from "../theme/colors";
import { typography } from "../theme/typography";

export function ServiceAnalysisReportScreen() {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <FundsFoundBanner total="$1,650 / month" matchCount={3} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Benefits</Text>
          <Text style={styles.sectionLink}>View All</Text>
        </View>

        <LiveAgentBanner />

        <BenefitCard
          icon="food"
          title="SNAP Food Assistance"
          amount="$450/mo"
          description="Supplemental nutrition assistance program for fresh groceries and essentials."
          matchPercent={98}
          tags={["NUTRITIONAL AID", "98% MATCH"]}
        />
        <BenefitCard
          icon="energy"
          title="LIHEAP Energy Relief"
          amount="$1,200/yr"
          description="Low income home energy assistance to lower your monthly utility overhead."
          matchPercent={88}
          tags={["UTILITIES", "PRE-APPROVED"]}
        />
        <BenefitCard
          icon="housing"
          title="Rent Relief"
          amount="$500/mo"
          description="Housing cost reduction and emergency support."
          matchPercent={82}
          tags={["HOUSING"]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#001f3f" },
  page: { flex: 1 },
  content: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    gap: spacing[3]
  },
  heroWrap: {
    marginBottom: spacing[2]
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[2]
  },
  sectionTitle: { ...typography.headlineSm, color: "#D4AF37", fontWeight: "700" },
  sectionLink: { ...typography.labelLg, color: "#D4AF37" }
});

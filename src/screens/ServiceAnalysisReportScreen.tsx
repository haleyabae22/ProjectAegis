import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";

import { BenefitCard } from "../components/BenefitCard";
import { FundsFoundBanner } from "../components/FundsFoundBanner";
import { LiveAgentBanner } from "../components/LiveAgentBanner";
import { spacing } from "../theme/colors";
import { typography } from "../theme/typography";
import { useProfile } from "../contexts/ProfileContext";
import { analyzeProfile, Benefit } from "../services/api";

export function ServiceAnalysisReportScreen() {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    
    async function fetchBenefits() {
      try {
        setLoading(true);
        setError("");
        const results = await analyzeProfile(profile);
        if (mounted) {
          setBenefits(results);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || "Failed to analyze profile.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    fetchBenefits();
    return () => { mounted = false; };
  }, [profile]);

  return (
    <View style={styles.root}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={styles.loadingText}>
              Aegis is analyzing the benefits landscape and running ADK web scrapers...
            </Text>
          </View>
        ) : error ? (
           <View style={styles.loadingContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
           </View>
        ) : (
          <>
            <View style={styles.heroWrap}>
              <FundsFoundBanner 
                 total={`$${benefits.reduce((acc, curr) => {
                   const amt = parseInt((curr.amount || "").replace(/[^0-9]/g, '')) || 0;
                   return acc + amt;
                 }, 0)} / estimated`} 
                 matchCount={benefits.length} 
              />
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Benefits</Text>
              <Text style={styles.sectionLink}>View All</Text>
            </View>

            <LiveAgentBanner />

            {benefits.length > 0 ? benefits.map((b, i) => (
              <BenefitCard
                key={i}
                icon={b.icon as any || "food"}
                title={b.title}
                amount={b.amount}
                description={b.description}
                matchPercent={b.matchPercent}
                tags={b.tags}
              />
            )) : (
              <Text style={styles.errorText}>No matching benefits found.</Text>
            )}
          </>
        )}
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
  sectionLink: { ...typography.labelLg, color: "#D4AF37" },
  loadingContainer: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[4]
  },
  loadingText: {
    ...typography.labelLg,
    color: "#D4AF37",
    textAlign: "center",
    maxWidth: "80%"
  },
  errorText: {
    ...typography.labelLg,
    color: "#ff6b6b",
    textAlign: "center"
  }
});

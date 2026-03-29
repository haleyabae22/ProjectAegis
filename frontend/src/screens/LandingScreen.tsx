import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../navigation/AppNavigator";
import { colors, radius, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

type Props = NativeStackScreenProps<HomeStackParamList, "Landing">;

export function LandingScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [citizenship, setCitizenship] = useState<"Yes" | "No" | "">("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyHousingCost, setMonthlyHousingCost] = useState("");
  const [monthlyUtilityCost, setMonthlyUtilityCost] = useState("");
  const [dependentCareCost, setDependentCareCost] = useState("");
  const isWideLayout = width >= 860;

  const canSubmit =
    fullName.trim().length > 0 &&
    citizenship !== "" &&
    monthlyIncome.trim().length > 0 &&
    monthlyHousingCost.trim().length > 0 &&
    monthlyUtilityCost.trim().length > 0 &&
    dependentCareCost.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    setIsFormOpen(false);
    navigation.navigate("ServiceAnalysisReport");
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <View style={styles.heroZone}>
          <View style={styles.heroContainer}>
            <View style={styles.logoSection}>
              <View style={styles.logoPlaceholder}>
                <Image
                  source={require("../../assets/aegis-logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Aegis</Text>
              <Text style={styles.subtitle}>Service intelligence for benefits, guidance, and action.</Text>
            </View>
          </View>

          <Pressable style={styles.ctaButton} onPress={() => setIsFormOpen(true)}>
            <Text style={styles.ctaButtonText}>Search Now!</Text>
          </Pressable>
        </View>

        <View style={styles.contentSection}>
          <View style={[styles.contentRow, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Stop Looking Everywhere...</Text>
              <Text style={styles.paragraphText}>
                Billions in aid go unclaimed every year. Aegis helps close that gap.
                Our multi‑agent system scans the benefits landscape, identifies programs aligned with your needs, and shows your total potential impact in minutes.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 1</Text>
            </View>
          </View>

          <View style={[styles.contentRow, styles.contentRowReverse, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Your benefits, decoded.</Text>
              <Text style={styles.paragraphText}>
                Aegis transforms complex government criteria into clear, personalized recommendations — showing you how much support you could unlock and what to do next.

              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 2</Text>
            </View>
          </View>

          <View style={[styles.contentRow, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Turning eligibility into real outcomes.</Text>
              <Text style={styles.paragraphText}>
                Aegis doesn’t stop at recommendations — our system walks you through the process, ensuring you can actually access the support you qualify for.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 3</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={isFormOpen}
        onRequestClose={() => setIsFormOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>User Information Form</Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor={colors.onSurfaceVariant}
              style={styles.input}
            />

            <Text style={styles.fieldLabel}>Citizenship</Text>
            <View style={styles.choiceRow}>
              <Pressable
                style={[styles.choiceButton, citizenship === "Yes" && styles.choiceButtonActive]}
                onPress={() => setCitizenship("Yes")}
              >
                <Text
                  style={[styles.choiceButtonText, citizenship === "Yes" && styles.choiceButtonTextActive]}
                >
                  Yes
                </Text>
              </Pressable>
              <Pressable
                style={[styles.choiceButton, citizenship === "No" && styles.choiceButtonActive]}
                onPress={() => setCitizenship("No")}
              >
                <Text
                  style={[styles.choiceButtonText, citizenship === "No" && styles.choiceButtonTextActive]}
                >
                  No
                </Text>
              </Pressable>
            </View>

            <TextInput
              value={monthlyIncome}
              onChangeText={setMonthlyIncome}
              placeholder="Monthly Income"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={monthlyHousingCost}
              onChangeText={setMonthlyHousingCost}
              placeholder="Monthly Housing Cost"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={monthlyUtilityCost}
              onChangeText={setMonthlyUtilityCost}
              placeholder="Monthly Utility Cost"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={dependentCareCost}
              onChangeText={setDependentCareCost}
              placeholder="Dependent Care Cost"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="number-pad"
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <Pressable style={styles.ghostButton} onPress={() => setIsFormOpen(false)}>
                <Text style={styles.ghostButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={!canSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#ffffff" },
  page: { flex: 1 },
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: spacing[8],
  },
  heroZone: {
    width: "100%",
    backgroundColor: "#001f3f",
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    paddingBottom: spacing[8],
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[6],
    minHeight: 420
  },
  heroContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[6]
  },
  logoSection: {
    flex: 0,
    width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  logoPlaceholder: {
    width: 172,
    height: 172,
    borderRadius: 86,
    backgroundColor: "#002061",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden"
  },
  logoImage: {
    width: "100%",
    height: "100%"
  },
  logoText: {
    fontSize: 60,
    color: "#001f3f"
  },
  titleSection: {
    flex: 1,
    justifyContent: "center",
    gap: spacing[2],
    paddingLeft: spacing[2]
  },
  mainTitle: {
    ...typography.displayLg,
    color: "#D4AF37",
    fontSize: 62,
    fontWeight: "700",
    letterSpacing: 1.4
  },
  subtitle: {
    ...typography.bodyMd,
    color: "#ffffff",
    fontSize: 18,
    maxWidth: 520,
    opacity: 0.9
  },
  ctaButton: {
    width: 260,
    backgroundColor: "#D4AF37",
    borderRadius: radius.lg,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  ctaButtonText: {
    ...typography.labelLg,
    color: "#001f3f",
    fontWeight: "600"
  },
  contentSection: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[12],
    gap: spacing[8]
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing[4]
  },
  contentRowReverse: {
    flexDirection: "row-reverse"
  },
  contentRowStack: {
    flexDirection: "column"
  },
  paragraphBlock: {
    flex: 1,
    gap: spacing[2],
    justifyContent: "center"
  },
  paragraphTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    fontSize: 20
  },
  paragraphText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 24
  },
  imagePlaceholder: {
    flex: 1,
    minHeight: 220,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant
  },
  imagePlaceholderText: {
    ...typography.labelLg,
    color: colors.onSurfaceVariant
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(12, 30, 38, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[5]
  },
  modalCard: {
    width: "92%",
    maxWidth: 460,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing[5],
    gap: spacing[3]
  },
  modalTitle: {
    ...typography.headlineSm,
    color: colors.onSurface
  },
  input: {
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing[3],
    color: colors.onSurface,
    backgroundColor: colors.surface
  },
  fieldLabel: {
    ...typography.labelLg,
    color: colors.onSurface
  },
  choiceRow: {
    flexDirection: "row",
    gap: spacing[2]
  },
  choiceButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface
  },
  choiceButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  choiceButtonText: {
    ...typography.labelLg,
    color: colors.onSurfaceVariant
  },
  choiceButtonTextActive: {
    color: colors.onPrimary
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[2]
  },
  ghostButton: {
    minHeight: 40,
    paddingHorizontal: spacing[3],
    alignItems: "center",
    justifyContent: "center"
  },
  ghostButtonText: {
    ...typography.labelLg,
    color: colors.onSurfaceVariant
  },
  submitButton: {
    minHeight: 40,
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginLeft: "auto"
  },
  submitButtonDisabled: {
    opacity: 0.45
  },
  submitButtonText: {
    ...typography.labelLg,
    color: colors.onPrimary
  }
});
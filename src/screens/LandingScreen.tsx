import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../navigation/AppNavigator";
import { colors, radius, spacing } from "../theme/colors";
import { typography } from "../theme/typography";

// ─── Asset imports ────────────────────────────────────────────────────────────
// Adjust paths to match your project structure
const MEDUSA = require("../../assets/medusa.png");
const PILLAR = require("../../assets/goldColumn.png");

// ─── Palette (from AegisWelcome) ─────────────────────────────────────────────
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#F5D76E";
const GOLD_DARK  = "#9A7B1C";
const NAVY       = "#0D1B4B";
const NAVY_DEEP  = "#080F2E";

// ─── Types ────────────────────────────────────────────────────────────────────
type Props = NativeStackScreenProps<HomeStackParamList, "Landing">;

// ─── AegisHero sub-component ─────────────────────────────────────────────────
function AegisHero({ onStart }: { onStart: () => void }) {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    Animated.loop(
    Animated.sequence([
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 700, // faster
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ])
  ).start();
  }, []);

  // Interpolate glow shadow radius for the medallion wrapper
  const glowShadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 36],
  });
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.75],
  });

  return (
    <View style={heroStyles.root}>
      {/* Corner ornaments */}
      <View style={[heroStyles.corner, { top: 12, left: 12, borderRightWidth: 0, borderBottomWidth: 0 }]} />
      <View style={[heroStyles.corner, { top: 12, right: 12, borderLeftWidth: 0, borderBottomWidth: 0 }]} />
      <View style={[heroStyles.corner, { bottom: 12, left: 12, borderRightWidth: 0, borderTopWidth: 0 }]} />
      <View style={[heroStyles.corner, { bottom: 12, right: 12, borderLeftWidth: 0, borderTopWidth: 0 }]} />

      {/* Row: left pillar | centre | right pillar */}
      <View style={heroStyles.row}>
        {/* Left pillar */}
        <Image source={PILLAR} style={heroStyles.pillar} resizeMode="stretch" />

        {/* Centre content */}
        <View style={heroStyles.centre}>
          {/* Medallion with animated glow */}
          <Animated.View
            style={[
              heroStyles.medallionWrap,
              {
                shadowRadius: glowShadowRadius,
                shadowOpacity: glowOpacity,
              },
            ]}
          >
            <Image source={MEDUSA} style={heroStyles.medallion} resizeMode="contain" />
          </Animated.View>

          <View style={heroStyles.heroContentGroup}>
            {/* Subtitle */}
            <View style={heroStyles.titleWrap}>
              <Text style={heroStyles.subtitlePrefix}>WELCOME TO</Text>
              <Text style={heroStyles.subtitleMain}>AEGIS</Text>
            </View>

            {/* Divider */}
            <View style={heroStyles.dividerRow}>
              <View style={heroStyles.dividerLine} />
              <View style={heroStyles.dividerDiamond} />
              <View style={heroStyles.dividerLine} />
            </View>

            {/* CTA Button */}
            <Pressable
              style={({ pressed: p }) => [heroStyles.button, p && heroStyles.buttonPressed]}
              onPressIn={() => setPressed(true)}
              onPressOut={() => setPressed(false)}
              onPress={onStart}
            >
              <Text style={heroStyles.buttonText}>Start</Text>
            </Pressable>

            {/* Inscription */}
            <Text
              style={heroStyles.inscription}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              SERVICE * INTELLIGENCE * ACTION
            </Text>
          </View>
        </View>

        {/* Right pillar (mirrored) */}
        <Image
          source={PILLAR}
          style={[heroStyles.pillar, { transform: [{ scaleX: -1 }] }]}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
}

const heroStyles = StyleSheet.create({
  root: {
    width: "100%",
    backgroundColor: NAVY_DEEP,
    paddingVertical: 28,
    position: "relative",
    borderBottomWidth: 2,
    borderBottomColor: GOLD_DARK,
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: GOLD_DARK,
    borderRadius: 3,
    opacity: 0.7,
    zIndex: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  pillar: {
  flex: 1,
  height: "100%",       // take 3/4 of the row height
  opacity: 0.85,
  maxWidth: 720,
  alignSelf: "center", // center vertically in the row
  },
  centre: {
    flex: 1,         // centre column takes 1/3
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 16,
  },
  medallionWrap: {
    borderRadius: 160,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 12,
    backgroundColor: "transparent",
  },
  medallion: {
    width: 500,
    height: 500,
    borderRadius: 180,
  },
  heroContentGroup: {
    alignItems: "center",
    gap: 16,
    marginTop: -52,
  },
  titleWrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  subtitlePrefix: {
    color: GOLD_LIGHT,
    fontSize: 28,
    fontStyle: "italic",
    letterSpacing: 4,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Georgia",
    textShadowColor: "rgba(212,175,55,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitleMain: {
    color: GOLD,
    fontSize: 64,
    fontStyle: "italic",
    letterSpacing: 8,
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Georgia",
    textShadowColor: "rgba(212,175,55,0.45)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: GOLD_DARK,
    opacity: 0.7,
  },
  dividerDiamond: {
    width: 8,
    height: 8,
    backgroundColor: GOLD,
    transform: [{ rotate: "45deg" }],
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 56,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.82,
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: NAVY_DEEP,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 5,
    textTransform: "uppercase",
    fontFamily: "Georgia",
  },
  inscription: {
    color: GOLD_DARK,
    fontSize: 10,
    letterSpacing: 4,
    textTransform: "uppercase",
    opacity: 0.65,
    fontFamily: "Georgia",
    marginTop: 4,
    width: "100%",
    maxWidth: 560,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

// ─── LandingScreen ────────────────────────────────────────────────────────────
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
    if (!canSubmit) return;
    setIsFormOpen(false);
    navigation.navigate("ServiceAnalysisReport");
  };

  return (
    <View style={styles.root}>
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>

        {/* ── Aegis Welcome Hero (top) ── */}
        <AegisHero onStart={() => setIsFormOpen(true)} />

        {/* ── Descriptive content (bottom) ── */}
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
              <Image
                source={require("../../assets/globe_icon.png")}
                style={styles.placeholderIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={[styles.contentRow, styles.contentRowReverse, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Your benefits, decoded.</Text>
              <Text style={styles.paragraphText}>
                Aegis transforms complex government criteria into clear, personalized recommendations — showing you how much support you could unlock and what to do next.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../assets/report_icon.png")}
                style={styles.placeholderIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={[styles.contentRow, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Turning eligibility into real outcomes.</Text>
              <Text style={styles.paragraphText}>
                Aegis doesn’t stop at recommendations — our system walks you through the process, ensuring you can actually access the support you qualify for.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require("../../assets/walk_icon.png")}
                style={styles.placeholderIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Intake Modal ── */}
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
              placeholderTextColor={GOLD_DARK}
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
              placeholderTextColor={GOLD_DARK}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={monthlyHousingCost}
              onChangeText={setMonthlyHousingCost}
              placeholder="Monthly Housing Cost"
              placeholderTextColor={GOLD_DARK}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={monthlyUtilityCost}
              onChangeText={setMonthlyUtilityCost}
              placeholder="Monthly Utility Cost"
              placeholderTextColor={GOLD_DARK}
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              value={dependentCareCost}
              onChangeText={setDependentCareCost}
              placeholder="Dependent Care Cost"
              placeholderTextColor={GOLD_DARK}
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

// ─── Styles (content section + modal — unchanged from original) ───────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#001f3f" },
  page: { flex: 1 },
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: spacing[8],
  },
  contentSection: {
    width: "100%",
    backgroundColor: NAVY_DEEP,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[8],
    paddingBottom: spacing[12],
    gap: spacing[8],
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing[4],
  },
  contentRowReverse: {
    flexDirection: "row-reverse",
  },
  contentRowStack: {
    flexDirection: "column",
  },
  sectionDivider: {
    width: "100%",
    height: 3,
    borderRadius: 999,
    backgroundColor: GOLD,
    opacity: 0.65,
  },
  paragraphBlock: {
    flex: 1,
    gap: spacing[2],
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 144,
  },
  paragraphTitle: {
    ...typography.headlineSm,
    color: GOLD,
    fontSize: 40,
    textAlign: "center",
  },
  paragraphText: {
    ...typography.bodyMd,
    color: GOLD_LIGHT,
    fontSize: 32,
    lineHeight: 48,
    textAlign: "center",
  },
  imagePlaceholder: {
    flex: 1,
    minHeight: 660,
    backgroundColor: NAVY_DEEP,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    ...typography.labelLg,
    color: colors.onSurfaceVariant,
  },
  placeholderIcon: {
    width: "96%",
    height: "96%",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(12, 30, 38, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  modalCard: {
    width: "96%",
    maxWidth: 900,
    backgroundColor: NAVY,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: GOLD,
    padding: spacing[6],
    gap: spacing[3],
  },
  modalTitle: {
    ...typography.headlineSm,
    color: GOLD,
  },
  input: {
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: GOLD,
    paddingHorizontal: spacing[3],
    color: GOLD,
    backgroundColor: NAVY,
  },
  fieldLabel: {
    ...typography.labelLg,
    color: GOLD,
  },
  choiceRow: {
    flexDirection: "row",
    gap: spacing[2],
  },
  choiceButton: {
    flex: 1,
    minHeight: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NAVY,
  },
  choiceButtonActive: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  choiceButtonText: {
    ...typography.labelLg,
    color: GOLD,
  },
  choiceButtonTextActive: {
    color: "#ffffff",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[2],
  },
  ghostButton: {
    minHeight: 40,
    paddingHorizontal: spacing[3],
    alignItems: "center",
    justifyContent: "center",
  },
  ghostButtonText: {
    ...typography.labelLg,
    color: GOLD,
  },
  submitButton: {
    minHeight: 40,
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GOLD,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: radius.md,
    marginLeft: "auto",
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    ...typography.labelLg,
    color: NAVY,
  },
}); 
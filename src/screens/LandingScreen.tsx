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

          {/* Subtitle */}
          <Text style={heroStyles.subtitle}>Welcome to Aegis</Text>

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
          <Text style={heroStyles.inscription}>Service · Intelligence · Benefits · Action</Text>
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
  subtitle: {
    color: GOLD_LIGHT,
    fontSize: 28,
    fontStyle: "italic",
    letterSpacing: 4,
    fontFamily: "Georgia",
    textShadowColor: "rgba(212,175,55,0.6)",
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
  },
});

// ─── LandingScreen ────────────────────────────────────────────────────────────
export function LandingScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const isWideLayout = width >= 860;

  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0;

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
              <Text style={styles.paragraphTitle}>Benefits Overview</Text>
              <Text style={styles.paragraphText}>
                Placeholder copy: this section explains how Aegis scans your profile, identifies benefit opportunities,
                and provides a clear summary to help you take action with confidence.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 1</Text>
            </View>
          </View>

          <View style={[styles.contentRow, styles.contentRowReverse, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Personalized Recommendations</Text>
              <Text style={styles.paragraphText}>
                Placeholder copy: this area highlights tailored programs, estimated monthly impact, and what documents
                are needed next so users can quickly move from discovery to enrollment.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 2</Text>
            </View>
          </View>

          <View style={[styles.contentRow, !isWideLayout && styles.contentRowStack]}>
            <View style={styles.paragraphBlock}>
              <Text style={styles.paragraphTitle}>Guided Support</Text>
              <Text style={styles.paragraphText}>
                Placeholder copy: this section can showcase support channels, live expert availability, and step-by-step
                follow-up so users know exactly what to do after they receive results.
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Image Placeholder 3</Text>
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
            <Text style={styles.modalTitle}>Service Intake Form</Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name"
              placeholderTextColor={colors.onSurfaceVariant}
              style={styles.input}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={colors.onSurfaceVariant}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              value={zipCode}
              onChangeText={setZipCode}
              placeholder="ZIP code"
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

// ─── Styles (content section + modal — unchanged from original) ───────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#ffffff" },
  page: { flex: 1 },
  content: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: spacing[8],
  },
  contentSection: {
    width: "100%",
    backgroundColor: "#ffffff",
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
  paragraphBlock: {
    flex: 1,
    gap: spacing[2],
    justifyContent: "center",
  },
  paragraphTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    fontSize: 20,
  },
  paragraphText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 24,
  },
  imagePlaceholder: {
    flex: 1,
    minHeight: 220,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  imagePlaceholderText: {
    ...typography.labelLg,
    color: colors.onSurfaceVariant,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(12, 30, 38, 0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[4],
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[3],
  },
  modalTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  input: {
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing[3],
    color: colors.onSurface,
    backgroundColor: colors.surface,
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
    color: colors.onSurfaceVariant,
  },
  submitButton: {
    minHeight: 40,
    paddingHorizontal: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginLeft: "auto",
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    ...typography.labelLg,
    color: colors.onPrimary,
  },
}); 
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
  const { height } = useWindowDimensions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");

  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0;

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
        {/* Hero Section with Navy Background */}
        <View style={styles.heroZone}>
          <View style={styles.heroContainer}>
            {/* Logo Section - Left Side */}
            <View style={styles.logoSection}>
              <View style={styles.logoPlaceholder}>
                <Image
                  source={require("../../assets/aegis-logo.png")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Title & Subtitle Section - Right Side */}
            <View style={styles.titleSection}>
              <Text style={styles.mainTitle}>Aegis</Text>
              <Text style={styles.subtitle}>Protect Your Future Today</Text>
            </View>
          </View>

          {/* Button Below */}
          <Pressable style={styles.ctaButton} onPress={() => setIsFormOpen(true)}>
            <Text style={styles.ctaButtonText}>Search Now!</Text>
          </Pressable>
        </View>

        {/* White Content Section with Alternating Placeholders */}
        <View style={styles.contentSection}>
          {/* Paragraph 1 - Left */}
          <View style={styles.paragraphBlock}>
            <Text style={styles.paragraphTitle}>Benefits Overview</Text>
            <Text style={styles.paragraphText}>
              Discover how Aegis can help you navigate your service options and find the benefits you deserve. Our comprehensive analysis ensures you never miss an opportunity.
            </Text>
          </View>

          {/* Image Placeholder 1 - Right */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Benefits Image</Text>
          </View>

          {/* Paragraph 2 - Right */}
          <View style={styles.paragraphBlock}>
            <Text style={styles.paragraphTitle}>Personalized Analysis</Text>
            <Text style={styles.paragraphText}>
              Our intelligent system analyzes your profile to match you with relevant services and benefits tailored to your unique situation and eligibility requirements.
            </Text>
          </View>

          {/* Image Placeholder 2 - Left */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Analysis Image</Text>
          </View>

          {/* Paragraph 3 - Left */}
          <View style={styles.paragraphBlock}>
            <Text style={styles.paragraphTitle}>Expert Support</Text>
            <Text style={styles.paragraphText}>
              Connect with our dedicated service specialists who guide you through every step. We're committed to ensuring you maximize your benefits and receive the support you need.
            </Text>
          </View>

          {/* Image Placeholder 3 - Right */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Support Image</Text>
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
    paddingVertical: spacing[8],
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[6],
    minHeight: 380
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#D4AF37",
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
    gap: spacing[2]
  },
  mainTitle: {
    ...typography.displayLg,
    color: "#D4AF37",
    fontSize: 56,
    fontWeight: "700",
    letterSpacing: 1.2
  },
  subtitle: {
    ...typography.bodyMd,
    color: "#ffffff",
    fontSize: 16,
    opacity: 0.9
  },
  ctaButton: {
    width: "88%",
    backgroundColor: "#D4AF37",
    borderRadius: radius.lg,
    minHeight: 52,
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
    paddingVertical: spacing[8],
    gap: spacing[6]
  },
  paragraphBlock: {
    gap: spacing[2]
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
    width: "100%",
    height: 200,
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
    paddingHorizontal: spacing[4]
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing[4],
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
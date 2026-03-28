import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
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
        <View style={[styles.heroZone, { minHeight: Math.max(height - 120, 520) }]}>
          <Pressable style={styles.ctaButton} onPress={() => setIsFormOpen(true)}>
            <Text style={styles.ctaButtonText}>Start Service Analysis</Text>
          </Pressable>
        </View>

        {/* Reserved long scroll area for future informational paragraphs */}
        <View style={styles.futureInfoZone} />
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
  root: { flex: 1, backgroundColor: colors.surface },
  page: { flex: 1 },
  content: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    paddingBottom: spacing[8],
    alignItems: "center"
  },
  heroZone: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  futureInfoZone: {
    width: "100%",
    minHeight: 1100
  },
  ctaButton: {
    width: "88%",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  ctaButtonText: {
    ...typography.labelLg,
    color: colors.onPrimary
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
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../theme/colors";

export function ProfileScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState("Jordan Rivera");
  const [citizenship, setCitizenship] = useState<"Yes" | "No" | "">("");
  const [monthlyIncome, setMonthlyIncome] = useState("$2,500");
  const [monthlyHousingCost, setMonthlyHousingCost] = useState("$1,200");
  const [monthlyUtilityCost, setMonthlyUtilityCost] = useState("$150");
  const [dependentCareCost, setDependentCareCost] = useState("$300");

  return (
    <View style={styles.page}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>User Profile</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <Text style={styles.field}>{fullName}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Citizenship</Text>
            <Text style={styles.field}>{citizenship || "Not specified"}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Monthly Income</Text>
            <Text style={styles.field}>{monthlyIncome}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Monthly Housing Cost</Text>
            <Text style={styles.field}>{monthlyHousingCost}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Monthly Utility Cost</Text>
            <Text style={styles.field}>{monthlyUtilityCost}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Dependent Care Cost</Text>
            <Text style={styles.field}>{dependentCareCost}</Text>
          </View>

          <Pressable style={styles.buttonPrimary} onPress={() => setIsModalOpen(true)}>
            <Text style={styles.buttonPrimaryText}>Edit Profile</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={isModalOpen} transparent animationType="slide" onRequestClose={() => setIsModalOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ScrollView>
              <Text style={styles.modalTitle}>Edit User Profile</Text>

              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />

              <Text style={styles.inputLabel}>Citizenship</Text>
              <View style={styles.choiceRow}>
                <Pressable
                  style={[styles.choiceButton, citizenship === "Yes" && styles.choiceButtonActive]}
                  onPress={() => setCitizenship("Yes")}
                >
                  <Text style={[styles.choiceButtonText, citizenship === "Yes" && styles.choiceButtonTextActive]}>
                    Yes
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.choiceButton, citizenship === "No" && styles.choiceButtonActive]}
                  onPress={() => setCitizenship("No")}
                >
                  <Text style={[styles.choiceButtonText, citizenship === "No" && styles.choiceButtonTextActive]}>
                    No
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.inputLabel}>Monthly Income</Text>
              <TextInput
                style={styles.input}
                placeholder="Monthly Income"
                value={monthlyIncome}
                onChangeText={setMonthlyIncome}
                keyboardType="decimal-pad"
              />

              <Text style={styles.inputLabel}>Monthly Housing Cost</Text>
              <TextInput
                style={styles.input}
                placeholder="Monthly Housing Cost"
                value={monthlyHousingCost}
                onChangeText={setMonthlyHousingCost}
                keyboardType="decimal-pad"
              />

              <Text style={styles.inputLabel}>Monthly Utility Cost</Text>
              <TextInput
                style={styles.input}
                placeholder="Monthly Utility Cost"
                value={monthlyUtilityCost}
                onChangeText={setMonthlyUtilityCost}
                keyboardType="decimal-pad"
              />

              <Text style={styles.inputLabel}>Dependent Care Cost</Text>
              <TextInput
                style={styles.input}
                placeholder="Dependent Care Cost"
                value={dependentCareCost}
                onChangeText={setDependentCareCost}
                keyboardType="decimal-pad"
              />

              <View style={styles.modalActions}>
                <Pressable style={styles.buttonGhost} onPress={() => setIsModalOpen(false)}>
                  <Text style={styles.buttonGhostText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.buttonPrimary} onPress={() => setIsModalOpen(false)}>
                  <Text style={styles.buttonPrimaryText}>Save</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 8
  },
  fieldContainer: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  field: {
    color: "#45516C",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonPrimary: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14
  },
  buttonPrimaryText: {
    color: colors.text.primary,
    fontWeight: "700"
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    padding: 0
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
    gap: 0
  },
  modalTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    backgroundColor: "#FCFCFC",
    fontSize: 15,
    color: colors.onSurface,
  },
  choiceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  choiceButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FCFCFC",
  },
  choiceButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  choiceButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  choiceButtonTextActive: {
    color: colors.text.primary,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FCFCFC",
  },
  buttonGhostText: {
    color: "#475569",
    fontWeight: "700"
  }
});

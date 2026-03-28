import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../theme/colors";

export function ProfileScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("Jordan Rivera");
  const [zipCode, setZipCode] = useState("94103");
  const [householdSize, setHouseholdSize] = useState("3");

  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.field}>Name: {name}</Text>
        <Text style={styles.field}>Zip Code: {zipCode}</Text>
        <Text style={styles.field}>Household Size: {householdSize}</Text>

        <Pressable style={styles.buttonPrimary} onPress={() => setIsModalOpen(true)}>
          <Text style={styles.buttonPrimaryText}>Edit User Profile</Text>
        </Pressable>
      </View>

      <Modal visible={isModalOpen} transparent animationType="slide" onRequestClose={() => setIsModalOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit User Profile</Text>

            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              keyboardType="number-pad"
              value={zipCode}
              onChangeText={setZipCode}
            />
            <TextInput
              style={styles.input}
              placeholder="Household Size"
              keyboardType="number-pad"
              value={householdSize}
              onChangeText={setHouseholdSize}
            />

            <View style={styles.modalActions}>
              <Pressable style={styles.buttonGhost} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.buttonGhostText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.buttonPrimary} onPress={() => setIsModalOpen(false)}>
                <Text style={styles.buttonPrimaryText}>Save</Text>
              </Pressable>
            </View>
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4
  },
  field: {
    color: "#45516C",
    fontSize: 14
  },
  buttonPrimary: {
    marginTop: 10,
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
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 16
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 10
  },
  modalTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800"
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    minHeight: 44,
    backgroundColor: "#FCFCFC"
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14
  },
  buttonGhostText: {
    color: "#475569",
    fontWeight: "700"
  }
});

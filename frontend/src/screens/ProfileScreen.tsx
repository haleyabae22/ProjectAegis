import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export function ProfileScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isYesHovered, setIsYesHovered] = useState(false);
  const [isNoHovered, setIsNoHovered] = useState(false);
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
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

          <Pressable
            style={[styles.buttonPrimary, isEditHovered && styles.buttonPrimaryHover]}
            onHoverIn={() => setIsEditHovered(true)}
            onHoverOut={() => setIsEditHovered(false)}
            onPress={() => setIsModalOpen(true)}
          >
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
                  style={[
                    styles.choiceButton,
                    isYesHovered && styles.choiceButtonHover,
                    citizenship === "Yes" && styles.choiceButtonActive,
                    isYesHovered && citizenship === "Yes" && styles.choiceButtonActiveHover,
                  ]}
                  onHoverIn={() => setIsYesHovered(true)}
                  onHoverOut={() => setIsYesHovered(false)}
                  onPress={() => setCitizenship("Yes")}
                >
                  <Text style={[styles.choiceButtonText, citizenship === "Yes" && styles.choiceButtonTextActive]}>
                    Yes
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.choiceButton,
                    isNoHovered && styles.choiceButtonHover,
                    citizenship === "No" && styles.choiceButtonActive,
                    isNoHovered && citizenship === "No" && styles.choiceButtonActiveHover,
                  ]}
                  onHoverIn={() => setIsNoHovered(true)}
                  onHoverOut={() => setIsNoHovered(false)}
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
                <Pressable
                  style={[
                    styles.buttonGhost,
                    styles.modalActionButton,
                    isCancelHovered && styles.buttonGhostHover,
                  ]}
                  onHoverIn={() => setIsCancelHovered(true)}
                  onHoverOut={() => setIsCancelHovered(false)}
                  onPress={() => setIsModalOpen(false)}
                >
                  <Text style={styles.buttonGhostText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.buttonPrimary,
                    styles.modalPrimaryButton,
                    styles.modalActionButton,
                    isSaveHovered && styles.buttonPrimaryHover,
                  ]}
                  onHoverIn={() => setIsSaveHovered(true)}
                  onHoverOut={() => setIsSaveHovered(false)}
                  onPress={() => setIsModalOpen(false)}
                >
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
    backgroundColor: "#001f3f",
    padding: 16
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#002061",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D4AF37",
    padding: 16,
    gap: 12
  },
  fieldContainer: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D4AF37",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  field: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonPrimary: {
    marginTop: 20,
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14
  },
  buttonPrimaryHover: {
    borderWidth: 2,
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonPrimaryText: {
    color: "#001f3f",
    fontWeight: "700"
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
    padding: 0
  },
  modalCard: {
    backgroundColor: "#001f3f",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "90%",
    gap: 0
  },
  modalTitle: {
    color: "#D4AF37",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 20
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#D4AF37",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    backgroundColor: "#002061",
    fontSize: 15,
    color: "#ffffff",
    placeholderTextColor: "#9A7B1C"
  },
  choiceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  choiceButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#D4AF37",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#002061",
  },
  choiceButtonHover: {
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  choiceButtonActive: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  choiceButtonActiveHover: {
    borderColor: "#F5D76E",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 5,
  },
  choiceButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D4AF37",
  },
  choiceButtonTextActive: {
    color: "#001f3f",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 24,
  },
  modalActionButton: {
    flex: 1,
  },
  modalPrimaryButton: {
    marginTop: 0,
  },
  buttonGhost: {
    borderWidth: 2,
    borderColor: "#D4AF37",
    borderRadius: 10,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  buttonGhostHover: {
    borderColor: "#F5D76E",
    backgroundColor: "rgba(245, 215, 110, 0.08)",
  },
  buttonGhostText: {
    color: "#D4AF37",
    fontWeight: "700"
  }
});

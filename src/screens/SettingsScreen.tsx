import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export function SettingsScreen({ navigation }: Props) {
  const { themeName, toggleTheme } = useAppStore();
  const palette = colors[themeName];

  return (
    <View style={[styles.page, { backgroundColor: palette.background }]}>
      <Text style={[styles.heading, { color: palette.text }]}>Settings</Text>
      <Text style={[styles.copy, { color: palette.textMuted }]}>Current theme: {themeName}</Text>

      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: palette.primary,
            opacity: pressed ? 0.8 : 1
          }
        ]}
      >
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            borderWidth: 1,
            opacity: pressed ? 0.8 : 1
          }
        ]}
      >
        <Text style={[styles.backText, { color: palette.text }]}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 14
  },
  heading: {
    fontSize: 24,
    fontWeight: "800"
  },
  copy: {
    fontSize: 14
  },
  button: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  backText: {
    fontWeight: "700"
  }
});

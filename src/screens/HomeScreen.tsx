import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { StatusCard } from "../components/StatusCard";
import { getHealth } from "../services/api";
import { useAppStore } from "../store/appStore";
import { RootStackParamList } from "../navigation/RootNavigator";
import { colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { count, increment, reset, themeName } = useAppStore();
  const [apiStatus, setApiStatus] = useState("Checking API...");

  const palette = colors[themeName];

  useEffect(() => {
    getHealth()
      .then((result) => {
        setApiStatus(result.ok ? "API Reachable" : "API Unreachable");
      })
      .catch(() => {
        setApiStatus("API Unreachable");
      });
  }, []);

  return (
    <View style={[styles.page, { backgroundColor: palette.background }]}>
      <Text style={[styles.heading, { color: palette.text }]}>Cross-Platform Starter</Text>
      <Text style={[styles.subtitle, { color: palette.textMuted }]}>React Native + Web schema is live.</Text>

      <StatusCard
        title="Health"
        subtitle={apiStatus}
        accent={palette.primary}
        border={palette.border}
        surface={palette.surface}
        text={palette.text}
        textMuted={palette.textMuted}
      />

      <View style={[styles.counterWrap, { borderColor: palette.border, backgroundColor: palette.surface }]}>
        <Text style={[styles.counterLabel, { color: palette.textMuted }]}>Shared Counter</Text>
        <Text style={[styles.counterValue, { color: palette.text }]}>{count}</Text>
      </View>

      <View style={styles.row}>
        <ActionButton label="Increment" onPress={increment} background={palette.primary} text="#FFFFFF" />
        <ActionButton label="Reset" onPress={reset} background={palette.surface} text={palette.text} border={palette.border} />
      </View>

      <ActionButton
        label="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
        background={palette.surface}
        text={palette.text}
        border={palette.border}
      />
    </View>
  );
}

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  background: string;
  text: string;
  border?: string;
};

function ActionButton({ label, onPress, background, text, border }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: background,
          borderColor: border,
          borderWidth: border ? 1 : 0,
          opacity: pressed ? 0.8 : 1
        }
      ]}
    >
      <Text style={[styles.buttonText, { color: text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 16,
    gap: 14
  },
  heading: {
    fontSize: 28,
    fontWeight: "800"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4
  },
  counterWrap: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 4
  },
  counterLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.8
  },
  counterValue: {
    fontSize: 24,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    gap: 8
  },
  button: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  buttonText: {
    fontWeight: "700"
  }
});

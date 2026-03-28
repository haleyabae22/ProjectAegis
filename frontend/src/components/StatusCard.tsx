import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  accent: string;
  border: string;
  surface: string;
  text: string;
  textMuted: string;
};

export function StatusCard({
  title,
  subtitle,
  accent,
  border,
  surface,
  text,
  textMuted
}: Props) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surface,
          borderColor: border
        }
      ]}
    >
      <View style={[styles.dot, { backgroundColor: accent }]} />
      <View style={styles.copyWrap}>
        <Text style={[styles.title, { color: text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: textMuted }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10
  },
  copyWrap: {
    flex: 1,
    gap: 2
  },
  title: {
    fontSize: 16,
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 13
  }
});

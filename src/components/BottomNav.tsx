import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const tabMeta: Record<string, { label: string; icon: string }> = {
  Home: { label: "Home", icon: "home" },
  Security: { label: "Impact", icon: "graph" }, // keep key as navigator route name
  Profile: { label: "Profile", icon: "user" }
};

export function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const meta = tabMeta[route.name] ?? { label: route.name, icon: "dot" };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
            testID={descriptors[route.key].options.tabBarTestID}
            onPress={onPress}
            style={[styles.tab, isFocused && styles.tabFocused]}
          >
            <Text style={[styles.icon, isFocused && styles.iconFocused]}>{meta.icon}</Text>
            <Text style={[styles.label, isFocused && styles.labelFocused]}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: "#001f3f",
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 8
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 2
  },
  tabFocused: {
    backgroundColor: "#002061",
    borderWidth: 2,
    borderColor: "#D4AF37"
  },
  icon: {
    fontSize: 11,
    color: "#9A7B1C",
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  iconFocused: {
    color: "#D4AF37"
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9A7B1C"
  },
  labelFocused: {
    color: "#D4AF37"
  }
});

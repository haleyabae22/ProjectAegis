import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { LandingScreen } from "../screens/LandingScreen";
import { ImpactDashboardScreen } from "../screens/ImpactDashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors, radius } from "../theme/colors";

export type AppTabParamList = {
  Home: undefined;
  Security: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(244, 250, 255, 0.80)",
          borderTopWidth: 0,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={LandingScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.activePill : undefined}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={focused ? colors.onPrimary : color}
              />
            </View>
          ),
        }}
      />

      {/* Security Tab */}
      <Tab.Screen
        name="Security"
        component={ImpactDashboardScreen}
        options={{
          tabBarLabel: "Security",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.activePill : undefined}>
              <Ionicons
                name={focused ? "shield-checkmark" : "shield-checkmark-outline"}
                size={size}
                color={focused ? colors.onPrimary : color}
              />
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <View style={focused ? styles.activePill : undefined}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={focused ? colors.onPrimary : color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activePill: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: 6,
  },
});